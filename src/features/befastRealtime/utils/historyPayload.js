/** Chuyển kết quả realtime → payload lưu MongoDB (Click-Health-be) */
export function toHistoryTestPayload(result) {
  if (!result) {
    return { is_abnormal: false, message: '', realtime: false, metrics: {} };
  }

  const {
    success,
    message,
    label,
    riskLevel,
    frameCount,
    realtime,
    analysisSource,
    error,
    ...metrics
  } = result;

  const isEyes = result.total_count !== undefined;

  const abnormal = isEyes
    ? (result.should_see_doctor || result.risk_level === 'high' || result.correct_count < 2)
    : (result.arm_weakness ||
       result.balance_issue ||
       result.speech_issue ||
       result.is_abnormal ||
       (label && label !== 'normal'));

  return {
    is_abnormal: Boolean(abnormal),
    message: message || '',
    realtime: true,
    label: label || null,
    riskLevel: riskLevel || result.risk_level || null,
    frameCount: frameCount ?? null,
    metrics: {
      ...metrics,
      analysisSource: analysisSource || 'local',
    },
  };
}
