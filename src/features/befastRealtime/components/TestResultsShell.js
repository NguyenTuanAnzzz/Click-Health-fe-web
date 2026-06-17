import { AlertTriangle, CheckCircle, ChevronRight, RefreshCw } from 'lucide-react';

const RISK = {
  low: { title: 'Nguy cơ thấp', box: 'bg-green-50 border-green-200 text-green-800', Icon: CheckCircle, ic: 'text-[#7AB5E9]' },
  medium: { title: 'Cần theo dõi', box: 'bg-amber-50 border-amber-200 text-amber-900', Icon: AlertTriangle, ic: 'text-amber-500' },
  high: { title: 'Phát hiện bất thường', box: 'bg-red-50 border-red-200 text-red-800', Icon: AlertTriangle, ic: 'text-[#d32f2f]' },
};

function isAbnormalResult(result) {
  if (!result) return false;
  return Boolean(
    (result.label && result.label !== 'normal') ||
      result.armWeakness ||
      result.arm_weakness ||
      result.balance_issue ||
      result.speech_issue ||
      result.is_abnormal ||
      result.should_see_doctor
  );
}

function hasHighRiskMetric(result) {
  if (!result) return false;
  return Boolean(
    (result.stabilityScore != null && result.stabilityScore < 65) ||
      (result.stabilityLeft != null && result.stabilityLeft < 65) ||
      (result.stabilityRight != null && result.stabilityRight < 65) ||
      (result.overallBalance != null && result.overallBalance < 65) ||
      (result.deviation_percentage != null && result.deviation_percentage > 3.5) ||
      (result.correct_count != null && result.correct_count < 2)
  );
}

function getDisplayRiskLevel(result) {
  if (result?.riskLevel === 'high' || hasHighRiskMetric(result)) return 'high';
  if (result?.riskLevel === 'medium' || isAbnormalResult(result)) return 'medium';
  return 'low';
}

export default function TestResultsShell({ result, onRetry, onContinue, continueLabel, children }) {
  const displayRiskLevel = getDisplayRiskLevel(result);
  const r = RISK[displayRiskLevel] || RISK.low;
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
        <button type="button" onClick={onRetry} className="flex items-center gap-2 border border-[#e5e7eb] px-6 py-3 rounded-full text-[13px] font-bold text-[#1F75C1]">
          <RefreshCw size={14} /> Test lại
        </button>
        <button type="button" onClick={onContinue} className="flex items-center gap-2 bg-[#7AB5E9] text-white px-8 py-3 rounded-full text-[13px] font-bold">
          {continueLabel || 'Tiếp tục'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
