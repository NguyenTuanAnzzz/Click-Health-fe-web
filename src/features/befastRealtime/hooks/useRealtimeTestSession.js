import { useCallback, useEffect, useRef, useState } from 'react';
import { TEST_PHASE } from '../constants';

/**
 * Generic state machine for validation → countdown → recording → analyze.
 */
export function useRealtimeTestSession({
  loadModel,
  onAnalyze,
  recordingSec,
  countdownSec,
  validationStableMs,
}) {
  const [phase, setPhase] = useState(TEST_PHASE.LOADING);
  const [loadError, setLoadError] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [validationReady, setValidationReady] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [liveMetrics, setLiveMetrics] = useState(null);
  const [startRequested, setStartRequested] = useState(false);

  const stableSinceRef = useRef(null);
  const recordingFramesRef = useRef([]);
  const recordingStartRef = useRef(null);

  const modelReadyRef = useRef(false);
  const cameraReadyRef = useRef(false);

  const tryEnterValidation = useCallback(() => {
    if (modelReadyRef.current && cameraReadyRef.current) {
      setPhase(TEST_PHASE.VALIDATION);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    setPhase(TEST_PHASE.PERMISSION);
    loadModel()
      .then(() => {
        if (!mounted) return;
        modelReadyRef.current = true;
        tryEnterValidation();
      })
      .catch((err) => {
        if (mounted) {
          setLoadError(err?.message || 'Không thể tải AI.');
          setPhase(TEST_PHASE.ERROR);
        }
      });
    return () => {
      mounted = false;
      modelReadyRef.current = false;
      cameraReadyRef.current = false;
    };
  }, [loadModel, tryEnterValidation]);

  const markValidationPass = useCallback(
    (passed) => {
      if (phase !== TEST_PHASE.VALIDATION) return;
      if (passed) {
        if (!stableSinceRef.current) stableSinceRef.current = Date.now();
        setValidationReady(Date.now() - stableSinceRef.current >= validationStableMs);
      } else {
        stableSinceRef.current = null;
        setValidationReady(false);
      }
    },
    [phase, validationStableMs]
  );

  const pushRecordingFrame = useCallback((frame, metrics) => {
    if (frame) recordingFramesRef.current.push(frame);
    if (metrics) setLiveMetrics(metrics);
  }, []);

  const startCountdown = useCallback(() => {
    if (phase !== TEST_PHASE.VALIDATION) return;

    stableSinceRef.current = null;
    setValidationReady(false);

    if (!validationReady) {
      setStartRequested(true);
      return;
    }

    setStartRequested(false);
    setCountdown(countdownSec);
    setPhase(TEST_PHASE.COUNTDOWN);
  }, [phase, validationReady, countdownSec]);

  useEffect(() => {
    if (!startRequested || !validationReady || phase !== TEST_PHASE.VALIDATION) return undefined;

    setStartRequested(false);
    setCountdown(countdownSec);
    setPhase(TEST_PHASE.COUNTDOWN);
  }, [startRequested, validationReady, phase, countdownSec]);

  useEffect(() => {
    if (phase !== TEST_PHASE.COUNTDOWN || countdown == null) return undefined;
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(t);
    }
    recordingFramesRef.current = [];
    recordingStartRef.current = Date.now();
    setRecordingProgress(0);
    setPhase(TEST_PHASE.RECORDING);
    setCountdown(null);
    return undefined;
  }, [phase, countdown]);

  useEffect(() => {
    if (phase !== TEST_PHASE.RECORDING) return undefined;
    const interval = setInterval(() => {
      const elapsed = Date.now() - recordingStartRef.current;
      setRecordingProgress(Math.min(100, (elapsed / (recordingSec * 1000)) * 100));
      if (elapsed >= recordingSec * 1000) {
        clearInterval(interval);
        setPhase(TEST_PHASE.ANALYZING);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [phase, recordingSec]);

  useEffect(() => {
    if (phase !== TEST_PHASE.ANALYZING) return undefined;

    let cancelled = false;

    (async () => {
      try {
        const result = await onAnalyze(recordingFramesRef.current);
        if (cancelled) return;
        if (!result?.success) {
          setLoadError(result?.error || 'Phân tích thất bại');
          setPhase(TEST_PHASE.VALIDATION);
          recordingFramesRef.current = [];
          return;
        }
        setAnalysisResult(result);
        setPhase(TEST_PHASE.RESULTS);
      } catch (err) {
        if (!cancelled) {
          setLoadError(err?.message || 'Phân tích thất bại');
          setPhase(TEST_PHASE.VALIDATION);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [phase, onAnalyze]);

  const resetTest = useCallback(() => {
    stableSinceRef.current = null;
    recordingFramesRef.current = [];
    setCountdown(null);
    setRecordingProgress(0);
    setLiveMetrics(null);
    setAnalysisResult(null);
    setLoadError(null);
    setValidationReady(false);
    setStartRequested(false);
    cameraReadyRef.current = true;
    modelReadyRef.current = true;
    setPhase(TEST_PHASE.VALIDATION);
  }, []);

  const onCameraReady = useCallback(() => {
    cameraReadyRef.current = true;
    tryEnterValidation();
  }, [tryEnterValidation]);

  const loopActive =
    phase === TEST_PHASE.VALIDATION ||
    phase === TEST_PHASE.COUNTDOWN ||
    phase === TEST_PHASE.RECORDING;

  return {
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
  };
}
