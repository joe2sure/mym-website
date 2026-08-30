export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-3 pt-2">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="rounded-full border border-[var(--paper-line)] px-3.5 py-1.5 text-[0.78rem] font-semibold text-[var(--ink-text)] disabled:opacity-40"
      >
        Prev
      </button>
      <span className="text-[0.78rem] text-[var(--muted-on-paper)]">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="rounded-full border border-[var(--paper-line)] px-3.5 py-1.5 text-[0.78rem] font-semibold text-[var(--ink-text)] disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
