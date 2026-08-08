"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRegion } from "@/components/region-context";

export function RegionSelector() {
  const { region, regions, detecting, setRegionCode } = useRegion();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {regions.map((r) => {
          const active = r.code === region.code;
          return (
            <button
              key={r.code}
              onClick={() => setRegionCode(r.code)}
              className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[0.78rem] font-medium transition-colors ${
                active
                  ? "border-[var(--flame)] bg-[var(--flame)]/10 text-[var(--flame-dim)]"
                  : "border-[var(--paper-line)] text-[var(--muted-on-paper)] hover:border-[var(--ink-text)]/30"
              }`}
            >
              <span aria-hidden>{r.flag}</span>
              {r.shortLabel}
            </button>
          );
        })}
      </div>

      <div className="h-4 text-[0.76rem] text-[var(--muted-on-paper)]">
        <AnimatePresence mode="wait">
          {detecting ? (
            <motion.span
              key="detecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono"
            >
              Detecting your region…
            </motion.span>
          ) : (
            <motion.span
              key="detected"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              Prices shown in <strong className="text-[var(--ink-text)]">{region.currency}</strong> for{" "}
              {region.label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
