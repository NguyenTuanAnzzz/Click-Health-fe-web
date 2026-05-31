import { VALIDATION_THRESHOLDS } from '../constants';
import { computeShakeVariance } from '../pose/poseFrameUtils';

const {
  SHOULDER_WIDTH_MIN,
  SHOULDER_WIDTH_MAX,
  LUMINANCE_MIN,
  LUMINANCE_MAX,
  SHAKE_MAX_VARIANCE,
} = VALIDATION_THRESHOLDS;

export function evaluatePoseValidation({
  frame,
  luminance,
  shakeHistory,
  mode = 'arm',
}) {
  const checks = {
    person: false,
    arms: false,
    distance: false,
    lighting: false,
    stable: false,
  };
  const warnings = [];

  if (frame) {
    checks.person = frame.quality >= 0.45;
    const sw = frame.shoulderWidth;
    if (sw < SHOULDER_WIDTH_MIN) warnings.push('Hãy lùi xa camera hơn');
    else if (sw > SHOULDER_WIDTH_MAX) warnings.push('Hãy tiến gần camera hơn');
    else checks.distance = true;

    if (mode === 'arm') {
      checks.arms = frame.lWristY != null && frame.rWristY != null;
      if (!checks.arms) warnings.push('Không thấy đủ cánh tay');
    } else {
      checks.arms = true;
      if (!frame.hipMidX) warnings.push('Không thấy đủ phần thân — lùi xa hơn');
    }
  } else {
    warnings.push('Không thấy đủ người trong khung hình');
  }

  if (luminance != null) {
    if (luminance < LUMINANCE_MIN) warnings.push('Ánh sáng quá tối');
    else if (luminance > LUMINANCE_MAX) warnings.push('Ánh sáng quá chói');
    else checks.lighting = true;
  } else checks.lighting = true;

  const shakeVar = computeShakeVariance(shakeHistory);
  checks.stable = shakeVar <= SHAKE_MAX_VARIANCE;
  if (!checks.stable) warnings.push('Camera đang rung — giữ máy ổn định');

  const allPass =
    checks.person &&
    checks.arms &&
    checks.distance &&
    checks.lighting &&
    checks.stable;

  return { checks, allPass, primaryWarning: warnings[0] || null, shakeVariance: shakeVar };
}
