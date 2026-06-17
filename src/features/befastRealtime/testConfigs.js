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
  guideImage: '/arm-guide.png',
  guideTitle: 'Tư thế kiểm tra vận động tay',
  guideMain: 'Giơ hai tay ngang vai và giữ thật yên',
  guideSteps: [
    'Đứng thẳng trước camera, để camera thấy rõ hai tay và phần thân trên.',
    'Giơ hai tay sang ngang bằng vai, duỗi thẳng khuỷu tay và giữ hai bàn tay cùng độ cao.',
    'Bấm bắt đầu rồi giữ nguyên tư thế trong 10 giây, không hạ tay hoặc nghiêng người.',
  ],
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
    'Đứng một chân, nhắm mắt và chống hai tay lên hông. Giữ yên trong 8 giây để AI đo độ lắc và mất cân bằng.',
  recordingBanner: 'ĐANG GHI — ĐỨNG MỘT CHÂN, GIỮ THĂNG BẰNG',
  prepHint: 'Đứng gần tường hoặc ghế để bám khi cần. Lùi xa để camera thấy rõ từ đầu đến hông.',
  guideImage: '/balance-guide.png',
  guideTitle: 'Tư thế kiểm tra thăng bằng',
  guideMain: 'Đứng một chân, nhắm mắt, hai tay chống hông',
  guideSteps: [
    'Chọn nơi bằng phẳng, đứng gần tường hoặc ghế để đảm bảo an toàn.',
    'Chống hai tay lên hông, nhấc một chân lên và giữ thân người thẳng.',
    'Nhắm mắt sau khi đã ổn định tư thế, rồi bấm bắt đầu và giữ yên 8 giây.',
  ],
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
  guideImage: '/face-guide.png',
  guideTitle: 'Tư thế kiểm tra cơ mặt',
  guideMain: 'Nhìn thẳng vào camera ',
  guideSteps: [
    'Đưa khuôn mặt vào giữa khung hình, đủ sáng và không che mắt hoặc miệng.',
    'Giữ đầu thẳng, nhìn vào camera, cười hoặc nhe răng rõ để AI đo độ cân đối.',
    'Giữ biểu cảm ổn định trong 5 giây cho đến khi hệ thống phân tích xong.',
  ],
};

export const SPEECH_TEST = {
  id: 'speech',
  title: 'S - Speech',
  step: 'Bước 5/5',
  targetPhrase: 'mẹ đi chợ mua cá',
  listenSec: 8,
  countdownSec: 3,
};
