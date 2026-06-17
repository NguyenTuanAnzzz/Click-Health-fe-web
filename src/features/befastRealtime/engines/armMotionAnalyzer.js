import { clamp, detrend, linearSlope, riskFromScore, std } from '../utils/math';
import { RISK_THRESHOLDS } from '../constants';

export function analyzeArmMotion(frames, minFrames = 45) {
  const valid = frames.filter(Boolean);
  if (valid.length < minFrames) {
    return {
      success: false,
      error: 'Không đủ dữ liệu. Giữ hai tay trong khung hình suốt bài test.',
      frameCount: valid.length,
    };
  }

  const raiseMargin = 0.03;
  let raised = 0;
  const heightDiffs = [];
  const lSeries = [];
  const rSeries = [];

  valid.forEach((f) => {
    if (f.lWristY < f.lShoulderY - raiseMargin && f.rWristY < f.rShoulderY - raiseMargin) {
      raised += 1;
    }
    heightDiffs.push(Math.abs(f.lWristY - f.rWristY) / f.shoulderWidth);
    lSeries.push(f.lWristY);
    rSeries.push(f.rWristY);
  });

  const raisePct = (raised / valid.length) * 100;
  const lDrift = clamp(Math.abs(linearSlope(lSeries)) * 800, 0, 100);
  const rDrift = clamp(Math.abs(linearSlope(rSeries)) * 800, 0, 100);
  const armDriftPct = (lDrift + rDrift) / 2;
  const lTremor = std(detrend(lSeries));
  const rTremor = std(detrend(rSeries));
  const movementVariance = ((lTremor + rTremor) / 2) * 1000;

  const stabilityLeft = clamp(100 - lDrift * 0.55 - lTremor * 180, 0, 100);
  const stabilityRight = clamp(100 - rDrift * 0.55 - rTremor * 180, 0, 100);
  const leftRightBalance = clamp(
    100 - (heightDiffs.reduce((a, b) => a + b, 0) / heightDiffs.length) * 100,
    0,
    100
  );
  const overallBalance = stabilityLeft * 0.5 + stabilityRight * 0.5;
  const composite = clamp(overallBalance * 0.7 + leftRightBalance * 0.3, 0, 100);
  const abnormalMotionPct = clamp((armDriftPct + movementVariance) / 2, 0, 100);

  const rawRiskLevel = riskFromScore(composite);
  const armWeakness =
    composite < RISK_THRESHOLDS.WATCH_MIN ||
    stabilityLeft < 65 ||
    stabilityRight < 65 ||
    raisePct < 60;
  const riskLevel = armWeakness && rawRiskLevel === 'low' ? 'medium' : rawRiskLevel;

  const parts = [];
  if (raisePct < 60) parts.push('Hai tay chưa giơ đủ cao');
  if (leftRightBalance < 70) parts.push('Chênh lệch độ cao hai tay');
  if (armDriftPct > 25) parts.push('Tay hạ dần khi giữ');
  if (movementVariance > 18) parts.push('Dao động khi giữ tư thế');
  if (!parts.length) parts.push('Tư thế giơ tay ổn định');

  return {
    success: true,
    realtime: true,
    frameCount: valid.length,
    stabilityLeft: Math.round(stabilityLeft),
    stabilityRight: Math.round(stabilityRight),
    overallBalance: Math.round(composite),
    leftRightBalance: Math.round(leftRightBalance),
    armDriftPct: Math.round(armDriftPct),
    movementVariance: Math.round(movementVariance),
    abnormalMotionPct: Math.round(abnormalMotionPct),
    raisePct: Math.round(raisePct),
    riskLevel,
    armWeakness,
    arm_weakness: armWeakness,
    label: armWeakness ? 'arm_weakness' : 'normal',
    message: parts.join('. ') + '.',
  };
}
