export type FilterSelect = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

export function TableToolbar({
  search,
  onSearch,
  searchPlaceholder,
  filters,
  onExport,
  resultCount,
}: {
  search: string;
  onSearch: (value: string) => void;
  searchPlaceholder: string;
  filters: FilterSelect[];
  onExport: () => void;
  resultCount: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={searchPlaceholder}
        className="w-full max-w-xs rounded-full border border-[var(--paper-line)] bg-white px-4 py-2 text-[0.85rem] text-[var(--ink-text)] placeholder:text-[var(--muted-on-paper)] focus:border-[var(--flame-dim)] focus:outline-none"
      />

      {filters.map((f) => (
        <select
          key={f.label}
          value={f.value}
          onChange={(e) => f.onChange(e.target.value)}
          className="rounded-full border border-[var(--paper-line)] bg-white px-3.5 py-2 text-[0.82rem] text-[var(--ink-text)] focus:border-[var(--flame-dim)] focus:outline-none"
        >
          {f.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ))}

      <span className="text-[0.78rem] text-[var(--muted-on-paper)]">{resultCount} results</span>

      <button
        onClick={onExport}
        className="ml-auto rounded-full border border-[var(--paper-line)] px-4 py-2 text-[0.8rem] font-semibold text-[var(--ink-text)] transition-colors hover:border-[var(--flame-dim)] hover:text-[var(--flame-dim)]"
      >
        Export CSV
      </button>
    </div>
  );
}
