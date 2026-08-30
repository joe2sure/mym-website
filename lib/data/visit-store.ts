import { readStore, writeStore, subscribeStore, newId } from "@/lib/store/local-store";
import { SEED_VISITS } from "./seed-visits";
import type { PageView, Device, Referrer } from "./types";

const KEY = "mym_visits_v1";

export function getVisits(): PageView[] {
  return readStore<PageView[]>(KEY, SEED_VISITS);
}

function save(visits: PageView[]) {
  writeStore(KEY, visits);
}

export function recordVisit(input: {
  path: string;
  country: string;
  device: Device;
  referrer: Referrer;
  sessionId: string;
}): PageView {
  const visit: PageView = {
    id: newId("pv"),
    ...input,
    createdAt: new Date().toISOString(),
  };
  save([...getVisits(), visit]);
  return visit;
}

export function subscribeVisits(cb: () => void): () => void {
  return subscribeStore(KEY, cb);
}
