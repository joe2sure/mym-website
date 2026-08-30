// Thin localStorage wrapper that stands in for a real database/API.
// Every "table" (waitlist entries, investor leads, page views, etc.) is
// just a JSON array under its own key. Safe to call from Client Components;
// no-ops on the server so it never breaks SSR/build.

export function readStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStore<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent<{ key: string }>("mym:store", { detail: { key } }));
}

/** Re-renders subscribers when `key` changes, in this tab or another. */
export function subscribeStore(key: string, cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onLocal = (e: Event) => {
    const ce = e as CustomEvent<{ key: string }>;
    if (!ce.detail || ce.detail.key === key) cb();
  };
  const onCrossTab = (e: StorageEvent) => {
    if (e.key === key) cb();
  };
  window.addEventListener("mym:store", onLocal as EventListener);
  window.addEventListener("storage", onCrossTab);
  return () => {
    window.removeEventListener("mym:store", onLocal as EventListener);
    window.removeEventListener("storage", onCrossTab);
  };
}

export function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
