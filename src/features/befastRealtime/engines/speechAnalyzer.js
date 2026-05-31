import { SPEECH_TARGET } from '../constants';
import { clamp, riskFromScore } from '../utils/math';

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\sàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/gi, '')
    .trim();
}

function similarity(a, b) {
  const na = normalize(a);
  const nb = normalize(b);
  if (!na || !nb) return 0;
  if (nb.includes(na) || na.includes(nb)) return 100;
  const wordsA = na.split(/\s+/);
  const wordsB = new Set(nb.split(/\s+/));
  const hit = wordsA.filter((w) => wordsB.has(w)).length;
  return clamp((hit / wordsA.length) * 100, 0, 100);
}

export function analyzeSpeech({ transcript, durationMs, confidence = 1 }) {
  const matchPct = similarity(transcript, SPEECH_TARGET);
  const durationSec = durationMs / 1000;
  const wpm = transcript.split(/\s+/).filter(Boolean).length / Math.max(durationSec / 60, 0.1);
  const speedScore =
    wpm >= 80 && wpm <= 200 ? 100 : wpm < 80 ? clamp(wpm, 40, 100) : clamp(200 - (wpm - 200), 50, 100);
  const clarityScore = clamp(matchPct * 0.7 + speedScore * 0.15 + confidence * 100 * 0.15, 0, 100);

  const speechIssue = matchPct < 70 || clarityScore < 65;
  const riskLevel = riskFromScore(clarityScore);

  return {
    success: true,
    realtime: true,
    recognized_text: transcript,
    target_phrase: SPEECH_TARGET,
    matchPct: Math.round(matchPct),
    clarityScore: Math.round(clarityScore),
    overallBalance: Math.round(clarityScore),
    speech_issue: speechIssue,
    label: speechIssue ? 'speech_abnormal' : 'normal',
    riskLevel,
    message: speechIssue
      ? `Khớp câu mẫu ${Math.round(matchPct)}%. Có dấu hiệu nói không rõ hoặc sai cụm từ.`
      : 'Giọng nói và nội dung đọc trong ngưỡng bình thường.',
  };
}
