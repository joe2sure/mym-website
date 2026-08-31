"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#product", label: "Product" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#trust", label: "Trust" },
  { href: "#traction", label: "Traction" },
  { href: "#opportunity", label: "Opportunity" },
  { href: "#pricing", label: "Pricing" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route/hash navigation and on wide-screen resize.
  useEffect(() => {
    if (!mobileOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex flex-col items-center px-4 sm:px-6 pt-4"
    >
      <nav
        className={`w-full max-w-6xl flex items-center justify-between rounded-full px-4 sm:px-5 py-2.5 transition-all duration-500 ${
          scrolled || mobileOpen
            ? "bg-[var(--ink)]/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(20,18,26,0.25)] border border-white/10"
            : "bg-transparent border border-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 shrink-0" onClick={closeMenu}>
          <span className="relative flex h-6 w-6 items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M12 2c0 4-4 5.5-4 10a4 4 0 0 0 8 0c0-1.4-.7-2.4-1.3-3.3-.4.9-1 1.4-1.5 1.4-.7 0-1-.6-.7-1.4C13.2 7.2 14 5.6 12 2Z"
                fill="var(--flame)"
              />
            </svg>
          </span>
          <span
            className={`font-display text-[1.05rem] tracking-tight ${
              scrolled || mobileOpen ? "text-[var(--paper-text)]" : "text-[var(--ink-text)]"
            }`}
          >
            Meet Your Match
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-[0.83rem] font-medium transition-colors ${
                scrolled
                  ? "text-[var(--muted-on-ink)] hover:text-[var(--paper-text)]"
                  : "text-[var(--muted-on-paper)] hover:text-[var(--ink-text)]"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/login"
            className={`hidden lg:inline-block text-[0.8rem] font-semibold px-3.5 py-2 rounded-full transition-colors ${
              scrolled
                ? "text-[var(--paper-text)] hover:text-[var(--flame)]"
                : "text-[var(--ink-text)] hover:text-[var(--flame-dim)]"
            }`}
          >
            Log in
          </Link>
          <a
            href="#investors"
            className={`hidden lg:inline-block text-[0.8rem] font-semibold px-3.5 py-2 rounded-full transition-colors ${
              scrolled
                ? "text-[var(--paper-text)] hover:text-[var(--flame)]"
                : "text-[var(--ink-text)] hover:text-[var(--flame-dim)]"
            }`}
          >
            For investors
          </a>
          <a
            href="#waitlist"
            className="text-[0.8rem] font-semibold px-4 py-2 rounded-full bg-[var(--flame)] text-white hover:bg-[var(--flame-dim)] transition-colors"
          >
            Get early access
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors lg:hidden ${
              scrolled || mobileOpen
                ? "text-[var(--paper-text)] hover:bg-white/10"
                : "text-[var(--ink-text)] hover:bg-black/5"
            }`}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 w-full max-w-6xl rounded-3xl border border-white/10 bg-[var(--ink)]/95 backdrop-blur-xl p-5 shadow-[0_12px_40px_rgba(20,18,26,0.3)] lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  className="rounded-xl px-3 py-2.5 text-[0.9rem] font-medium text-[var(--muted-on-ink)] transition-colors hover:bg-white/5 hover:text-[var(--paper-text)]"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
              <Link
                href="/login"
                onClick={closeMenu}
                className="rounded-xl px-3 py-2.5 text-[0.9rem] font-semibold text-[var(--paper-text)] transition-colors hover:bg-white/5"
              >
                Log in
              </Link>
              <a
                href="#investors"
                onClick={closeMenu}
                className="rounded-xl px-3 py-2.5 text-[0.9rem] font-semibold text-[var(--paper-text)] transition-colors hover:bg-white/5"
              >
                For investors
              </a>
              <a
                href="#waitlist"
                onClick={closeMenu}
                className="mt-1 rounded-full bg-[var(--flame)] px-4 py-3 text-center text-[0.9rem] font-semibold text-white transition-colors hover:bg-[var(--flame-dim)]"
              >
                Get early access
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";

// const links = [
//   { href: "#product", label: "Product" },
//   { href: "#how-it-works", label: "How it works" },
//   { href: "#trust", label: "Trust" },
//   { href: "#traction", label: "Traction" },
//   { href: "#opportunity", label: "Opportunity" },
//   { href: "#pricing", label: "Pricing" },
// ];

// export function Nav() {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 24);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <motion.header
//       initial={{ y: -20, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//       className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pt-4"
//     >
//       <nav
//         className={`w-full max-w-6xl flex items-center justify-between rounded-full px-4 sm:px-5 py-2.5 transition-all duration-500 ${
//           scrolled
//             ? "bg-[var(--ink)]/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(20,18,26,0.25)] border border-white/10"
//             : "bg-transparent border border-transparent"
//         }`}
//       >
//         <a href="#top" className="flex items-center gap-2 shrink-0">
//           <span className="relative flex h-6 w-6 items-center justify-center">
//             <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
//               <path
//                 d="M12 2c0 4-4 5.5-4 10a4 4 0 0 0 8 0c0-1.4-.7-2.4-1.3-3.3-.4.9-1 1.4-1.5 1.4-.7 0-1-.6-.7-1.4C13.2 7.2 14 5.6 12 2Z"
//                 fill="var(--flame)"
//               />
//             </svg>
//           </span>
//           <span
//             className={`font-display text-[1.05rem] tracking-tight ${
//               scrolled ? "text-[var(--paper-text)]" : "text-[var(--ink-text)]"
//             }`}
//           >
//             Meet Your Match
//           </span>
//         </a>

//         <div className="hidden lg:flex items-center gap-7">
//           {links.map((l) => (
//             <a
//               key={l.href}
//               href={l.href}
//               className={`text-[0.83rem] font-medium transition-colors ${
//                 scrolled
//                   ? "text-[var(--muted-on-ink)] hover:text-[var(--paper-text)]"
//                   : "text-[var(--muted-on-paper)] hover:text-[var(--ink-text)]"
//               }`}
//             >
//               {l.label}
//             </a>
//           ))}
//         </div>

//         <div className="flex items-center gap-2 shrink-0">
//           <Link
//             href="/login"
//             className={`hidden sm:inline-block text-[0.8rem] font-semibold px-3.5 py-2 rounded-full transition-colors ${
//               scrolled
//                 ? "text-[var(--paper-text)] hover:text-[var(--flame)]"
//                 : "text-[var(--ink-text)] hover:text-[var(--flame-dim)]"
//             }`}
//           >
//             Log in
//           </Link>
//           <a
//             href="#investors"
//             className={`hidden sm:inline-block text-[0.8rem] font-semibold px-3.5 py-2 rounded-full transition-colors ${
//               scrolled
//                 ? "text-[var(--paper-text)] hover:text-[var(--flame)]"
//                 : "text-[var(--ink-text)] hover:text-[var(--flame-dim)]"
//             }`}
//           >
//             For investors
//           </a>
//           <a
//             href="#waitlist"
//             className="text-[0.8rem] font-semibold px-4 py-2 rounded-full bg-[var(--flame)] text-white hover:bg-[var(--flame-dim)] transition-colors"
//           >
//             Get early access
//           </a>
//         </div>
//       </nav>
//     </motion.header>
//   );
// }