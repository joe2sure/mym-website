"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuth } from "@/lib/auth/auth-context";

function DashboardContent() {
  const { session, logout } = useAuth();

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
      <p className="section-label mb-2 text-[var(--flame-dim)]">Your account</p>
      <h1 className="font-display text-3xl text-[var(--ink-text)]">
        Hey {session?.name?.split(" ")[0]}, you&apos;re signed in.
      </h1>
      <p className="mt-3 text-[0.9rem] text-[var(--muted-on-paper)]">
        {session?.email} · Meet Your Match member
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-full bg-[var(--flame)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--flame-dim)]"
        >
          Back to site
        </Link>
        <button
          onClick={logout}
          className="rounded-full border border-[var(--paper-line)] px-5 py-2.5 text-sm font-semibold text-[var(--ink-text)] transition-colors hover:border-[var(--flame)] hover:text-[var(--flame-dim)]"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute allow={["user"]}>
      <DashboardContent />
    </ProtectedRoute>
  );
}
