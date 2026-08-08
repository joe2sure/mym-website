"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { pricingPlans } from "@/lib/mock-data";
import { useRegion } from "@/components/region-context";
import { RegionSelector } from "@/components/region-selector";

export function Pricing() {
  const { region } = useRegion();

  return (
    <section id="pricing" className="bg-[var(--paper)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="section-label text-[var(--flame-dim)] mb-5">Pricing</p>
          <h2 className="font-display text-balance text-3xl leading-tight text-[var(--ink-text)] sm:text-4xl">
            Free to start. Priced for where you actually live.
          </h2>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-[var(--muted-on-paper)]">
            Meet Your Match launches first across Nigeria and West Africa, then the UK,
            Eurozone, and North America — pricing is set for each market, not a flat
            dollar conversion.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-[var(--paper-line)] bg-[var(--paper-soft)] p-5 sm:p-6">
          <RegionSelector />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => {
            const price = region.prices[plan.id as keyof typeof region.prices];
            const cadence = plan.id === "free" ? "forever" : "per month";
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  plan.highlighted
                    ? "border-2 border-[var(--flame)] bg-[var(--ink)] shadow-xl"
                    : "border border-[var(--paper-line)] bg-[var(--paper-soft)]"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-8 rounded-full bg-[var(--flame)] px-3 py-1 text-[0.68rem] font-semibold text-white">
                    Most chosen
                  </span>
                )}
                <h3
                  className={`font-display text-xl ${
                    plan.highlighted ? "text-[var(--paper-text)]" : "text-[var(--ink-text)]"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-2 text-[0.85rem] ${
                    plan.highlighted ? "text-[var(--muted-on-ink)]" : "text-[var(--muted-on-paper)]"
                  }`}
                >
                  {plan.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <motion.span
                    key={`${plan.id}-${region.code}`}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className={`font-display text-3xl ${
                      plan.highlighted ? "text-[var(--paper-text)]" : "text-[var(--ink-text)]"
                    }`}
                  >
                    {price}
                  </motion.span>
                  <span
                    className={`text-[0.8rem] ${
                      plan.highlighted ? "text-[var(--muted-on-ink)]" : "text-[var(--muted-on-paper)]"
                    }`}
                  >
                    {cadence} · {region.currency}
                  </span>
                </div>

                <ul className="mt-7 space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex gap-2.5 text-[0.86rem] ${
                        plan.highlighted ? "text-[var(--paper-text)]/90" : "text-[var(--ink-text)]/85"
                      }`}
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0"
                        strokeWidth={2}
                        color={plan.highlighted ? "var(--ember)" : "var(--flame-dim)"}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#waitlist"
                  className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-colors ${
                    plan.highlighted
                      ? "bg-[var(--flame)] text-white hover:bg-[var(--flame-dim)]"
                      : "border border-[var(--ink-text)]/15 text-[var(--ink-text)] hover:border-[var(--ink-text)]/40"
                  }`}
                >
                  Join the waitlist
                </a>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-6 text-[0.7rem] text-[var(--muted-on-paper)]/80">
          {region.note}. Switch regions above to preview pricing elsewhere — billing
          currency is set automatically at sign-up and can be changed in account settings.
        </p>
      </div>
    </section>
  );
}
