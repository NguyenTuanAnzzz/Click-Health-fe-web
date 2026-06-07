export default function ScoreBar({ label, value }) {
  const isLow = value < 65;
  const isMid = value >= 65 && value < 80;
  const color = isLow ? 'bg-[#d32f2f]' : isMid ? 'bg-amber-400' : 'bg-[#7AB5E9]';
  const textColor = isLow ? 'text-[#d32f2f]' : isMid ? 'text-amber-600' : 'text-[#7AB5E9]';

  return (
    <div className="mb-4 font-inter-tight-small">
      <div className="flex justify-between mb-1.5">
        <span className="text-[13px] font-bold text-black">{label}</span>
        <span className={`text-lg font-bold ${textColor}`}>{value}%</span>
      </div>
      <div className="w-full h-2.5 bg-[#f0f1f2] rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${Math.min(100, value)}%` }} />
      </div>
    </div>
  );
}
