"use client";

import { motion } from "framer-motion";

const rows = [
  {
    old: "Unlimited swiping trains people to skim, not choose.",
    new: "A capped daily batch makes every profile worth a real look.",
  },
  {
    old: "Matches expire into silence — no one knows why it stalled.",
    new: "Compatibility context gives both sides an actual reason to open the chat.",
  },
  {
    old: "Verification is a checkbox, easy to fake or skip.",
    new: "Liveness-checked identity sits under every profile, visibly and by default.",
  },
];

export function Problem() {
  return (
    <section className="bg-[var(--paper)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="section-label text-[var(--flame-dim)] mb-5">The problem with the category</p>
          <h2 className="font-display text-balance text-3xl leading-tight text-[var(--ink-text)] sm:text-4xl">
            Most dating apps optimize for time spent, not people met.
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-[var(--muted-on-paper)]">
            Meet Your Match is built on the opposite bet: the product wins when a member
            deletes the app for the right reason — because they met someone. That single
            incentive shift changes what gets built.
          </p>
        </div>

        <div className="mt-16 divide-y divide-[var(--paper-line)] border-y border-[var(--paper-line)]">
          {rows.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="grid gap-4 py-8 sm:grid-cols-2 sm:gap-10"
            >
              <p className="text-[0.98rem] leading-relaxed text-[var(--muted-on-paper)]">
                <span className="section-label mr-2 text-[var(--muted-on-paper)]/70">Category norm</span>
                <br className="sm:hidden" />
                {r.old}
              </p>
              <p className="text-[0.98rem] leading-relaxed text-[var(--ink-text)]">
                <span className="section-label mr-2 text-[var(--flame-dim)]">Meet Your Match</span>
                <br className="sm:hidden" />
                {r.new}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
