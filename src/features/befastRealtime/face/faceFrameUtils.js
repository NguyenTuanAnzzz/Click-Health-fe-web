import { FACE_LANDMARK, VALIDATION_THRESHOLDS } from '../constants';

const { FACE_WIDTH_MIN, FACE_WIDTH_MAX } = VALIDATION_THRESHOLDS;

export function extractFaceSymmetryFrame(landmarks, timestampMs) {
  if (!landmarks?.length) return null;

  const pick = (i) => landmarks[i];
  const leO = pick(FACE_LANDMARK.LEFT_EYE_OUTER);
  const leI = pick(FACE_LANDMARK.LEFT_EYE_INNER);
  const reO = pick(FACE_LANDMARK.RIGHT_EYE_OUTER);
  const reI = pick(FACE_LANDMARK.RIGHT_EYE_INNER);
  const ml = pick(FACE_LANDMARK.MOUTH_LEFT);
  const mr = pick(FACE_LANDMARK.MOUTH_RIGHT);
  const forehead = pick(FACE_LANDMARK.FOREHEAD);
  const chin = pick(FACE_LANDMARK.CHIN);

  if (![leO, leI, reO, reI, ml, mr, forehead, chin].every(Boolean)) return null;

  const lEyeY = (leO.y + leI.y) / 2;
  const rEyeY = (reO.y + reI.y) / 2;
  const eyeDiff = Math.abs(lEyeY - rEyeY);
  const mouthDiff = Math.abs(ml.y - mr.y);
  const faceHeight = Math.abs(forehead.y - chin.y) || 0.001;

  const eyeDevPct = (eyeDiff / faceHeight) * 100;
  const mouthDevPct = (mouthDiff / faceHeight) * 100;
  const deviationPct = Math.max(eyeDevPct, mouthDevPct);

  const xs = landmarks.map((l) => l.x);
  const faceWidth = Math.max(...xs) - Math.min(...xs);

  return {
    t: timestampMs,
    deviationPct,
    eyeDevPct,
    mouthDevPct,
    faceWidth,
    isAbnormal: deviationPct > 3.5,
  };
}

export function evaluateFaceValidation(frame, luminance, shakeVariance) {
  const checks = {
    person: false,
    arms: true,
    distance: false,
    lighting: false,
    stable: false,
  };
  const warnings = [];

  if (frame) {
    checks.person = true;
    if (frame.faceWidth < FACE_WIDTH_MIN) warnings.push('Hãy tiến gần camera hơn');
    else if (frame.faceWidth > FACE_WIDTH_MAX) warnings.push('Hãy lùi xa camera hơn');
    else checks.distance = true;
  } else {
    warnings.push('Không thấy khuôn mặt — hãy nhìn thẳng vào camera');
  }

  if (luminance != null) {
    if (luminance < VALIDATION_THRESHOLDS.LUMINANCE_MIN) {
      warnings.push('Ánh sáng quá tối');
    } else if (luminance > VALIDATION_THRESHOLDS.LUMINANCE_MAX) {
      warnings.push('Ánh sáng quá chói');
    } else checks.lighting = true;
  } else checks.lighting = true;

  checks.stable = shakeVariance <= VALIDATION_THRESHOLDS.SHAKE_MAX_VARIANCE;
  if (!checks.stable) warnings.push('Camera đang rung');

  const allPass =
    checks.person && checks.distance && checks.lighting && checks.stable;

  return { checks, allPass, primaryWarning: warnings[0] || null };
}
