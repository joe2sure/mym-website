"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { MOCK_USERS } from "./mock-users";
import { Role, Session } from "./types";
import { setSessionCookie, clearSessionCookie } from "./session-cookie";
import { logActivity } from "@/lib/data/activity-store";

const SESSION_KEY = "mym_session_v1";

type LoginResult = { ok: true } | { ok: false; error: string };

type AuthContextValue = {
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string, expectedRole: Role) => LoginResult;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SESSION_KEY);
      // One-time hydration of client-only storage into state on mount —
      // there is no external system to subscribe to here, so a direct
      // setState is the correct (and only) option.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setSession(JSON.parse(raw) as Session);
    } catch {
      // ignore malformed/blocked storage
    }
    setLoading(false);
  }, []);

  function login(email: string, password: string, expectedRole: Role): LoginResult {
    const match = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!match) {
      return { ok: false, error: "Incorrect email or password." };
    }
    if (match.role !== expectedRole) {
      return {
        ok: false,
        error:
          expectedRole === "admin"
            ? "This account doesn't have admin access."
            : "That's an admin account — switch to the Admin tab.",
      };
    }

    const nextSession: Session = {
      userId: match.id,
      name: match.name,
      email: match.email,
      role: match.role,
    };

    window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
    setSessionCookie(nextSession);
    setSession(nextSession);
    logActivity(match.role === "admin" ? "admin_login" : "user_login", `${match.name} signed in`, match.email);
    return { ok: true };
  }

  function logout() {
    window.localStorage.removeItem(SESSION_KEY);
    clearSessionCookie();
    setSession(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ session, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
