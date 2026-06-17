/** Unified abnormal check for BEFAST result screens & history save */
export function getBefastAbnormalStatus(data, isEyes = false) {
  if (!data) return { status: 'unknown', text: 'Chưa kiểm tra' };

  if (isEyes) {
    const isAbnormal = data.should_see_doctor || data.risk_level === 'high' || data.correct_count < 2;
    return isAbnormal
      ? { status: 'abnormal', text: 'Có dấu hiệu bất thường' }
      : { status: 'normal', text: 'Bình thường' };
  }

  if (data.realtime) {
    const abnormal =
      data.label === 'arm_weakness' ||
      data.label === 'balance_issue' ||
      data.label === 'face_droop' ||
      data.label === 'speech_abnormal' ||
      data.arm_weakness ||
      data.balance_issue ||
      data.is_abnormal ||
      data.speech_issue ||
      (data.stabilityScore != null && data.stabilityScore < 65) ||
      (data.stabilityLeft != null && data.stabilityLeft < 65) ||
      (data.stabilityRight != null && data.stabilityRight < 65) ||
      (data.overallBalance != null && data.overallBalance < 65) ||
      (data.deviation_percentage != null && data.deviation_percentage > 6.5);

    return abnormal
      ? { status: 'abnormal', text: 'Phát hiện bất thường' }
      : { status: 'normal', text: 'Bình thường' };
  }

  if (data.label === 'normal') return { status: 'normal', text: 'Bình thường' };
  return { status: 'abnormal', text: 'Phát hiện bất thường' };
}
