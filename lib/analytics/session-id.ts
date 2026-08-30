const KEY = "mym_session_id_v1";

/** A stable, anonymous id for this browser tab session — used to dedupe
 * page-view tracking and to count "unique visitors" in analytics. Not
 * tied to any authenticated user/session in lib/auth. */
export function getOrCreateVisitorSessionId(): string {
  if (typeof window === "undefined") return "server";
  try {
    const existing = window.sessionStorage.getItem(KEY);
    if (existing) return existing;
    const id = `vsess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    window.sessionStorage.setItem(KEY, id);
    return id;
  } catch {
    return "unknown";
  }
}
