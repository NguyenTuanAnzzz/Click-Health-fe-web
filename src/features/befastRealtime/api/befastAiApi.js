import axios from 'axios';
import API_URL, { AI_API_URL } from '../../../constants/apiConfig';

const USE_BE_PROXY = process.env.REACT_APP_BEFAST_AI_PROXY === 'true';

/**
 * Gọi Ai-Click-Health realtime API.
 * REACT_APP_BEFAST_AI_PROXY=true → qua Click-Health-be (/api/history/realtime/:type)
 */
async function postAnalyze(testType, body) {
  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  if (USE_BE_PROXY && token) {
    const { data } = await axios.post(
      `${API_URL}/history/realtime/${testType}`,
      body,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  }

  const { data } = await axios.post(
    `${AI_API_URL}/v1/realtime/analyze/${testType}`,
    body,
    { headers: { 'Content-Type': 'application/json' }, timeout: 30000 }
  );
  return data;
}

export async function analyzeArmOnServer(frames, minFrames = 45) {
  return postAnalyze('arm', { frames, min_frames: minFrames });
}

export async function analyzeBalanceOnServer(frames, minFrames = 45) {
  return postAnalyze('balance', { frames, min_frames: minFrames });
}

export async function analyzeFaceOnServer(frames, minFrames = 30) {
  return postAnalyze('face', { frames, min_frames: minFrames });
}

export async function analyzeSpeechOnServer(transcript, durationMs) {
  return postAnalyze('speech', {
    transcript,
    duration_ms: durationMs,
    confidence: 1,
  });
}

/**
 * Ưu tiên server; fallback phân tích local khi offline.
 */
export async function hybridAnalyze(localFn, serverFn, frames, minFrames) {
  const local = localFn(frames, minFrames);
  try {
    const server = await serverFn(frames, minFrames);
    if (server?.success) {
      return { ...server, analysisSource: 'server' };
    }
  } catch (err) {
    console.warn('[BEFAST] Server AI unavailable, using local.', err?.message);
  }
  return { ...local, analysisSource: 'local' };
}
