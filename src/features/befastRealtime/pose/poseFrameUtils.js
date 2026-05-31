import { POSE_LANDMARK, VALIDATION_THRESHOLDS } from '../constants';

const { MIN_VISIBILITY } = VALIDATION_THRESHOLDS;

export function getVisibility(landmark) {
  if (landmark == null) return 0;
  if (typeof landmark.visibility === 'number') return landmark.visibility;
  if (typeof landmark.presence === 'number') return landmark.presence;
  return landmark.x >= 0 && landmark.x <= 1 && landmark.y >= 0 && landmark.y <= 1
    ? 0.85
    : 0;
}

export function isLandmarkVisible(landmark) {
  return getVisibility(landmark) >= MIN_VISIBILITY;
}

export function extractArmFrame(landmarks, timestampMs) {
  if (!landmarks?.length) return null;
  const pick = (i) => landmarks[i];
  const ls = pick(POSE_LANDMARK.LEFT_SHOULDER);
  const rs = pick(POSE_LANDMARK.RIGHT_SHOULDER);
  const le = pick(POSE_LANDMARK.LEFT_ELBOW);
  const re = pick(POSE_LANDMARK.RIGHT_ELBOW);
  const lw = pick(POSE_LANDMARK.LEFT_WRIST);
  const rw = pick(POSE_LANDMARK.RIGHT_WRIST);
  const nose = pick(POSE_LANDMARK.NOSE);
  const required = [ls, rs, le, re, lw, rw];
  if (!required.every(isLandmarkVisible)) return null;

  const shoulderWidth = Math.abs(rs.x - ls.x) || 0.001;
  const quality =
    required.map(getVisibility).reduce((a, b) => a + b, 0) / required.length;

  return {
    t: timestampMs,
    quality,
    shoulderWidth,
    lWristY: lw.y,
    rWristY: rw.y,
    lShoulderY: ls.y,
    rShoulderY: rs.y,
    noseX: nose?.x ?? (ls.x + rs.x) / 2,
    noseY: nose?.y ?? (ls.y + rs.y) / 2,
  };
}

export function extractBalanceFrame(landmarks, timestampMs) {
  if (!landmarks?.length) return null;
  const pick = (i) => landmarks[i];
  const ls = pick(POSE_LANDMARK.LEFT_SHOULDER);
  const rs = pick(POSE_LANDMARK.RIGHT_SHOULDER);
  const lh = pick(POSE_LANDMARK.LEFT_HIP);
  const rh = pick(POSE_LANDMARK.RIGHT_HIP);
  const nose = pick(POSE_LANDMARK.NOSE);
  const lw = pick(POSE_LANDMARK.LEFT_WRIST);
  const rw = pick(POSE_LANDMARK.RIGHT_WRIST);
  const required = [ls, rs, lh, rh, nose];
  if (!required.every(isLandmarkVisible)) return null;

  const shoulderWidth = Math.abs(rs.x - ls.x) || 0.001;
  const hipMidX = (lh.x + rh.x) / 2;
  const shoulderMidX = (ls.x + rs.x) / 2;
  const quality =
    required.map(getVisibility).reduce((a, b) => a + b, 0) / required.length;

  return {
    t: timestampMs,
    quality,
    shoulderWidth,
    shoulderMidX,
    hipMidX,
    shoulderMidY: (ls.y + rs.y) / 2,
    shoulderTilt: Math.abs(ls.y - rs.y),
    noseX: nose.x,
    noseY: nose.y,
    cogOffset: Math.abs(nose.x - hipMidX),
    hasArms: lw && rw && isLandmarkVisible(lw) && isLandmarkVisible(rw),
    lWristY: lw?.y,
    rWristY: rw?.y,
    lShoulderY: ls.y,
    rShoulderY: rs.y,
    noseXShake: nose.x,
    noseYShake: nose.y,
  };
}

export function sampleVideoLuminance(video, canvas) {
  if (!video?.videoWidth || !canvas) return null;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  canvas.width = 32;
  canvas.height = 24;
  ctx.drawImage(video, 0, 0, 32, 24);
  const { data } = ctx.getImageData(0, 0, 32, 24);
  let sum = 0;
  for (let i = 0; i < data.length; i += 4) {
    sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }
  return sum / (data.length / 4);
}

export function computeShakeVariance(history) {
  if (history.length < 8) return 0;
  const xs = history.map((p) => p.x);
  const ys = history.map((p) => p.y);
  const mx = xs.reduce((a, b) => a + b, 0) / xs.length;
  const my = ys.reduce((a, b) => a + b, 0) / ys.length;
  return (
    xs.reduce((a, x) => a + (x - mx) ** 2, 0) / xs.length +
    ys.reduce((a, y) => a + (y - my) ** 2, 0) / ys.length
  );
}
