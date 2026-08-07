export function Footer() {
  return (
    <footer className="bg-[var(--ink)] pb-10 pt-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M12 2c0 4-4 5.5-4 10a4 4 0 0 0 8 0c0-1.4-.7-2.4-1.3-3.3-.4.9-1 1.4-1.5 1.4-.7 0-1-.6-.7-1.4C13.2 7.2 14 5.6 12 2Z"
                  fill="var(--flame)"
                />
              </svg>
              <span className="font-display text-lg text-[var(--paper-text)]">Meet Your Match</span>
            </div>
            <p className="mt-4 text-[0.85rem] leading-relaxed text-[var(--muted-on-ink)]">
              A compatibility engine for people who want to stop swiping and start meeting.
              Currently in closed beta across six metros.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="section-label text-[var(--muted-on-ink)] mb-4">Product</p>
              <ul className="space-y-2.5 text-[0.85rem] text-[var(--paper-text)]/80">
                <li><a href="#product" className="hover:text-[var(--flame)]">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-[var(--flame)]">How it works</a></li>
                <li><a href="#pricing" className="hover:text-[var(--flame)]">Pricing</a></li>
              </ul>
            </div>
            <div>
              <p className="section-label text-[var(--muted-on-ink)] mb-4">Company</p>
              <ul className="space-y-2.5 text-[0.85rem] text-[var(--paper-text)]/80">
                <li><a href="#trust" className="hover:text-[var(--flame)]">Trust &amp; safety</a></li>
                <li><a href="#opportunity" className="hover:text-[var(--flame)]">Opportunity</a></li>
                <li><a href="#investors" className="hover:text-[var(--flame)]">Investors</a></li>
              </ul>
            </div>
            <div>
              <p className="section-label text-[var(--muted-on-ink)] mb-4">Legal</p>
              <ul className="space-y-2.5 text-[0.85rem] text-[var(--paper-text)]/80">
                <li><a href="#" className="hover:text-[var(--flame)]">Privacy</a></li>
                <li><a href="#" className="hover:text-[var(--flame)]">Terms</a></li>
                <li><a href="#" className="hover:text-[var(--flame)]">Safety center</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[0.76rem] text-[var(--muted-on-ink)] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Meet Your Match, Inc. Demo landing page — all data illustrative.</span>
          <span>Made for people who want to log off, together.</span>
        </div>
      </div>
    </footer>
  );
}
