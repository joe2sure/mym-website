import { readStore, writeStore, subscribeStore, newId } from "@/lib/store/local-store";
import { SEED_WAITLIST } from "./seed-waitlist";
import { logActivity } from "./activity-store";
import type { WaitlistEntry, WaitlistStatus } from "./types";
import { TIER_LABEL, WAITLIST_STATUS_LABEL } from "./types";
import type { Tier } from "@/lib/auth/types";

const KEY = "mym_waitlist_v1";

export function getWaitlist(): WaitlistEntry[] {
  return readStore<WaitlistEntry[]>(KEY, SEED_WAITLIST);
}

function save(entries: WaitlistEntry[]) {
  writeStore(KEY, entries);
}

export function addWaitlistEntry(input: { email: string; tier: Tier; country: string }): WaitlistEntry {
  const entry: WaitlistEntry = {
    id: newId("wl"),
    email: input.email.trim(),
    tier: input.tier,
    country: input.country,
    status: "new",
    source: "landing_page",
    createdAt: new Date().toISOString(),
  };
  save([...getWaitlist(), entry]);
  logActivity(
    "waitlist_joined",
    `${entry.email} joined the waitlist for ${TIER_LABEL[entry.tier]} · ${entry.country}`,
    entry.email
  );
  return entry;
}

export function updateWaitlistStatus(id: string, status: WaitlistStatus): void {
  const current = getWaitlist();
  const entry = current.find((e) => e.id === id);
  save(current.map((e) => (e.id === id ? { ...e, status } : e)));
  if (entry) {
    logActivity("waitlist_status_changed", `${entry.email} → ${WAITLIST_STATUS_LABEL[status]}`, entry.email);
  }
}

export function removeWaitlistEntry(id: string): void {
  save(getWaitlist().filter((e) => e.id !== id));
}

export function subscribeWaitlist(cb: () => void): () => void {
  return subscribeStore(KEY, cb);
}
