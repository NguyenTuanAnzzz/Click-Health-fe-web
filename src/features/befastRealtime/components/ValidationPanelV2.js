import { Check, AlertCircle } from 'lucide-react';

const LABELS = {
  person: { label: 'Người', icon: '👤' },
  arms: { label: 'Tay / Thân', icon: '💪' },
  distance: { label: 'Khoảng cách', icon: '📏' },
  lighting: { label: 'Ánh sáng', icon: '💡' },
  stable: { label: 'Ổn định', icon: '⚖️' },
};

export default function ValidationPanelV2({ validation, validationReady }) {
  if (!validation) return null;

  const passedCount = Object.entries(LABELS).filter(([key]) => validation.checks?.[key]).length;
  const totalCount = Object.keys(LABELS).length;
  const progress = Math.round((passedCount / totalCount) * 100);

  return (
    <div className="space-y-4 mb-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-[#374151]">Kiểm tra khung hình</span>
          <span className="text-xs font-bold text-[#6b7280]">{passedCount}/{totalCount}</span>
        </div>
        <div className="h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#7AB5E9] to-[#5CA5E4] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Validation Checks Grid */}
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(LABELS).map(([key, { label, icon }]) => {
          const ok = validation.checks?.[key];
          return (
            <div
              key={key}
              className={`flex flex-col items-center justify-center p-3 rounded-[12px] transition-all duration-300 ${
                ok
                  ? 'bg-gradient-to-br from-[#d1fae5] to-[#a7f3d0] border border-[#6ee7b7]'
                  : 'bg-[#f3f4f6] border border-[#e5e7eb]'
              }`}
            >
              <div className="text-xl mb-1">{icon}</div>
              {ok ? (
                <Check size={16} className="text-[#059669] mb-1" strokeWidth={3} />
              ) : (
                <div className="w-4 h-4 rounded-full bg-[#d1d5db] mb-1" />
              )}
              <p className={`text-[10px] font-bold text-center ${ok ? 'text-[#047857]' : 'text-[#6b7280]'}`}>
                {label}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
