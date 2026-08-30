"use client";

import { useEffect, useState } from "react";
import { getVisits, subscribeVisits } from "@/lib/data/visit-store";
import type { PageView } from "@/lib/data/types";

export function useVisits() {
  const [visits, setVisits] = useState<PageView[]>([]);

  useEffect(() => {
    // One-time hydration of the client-only store into state on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisits(getVisits());
    return subscribeVisits(() => setVisits(getVisits()));
  }, []);

  return { visits };
}
