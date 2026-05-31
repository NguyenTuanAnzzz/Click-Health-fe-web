import React, { useEffect, useState, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { EYES_TEST } from '../testConfigs';
import EyesTestDeviceSelect from './EyesTestDeviceSelect';
import EyesTestRound from './EyesTestRound';
import EyesResultsPanel from './results/EyesResultsPanel';

const DEVICE_CONFIG = {
  phone: {
    distance_cm: 50,
    distance_steps: 0,
    font_sizes: [60, 40, 25],
  },
  laptop: {
    distance_cm: 120,
    distance_steps: 2,
    font_sizes: [80, 55, 35],
  },
  monitor: {
    distance_cm: 180,
    distance_steps: 3,
    font_sizes: [100, 70, 45],
  },
};

const ALL_CHARS = 'ABCDEFGHJKLMNPQRTUVWXYZ'.split(''); // Exclude O, I, Z, S
const ALL_DIGITS = '346789'.split(''); // Exclude 0, 1, 2, 5

export default function RealtimeEyesTest({ onComplete }) {
  const [phase, setPhase] = useState('DEVICE_SELECT'); // DEVICE_SELECT, COUNTDOWN, ROUND, RESULTS
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceConfig, setDeviceConfig] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [countdownDuration, setCountdownDuration] = useState(10);
  const [currentRound, setCurrentRound] = useState(1);
  const [rounds, setRounds] = useState([]);
  const [results, setResults] = useState(null);

  const countdownIntervalRef = useRef(null);
  const roundCharactersRef = useRef([]);

  // Generate test characters (one per round)
  useEffect(() => {
    const chars = [];
    for (let i = 0; i < EYES_TEST.totalRounds; i++) {
      const isLetter = Math.random() > 0.5;
      const char = isLetter
        ? ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)]
        : ALL_DIGITS[Math.floor(Math.random() * ALL_DIGITS.length)];
      chars.push(char);
    }
    roundCharactersRef.current = chars;
  }, []);

  // Countdown logic
  useEffect(() => {
    if (phase !== 'COUNTDOWN') return;

    setCountdown(countdownDuration);
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          setPhase('ROUND');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownIntervalRef.current);
  }, [phase, countdownDuration]);

  const handleDeviceSelected = (device) => {
    setSelectedDevice(device);
    setDeviceConfig(DEVICE_CONFIG[device]);
    setCountdownDuration(10);
    setPhase('COUNTDOWN');
  };

  const generateMultipleChoice = (correctAnswer) => {
    const isLetter = /[A-Z]/.test(correctAnswer);
    const allOptions = isLetter ? ALL_CHARS : ALL_DIGITS;
    const incorrect = allOptions
      .filter((c) => c !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const options = [correctAnswer, ...incorrect].sort(() => Math.random() - 0.5);
    return options;
  };

  const handleRoundAnswer = (answer) => {
    const newRounds = [
      ...rounds,
      {
        roundNumber: answer.roundNumber,
        character: answer.correctAnswer,
        userAnswer: answer.userAnswer,
        isCorrect: answer.isCorrect,
      },
    ];
    setRounds(newRounds);

    if (currentRound < EYES_TEST.totalRounds) {
      setCurrentRound(currentRound + 1);
      setCountdownDuration(5); // 5 seconds countdown between rounds to walk back
      setPhase('COUNTDOWN');
    } else {
      // Calculate results
      const correctCount = newRounds.filter((r) => r.isCorrect).length;
      const resultData = evaluateResults(correctCount);
      setResults(resultData);
      setPhase('RESULTS');
    }
  };

  const evaluateResults = (correctCount) => {
    if (correctCount === 3) {
      return {
        success: true,
        correct_count: correctCount,
        total_count: EYES_TEST.totalRounds,
        score_percentage: 100,
        level: 'Good',
        label: 'Thị lực Tốt',
        description: 'Bạn có thể nhìn thấy các ký tự nhỏ ở khoảng cách tiêu chuẩn. Thị lực hoàn toàn bình thường.',
        should_see_doctor: false,
        risk_level: 'low',
        message: 'Bạn có thể nhìn thấy các ký tự nhỏ ở khoảng cách tiêu chuẩn. Thị lực hoàn toàn bình thường.',
        disclaimer: 'Đây là bài kiểm tra sàng lọc sơ bộ, không thay thế cho việc khám mắt chuyên khoa tại cơ sở y tế.',
      };
    } else if (correctCount === 2) {
      return {
        success: true,
        correct_count: correctCount,
        total_count: EYES_TEST.totalRounds,
        score_percentage: (correctCount / 3) * 100,
        level: 'Intermediate',
        label: 'Thị lực Trung bình',
        description:
          'Bạn có thể gặp hiện tượng mờ mắt khi quan sát ở cự ly xa. Khuyên dùng theo dõi thêm.',
        should_see_doctor: false,
        risk_level: 'medium',
        message: 'Bạn có thể gặp hiện tượng mờ mắt khi quan sát ở cự ly xa. Khuyên dùng theo dõi thêm.',
        disclaimer: 'Đây là bài kiểm tra sàng lọc sơ bộ, không thay thế cho việc khám mắt chuyên khoa tại cơ sở y tế.',
      };
    } else {
      return {
        success: true,
        correct_count: correctCount,
        total_count: EYES_TEST.totalRounds,
        score_percentage: (correctCount / 3) * 100,
        level: 'Weak',
        label: 'Thị lực Yếu',
        description:
          'Bạn gặp khó khăn lớn khi quan sát các ký tự nhỏ ở khoảng cách tiêu chuẩn.',
        should_see_doctor: true,
        risk_level: 'high',
        message: 'Bạn gặp khó khăn lớn khi quan sát các ký tự nhỏ ở khoảng cách tiêu chuẩn.',
        disclaimer: 'Đây là bài kiểm tra sàng lọc sơ bộ, không thay thế cho việc khám mắt chuyên khoa tại cơ sở y tế.',
      };
    }
  };

  const handleRetry = () => {
    setCurrentRound(1);
    setRounds([]);
    setResults(null);
    setCountdownDuration(10);
    setPhase('COUNTDOWN');
  };

  // Device Select Phase
  if (phase === 'DEVICE_SELECT') {
    return <EyesTestDeviceSelect onDeviceSelected={handleDeviceSelected} config={DEVICE_CONFIG} />;
  }

  // Countdown Phase
  if (phase === 'COUNTDOWN') {
    const isNextRound = currentRound > 1;
    return (
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] rounded-[28px] p-8 max-w-4xl mx-auto shadow-lg border border-[#e5e7eb]/50 flex flex-col items-center justify-center min-h-96 text-center font-inter-tight-small">
        <h2 className="text-2xl font-bold text-black mb-4">
          {isNextRound
            ? `Hãy quay trở lại vị trí cũ để chuẩn bị Vòng ${currentRound}!`
            : `Di chuyển về vị trí kiểm tra (~${deviceConfig?.distance_cm}cm)`}
        </h2>
        <div className="text-7xl font-bold text-[#2ecea0] mb-6 animate-pulse">{countdown}</div>
        <p className="text-[#6b7280] text-[16px] font-medium max-w-md">
          {deviceConfig?.distance_steps > 0
            ? `Vui lòng lùi lại khoảng ${deviceConfig?.distance_steps} bước chân để bắt đầu.`
            : 'Giữ thiết bị ở khoảng cách một cánh tay.'}
        </p>
      </div>
    );
  }

  // Round Phase
  if (phase === 'ROUND') {
    const character = roundCharactersRef.current[currentRound - 1];
    const fontSize = deviceConfig.font_sizes[currentRound - 1];
    const options = generateMultipleChoice(character);

    return (
      <EyesTestRound
        key={currentRound}
        roundNumber={currentRound}
        totalRounds={EYES_TEST.totalRounds}
        character={character}
        fontSize={fontSize}
        options={options}
        onAnswer={handleRoundAnswer}
        config={EYES_TEST}
      />
    );
  }

  // Results Phase
  if (phase === 'RESULTS' && results) {
    return (
      <EyesResultsPanel
        result={results}
        onRetry={handleRetry}
        onContinue={() => onComplete(results)}
      />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-96">
      <Loader2 className="animate-spin text-[#2ecea0]" size={40} />
    </div>
  );
}
