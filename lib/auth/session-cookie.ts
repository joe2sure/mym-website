import { Session } from "./types";

// A plain (non-httpOnly) cookie is fine here: this is a client-only mock
// auth layer with no real backend to issue a signed/httpOnly session from.
// It exists solely so middleware.ts can gate /admin/* on the edge.
export const SESSION_COOKIE_NAME = "mym_session";

export function setSessionCookie(session: Session) {
  const value = encodeURIComponent(JSON.stringify(session));
  document.cookie = `${SESSION_COOKIE_NAME}=${value}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function clearSessionCookie() {
  document.cookie = `${SESSION_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}
