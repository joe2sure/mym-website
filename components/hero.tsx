"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const embers = [
  { left: "46%", delay: 0, size: 3 },
  { left: "52%", delay: 0.6, size: 2 },
  { left: "49%", delay: 1.2, size: 4 },
  { left: "55%", delay: 1.8, size: 2 },
  { left: "44%", delay: 0.9, size: 3 },
];

export function Hero() {
  return (
    <section
      id="top"
      className="grain relative overflow-hidden bg-[var(--ink)] pt-36 pb-20 sm:pt-44 sm:pb-28"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-[38%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--flame)]/[0.14] blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* Copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="section-label text-[var(--ember)] mb-6"
            >
              Matchmaking, rethought — pre-launch
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.08 }}
              className="font-display text-balance text-[2.6rem] leading-[1.05] text-[var(--paper-text)] sm:text-[3.4rem] lg:text-[3.75rem]"
            >
              Chemistry isn&apos;t luck.
              <br />
              <span className="italic text-[var(--flame)]">It&apos;s signal.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.18 }}
              className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-[var(--muted-on-ink)]"
            >
              Meet Your Match replaces the endless swipe with a compatibility engine that
              reads real signal — values, pace, and how two people actually talk — then gets
              out of the way.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.28 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href="#waitlist"
                className="rounded-full bg-[var(--flame)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--flame-dim)]"
              >
                Get early access
              </a>
              <a
                href="#opportunity"
                className="rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-[var(--paper-text)] transition-colors hover:border-white/35"
              >
                View the opportunity
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6"
            >
              {[
                ["48,200+", "waitlist signups"],
                ["63%", "match → conversation rate*"],
                ["94%", "profiles liveness-verified"],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="font-display text-xl text-[var(--paper-text)]">{value}</div>
                  <div className="mt-0.5 text-[0.72rem] text-[var(--muted-on-ink)]">{label}</div>
                </div>
              ))}
            </motion.div>
            <p className="mt-3 text-[0.68rem] text-[var(--muted-on-ink)]/70">
              *Illustrative demo metrics, modeled from beta cohort data.
            </p>
          </div>

          {/* The Strike — signature visual */}
          <div className="relative mx-auto h-[420px] w-full max-w-sm sm:h-[460px]">
            {/* Card A */}
            <motion.div
              initial={{ x: -70, opacity: 0, rotate: -8 }}
              animate={{ x: 0, opacity: 1, rotate: -6 }}
              transition={{ duration: 1, ease, delay: 0.3 }}
              className="absolute left-2 top-10 w-[62%] rounded-2xl border border-white/10 bg-[var(--ink-soft)] p-4 shadow-2xl sm:top-14"
            >
              <div className="h-32 rounded-xl bg-gradient-to-br from-[var(--plum)] to-[var(--ink)] sm:h-36" />
              <div className="mt-3 h-2.5 w-2/3 rounded-full bg-white/15" />
              <div className="mt-2 h-2 w-1/2 rounded-full bg-white/10" />
              <div className="mt-3 flex items-center gap-1.5 text-[0.65rem] font-semibold text-[var(--ember)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--ember)]" /> 91% compatible
              </div>
            </motion.div>

            {/* Card B */}
            <motion.div
              initial={{ x: 70, opacity: 0, rotate: 8 }}
              animate={{ x: 0, opacity: 1, rotate: 6 }}
              transition={{ duration: 1, ease, delay: 0.42 }}
              className="absolute right-2 bottom-10 w-[62%] rounded-2xl border border-white/10 bg-[var(--ink-soft)] p-4 shadow-2xl sm:bottom-14"
            >
              <div className="h-32 rounded-xl bg-gradient-to-br from-[var(--flame-dim)] to-[var(--ink)] sm:h-36" />
              <div className="mt-3 h-2.5 w-2/3 rounded-full bg-white/15" />
              <div className="mt-2 h-2 w-1/2 rounded-full bg-white/10" />
              <div className="mt-3 flex items-center gap-1.5 text-[0.65rem] font-semibold text-[var(--ember)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--ember)]" /> 91% compatible
              </div>
            </motion.div>

            {/* Spark at meeting point */}
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.15, ease }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" className="flame-flicker drop-shadow-[0_0_18px_rgba(255,90,70,0.75)]">
                <path
                  d="M12 2c0 4-4 5.5-4 10a4 4 0 0 0 8 0c0-1.4-.7-2.4-1.3-3.3-.4.9-1 1.4-1.5 1.4-.7 0-1-.6-.7-1.4C13.2 7.2 14 5.6 12 2Z"
                  fill="var(--flame)"
                />
              </svg>
            </motion.div>

            {/* drifting embers */}
            {embers.map((e, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.8, 0], y: -70 }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  delay: 1.4 + e.delay,
                  ease: "easeOut",
                }}
                style={{
                  left: e.left,
                  width: e.size,
                  height: e.size,
                  top: "48%",
                }}
                className="absolute rounded-full bg-[var(--ember)]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
