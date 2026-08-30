"use client";

import { useMemo, useState } from "react";
import { useInvestors } from "@/hooks/use-investors";
import { INVESTOR_STATUS_LABEL } from "@/lib/data/types";
import type { InvestorStatus } from "@/lib/data/types";
import { toCSV, downloadCSV } from "@/lib/analytics/csv";
import { TableToolbar } from "@/components/admin/table-toolbar";
import { StatusBadge } from "@/components/admin/status-badge";
import { Pagination } from "@/components/admin/pagination";

const PAGE_SIZE = 15;
const STATUS_OPTIONS: InvestorStatus[] = [
  "new",
  "contacted",
  "demo_scheduled",
  "demo_completed",
  "committed",
  "passed",
];

export default function InvestorsAdminPage() {
  const { leads, setStatus, remove } = useInvestors();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [demoFilter, setDemoFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return leads
      .filter((l) =>
        q ? l.name.toLowerCase().includes(q) || l.fund.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) : true
      )
      .filter((l) => (statusFilter === "all" ? true : l.status === statusFilter))
      .filter((l) => (demoFilter === "all" ? true : demoFilter === "yes" ? l.wantsDemo : !l.wantsDemo))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [leads, search, statusFilter, demoFilter]);

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
      { key: "name", header: "Name" },
      { key: "fund", header: "Fund" },
      { key: "email", header: "Email" },
      { key: "requestedAmount", header: "Ticket Size" },
      { key: "wantsDemo", header: "Wants Demo" },
      { key: "status", header: "Status" },
      { key: "createdAt", header: "Submitted At" },
    ]);
    downloadCSV(`mym-investors-${new Date().toISOString().slice(0, 10)}.csv`, csv);
  }

  return (
    <div>
      <p className="section-label mb-2 text-[var(--flame-dim)]">Admin</p>
      <h1 className="font-display text-3xl text-[var(--ink-text)]">Investors</h1>
      <p className="mt-2 max-w-lg text-[0.9rem] text-[var(--muted-on-paper)]">
        Funds and angels who&apos;ve requested the deck or a live demo.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <TableToolbar
          search={search}
          onSearch={(v) => {
            setSearch(v);
            setPage(1);
          }}
          searchPlaceholder="Search by name, fund, or email…"
          resultCount={filtered.length}
          onExport={exportCSV}
          filters={[
            {
              label: "Status",
              value: statusFilter,
              onChange: handleFilterChange(setStatusFilter),
              options: [
                { value: "all", label: "All statuses" },
                ...STATUS_OPTIONS.map((s) => ({ value: s, label: INVESTOR_STATUS_LABEL[s] })),
              ],
            },
            {
              label: "Demo",
              value: demoFilter,
              onChange: handleFilterChange(setDemoFilter),
              options: [
                { value: "all", label: "Demo: all" },
                { value: "yes", label: "Wants demo" },
                { value: "no", label: "No demo" },
              ],
            },
          ]}
        />

        <div className="overflow-x-auto rounded-2xl border border-[var(--paper-line)] bg-[var(--paper-soft)]">
          <table className="w-full text-left text-[0.85rem]">
            <thead>
              <tr className="border-b border-[var(--paper-line)] text-[0.72rem] uppercase tracking-wide text-[var(--muted-on-paper)]">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Fund</th>
                <th className="px-4 py-3 font-medium">Ticket</th>
                <th className="px-4 py-3 font-medium">Demo?</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((l) => (
                <tr key={l.id} className="border-b border-[var(--paper-line)] last:border-0">
                  <td className="px-4 py-3 text-[var(--ink-text)]">
                    {l.name}
                    <div className="text-[0.72rem] text-[var(--muted-on-paper)]">{l.email}</div>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted-on-paper)]">{l.fund}</td>
                  <td className="px-4 py-3 text-[var(--muted-on-paper)]">{l.requestedAmount}</td>
                  <td className="px-4 py-3 text-[var(--muted-on-paper)]">{l.wantsDemo ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 text-[var(--muted-on-paper)]">
                    {new Date(l.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={l.status}
                      onChange={(ev) => setStatus(l.id, ev.target.value as InvestorStatus)}
                      className="rounded-full border border-[var(--paper-line)] bg-white px-2.5 py-1 text-[0.75rem] focus:outline-none"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {INVESTOR_STATUS_LABEL[s]}
                        </option>
                      ))}
                    </select>
                    <span className="ml-2 hidden sm:inline-block">
                      <StatusBadge status={l.status} label={INVESTOR_STATUS_LABEL[l.status]} />
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        if (window.confirm(`Remove ${l.name} (${l.fund})?`)) remove(l.id);
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
                  <td colSpan={7} className="px-4 py-10 text-center text-[var(--muted-on-paper)]">
                    No leads match these filters.
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
