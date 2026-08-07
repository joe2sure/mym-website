"use client";

import { useScroll, useSpring, useTransform, motion } from "framer-motion";

export function FuseProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.3,
  });
  const topOffset = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <div
      aria-hidden
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex h-[42vh] w-px flex-col items-center"
    >
      <div className="relative h-full w-px bg-[var(--ink-line)]/40">
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute inset-0 w-px bg-gradient-to-b from-[var(--flame)] via-[var(--ember)] to-[var(--flame)]"
        />
        <motion.div
          style={{ top: topOffset }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[var(--ember)] shadow-[0_0_10px_3px_rgba(242,166,90,0.65)]"
        />
      </div>
    </div>
  );
}
