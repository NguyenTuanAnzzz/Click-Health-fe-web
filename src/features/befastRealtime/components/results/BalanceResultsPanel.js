import TestResultsShell from '../TestResultsShell';
import ScoreBar from '../ScoreBar';

export default function BalanceResultsPanel({ result, onRetry, onContinue }) {
  return (
    <TestResultsShell result={result} onRetry={onRetry} onContinue={onContinue}>
      <ScoreBar label="Điểm thăng bằng" value={result.stabilityScore} />
      <ScoreBar label="Cân bằng trái / phải" value={result.leftRightBalance} />
      <ScoreBar label="Ổn định tổng thể" value={result.overallBalance} />
      <div className="grid grid-cols-2 gap-3 mt-4">
        <MetricCard label="Lắc người" value={`${result.swayPct}%`} />
        <MetricCard label="Nghiêng vai" value={`${result.tiltPct}%`} />
        <MetricCard label="Variance" value={`${result.movementVariance}%`} />
        <MetricCard label="Drift" value={`${result.bodyDriftPct}%`} />
      </div>
    </TestResultsShell>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="bg-[#f0f1f2] rounded-xl p-4 border border-[#e5e7eb]">
      <p className="text-[10px] font-bold text-[#858585] uppercase">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
