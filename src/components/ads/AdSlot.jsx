export function AdSlot({ label, className = "", compact = false }) {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-[1.25rem] border border-white/8 bg-[color:var(--surface-panel)]/75 px-4 text-center text-[color:var(--text-muted)] shadow-[0_14px_36px_rgba(0,0,0,0.2)] backdrop-blur-xl ${
        compact ? "h-12 text-[11px]" : "h-16 text-sm"
      } ${className}`.trim()}
    >
      <span className="uppercase tracking-[0.28em]">{label}</span>
    </div>
  );
}
