import { readStore, writeStore, subscribeStore, newId } from "@/lib/store/local-store";
import { SEED_ACTIVITY } from "./seed-activity";
import type { ActivityEvent, ActivityType } from "./types";

const KEY = "mym_activity_v1";
const MAX_EVENTS = 500;

export function getActivity(): ActivityEvent[] {
  return readStore<ActivityEvent[]>(KEY, SEED_ACTIVITY);
}

export function logActivity(type: ActivityType, summary: string, actor: string): void {
  const event: ActivityEvent = {
    id: newId("act"),
    type,
    summary,
    actor,
    createdAt: new Date().toISOString(),
  };
  const next = [event, ...getActivity()].slice(0, MAX_EVENTS);
  writeStore(KEY, next);
}

export function subscribeActivity(cb: () => void): () => void {
  return subscribeStore(KEY, cb);
}
