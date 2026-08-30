"use client";

import { useEffect, useState } from "react";
import { getActivity, subscribeActivity } from "@/lib/data/activity-store";
import type { ActivityEvent } from "@/lib/data/types";

export function useActivity() {
  const [events, setEvents] = useState<ActivityEvent[]>([]);

  useEffect(() => {
    // One-time hydration of the client-only store into state on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEvents(getActivity());
    return subscribeActivity(() => setEvents(getActivity()));
  }, []);

  return { events };
}
