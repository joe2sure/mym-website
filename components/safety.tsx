"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ScanFace, Flag, Lock } from "lucide-react";

const pillars = [
  {
    icon: ScanFace,
    title: "Liveness-checked identity",
    description:
      "Every profile completes a selfie-liveness scan cross-referenced against ID at sign-up — not a one-time badge, a standing requirement to stay visible.",
  },
  {
    icon: Flag,
    title: "Reports reviewed in minutes, not days",
    description:
      "A dedicated moderation queue targets first response inside 15 minutes for safety reports, with automatic profile suspension on repeat flags.",
  },
  {
    icon: Lock,
    title: "Data stays out of the marketplace",
    description:
      "Location, messages, and verification data are never sold. Anonymized, aggregate compatibility research is opt-in and separately consented.",
  },
  {
    icon: ShieldCheck,
    title: "Built with a safety advisory panel",
    description:
      "Policies are reviewed twice a year with outside advisors from consumer-safety and gender-based-violence prevention backgrounds.",
  },
];

export function Safety() {
  return (
    <section id="trust" className="bg-[var(--ink)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="section-label text-[var(--ember)] mb-5">Trust &amp; safety</p>
            <h2 className="font-display text-balance text-3xl leading-tight text-[var(--paper-text)] sm:text-4xl">
              Safety isn&apos;t a feature here. It&apos;s the floor everything else stands on.
            </h2>
          </div>
          <p className="max-w-xs text-[0.88rem] leading-relaxed text-[var(--muted-on-ink)]">
            Dating products live or die on trust. These are the standing commitments,
            not launch-week promises.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
                className="bg-[var(--ink)] p-8 sm:p-10"
              >
                <Icon className="h-5 w-5 text-[var(--flame)]" strokeWidth={1.75} />
                <h3 className="font-display mt-5 text-lg leading-snug text-[var(--paper-text)]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-[var(--muted-on-ink)]">
                  {p.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
