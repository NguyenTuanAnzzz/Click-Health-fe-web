import { clamp, detrend, linearSlope, riskFromScore, std } from '../utils/math';

export function analyzeBalanceMotion(frames, minFrames = 45) {
  const valid = frames.filter(Boolean);
  if (valid.length < minFrames) {
    return {
      success: false,
      error: 'Không đủ dữ liệu. Đứng yên trong khung hình suốt bài test.',
      frameCount: valid.length,
    };
  }

  const swayX = [];
  const tilt = [];
  const cog = [];
  const shoulderSeries = [];

  valid.forEach((f) => {
    swayX.push(f.shoulderMidX);
    tilt.push(f.shoulderTilt);
    cog.push(f.cogOffset);
    shoulderSeries.push(f.shoulderMidY);
  });

  const swayPct = clamp(std(swayX) * 1200, 0, 100);
  const tiltPct = clamp((tilt.reduce((a, b) => a + b, 0) / tilt.length) * 400, 0, 100);
  const cogPct = clamp(std(cog) * 800, 0, 100);
  const bodyDrift = clamp(Math.abs(linearSlope(detrend(shoulderSeries))) * 600, 0, 100);
  const movementVariance = clamp((swayPct + cogPct) / 2, 0, 100);

  const stabilityScore = clamp(
    100 - swayPct * 0.35 - tiltPct * 0.3 - cogPct * 0.2 - bodyDrift * 0.15,
    0,
    100
  );
  const leftRightBalance = clamp(100 - tiltPct, 0, 100);
  const abnormalMotionPct = clamp((swayPct + movementVariance) / 2, 0, 100);

  const riskLevel = riskFromScore(stabilityScore);
  const balanceIssue = stabilityScore < 65 || swayPct > 30 || tiltPct > 25;

  const parts = [];
  if (swayPct > 25) parts.push('Lắc người sang hai bên');
  if (tiltPct > 20) parts.push('Nghiêng vai đáng chú ý');
  if (cogPct > 22) parts.push('Trọng tâm không ổn định');
  if (!parts.length) parts.push('Thăng bằng ổn định trong thời gian kiểm tra');

  return {
    success: true,
    realtime: true,
    frameCount: valid.length,
    stabilityScore: Math.round(stabilityScore),
    overallBalance: Math.round(stabilityScore),
    leftRightBalance: Math.round(leftRightBalance),
    swayPct: Math.round(swayPct),
    tiltPct: Math.round(tiltPct),
    bodyDriftPct: Math.round(bodyDrift),
    movementVariance: Math.round(movementVariance),
    abnormalMotionPct: Math.round(abnormalMotionPct),
    riskLevel,
    balance_issue: balanceIssue,
    label: balanceIssue ? 'balance_issue' : 'normal',
    message: parts.join('. ') + '.',
  };
}
