const getBaseUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  return 'https://click-health-be.onrender.com';
};

const getAiBaseUrl = () => {
  if (process.env.REACT_APP_AI_API_URL) {
    return process.env.REACT_APP_AI_API_URL;
  }
  return 'http://localhost:8000';
};

const normalizeBaseUrl = (url) => (url?.endsWith('/') ? url.slice(0, -1) : url);

const API_URL = `${normalizeBaseUrl(getBaseUrl())}/api`;
export const AI_API_URL = normalizeBaseUrl(getAiBaseUrl());

console.log('[API_CONFIG] API_URL =', API_URL);
console.log('[API_CONFIG] AI_API_URL =', AI_API_URL);

export default API_URL;