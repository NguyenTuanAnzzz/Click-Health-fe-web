import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader2, Play, AlertCircle } from 'lucide-react';
import { TEST_PHASE } from '../constants';
import { evaluatePoseValidation } from '../engines/cameraValidation';
import { getPoseLandmarker } from '../pose/poseLandmarkerSingleton';
import { usePoseDetectionLoop } from '../hooks/usePoseDetectionLoop';
import { useRealtimeTestSession } from '../hooks/useRealtimeTestSession';
import { useVideoStreamAttach } from '../hooks/useVideoStreamAttach';
import { bindStreamToVideo } from '../utils/videoStream';
import ValidationPanelV2 from './ValidationPanelV2';
import PoseCanvasOverlay from './PoseCanvasOverlay';

export default function RealtimePoseTest({
  config,
  icon: Icon,
  extractFrame,
  analyzeFrames,
  getLiveMetrics,
  ResultsPanel,
  onComplete,
}) {
  const { user } = useSelector((state) => state.auth);
  const freeAttemptsLeft = user?.freeAttemptsBefastLeft || 0;
  const hasNoAttempts = freeAttemptsLeft === 0;
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const streamRef = useRef(null);
  const shakeHistoryRef = useRef([]);
  const luminanceRef = useRef(null);
  const [landmarks, setLandmarks] = useState(null);
  const [validation, setValidation] = useState(null);
  const [viewSize, setViewSize] = useState({ width: 0, height: 0 });
  const frameSkip = useRef(0);

  const loadModel = useCallback(() => getPoseLandmarker(), []);

  const onAnalyze = useCallback(
    (frames) => analyzeFrames(frames, config.minFrames),
    [analyzeFrames, config.minFrames]
  );

  const {
    phase,
    loadError,
    countdown,
    recordingProgress,
    validationReady,
    startRequested,
    liveMetrics,
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
    ({ landmarks: lm, timestampMs, luminance, error }) => {
      if (error) {
        setLoadError(error.message);
        setPhase(TEST_PHASE.ERROR);
        return;
      }
      if (luminance != null) luminanceRef.current = luminance;

      const compact = lm ? extractFrame(lm, timestampMs) : null;
      if (compact?.noseX != null) {
        shakeHistoryRef.current.push({ x: compact.noseX, y: compact.noseY });
        if (shakeHistoryRef.current.length > 24) shakeHistoryRef.current.shift();
      }

      const val = evaluatePoseValidation({
        frame: compact,
        luminance: luminanceRef.current,
        shakeHistory: shakeHistoryRef.current,
        mode: config.validationMode,
      });
      setValidation(val);
      markValidationPass(val.allPass);

      if (phase === TEST_PHASE.RECORDING && compact) {
        const metrics = getLiveMetrics?.(compact, liveMetrics);
        pushRecordingFrame(compact, metrics);
      }

      if (lm) {
        frameSkip.current += 1;
        if (frameSkip.current % 2 === 0) setLandmarks(lm);
      }
    },
    [extractFrame, config.validationMode, getLiveMetrics, liveMetrics, markValidationPass, phase, pushRecordingFrame, setLoadError, setPhase]
  );

  usePoseDetectionLoop({
    active: loopActive && !!streamRef.current,
    videoRef,
    onFrame: handleFrame,
    sampleLuminance: phase !== TEST_PHASE.RECORDING,
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
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setViewSize({ width: Math.floor(width), height: Math.floor(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [phase]);

  const handleRetry = useCallback(() => {
    shakeHistoryRef.current = [];
    luminanceRef.current = null;
    frameSkip.current = 0;
    setLandmarks(null);
    setValidation(null);
    resetTest();
  }, [resetTest]);

  useEffect(() => {
    if (phase !== TEST_PHASE.PERMISSION) return undefined;
    let cancelled = false;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: config.cameraFacing || 'user',
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        const video = videoRef.current;
        if (video) {
          await bindStreamToVideo(video, stream);
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
  }, [phase, config.cameraFacing, onCameraReady, setLoadError, setPhase]);

  useEffect(
    () => () => streamRef.current?.getTracks().forEach((t) => t.stop()),
    []
  );

  const showOverlay =
    phase === TEST_PHASE.VALIDATION ||
    phase === TEST_PHASE.COUNTDOWN ||
    phase === TEST_PHASE.RECORDING;

  if (phase === TEST_PHASE.RESULTS && analysisResult) {
    return (
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] rounded-[28px] p-4 md:p-8 w-full shadow-lg border border-[#e5e7eb]/50">
        <TestHeader Icon={Icon} config={config} />
        <ResultsPanel
          result={analysisResult}
          onRetry={handleRetry}
          onContinue={() => onComplete(analysisResult)}
        />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-[#f8f9fa] rounded-[28px] p-4 md:p-8 w-full shadow-lg font-inter-tight-small border border-[#e5e7eb]/50">
      <TestHeader Icon={Icon} config={config} />
      <p className="text-[#6b7280] text-[15px] font-medium mb-2">{config.description}</p>
      <p className="text-[13px] text-[#9ca3af] mb-6">{config.prepHint}</p>

      {(phase === TEST_PHASE.LOADING || phase === TEST_PHASE.PERMISSION) && (
        <LoadingBlock phase={phase} />
      )}

      {phase === TEST_PHASE.ERROR && (
        <div className="bg-gradient-to-r from-red-50 to-red-100/50 border border-red-300 rounded-[16px] p-4 mb-6">
          <p className="text-[#dc2626] text-sm font-bold">{loadError}</p>
        </div>
      )}

      {phase !== TEST_PHASE.LOADING && phase !== TEST_PHASE.ERROR && (
        <div
          ref={containerRef}
          className="relative w-full aspect-[3/4] md:aspect-video video-responsive-container bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[24px] overflow-hidden border border-[#e5e7eb]/20 mb-6 shadow-xl"
        >
          <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover scale-x-[-1]" playsInline muted />
          {showOverlay && viewSize.width > 0 && (
            <PoseCanvasOverlay
              landmarks={landmarks}
              width={viewSize.width}
              height={viewSize.height}
              mirrored
              highlightArms={config.validationMode === 'arm'}
            />
          )}
          <CountdownOverlay phase={phase} countdown={countdown} />
          <RecordingOverlay
            phase={phase}
            banner={config.recordingBanner}
            progress={recordingProgress}
            live={liveMetrics}
          />
          <AnalyzingOverlay phase={phase} />

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

function TestHeader({ Icon, config }) {
  return (
    <div className="mb-4">
      <span className="bg-[#1F75C1]/10 text-[#1F75C1] px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-2 inline-block">
        {config.step}
      </span>
      <h2 className="text-2xl font-bold font-inter text-black flex items-center gap-2.5">
        {Icon && <Icon size={22} className="text-[#7AB5E9]" />}
        {config.title}
        <span className="text-[11px] font-bold text-[#7AB5E9] ml-1">REALTIME</span>
      </h2>
    </div>
  );
}

function LoadingBlock({ phase }) {
  return (
    <div className="flex flex-col items-center py-16 text-[#858585]">
      <Loader2 className="animate-spin text-[#7AB5E9] mb-4" size={36} />
      <p className="font-bold text-sm">
        {phase === TEST_PHASE.LOADING ? 'Đang tải AI...' : 'Đang khởi tạo camera và AI...'}
      </p>
    </div>
  );
}

function CountdownOverlay({ phase, countdown }) {
  if (phase !== TEST_PHASE.COUNTDOWN || !countdown) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20">
      <span className="text-[7rem] font-bold text-[#7AB5E9] animate-pulse">{countdown}</span>
    </div>
  );
}

function RecordingOverlay({ phase, banner, progress, live }) {
  if (phase !== TEST_PHASE.RECORDING) return null;
  return (
    <>
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between">
        <span className="bg-[#d32f2f]/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          {banner}
        </span>
        {live?.label && (
          <span className="bg-black/50 text-white text-[11px] font-bold px-3 py-1.5 rounded-full">
            {live.label}
          </span>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-20">
        <div className="h-full bg-[#7AB5E9]" style={{ width: `${progress}%` }} />
      </div>
    </>
  );
}

function AnalyzingOverlay({ phase }) {
  if (phase !== TEST_PHASE.ANALYZING) return null;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-20">
      <Loader2 className="animate-spin text-[#7AB5E9] mb-3" size={40} />
      <p className="text-white font-bold text-sm">Đang phân tích...</p>
    </div>
  );
}
