export function KpiCard({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string | number;
  sublabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--paper-line)] bg-[var(--paper-soft)] p-5">
      <p className="font-mono text-[0.68rem] uppercase tracking-widest text-[var(--muted-on-paper)]">
        {label}
      </p>
      <p className="font-display mt-2 text-3xl text-[var(--ink-text)]">{value}</p>
      {sublabel && <p className="mt-1 text-[0.78rem] text-[var(--muted-on-paper)]">{sublabel}</p>}
    </div>
  );
}
