/** @returns {boolean} */
export function isLiveMediaStream(stream) {
  return Boolean(stream?.getTracks().some((t) => t.readyState === 'live'));
}

/** Gắn lại MediaStream sau khi <video> remount (vd. bấm Test lại). */
export async function bindStreamToVideo(video, stream) {
  if (!video || !stream) return false;
  if (video.srcObject !== stream) {
    video.srcObject = stream;
    video.playsInline = true;
    video.muted = true;
  }
  if (video.paused) {
    try {
      await video.play();
    } catch {
      return false;
    }
  }
  return true;
}
