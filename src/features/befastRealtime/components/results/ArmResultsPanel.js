import TestResultsShell from '../TestResultsShell';
import ScoreBar from '../ScoreBar';

export default function ArmResultsPanel({ result, onRetry, onContinue }) {
  return (
    <TestResultsShell result={result} onRetry={onRetry} onContinue={onContinue}>
      <ScoreBar label="Tay trái ổn định" value={result.stabilityLeft} />
      <ScoreBar label="Tay phải ổn định" value={result.stabilityRight} />
      <ScoreBar label="Cân bằng trái / phải" value={result.leftRightBalance} />
      <ScoreBar label="Ổn định tổng thể" value={result.overallBalance} />
      <div className="grid grid-cols-2 gap-3 mt-4">
        <MetricCard label="Giơ đủ cao" value={`${result.raisePct ?? '-'}%`} />
        <MetricCard label="Tay hạ dần" value={`${result.armDriftPct ?? '-'}%`} />
        <MetricCard label="Dao động" value={`${result.movementVariance ?? '-'}%`} />
        <MetricCard label="Bất thường" value={`${result.abnormalMotionPct ?? '-'}%`} />
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
