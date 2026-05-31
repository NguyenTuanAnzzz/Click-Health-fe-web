export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export function linearSlope(values) {
  const n = values.length;
  if (n < 2) return 0;
  const meanX = (n - 1) / 2;
  const meanY = values.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (i - meanX) * (values[i] - meanY);
    den += (i - meanX) ** 2;
  }
  return den === 0 ? 0 : num / den;
}

export function std(values) {
  if (values.length < 2) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  return Math.sqrt(
    values.reduce((acc, v) => acc + (v - mean) ** 2, 0) / values.length
  );
}

export function detrend(values) {
  const slope = linearSlope(values);
  return values.map((v, i) => v - slope * i);
}

export function riskFromScore(score) {
  if (score < 65) return 'high';
  if (score < 80) return 'medium';
  return 'low';
}
