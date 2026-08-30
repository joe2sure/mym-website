export function InvestorPipeline({
  data,
}: {
  data: { status: string; label: string; count: number }[];
}) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="rounded-2xl border border-[var(--paper-line)] bg-[var(--paper-soft)] p-5">
      <p className="font-mono text-[0.68rem] uppercase tracking-widest text-[var(--muted-on-paper)]">
        Investor pipeline
      </p>
      <div className="mt-5 flex flex-col gap-3">
        {data.map((d) => (
          <div key={d.status} className="flex items-center gap-3">
            <span className="w-32 shrink-0 truncate text-[0.82rem] text-[var(--ink-text)]">
              {d.label}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/5">
              <div
                className="h-full rounded-full bg-[var(--ink)]"
                style={{ width: `${(d.count / max) * 100}%` }}
              />
            </div>
            <span className="w-6 shrink-0 text-right text-[0.78rem] text-[var(--muted-on-paper)]">
              {d.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
