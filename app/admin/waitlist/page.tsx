"use client";

import { useMemo, useState } from "react";
import { useWaitlist } from "@/hooks/use-waitlist";
import { WAITLIST_STATUS_LABEL, TIER_LABEL } from "@/lib/data/types";
import type { WaitlistStatus } from "@/lib/data/types";
import type { Tier } from "@/lib/auth/types";
import { toCSV, downloadCSV } from "@/lib/analytics/csv";
import { TableToolbar } from "@/components/admin/table-toolbar";
import { StatusBadge } from "@/components/admin/status-badge";
import { Pagination } from "@/components/admin/pagination";

const PAGE_SIZE = 15;
const STATUS_OPTIONS: WaitlistStatus[] = ["new", "contacted", "invited", "converted"];
const TIER_OPTIONS: Tier[] = ["free", "plus", "gold"];

export default function WaitlistAdminPage() {
  const { entries, setStatus, remove } = useWaitlist();
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  const countries = useMemo(
    () => Array.from(new Set(entries.map((e) => e.country))).sort(),
    [entries]
  );

  const filtered = useMemo(() => {
    return entries
      .filter((e) => (search ? e.email.toLowerCase().includes(search.toLowerCase()) : true))
      .filter((e) => (tierFilter === "all" ? true : e.tier === tierFilter))
      .filter((e) => (statusFilter === "all" ? true : e.status === statusFilter))
      .filter((e) => (countryFilter === "all" ? true : e.country === countryFilter))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [entries, search, tierFilter, statusFilter, countryFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleFilterChange(setter: (v: string) => void) {
    return (v: string) => {
      setter(v);
      setPage(1);
    };
  }

  function exportCSV() {
    const csv = toCSV(filtered, [
      { key: "email", header: "Email" },
      { key: "tier", header: "Tier" },
      { key: "country", header: "Country" },
      { key: "status", header: "Status" },
      { key: "source", header: "Source" },
      { key: "createdAt", header: "Joined At" },
    ]);
    downloadCSV(`mym-waitlist-${new Date().toISOString().slice(0, 10)}.csv`, csv);
  }

  return (
    <div>
      <p className="section-label mb-2 text-[var(--flame-dim)]">Admin</p>
      <h1 className="font-display text-3xl text-[var(--ink-text)]">Waitlist</h1>
      <p className="mt-2 max-w-lg text-[0.9rem] text-[var(--muted-on-paper)]">
        Everyone who&apos;s asked to be notified when Meet Your Match opens in their city.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <TableToolbar
          search={search}
          onSearch={(v) => {
            setSearch(v);
            setPage(1);
          }}
          searchPlaceholder="Search by email…"
          resultCount={filtered.length}
          onExport={exportCSV}
          filters={[
            {
              label: "Tier",
              value: tierFilter,
              onChange: handleFilterChange(setTierFilter),
              options: [
                { value: "all", label: "All plans" },
                ...TIER_OPTIONS.map((t) => ({ value: t, label: TIER_LABEL[t] })),
              ],
            },
            {
              label: "Status",
              value: statusFilter,
              onChange: handleFilterChange(setStatusFilter),
              options: [
                { value: "all", label: "All statuses" },
                ...STATUS_OPTIONS.map((s) => ({ value: s, label: WAITLIST_STATUS_LABEL[s] })),
              ],
            },
            {
              label: "Country",
              value: countryFilter,
              onChange: handleFilterChange(setCountryFilter),
              options: [
                { value: "all", label: "All countries" },
                ...countries.map((c) => ({ value: c, label: c })),
              ],
            },
          ]}
        />

        <div className="overflow-x-auto rounded-2xl border border-[var(--paper-line)] bg-[var(--paper-soft)]">
          <table className="w-full text-left text-[0.85rem]">
            <thead>
              <tr className="border-b border-[var(--paper-line)] text-[0.72rem] uppercase tracking-wide text-[var(--muted-on-paper)]">
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Plan</th>
                <th className="px-4 py-3 font-medium">Country</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((e) => (
                <tr key={e.id} className="border-b border-[var(--paper-line)] last:border-0">
                  <td className="px-4 py-3 text-[var(--ink-text)]">{e.email}</td>
                  <td className="px-4 py-3 text-[var(--muted-on-paper)]">{TIER_LABEL[e.tier]}</td>
                  <td className="px-4 py-3 text-[var(--muted-on-paper)]">{e.country}</td>
                  <td className="px-4 py-3 text-[var(--muted-on-paper)]">
                    {new Date(e.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={e.status}
                      onChange={(ev) => setStatus(e.id, ev.target.value as WaitlistStatus)}
                      className="rounded-full border border-[var(--paper-line)] bg-white px-2.5 py-1 text-[0.75rem] focus:outline-none"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {WAITLIST_STATUS_LABEL[s]}
                        </option>
                      ))}
                    </select>
                    <span className="ml-2 hidden sm:inline-block">
                      <StatusBadge status={e.status} label={WAITLIST_STATUS_LABEL[e.status]} />
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        if (window.confirm(`Remove ${e.email} from the waitlist?`)) remove(e.id);
                      }}
                      className="text-[0.78rem] font-semibold text-rose-600 hover:text-rose-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-[var(--muted-on-paper)]">
                    No signups match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}
