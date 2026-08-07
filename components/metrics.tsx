"use client";

import { motion } from "framer-motion";
import { metrics, testimonials } from "@/lib/mock-data";

export function Metrics() {
  return (
    <section id="traction" className="bg-[var(--paper)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="section-label text-[var(--flame-dim)] mb-5">Early traction</p>
            <h2 className="font-display text-balance text-3xl leading-tight text-[var(--ink-text)] sm:text-4xl">
              Pre-launch numbers, from a closed beta across six metros.
            </h2>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--paper-line)] bg-[var(--paper-line)] sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="bg-[var(--paper)] p-7"
            >
              <div className="font-display text-3xl text-[var(--flame-dim)]">{m.value}</div>
              <div className="mt-2 text-[0.82rem] font-semibold text-[var(--ink-text)]">{m.label}</div>
              <div className="mt-1 text-[0.76rem] leading-snug text-[var(--muted-on-paper)]">
                {m.detail}
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-[0.7rem] text-[var(--muted-on-paper)]/80">
          *Illustrative demo data modeled from beta cohort behavior; not audited figures.
        </p>

        <div className="mt-24 grid gap-8 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="rounded-2xl border border-[var(--paper-line)] bg-[var(--paper-soft)] p-7"
            >
              <blockquote className="font-display text-[1.05rem] italic leading-snug text-[var(--ink-text)]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-[0.82rem] text-[var(--muted-on-paper)]">
                <span className="font-semibold text-[var(--ink-text)]">{t.name}</span> · {t.role}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
