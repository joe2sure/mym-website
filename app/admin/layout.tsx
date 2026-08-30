"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuth } from "@/lib/auth/auth-context";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/waitlist", label: "Waitlist" },
  { href: "/admin/investors", label: "Investors" },
  { href: "/admin/activity", label: "Activity" },
];

function AdminShell({ children }: { children: ReactNode }) {
  const { session, logout } = useAuth();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <div className="mx-auto flex max-w-7xl">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-[var(--paper-line)] bg-[var(--paper-soft)] px-5 py-6 lg:flex">
          <Link href="/" className="mb-8 flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M12 2c0 4-4 5.5-4 10a4 4 0 0 0 8 0c0-1.4-.7-2.4-1.3-3.3-.4.9-1 1.4-1.5 1.4-.7 0-1-.6-.7-1.4C13.2 7.2 14 5.6 12 2Z"
                fill="var(--flame)"
              />
            </svg>
            <span className="font-display text-base text-[var(--ink-text)]">MYM Admin</span>
          </Link>

          <nav className="flex flex-1 flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-[0.85rem] font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-[var(--ink)] text-[var(--paper-text)]"
                    : "text-[var(--muted-on-paper)] hover:bg-black/5 hover:text-[var(--ink-text)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-[var(--paper-line)] pt-4">
            <p className="truncate text-[0.82rem] font-semibold text-[var(--ink-text)]">{session?.name}</p>
            <p className="truncate text-[0.72rem] text-[var(--muted-on-paper)]">{session?.email}</p>
            <button
              onClick={logout}
              className="mt-3 w-full rounded-full border border-[var(--paper-line)] py-2 text-[0.78rem] font-semibold text-[var(--ink-text)] transition-colors hover:border-[var(--flame)] hover:text-[var(--flame-dim)]"
            >
              Log out
            </button>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-[var(--paper-line)] bg-[var(--paper)] px-6 py-4 lg:hidden">
            <span className="font-display text-base text-[var(--ink-text)]">MYM Admin</span>
            <button
              onClick={logout}
              className="rounded-full border border-[var(--paper-line)] px-3 py-1.5 text-[0.75rem] font-semibold text-[var(--ink-text)]"
            >
              Log out
            </button>
          </header>
          <main className="flex-1 px-6 py-8 sm:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allow={["admin"]}>
      <AdminShell>{children}</AdminShell>
    </ProtectedRoute>
  );
}
