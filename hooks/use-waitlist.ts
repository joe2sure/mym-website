"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getWaitlist,
  addWaitlistEntry,
  updateWaitlistStatus,
  removeWaitlistEntry,
  subscribeWaitlist,
} from "@/lib/data/waitlist-store";
import type { WaitlistEntry, WaitlistStatus } from "@/lib/data/types";
import type { Tier } from "@/lib/auth/types";

export function useWaitlist() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);

  useEffect(() => {
    // One-time hydration of the client-only store into state on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntries(getWaitlist());
    return subscribeWaitlist(() => setEntries(getWaitlist()));
  }, []);

  const join = useCallback((input: { email: string; tier: Tier; country: string }) => {
    return addWaitlistEntry(input);
  }, []);

  const setStatus = useCallback((id: string, status: WaitlistStatus) => {
    updateWaitlistStatus(id, status);
  }, []);

  const remove = useCallback((id: string) => {
    removeWaitlistEntry(id);
  }, []);

  return { entries, join, setStatus, remove };
}
