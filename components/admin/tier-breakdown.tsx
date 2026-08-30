const TIER_COLOR: Record<string, string> = {
  free: "var(--muted-on-paper)",
  plus: "var(--flame)",
  gold: "var(--ember)",
};

export function TierBreakdown({
  data,
}: {
  data: { tier: string; label: string; count: number; pct: number }[];
}) {
  return (
    <div className="rounded-2xl border border-[var(--paper-line)] bg-[var(--paper-soft)] p-5">
      <p className="font-mono text-[0.68rem] uppercase tracking-widest text-[var(--muted-on-paper)]">
        Waitlist interest by plan
      </p>
      <div className="mt-5 flex flex-col gap-4">
        {data.map((d) => (
          <div key={d.tier}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-[0.85rem] font-semibold text-[var(--ink-text)]">{d.label}</span>
              <span className="text-[0.78rem] text-[var(--muted-on-paper)]">
                {d.count} · {d.pct}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-black/5">
              <div
                className="h-full rounded-full"
                style={{ width: `${d.pct}%`, background: TIER_COLOR[d.tier] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
