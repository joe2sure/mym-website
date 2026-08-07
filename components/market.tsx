"use client";

import { motion } from "framer-motion";
import { marketStats, revenueStreams } from "@/lib/mock-data";

export function Market() {
  return (
    <section id="opportunity" className="bg-[var(--ink)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="section-label text-[var(--ember)] mb-5">The opportunity</p>
          <h2 className="font-display text-balance text-3xl leading-tight text-[var(--paper-text)] sm:text-4xl">
            A $9.9B category still optimizing for the wrong metric.
          </h2>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-[var(--muted-on-ink)]">
            Incumbents monetize attention. Meet Your Match monetizes successful outcomes —
            a smaller, more durable slice of a large market, entered through underserved
            urban metros first.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {marketStats.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="bg-[var(--ink)] p-8"
            >
              <span className="section-label text-[var(--muted-on-ink)]">{m.label}</span>
              <div className="font-display mt-3 text-4xl text-[var(--flame)]">{m.value}</div>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-[var(--muted-on-ink)]">
                {m.caption}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="section-label text-[var(--ember)] mb-5">Revenue model</p>
            <h3 className="font-display text-2xl leading-snug text-[var(--paper-text)]">
              Four lines, one already carrying most of the weight.
            </h3>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-[var(--muted-on-ink)]">
              Subscriptions anchor the model today; boosts and verified in-person events add
              margin without reopening the trust question the core product already solved.
            </p>
          </div>

          <div className="space-y-5">
            {revenueStreams.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-semibold text-[var(--paper-text)]">{r.name}</span>
                  <span className="font-mono text-[var(--ember)]">{r.share}%</span>
                </div>
                <p className="mt-1 text-[0.82rem] text-[var(--muted-on-ink)]">{r.description}</p>
                <div className="mt-2.5 h-1.5 w-full rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${r.share}%` }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="h-1.5 rounded-full bg-gradient-to-r from-[var(--flame)] to-[var(--ember)]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
