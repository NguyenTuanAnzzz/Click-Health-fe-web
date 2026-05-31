import { Check, X } from 'lucide-react';

const LABELS = {
  person: 'Người',
  arms: 'Tay / Thân',
  distance: 'Khoảng cách',
  lighting: 'Ánh sáng',
  stable: 'Ổn định',
};

export default function ValidationPanel({ validation, validationReady }) {
  if (!validation) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-3 font-inter-tight-small">
      {Object.entries(LABELS).map(([key, label]) => {
        const ok = validation.checks?.[key];
        return (
          <span
            key={key}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border ${
              ok
                ? 'bg-[#2ecea0]/10 text-[#2ecea0] border-[#2ecea0]/25'
                : 'bg-red-50 text-[#d32f2f] border-red-100'
            }`}
          >
            {ok ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
            {label}
          </span>
        );
      })}
      {validationReady && (
        <span className="inline-flex px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#244d54]/10 text-[#244d54] border border-[#244d54]/20">
          Sẵn sàng
        </span>
      )}
    </div>
  );
}
