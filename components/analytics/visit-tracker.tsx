"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordVisit } from "@/lib/data/visit-store";
import { getOrCreateVisitorSessionId } from "@/lib/analytics/session-id";
import { detectDevice, detectReferrer, detectCountry } from "@/lib/analytics/detect";

// Only the public marketing site counts as a "visit" for analytics —
// the admin console and auth pages are excluded so admin usage doesn't
// skew visitor numbers.
const EXCLUDED_PREFIXES = ["/admin", "/login", "/dashboard"];

export function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p))) return;

    const sessionId = getOrCreateVisitorSessionId();
    const dedupeKey = `mym_seen_${sessionId}_${pathname}`;

    try {
      if (window.sessionStorage.getItem(dedupeKey)) return;
      window.sessionStorage.setItem(dedupeKey, "1");
    } catch {
      // sessionStorage unavailable — fall through and track anyway
    }

    recordVisit({
      path: pathname,
      country: detectCountry(),
      device: detectDevice(),
      referrer: detectReferrer(),
      sessionId,
    });
  }, [pathname]);

  return null;
}
