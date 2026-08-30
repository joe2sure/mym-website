"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { Role } from "@/lib/auth/types";

export function ProtectedRoute({ allow, children }: { allow: Role[]; children: ReactNode }) {
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!session) {
      router.replace("/login");
      return;
    }
    if (!allow.includes(session.role)) {
      router.replace(session.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [loading, session, allow, router]);

  const ready = !loading && session && allow.includes(session.role);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--paper)]">
        <p className="font-mono text-[0.7rem] uppercase tracking-widest text-[var(--muted-on-paper)]">
          Loading…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
