import React from 'react';
import { CheckCircle2, AlertCircle, Eye } from 'lucide-react';

export default function EyesResultsPanel({ result, onRetry, onContinue }) {
  const isGood = result.level === 'Good';
  const isIntermediate = result.level === 'Intermediate';
  const isWeak = result.level === 'Weak';

  const getLevelColor = () => {
    if (isGood) return 'text-green-600';
    if (isIntermediate) return 'text-amber-600';
    return 'text-red-600';
  };

  const getBgColor = () => {
    if (isGood) return 'bg-green-50 border-green-300';
    if (isIntermediate) return 'bg-amber-50 border-amber-300';
    return 'bg-red-50 border-red-300';
  };

  const getIcon = () => {
    if (isGood) return <CheckCircle2 size={32} className="text-green-600" />;
    if (isIntermediate) return <AlertCircle size={32} className="text-amber-600" />;
    return <AlertCircle size={32} className="text-red-600" />;
  };

  return (
    <div className="bg-gradient-to-br from-white to-[#f8f9fa] rounded-[28px] p-8 max-w-4xl mx-auto shadow-lg border border-[#e5e7eb]/50 font-inter-tight-small">
      {/* Header */}
      <div className="mb-8">
        <span className="bg-[#1F75C1]/10 text-[#1F75C1] border border-[#1F75C1]/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block mb-4">
          Kết quả kiểm tra thị lực
        </span>
        <h2 className="text-2xl font-bold text-black flex items-center gap-2.5">
          <Eye size={28} className="text-[#7AB5E9]" />
          Đánh giá thị lực của bạn
        </h2>
      </div>

      {/* Score Card */}
      <div className={`border-2 rounded-[20px] p-8 mb-8 ${getBgColor()}`}>
        <div className="flex items-center gap-4 mb-6">
          {getIcon()}
          <div>
            <h3 className={`text-[24px] font-bold ${getLevelColor()}`}>
              {result.label}
            </h3>
            <p className="text-[#6b7280] text-[14px] mt-1">
              Điểm số: {result.correct_count}/{result.total_count} ({result.score_percentage.toFixed(0)}%)
            </p>
          </div>
        </div>

        <p className="text-[14px] text-[#374151] font-medium mb-4">
          {result.description}
        </p>

        {result.should_see_doctor && (
          <div className="bg-white/50 border border-current rounded-[12px] p-3 text-[13px] font-semibold">
            ⚕️ Bạn nên đi khám bác sĩ chuyên khoa mắt để có kết quả chẩn đoán chính xác hơn.
          </div>
        )}
      </div>

      {/* Detailed Results */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-4">
          <p className="text-[#6b7280] text-[12px] font-semibold mb-2">Trả lời chính xác</p>
          <p className="text-[28px] font-bold text-[#7AB5E9]">
            {result.correct_count}/{result.total_count}
          </p>
        </div>
        <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-4">
          <p className="text-[#6b7280] text-[12px] font-semibold mb-2">Mức độ rủi ro</p>
          <p
            className={`text-[28px] font-bold ${
              result.risk_level === 'low'
                ? 'text-green-600'
                : result.risk_level === 'medium'
                ? 'text-amber-600'
                : 'text-red-600'
            }`}
          >
            {result.risk_level === 'low'
              ? 'Thấp'
              : result.risk_level === 'medium'
              ? 'Trung bình'
              : 'Cao'}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-[#f3f4f6] border border-[#d1d5db] rounded-[16px] p-4 mb-8">
        <p className="text-[12px] text-[#6b7280] italic">
          ⓘ {result.disclaimer}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-between">
        <button
          onClick={onRetry}
          className="px-8 py-3 rounded-full font-bold text-[#7AB5E9] bg-[#7AB5E9]/10 border border-[#7AB5E9]/30 hover:bg-[#7AB5E9]/20 transition-all duration-300"
        >
          Kiểm tra lại
        </button>
        <button
          onClick={onContinue}
          className="px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-[#7AB5E9] to-[#5CA5E4] hover:shadow-lg transition-all duration-300"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
