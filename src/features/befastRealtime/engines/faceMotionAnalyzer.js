import { clamp, riskFromScore } from '../utils/math';

const round1 = (value) => Math.round(value * 10) / 10;

function average(values) {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

function percentile(values, p) {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!sorted.length) return 0;
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.ceil(sorted.length * p) - 1));
  return sorted[idx];
}

function series(frames, ...keys) {
  return frames.map((frame) => {
    for (const key of keys) {
      const value = frame[key];
      if (Number.isFinite(value) && (value !== 0 || key === keys[keys.length - 1])) {
        return Number(value);
      }
    }
    return 0;
  });
}

export function analyzeFaceMotion(frames, minFrames = 30) {
  const valid = frames.filter(Boolean);
  if (valid.length < minFrames) {
    return {
      success: false,
      error: 'Không đủ dữ liệu khuôn mặt. Giữ mặt trong khung suốt bài test.',
      frameCount: valid.length,
    };
  }

  const deviations = series(valid, 'asymmetryScorePct', 'deviationPct');
  const mouthCorner = series(valid, 'mouthCornerDevPct', 'mouthDevPct', 'deviationPct');
  const mouthCenter = series(valid, 'mouthCenterOffsetPct');
  const mouthSide = series(valid, 'mouthSideBalancePct');
  const eyeDev = series(valid, 'eyeDevPct');
  const cheekDev = series(valid, 'cheekAsymmetryPct');

  const meanDev = average(deviations);
  const medianDev = percentile(deviations, 0.5);
  const p90Dev = percentile(deviations, 0.9);
  const p95Dev = percentile(deviations, 0.95);
  const maxDev = Math.max(...deviations);
  const p90Mouth = percentile(mouthCorner, 0.9);
  const medianMouth = percentile(mouthCorner, 0.5);
  const p90Center = percentile(mouthCenter, 0.9);
  const medianCenter = percentile(mouthCenter, 0.5);
  const p90Side = percentile(mouthSide, 0.9);
  const medianSide = percentile(mouthSide, 0.5);
  const p90Eye = percentile(eyeDev, 0.9);
  const p90Cheek = percentile(cheekDev, 0.9);

  const abnormalFrames = valid.filter(
    (f) =>
      f.isAbnormal ||
      (f.asymmetryScorePct ?? f.deviationPct ?? 0) > 3.2 ||
      (f.mouthCornerDevPct ?? f.mouthDevPct ?? 0) > 2.6 ||
      (f.mouthCenterOffsetPct ?? 0) > 3.4 ||
      (f.mouthSideBalancePct ?? 0) > 3.2
  ).length;
  const abnormalPct = (abnormalFrames / valid.length) * 100;

  const compositeDeviation = Math.max(
    p90Dev,
    p95Dev * 0.9,
    medianDev * 1.25,
    p90Mouth * 1.1,
    p90Center * 0.95,
    p90Side * 0.9
  );
  const sustainedMouthDroop = medianMouth > 1.8 && p90Mouth > 2.5;
  const centerShift = medianCenter > 2.2 && p90Center > 3.0;
  const sideAsymmetry = medianSide > 2.1 && p90Side > 3.0;
  const peakAsymmetry = p95Dev > 3.4 || maxDev > 4.5;

  const symmetryScore = clamp(100 - compositeDeviation * 12 - abnormalPct * 0.25, 0, 100);
  const stabilityScore = clamp(100 - clamp(p95Dev - medianDev, 0, 10) * 8 - abnormalPct * 0.1, 0, 100);
  const movementVariance = clamp(abnormalPct, 0, 100);
  const composite = clamp(symmetryScore * 0.6 + stabilityScore * 0.4, 0, 100);

  const rawRiskLevel = riskFromScore(composite);
  const isAbnormal =
    sustainedMouthDroop ||
    centerShift ||
    sideAsymmetry ||
    peakAsymmetry ||
    abnormalPct > 30;
  const riskLevel = isAbnormal && rawRiskLevel === 'low' ? 'medium' : rawRiskLevel;

  const parts = [];
  if (sustainedMouthDroop) parts.push(`Độ lệch khóe miệng ${p90Mouth.toFixed(1)}%`);
  if (centerShift) parts.push(`Tâm miệng lệch khỏi trục mặt ${p90Center.toFixed(1)}%`);
  if (sideAsymmetry) parts.push(`Vùng miệng/má mất cân đối ${p90Side.toFixed(1)}%`);
  if (peakAsymmetry) parts.push(`Bất đối xứng khuôn mặt ${p95Dev.toFixed(1)}%`);
  if (abnormalPct > 30) parts.push(`Bất đối xứng kéo dài ${Math.round(abnormalPct)}% thời lượng`);
  if (!parts.length) parts.push('Khuôn mặt cân đối theo thời gian');

  return {
    success: true,
    realtime: true,
    frameCount: valid.length,
    deviation_percentage: round1(compositeDeviation),
    max_deviation: round1(maxDev),
    mean_deviation: round1(meanDev),
    median_deviation: round1(medianDev),
    mouth_corner_deviation: round1(p90Mouth),
    mouth_center_offset: round1(p90Center),
    mouth_side_balance: round1(p90Side),
    eye_deviation: round1(p90Eye),
    cheek_asymmetry: round1(p90Cheek),
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
