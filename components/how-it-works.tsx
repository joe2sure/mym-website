"use client";

import { motion } from "framer-motion";
import { steps } from "@/lib/mock-data";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[var(--paper)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="section-label text-[var(--flame-dim)] mb-5">The path, in order</p>
          <h2 className="font-display text-balance text-3xl leading-tight text-[var(--ink-text)] sm:text-4xl">
            From download to first date, four honest steps.
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--paper-line)] bg-[var(--paper-line)] sm:grid-cols-2">
          {steps.map((s, i) => (
            <motion.div
              key={s.index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
              className="bg-[var(--paper)] p-8 sm:p-10"
            >
              <span className="font-mono text-sm text-[var(--flame-dim)]">{s.index}</span>
              <h3 className="font-display mt-4 text-xl leading-snug text-[var(--ink-text)]">
                {s.title}
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-[var(--muted-on-paper)]">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
