import { useEffect } from 'react';
import { TEST_PHASE } from '../constants';
import { bindStreamToVideo, isLiveMediaStream } from '../utils/videoStream';

const VIDEO_PHASES = new Set([
  TEST_PHASE.VALIDATION,
  TEST_PHASE.COUNTDOWN,
  TEST_PHASE.RECORDING,
  TEST_PHASE.ANALYZING,
]);

/**
 * Giữ preview camera sau khi <video> remount (Test lại từ màn kết quả).
 */
export function useVideoStreamAttach({ phase, videoRef, streamRef, onStreamDead }) {
  useEffect(() => {
    if (!VIDEO_PHASES.has(phase)) return undefined;

    let cancelled = false;

    const attach = async () => {
      const video = videoRef.current;
      const stream = streamRef.current;

      if (!video) return;

      if (!stream || !isLiveMediaStream(stream)) {
        onStreamDead?.();
        return;
      }

      if (!cancelled) await bindStreamToVideo(video, stream);
    };

    attach();
    const raf = requestAnimationFrame(() => {
      if (!cancelled) attach();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [phase, videoRef, streamRef, onStreamDead]);
}
