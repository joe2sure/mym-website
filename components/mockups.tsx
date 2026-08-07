function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[280px] rounded-[2rem] border border-white/10 bg-[var(--ink-soft)] p-3 shadow-[0_30px_60px_-20px_rgba(20,18,26,0.5)]">
      <div className="rounded-[1.4rem] bg-[var(--ink)] p-4 min-h-[340px]">{children}</div>
    </div>
  );
}

export function CompatibilityMock() {
  const rows = [
    { label: "Values overlap", pct: 92 },
    { label: "Life pace", pct: 84 },
    { label: "Communication style", pct: 88 },
    { label: "Long-term intent", pct: 95 },
  ];
  return (
    <Frame>
      <div className="flex items-center justify-between">
        <span className="section-label text-[var(--muted-on-ink)]">Compatibility</span>
        <span className="font-display text-lg text-[var(--ember)]">91%</span>
      </div>
      <div className="mt-5 space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex justify-between text-[0.68rem] text-[var(--muted-on-ink)] mb-1.5">
              <span>{r.label}</span>
              <span>{r.pct}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/10">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-[var(--flame)] to-[var(--ember)]"
                style={{ width: `${r.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[0.72rem] leading-relaxed text-[var(--muted-on-ink)]">
        Why this match: you both described yourselves as &ldquo;early riser, homebody,
        ready to settle down.&rdquo;
      </p>
    </Frame>
  );
}

export function SwipeMock() {
  return (
    <Frame>
      <span className="section-label text-[var(--muted-on-ink)]">Today&apos;s batch · 3 of 6</span>
      <div className="relative mt-4 h-[240px]">
        <div className="absolute inset-0 translate-y-3 scale-[0.94] rounded-2xl bg-white/5" />
        <div className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--plum)] to-[var(--ink)] p-4">
          <div className="h-2 w-1/3 rounded-full bg-white/20" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-sm font-semibold text-[var(--paper-text)]">Ada, 27</div>
            <div className="mt-1 text-[0.7rem] text-white/60">2.4 mi · Intent: long-term</div>
          </div>
          <span className="absolute right-4 top-4 rounded-full bg-black/30 px-2 py-1 text-[0.62rem] font-semibold text-[var(--ember)]">
            89% match
          </span>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40">✕</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--flame)] text-white">♥</span>
      </div>
    </Frame>
  );
}

export function ChatMock() {
  return (
    <Frame>
      <span className="section-label text-[var(--muted-on-ink)]">Chat · Ada &amp; Jordan</span>
      <div className="mt-4 space-y-2.5">
        <div className="max-w-[72%] rounded-2xl rounded-bl-sm bg-white/8 px-3 py-2 text-[0.72rem] text-[var(--paper-text)]">
          You both picked &ldquo;quiet night in &gt; big party&rdquo; — same energy?
        </div>
        <div className="ml-auto max-w-[72%] rounded-2xl rounded-br-sm bg-[var(--flame)]/90 px-3 py-2 text-[0.72rem] text-white">
          Ha, exactly. Board games over bars, always.
        </div>
        <div className="max-w-[72%] rounded-2xl rounded-bl-sm bg-white/8 px-3 py-2 text-[0.72rem] text-[var(--paper-text)]">
          Same. There&apos;s a game cafe two blocks from both of us —
        </div>
      </div>
      <div className="mt-5 rounded-xl border border-dashed border-white/15 p-3 text-center text-[0.68rem] text-[var(--ember)]">
        Suggest a date at Rook &amp; Pawn Cafe?
      </div>
    </Frame>
  );
}

export function VerifyMock() {
  return (
    <Frame>
      <span className="section-label text-[var(--muted-on-ink)]">Verification</span>
      <div className="mt-6 flex flex-col items-center">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-[var(--ember)]/60 bg-white/5">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[var(--plum)] to-[var(--ink)]" />
          <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--flame)] text-[0.7rem] text-white">
            ✓
          </span>
        </div>
        <div className="mt-4 text-sm font-semibold text-[var(--paper-text)]">Liveness check passed</div>
        <div className="mt-1 text-[0.68rem] text-[var(--muted-on-ink)]">Matched to government ID · 2 min ago</div>
      </div>
      <div className="mt-6 space-y-2 text-[0.7rem] text-[var(--muted-on-ink)]">
        <div className="flex justify-between border-t border-white/10 pt-2">
          <span>Selfie match</span>
          <span className="text-[var(--ember)]">Passed</span>
        </div>
        <div className="flex justify-between border-t border-white/10 pt-2">
          <span>Duplicate profile scan</span>
          <span className="text-[var(--ember)]">Clear</span>
        </div>
      </div>
    </Frame>
  );
}
