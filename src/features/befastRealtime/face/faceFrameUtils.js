import { FACE_LANDMARK, VALIDATION_THRESHOLDS } from '../constants';

const { FACE_WIDTH_MIN, FACE_WIDTH_MAX } = VALIDATION_THRESHOLDS;

const pct = (value, base) => (Math.abs(value) / Math.max(base, 0.001)) * 100;
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

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
  const nose = pick(FACE_LANDMARK.NOSE_TIP);
  const mouthTop = pick(FACE_LANDMARK.MOUTH_TOP);
  const mouthBottom = pick(FACE_LANDMARK.MOUTH_BOTTOM);
  const leftCheek = pick(FACE_LANDMARK.LEFT_CHEEK);
  const rightCheek = pick(FACE_LANDMARK.RIGHT_CHEEK);

  if (
    ![
      leO,
      leI,
      reO,
      reI,
      ml,
      mr,
      forehead,
      chin,
      nose,
      mouthTop,
      mouthBottom,
      leftCheek,
      rightCheek,
    ].every(Boolean)
  ) {
    return null;
  }

  const lEyeY = (leO.y + leI.y) / 2;
  const rEyeY = (reO.y + reI.y) / 2;
  const eyeDiff = Math.abs(lEyeY - rEyeY);
  const faceHeight = Math.abs(forehead.y - chin.y) || 0.001;
  const cheekWidth = Math.abs(leftCheek.x - rightCheek.x) || 0.001;

  const leftEyeCenter = {
    x: (leO.x + leI.x) / 2,
    y: lEyeY,
  };
  const rightEyeCenter = {
    x: (reO.x + reI.x) / 2,
    y: rEyeY,
  };
  const eyeCenterX = (leftEyeCenter.x + rightEyeCenter.x) / 2;
  const faceCenterX =
    (eyeCenterX + nose.x + (forehead.x + chin.x) / 2 + (leftCheek.x + rightCheek.x) / 2) / 4;
  const mouthCenter = {
    x: (ml.x + mr.x + mouthTop.x + mouthBottom.x) / 4,
    y: (ml.y + mr.y + mouthTop.y + mouthBottom.y) / 4,
  };

  const rawMouthDevPct = pct(ml.y - mr.y, faceHeight);
  const eyeDevPct = pct(eyeDiff, faceHeight);
  const mouthCornerDevPct = pct((ml.y - lEyeY) - (mr.y - rEyeY), faceHeight);
  const mouthCenterOffsetPct = pct(mouthCenter.x - faceCenterX, cheekWidth);

  const leftMouthToCheek = distance(ml, leftCheek);
  const rightMouthToCheek = distance(mr, rightCheek);
  const mouthSideBalancePct = pct(leftMouthToCheek - rightMouthToCheek, cheekWidth);
  const cheekAsymmetryPct = pct(leftCheek.y - rightCheek.y, faceHeight);
  const mouthVerticalCenterPct = pct(mouthCenter.y - (ml.y + mr.y) / 2, faceHeight);

  const asymmetryScorePct = Math.max(
    mouthCornerDevPct * 1.15,
    mouthCenterOffsetPct,
    mouthSideBalancePct * 0.9,
    rawMouthDevPct * 0.85,
    eyeDevPct * 0.45,
    cheekAsymmetryPct * 0.35
  );
  const deviationPct = asymmetryScorePct;

  const xs = landmarks.map((l) => l.x);
  const faceWidth = Math.max(...xs) - Math.min(...xs);

  return {
    t: timestampMs,
    deviationPct,
    eyeDevPct,
    mouthDevPct: rawMouthDevPct,
    mouthCornerDevPct,
    mouthCenterOffsetPct,
    mouthSideBalancePct,
    cheekAsymmetryPct,
    mouthVerticalCenterPct,
    asymmetryScorePct,
    faceWidth,
    isAbnormal:
      asymmetryScorePct > 4.8 ||
      mouthCornerDevPct > 3.6 ||
      mouthCenterOffsetPct > 5.0 ||
      mouthSideBalancePct > 5.0,
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
