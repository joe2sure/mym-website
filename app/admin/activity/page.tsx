"use client";

import { useMemo, useState } from "react";
import { useActivity } from "@/hooks/use-activity";
import { ACTIVITY_TYPE_LABEL } from "@/lib/data/types";
import type { ActivityType } from "@/lib/data/types";
import { toCSV, downloadCSV } from "@/lib/analytics/csv";
import { TableToolbar } from "@/components/admin/table-toolbar";
import { Pagination } from "@/components/admin/pagination";

const PAGE_SIZE = 25;

const TYPE_OPTIONS: ActivityType[] = [
  "waitlist_joined",
  "waitlist_status_changed",
  "investor_submitted",
  "investor_status_changed",
  "admin_login",
  "user_login",
];

const TYPE_DOT: Record<ActivityType, string> = {
  waitlist_joined: "bg-[var(--flame)]",
  waitlist_status_changed: "bg-amber-500",
  investor_submitted: "bg-[var(--ink)]",
  investor_status_changed: "bg-violet-500",
  admin_login: "bg-emerald-500",
  user_login: "bg-slate-400",
};

export default function ActivityAdminPage() {
  const { events } = useActivity();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return events
      .filter((e) => (typeFilter === "all" ? true : e.type === typeFilter))
      .filter((e) =>
        q ? e.summary.toLowerCase().includes(q) || e.actor.toLowerCase().includes(q) : true
      );
  }, [events, search, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function exportCSV() {
    const csv = toCSV(filtered, [
      { key: "createdAt", header: "Time" },
      { key: "type", header: "Event" },
      { key: "actor", header: "Actor" },
      { key: "summary", header: "Summary" },
    ]);
    downloadCSV(`mym-activity-${new Date().toISOString().slice(0, 10)}.csv`, csv);
  }

  return (
    <div>
      <p className="section-label mb-2 text-[var(--flame-dim)]">Admin</p>
      <h1 className="font-display text-3xl text-[var(--ink-text)]">Activity</h1>
      <p className="mt-2 max-w-lg text-[0.9rem] text-[var(--muted-on-paper)]">
        Every waitlist join, status change, investor submission, and login — in one feed.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <TableToolbar
          search={search}
          onSearch={(v) => {
            setSearch(v);
            setPage(1);
          }}
          searchPlaceholder="Search by email or summary…"
          resultCount={filtered.length}
          onExport={exportCSV}
          filters={[
            {
              label: "Type",
              value: typeFilter,
              onChange: (v) => {
                setTypeFilter(v);
                setPage(1);
              },
              options: [
                { value: "all", label: "All events" },
                ...TYPE_OPTIONS.map((t) => ({ value: t, label: ACTIVITY_TYPE_LABEL[t] })),
              ],
            },
          ]}
        />

        <div className="rounded-2xl border border-[var(--paper-line)] bg-[var(--paper-soft)]">
          <ul className="divide-y divide-[var(--paper-line)]">
            {pageRows.map((e) => (
              <li key={e.id} className="flex items-start gap-3 px-4 py-3">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${TYPE_DOT[e.type]}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-[0.85rem] text-[var(--ink-text)]">{e.summary}</p>
                  <p className="mt-0.5 text-[0.72rem] text-[var(--muted-on-paper)]">
                    {ACTIVITY_TYPE_LABEL[e.type]} · {new Date(e.createdAt).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
            {pageRows.length === 0 && (
              <li className="px-4 py-10 text-center text-[0.85rem] text-[var(--muted-on-paper)]">
                No activity matches these filters.
              </li>
            )}
          </ul>
        </div>

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}
