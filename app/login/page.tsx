"use client";

import { Suspense, useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { DEMO_CREDENTIALS } from "@/lib/auth/mock-users";
import type { Role } from "@/lib/auth/types";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();

  const [role, setRole] = useState<Role>("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = login(email, password, role);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    const next = params.get("next");
    router.push(next ?? (role === "admin" ? "/admin" : "/dashboard"));
  }

  function fillDemo() {
    const creds = DEMO_CREDENTIALS[role];
    setEmail(creds.email);
    setPassword(creds.password);
    setError(null);
  }

  return (
    <div className="grain flex min-h-screen items-center justify-center bg-[var(--ink)] px-6 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M12 2c0 4-4 5.5-4 10a4 4 0 0 0 8 0c0-1.4-.7-2.4-1.3-3.3-.4.9-1 1.4-1.5 1.4-.7 0-1-.6-.7-1.4C13.2 7.2 14 5.6 12 2Z"
              fill="var(--flame)"
            />
          </svg>
          <span className="font-display text-lg text-[var(--paper-text)]">Meet Your Match</span>
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <p className="section-label mb-2 text-[var(--ember)]">Sign in</p>
          <h1 className="font-display text-2xl text-[var(--paper-text)]">
            {role === "admin" ? "Admin console" : "Welcome back"}
          </h1>

          <div className="mt-6 flex rounded-full border border-white/10 bg-black/20 p-1">
            {(["user", "admin"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRole(r);
                  setError(null);
                }}
                className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
                  role === r
                    ? "bg-[var(--flame)] text-white"
                    : "text-[var(--muted-on-ink)] hover:text-[var(--paper-text)]"
                }`}
              >
                {r === "user" ? "User" : "Admin"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[0.68rem] uppercase tracking-widest text-[var(--muted-on-ink)]">
                Email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[var(--paper-text)] placeholder:text-white/30 focus:border-[var(--flame)] focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[0.68rem] uppercase tracking-widest text-[var(--muted-on-ink)]">
                Password
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[var(--paper-text)] placeholder:text-white/30 focus:border-[var(--flame)] focus:outline-none"
              />
            </label>

            {error && (
              <p className="rounded-lg border border-[var(--flame)]/30 bg-[var(--flame)]/10 px-3 py-2 text-[0.8rem] text-[var(--flame)]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 rounded-full bg-[var(--flame)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--flame-dim)] disabled:opacity-60"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <button
            type="button"
            onClick={fillDemo}
            className="mt-4 w-full rounded-full border border-white/10 py-2.5 text-[0.78rem] font-mono text-[var(--muted-on-ink)] transition-colors hover:border-[var(--flame)]/40 hover:text-[var(--paper-text)]"
          >
            Autofill demo {role} credentials
          </button>
        </div>

        <p className="mt-6 text-center text-[0.78rem] text-[var(--muted-on-ink)]">
          Mock auth for demo purposes — no real accounts are created.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
