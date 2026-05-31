import TestResultsShell from '../TestResultsShell';
import ScoreBar from '../ScoreBar';

export default function FaceResultsPanel({ result, onRetry, onContinue }) {
  return (
    <TestResultsShell result={result} onRetry={onRetry} onContinue={onContinue}>
      <ScoreBar label="Độ cân đối (symmetry)" value={result.symmetryScore} />
      <ScoreBar label="Ổn định theo thời gian" value={result.stabilityScore} />
      <ScoreBar label="Điểm tổng thể" value={result.overallBalance} />
      <div className="bg-white p-3 rounded-lg border border-[#e5e7eb] mt-2">
        <p className="text-[11px] text-[#858585] font-semibold">
          Độ lệch tối đa: <strong className="text-black">{result.deviation_percentage}%</strong>
          {' '}(ngưỡng &gt;3.5%)
        </p>
      </div>
    </TestResultsShell>
  );
}
