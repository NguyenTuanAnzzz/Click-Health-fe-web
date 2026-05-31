import { SHARED_CONFIG } from './constants';

export const ARM_TEST = {
  id: 'arm',
  recordingSec: 10,
  countdownSec: SHARED_CONFIG.COUNTDOWN_SEC,
  validationStableMs: SHARED_CONFIG.VALIDATION_STABLE_MS,
  minFrames: SHARED_CONFIG.MIN_FRAMES,
  validationMode: 'arm',
  title: 'A - Arm Stability',
  step: 'Bước 4/5',
  description:
    'Giơ hai tay ngang vai và giữ yên trong 10 giây. AI theo dõi chuyển động realtime.',
  recordingBanner: 'ĐANG GHI — GIỮ HAI TAY NGANG VAI',
  prepHint: 'Đảm bảo thấy rõ hai tay và phần thân trên trong khung hình.',
};

export const BALANCE_TEST = {
  id: 'balance',
  recordingSec: 8,
  countdownSec: SHARED_CONFIG.COUNTDOWN_SEC,
  validationStableMs: SHARED_CONFIG.VALIDATION_STABLE_MS,
  minFrames: SHARED_CONFIG.MIN_FRAMES,
  validationMode: 'balance',
  title: 'B - Balance',
  step: 'Bước 1/5',
  description:
    'Đứng thẳng, hai chân rộng bằng vai, giữ yên trong 8 giây. AI đo độ lắc và mất cân bằng.',
  recordingBanner: 'ĐANG GHI — ĐỨNG YÊN, GIỮ THĂNG BẰNG',
  prepHint: 'Lùi xa để camera thấy từ đầu đến hông.',
  cameraFacing: 'user',
};

export const EYES_TEST = {
  id: 'eyes',
  title: 'E - Kiểm tra Thị lực',
  step: 'Bước 2/5',
  description: 'Kiểm tra thị lực: Quan sát các ký tự xuất hiện ở khoảng cách quy định.',
  totalRounds: 3,
  displayDurationMs: 3500,
  questionDurationMs: 5000,
  countdownSec: 10,
};

export const FACE_TEST = {
  id: 'face',
  recordingSec: 5,
  countdownSec: SHARED_CONFIG.COUNTDOWN_SEC,
  validationStableMs: SHARED_CONFIG.VALIDATION_STABLE_MS,
  minFrames: 30,
  title: 'F - Face',
  step: 'Bước 3/5',
  description:
    'Cười hoặc nhe răng trong 5 giây. AI phân tích độ cân đối khuôn mặt theo thời gian.',
  recordingBanner: 'ĐANG GHI — CƯỜI HOẶC NHE RĂNG',
  prepHint: 'Đưa khuôn mặt vào giữa khung hình.',
};

export const SPEECH_TEST = {
  id: 'speech',
  title: 'S - Speech',
  step: 'Bước 5/5',
  targetPhrase: 'mẹ đi chợ mua cá',
  listenSec: 8,
  countdownSec: 3,
};
