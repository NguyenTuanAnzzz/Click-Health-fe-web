import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

export default function EyesTestRound({
  roundNumber,
  totalRounds,
  character,
  fontSize,
  options,
  onAnswer,
  config
}) {
  const [showCharacter, setShowCharacter] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // Show character for 3-4 seconds, then hide
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCharacter(false);
    }, config.displayDurationMs || 3500);

    return () => clearTimeout(timer);
  }, [config.displayDurationMs]);

  const handleAnswerClick = (option) => {
    if (selectedAnswer) return; // Prevent multiple answers
    
    setSelectedAnswer(option);
    const isCorrectAnswer = option === character;
    setIsCorrect(isCorrectAnswer);
    
    if (isCorrectAnswer) {
      setFeedback('Chính xác ✓');
    } else {
      setFeedback(`Chưa chính xác ✗ — Đáp án đúng là: ${character}`);
    }

    // Auto proceed after 2 seconds
    setTimeout(() => {
      onAnswer({
        roundNumber,
        userAnswer: option,
        correctAnswer: character,
        isCorrect: isCorrectAnswer
      });
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-white to-[#f8f9fa] rounded-[28px] p-8 max-w-4xl mx-auto shadow-lg border border-[#e5e7eb]/50">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-[#6b7280] font-semibold text-[14px]">
          Vòng {roundNumber} / {totalRounds}
        </span>
        <div className="flex gap-2">
          {Array.from({ length: totalRounds }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i < roundNumber
                  ? 'bg-[#7AB5E9]'
                  : i === roundNumber - 1
                  ? 'bg-[#3b82f6]'
                  : 'bg-[#e5e7eb]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Character Display Area */}
      {showCharacter ? (
        <div className="flex items-center justify-center bg-gradient-to-br from-[#f8f9fa] to-white rounded-[24px] border-2 border-[#e5e7eb] py-24 mb-8">
          <div
            style={{ fontSize: `${fontSize}px` }}
            className="font-bold text-black font-sans"
          >
            {character}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-gradient-to-br from-white to-[#f8f9fa] rounded-[24px] border-2 border-[#e5e7eb] py-24 mb-8">
          <div className="text-center">
            <h3 className="text-[20px] font-bold text-black mb-4">Bạn vừa quan sát thấy ký tự nào?</h3>
            <p className="text-[#6b7280]">Chọn đáp án của bạn dưới đây</p>
          </div>
        </div>
      )}

      {/* Question and Options */}
      {!showCharacter && (
        <>
          <h2 className="text-center text-[18px] font-bold text-black mb-6">
            Bạn vừa quan sát thấy ký tự nào?
          </h2>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
                className={`py-6 rounded-[16px] border-2 font-bold text-[18px] transition-all duration-300 ${
                  selectedAnswer === option
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-red-500 bg-red-50 text-red-700'
                    : selectedAnswer
                    ? 'border-[#e5e7eb] bg-[#f3f4f6] text-[#9ca3af] opacity-50 cursor-not-allowed'
                    : 'border-[#e5e7eb] bg-white hover:border-[#3b82f6] hover:bg-[#3b82f6]/5'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`flex items-center gap-3 p-4 rounded-[16px] ${
                isCorrect
                  ? 'bg-green-50 border border-green-300'
                  : 'bg-red-50 border border-red-300'
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 size={20} className="text-green-600" />
              ) : (
                <XCircle size={20} className="text-red-600" />
              )}
              <span
                className={`font-semibold text-[14px] ${
                  isCorrect ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {feedback}
              </span>
            </div>
          )}

          {/* Loading indicator */}
          {selectedAnswer && (
            <div className="flex items-center justify-center mt-6 gap-2 text-[#6b7280]">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-[12px]">Chuẩn bị di chuyển về vị trí cũ...</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
