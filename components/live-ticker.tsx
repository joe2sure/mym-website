import { liveEvents } from "@/lib/mock-data";

function eventCopy(kind: string) {
  if (kind === "match") return "matched";
  if (kind === "message") return "started talking";
  return "went on a date";
}

export function LiveTicker() {
  const loop = [...liveEvents, ...liveEvents];

  return (
    <div className="border-y border-[var(--paper-line)] bg-[var(--paper-soft)] py-3.5">
      <div className="flex items-center gap-2 overflow-hidden px-6">
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--flame)]/70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--flame)]" />
        </span>
        <span className="section-label shrink-0 text-[var(--muted-on-paper)] mr-2">
          Live on the network
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
            {loop.map((e, i) => (
              <span key={`${e.id}-${i}`} className="text-[0.83rem] text-[var(--ink-text)]/80">
                <strong className="font-semibold">{e.a}</strong> &amp;{" "}
                <strong className="font-semibold">{e.b}</strong> {eventCopy(e.kind)} in{" "}
                <span className="text-[var(--plum)]">{e.city}</span>
                <span className="mx-2 text-[var(--muted-on-paper)]">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
