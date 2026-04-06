interface ProgressBarProps {
  value: number;
}

export function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className="w-full h-1 rounded-full mb-8 overflow-hidden bg-white/10">
      <div
        className="h-full rounded-full transition-all duration-700 shadow-[0_0_10px_var(--dg-cyan)]"
        style={{
          width: `${value}%`,
          background: "var(--accent-gradient)",
        }}
      />
    </div>
  );
}
