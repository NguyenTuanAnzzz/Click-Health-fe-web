import { AlertTriangle, CheckCircle, ChevronRight, RefreshCw } from 'lucide-react';

const RISK = {
  low: { title: 'Nguy cơ thấp', box: 'bg-green-50 border-green-200 text-green-800', Icon: CheckCircle, ic: 'text-[#2ecea0]' },
  medium: { title: 'Cần theo dõi', box: 'bg-amber-50 border-amber-200 text-amber-900', Icon: AlertTriangle, ic: 'text-amber-500' },
  high: { title: 'Nguy cơ cao', box: 'bg-red-50 border-red-200 text-red-800', Icon: AlertTriangle, ic: 'text-[#d32f2f]' },
};

export default function TestResultsShell({ result, onRetry, onContinue, continueLabel, children }) {
  const r = RISK[result.riskLevel] || RISK.low;
  const Icon = r.Icon;

  return (
    <div className="font-inter-tight-small">
      <div className={`rounded-[20px] border p-5 mb-6 flex gap-4 ${r.box}`}>
        <Icon size={28} className={`shrink-0 ${r.ic}`} />
        <div>
          <h3 className="text-lg font-bold font-inter mb-1">{r.title}</h3>
          <p className="text-[13px] font-semibold">{result.message}</p>
        </div>
      </div>
      {children}
      <div className="flex flex-wrap gap-3 justify-end mt-8">
        <button type="button" onClick={onRetry} className="flex items-center gap-2 border border-[#e5e7eb] px-6 py-3 rounded-full text-[13px] font-bold text-[#244d54]">
          <RefreshCw size={14} /> Test lại
        </button>
        <button type="button" onClick={onContinue} className="flex items-center gap-2 bg-[#2ecea0] text-white px-8 py-3 rounded-full text-[13px] font-bold">
          {continueLabel || 'Tiếp tục'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
