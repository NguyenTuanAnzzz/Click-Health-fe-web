import { clamp, riskFromScore } from '../utils/math';

export function analyzeFaceMotion(frames, minFrames = 30) {
  const valid = frames.filter(Boolean);
  if (valid.length < minFrames) {
    return {
      success: false,
      error: 'Không đủ dữ liệu khuôn mặt. Giữ mặt trong khung suốt bài test.',
      frameCount: valid.length,
    };
  }

  const deviations = valid.map((f) => f.deviationPct);
  const meanDev = deviations.reduce((a, b) => a + b, 0) / deviations.length;
  const maxDev = Math.max(...deviations);
  const abnormalFrames = valid.filter((f) => f.isAbnormal).length;
  const abnormalPct = (abnormalFrames / valid.length) * 100;

  const symmetryScore = clamp(100 - meanDev * 8, 0, 100);
  const stabilityScore = clamp(100 - (maxDev - meanDev) * 5, 0, 100);
  const movementVariance = clamp(abnormalPct, 0, 100);
  const composite = clamp(symmetryScore * 0.6 + stabilityScore * 0.4, 0, 100);

  const riskLevel = riskFromScore(composite);
  const isAbnormal = maxDev > 3.5 || meanDev > 2.8 || abnormalPct > 35;

  const parts = [];
  if (maxDev > 3.5) parts.push(`Độ lệch tối đa ${maxDev.toFixed(1)}%`);
  if (abnormalPct > 35) parts.push('Mất cân đối kéo dài trong lúc test');
  if (!parts.length) parts.push('Khuôn mặt cân đối theo thời gian');

  return {
    success: true,
    realtime: true,
    frameCount: valid.length,
    deviation_percentage: Math.round(maxDev * 10) / 10,
    mean_deviation: Math.round(meanDev * 10) / 10,
    symmetryScore: Math.round(symmetryScore),
    stabilityScore: Math.round(stabilityScore),
    overallBalance: Math.round(composite),
    abnormalMotionPct: Math.round(abnormalPct),
    movementVariance: Math.round(movementVariance),
    riskLevel,
    is_abnormal: isAbnormal,
    label: isAbnormal ? 'face_droop' : 'normal',
    message: parts.join('. ') + '.',
  };
}
