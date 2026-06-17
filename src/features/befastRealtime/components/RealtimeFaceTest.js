import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader2, Play, Smile, AlertCircle } from 'lucide-react';
import { TEST_PHASE } from '../constants';
import { extractFaceSymmetryFrame, evaluateFaceValidation } from '../face/faceFrameUtils';
import { analyzeFaceMotion } from '../engines/faceMotionAnalyzer';
import { hybridAnalyze, analyzeFaceOnServer } from '../api/befastAiApi';
import { getFaceLandmarker } from '../face/faceLandmarkerSingleton';
import { useFaceDetectionLoop } from '../hooks/useFaceDetectionLoop';
import { useRealtimeTestSession } from '../hooks/useRealtimeTestSession';
import { useVideoStreamAttach } from '../hooks/useVideoStreamAttach';
import { bindStreamToVideo } from '../utils/videoStream';
import ValidationPanelV2 from './ValidationPanelV2';
import FaceResultsPanel from './results/FaceResultsPanel';
import { FACE_TEST } from '../testConfigs';
import { getBefastAccess } from '../../../constants/subscription';

export default function RealtimeFaceTest({ onComplete }) {
  const config = FACE_TEST;
  const { user } = useSelector((state) => state.auth);
  const { hasNoAttempts } = getBefastAccess(user);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const streamRef = useRef(null);
  const shakeRef = useRef([]);
  const luminanceRef = useRef(null);
  const [validation, setValidation] = useState(null);
  const [viewSize, setViewSize] = useState({ width: 0, height: 0 });

  const loadModel = useCallback(() => getFaceLandmarker(), []);
  const onAnalyze = useCallback(
    (frames) => hybridAnalyze(analyzeFaceMotion, analyzeFaceOnServer, frames, config.minFrames),
    [config.minFrames]
  );

  const {
    phase,
    loadError,
    countdown,
    recordingProgress,
    validationReady,
    startRequested,
    analysisResult,
    loopActive,
    markValidationPass,
    pushRecordingFrame,
    startCountdown,
    resetTest,
    onCameraReady,
    setPhase,
    setLoadError,
  } = useRealtimeTestSession({
    loadModel,
    onAnalyze,
    recordingSec: config.recordingSec,
    countdownSec: config.countdownSec,
    validationStableMs: config.validationStableMs,
  });

  const handleFrame = useCallback(
    ({ landmarks, timestampMs, luminance, error }) => {
      if (error) {
        setLoadError(error.message);
        setPhase(TEST_PHASE.ERROR);
        return;
      }
      if (luminance != null) luminanceRef.current = luminance;

      const compact = landmarks ? extractFaceSymmetryFrame(landmarks, timestampMs) : null;
      if (compact) {
        shakeRef.current.push({ x: 0.5, y: 0.5 });
        if (shakeRef.current.length > 12) shakeRef.current.shift();
      }

      const val = evaluateFaceValidation(
        compact,
        luminanceRef.current,
        shakeRef.current.length < 4 ? 0 : 0.0001
      );
      setValidation(val);
      markValidationPass(val.allPass);

      if (phase === TEST_PHASE.RECORDING && compact) {
        pushRecordingFrame(compact, {
          label: `Lệch ~${compact.deviationPct.toFixed(1)}%`,
        });
      }
    },
    [markValidationPass, phase, pushRecordingFrame, setLoadError, setPhase]
  );

  useFaceDetectionLoop({
    active: loopActive && !!streamRef.current,
    videoRef,
    onFrame: handleFrame,
  });

  const onStreamDead = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setPhase(TEST_PHASE.PERMISSION);
  }, [setPhase]);

  useVideoStreamAttach({ phase, videoRef, streamRef, onStreamDead });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => {
      setViewSize({ width: Math.floor(e.contentRect.width), height: Math.floor(e.contentRect.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [phase]);

  const handleRetry = useCallback(() => {
    shakeRef.current = [];
    luminanceRef.current = null;
    setValidation(null);
    resetTest();
  }, [resetTest]);

  useEffect(() => {
    if (phase !== TEST_PHASE.PERMISSION) return undefined;
    let cancelled = false;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        const v = videoRef.current;
        if (v) {
          await bindStreamToVideo(v, stream);
          onCameraReady();
        }
      } catch {
        setLoadError('Không truy cập được camera.');
        setPhase(TEST_PHASE.ERROR);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [phase, onCameraReady, setLoadError, setPhase]);

  useEffect(() => () => streamRef.current?.getTracks().forEach((t) => t.stop()), []);

  if (phase === TEST_PHASE.RESULTS && analysisResult) {
    return (
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] rounded-[28px] p-4 md:p-8 max-w-4xl mx-auto shadow-lg border border-[#e5e7eb]/50">
        <Header />
        <FaceResultsPanel
          result={analysisResult}
          onRetry={handleRetry}
          onContinue={() => onComplete(analysisResult)}
        />
      </div>
    );
  }

  const showOverlay =
    phase === TEST_PHASE.VALIDATION ||
    phase === TEST_PHASE.COUNTDOWN ||
    phase === TEST_PHASE.RECORDING;

  return (
    <div className="bg-gradient-to-br from-white to-[#f8f9fa] rounded-[28px] p-4 md:p-8 max-w-4xl mx-auto shadow-lg font-inter-tight-small border border-[#e5e7eb]/50">
      <Header />
      <p className="text-[#858585] text-[14px] font-semibold mb-4">{config.description}</p>

      {(phase === TEST_PHASE.LOADING || phase === TEST_PHASE.PERMISSION) && (
        <div className="flex flex-col items-center py-16 text-[#858585]">
          <Loader2 className="animate-spin text-[#7AB5E9] mb-4" size={36} />
          <p className="font-bold text-sm">
            {phase === TEST_PHASE.LOADING ? 'Đang tải AI...' : 'Đang khởi tạo camera và AI...'}
          </p>
        </div>
      )}

      {phase === TEST_PHASE.ERROR && (
        <p className="text-[#d32f2f] text-sm font-bold text-center bg-red-50 p-4 rounded-xl mb-4">
          {loadError}
        </p>
      )}

      {phase !== TEST_PHASE.LOADING && phase !== TEST_PHASE.ERROR && (
        <div
          ref={containerRef}
          className="relative w-full aspect-[3/4] md:aspect-video video-responsive-container bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[24px] overflow-hidden mb-6 shadow-xl border border-[#e5e7eb]/20"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
            playsInline
            muted
          />
          {showOverlay && viewSize.width > 0 && (
            <div className="absolute inset-0 border-4 border-[#7AB5E9]/30 rounded-[20px] m-8 pointer-events-none z-10" />
          )}
          {phase === TEST_PHASE.COUNTDOWN && countdown > 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20">
              <span className="text-[7rem] font-bold text-[#7AB5E9]">{countdown}</span>
            </div>
          )}
          {phase === TEST_PHASE.RECORDING && (
            <>
              <div className="absolute top-4 left-4 bg-[#d32f2f]/90 text-white text-[11px] font-bold px-3 py-1 rounded-full z-20">
                {config.recordingBanner}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-20">
                <div className="h-full bg-[#7AB5E9]" style={{ width: `${recordingProgress}%` }} />
              </div>
            </>
          )}
          {phase === TEST_PHASE.ANALYZING && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-20">
              <Loader2 className="animate-spin text-[#7AB5E9]" size={40} />
              <p className="text-white font-bold text-sm mt-3">Đang phân tích...</p>
            </div>
          )}

          {/* Validation Status Overlay */}
          {phase === TEST_PHASE.VALIDATION && (
            <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-center pointer-events-none">
              {validation?.primaryWarning ? (
                <div className="bg-orange-500/90 backdrop-blur-md border border-orange-400/30 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0 animate-bounce" />
                  <span>{validation.primaryWarning}</span>
                </div>
              ) : validationReady ? (
                <div className="bg-emerald-500/95 backdrop-blur-md border border-emerald-400/30 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse shrink-0" />
                  <span>Sẵn sàng bắt đầu test</span>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}

      {phase !== TEST_PHASE.LOADING && phase !== TEST_PHASE.PERMISSION && phase !== TEST_PHASE.ERROR && (
        <>
          <ValidationPanelV2 validation={validation} validationReady={validationReady} />

          {phase === TEST_PHASE.VALIDATION && (
            <div className="flex flex-col items-center justify-center min-h-[96px]">
              <button
                type="button"
                disabled={hasNoAttempts}
                onClick={hasNoAttempts ? undefined : startCountdown}
                className={`flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white transition-all duration-300 ${
                  hasNoAttempts
                    ? 'bg-gradient-to-r from-[#9ca3af] to-[#6b7280] cursor-not-allowed opacity-50'
                    : validationReady
                    ? 'bg-gradient-to-r from-[#7AB5E9] to-[#5CA5E4] hover:shadow-lg hover:shadow-[#7AB5E9]/40 hover:scale-105'
                    : startRequested
                    ? 'bg-gradient-to-r from-[#3b82f6] to-[#2563eb] shadow-lg shadow-[#3b82f6]/30'
                    : 'bg-gradient-to-r from-[#6b7280] to-[#4b5563] hover:from-[#757f8f] hover:to-[#555f70]'
                }`}
              >
                <Play size={16} className="fill-white" />
                {hasNoAttempts
                  ? 'Hết lượt thử miễn phí'
                  : validationReady
                  ? `Bắt đầu (đếm ngược ${config.countdownSec}s)`
                  : startRequested
                  ? 'Bắt đầu (đang chờ khung hình)'
                  : 'Bắt đầu'}
              </button>
              {hasNoAttempts && (
                <div className="flex items-center gap-2 text-red-600 text-sm font-medium mt-2">
                  <AlertCircle size={14} />
                  Vui lòng nâng cấp gói VIP
                </div>
              )}
              {startRequested && !validationReady ? (
                <div className="flex items-center gap-2 text-[#3b82f6] text-sm font-medium mt-2">
                  <div className="w-4 h-4 border-2 border-[#3b82f6]/20 border-t-[#3b82f6] rounded-full animate-spin" />
                  Đang chờ khung hình ổn định...
                </div>
              ) : (
                <div className="h-7" />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Header() {
  return (
    <div className="mb-4">
      <span className="bg-[#1F75C1]/10 text-[#1F75C1] px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-2 inline-block">
        {FACE_TEST.step}
      </span>
      <h2 className="text-2xl font-bold font-inter flex items-center gap-2">
        <Smile size={22} className="text-[#7AB5E9]" /> {FACE_TEST.title}
        <span className="text-[11px] text-[#7AB5E9]">REALTIME</span>
      </h2>
    </div>
  );
}
