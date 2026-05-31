import { useCallback, useEffect, useRef } from 'react';
import { getFaceLandmarker } from '../face/faceLandmarkerSingleton';
import { sampleVideoLuminance } from '../pose/poseFrameUtils';
import { VALIDATION_THRESHOLDS } from '../constants';

export function useFaceDetectionLoop({ active, videoRef, onFrame, sampleLuminance = true }) {
  const rafRef = useRef(null);
  const landmarkerRef = useRef(null);
  const lastVideoTimeRef = useRef(-1);
  const luminanceCanvasRef = useRef(null);
  const frameCounterRef = useRef(0);
  const onFrameRef = useRef(onFrame);

  if (!luminanceCanvasRef.current && typeof document !== 'undefined') {
    luminanceCanvasRef.current = document.createElement('canvas');
  }

  useEffect(() => {
    onFrameRef.current = onFrame;
  }, [onFrame]);

  const stopLoop = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    lastVideoTimeRef.current = -1;
  }, []);

  useEffect(() => {
    if (!active) {
      stopLoop();
      return undefined;
    }

    let cancelled = false;

    const tick = async () => {
      if (cancelled) return;
      const video = videoRef.current;
      const landmarker = landmarkerRef.current;

      if (video && landmarker && video.readyState >= 2) {
        const t = video.currentTime;
        if (t !== lastVideoTimeRef.current) {
          lastVideoTimeRef.current = t;
          try {
            const result = landmarker.detectForVideo(video, performance.now());
            const landmarks = result?.faceLandmarks?.[0] ?? null;
            let luminance = null;
            frameCounterRef.current += 1;
            if (
              sampleLuminance &&
              frameCounterRef.current % VALIDATION_THRESHOLDS.LUMINANCE_SAMPLE_INTERVAL === 0
            ) {
              luminance = sampleVideoLuminance(video, luminanceCanvasRef.current);
            }
            onFrameRef.current?.({ landmarks, timestampMs: performance.now(), luminance });
          } catch (e) {
            console.warn('[FaceLoop]', e);
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    (async () => {
      try {
        landmarkerRef.current = await getFaceLandmarker();
        if (!cancelled) rafRef.current = requestAnimationFrame(tick);
      } catch (err) {
        onFrameRef.current?.({ error: err });
      }
    })();

    return () => {
      cancelled = true;
      stopLoop();
    };
  }, [active, videoRef, sampleLuminance, stopLoop]);

  return { stopLoop };
}
