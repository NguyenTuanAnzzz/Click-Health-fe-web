import TestResultsShell from '../TestResultsShell';
import ScoreBar from '../ScoreBar';

export default function FaceResultsPanel({ result, onRetry, onContinue }) {
  return (
    <TestResultsShell result={result} onRetry={onRetry} onContinue={onContinue}>
      <ScoreBar label="Độ cân đối khuôn mặt" value={result.symmetryScore} />
      <ScoreBar label="Ổn định theo thời gian" value={result.stabilityScore} />
      <ScoreBar label="Điểm tổng thể" value={result.overallBalance} />
      <div className="grid grid-cols-2 gap-3 mt-4">
        <MetricCard label="Lệch tổng hợp" value={`${result.deviation_percentage ?? '-'}%`} />
        <MetricCard label="Lệch tối đa" value={`${result.max_deviation ?? '-'}%`} />
        <MetricCard label="Khóe miệng" value={`${result.mouth_corner_deviation ?? '-'}%`} />
        <MetricCard label="Tâm miệng" value={`${result.mouth_center_offset ?? '-'}%`} />
        <MetricCard label="Cân đối miệng/má" value={`${result.mouth_side_balance ?? '-'}%`} />
        <MetricCard label="Frame bất thường" value={`${result.abnormalMotionPct ?? '-'}%`} />
      </div>
      <div className="bg-white p-3 rounded-lg border border-[#e5e7eb] mt-4">
        <p className="text-[11px] text-[#858585] font-semibold">
          Ngưỡng tham chiếu: khóe miệng &gt;2.5%, tâm miệng &gt;3.0%, hoặc bất đối xứng kéo dài qua nhiều frame.
        </p>
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
