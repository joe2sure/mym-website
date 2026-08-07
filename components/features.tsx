"use client";

import { motion } from "framer-motion";
import { features } from "@/lib/mock-data";
import { CompatibilityMock, SwipeMock, ChatMock, VerifyMock } from "@/components/mockups";

const mockComponents = {
  compatibility: CompatibilityMock,
  swipe: SwipeMock,
  chat: ChatMock,
  verify: VerifyMock,
};

export function Features() {
  return (
    <section id="product" className="bg-[var(--ink)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="section-label text-[var(--ember)] mb-5">The product</p>
          <h2 className="font-display text-balance text-3xl leading-tight text-[var(--paper-text)] sm:text-4xl">
            Four systems, one goal: get people to a real first date.
          </h2>
        </div>

        <div className="mt-20 space-y-28">
          {features.map((f, i) => {
            const Mock = mockComponents[f.mock];
            const reversed = i % 2 === 1;
            return (
              <div
                key={f.id}
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="section-label text-[var(--flame)]">{f.eyebrow}</span>
                  <h3 className="font-display mt-4 text-2xl leading-snug text-[var(--paper-text)] sm:text-[1.8rem]">
                    {f.title}
                  </h3>
                  <p className="mt-4 text-[0.98rem] leading-relaxed text-[var(--muted-on-ink)]">
                    {f.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[0.9rem] text-[var(--paper-text)]/85">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--ember)]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  <Mock />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
