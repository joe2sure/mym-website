const COLORS: Record<string, string> = {
  // waitlist
  new: "bg-slate-100 text-slate-700",
  contacted: "bg-amber-100 text-amber-700",
  invited: "bg-orange-100 text-orange-700",
  converted: "bg-emerald-100 text-emerald-700",
  // investors
  demo_scheduled: "bg-violet-100 text-violet-700",
  demo_completed: "bg-indigo-100 text-indigo-700",
  committed: "bg-emerald-100 text-emerald-700",
  passed: "bg-rose-100 text-rose-700",
};

export function StatusBadge({ status, label }: { status: string; label: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-semibold ${
        COLORS[status] ?? "bg-slate-100 text-slate-700"
      }`}
    >
      {label}
    </span>
  );
}
