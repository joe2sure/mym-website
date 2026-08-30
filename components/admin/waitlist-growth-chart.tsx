"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export function WaitlistGrowthChart({ data }: { data: { label: string; total: number }[] }) {
  return (
    <div className="rounded-2xl border border-[var(--paper-line)] bg-[var(--paper-soft)] p-5">
      <p className="font-mono text-[0.68rem] uppercase tracking-widest text-[var(--muted-on-paper)]">
        Waitlist growth — last 30 days
      </p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="waitlistFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--ember)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="var(--ember)" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--paper-line)" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "var(--muted-on-paper)" }}
              interval={Math.ceil(data.length / 8)}
              axisLine={{ stroke: "var(--paper-line)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted-on-paper)" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: "var(--ink)",
                border: "none",
                borderRadius: 10,
                fontSize: 12,
                color: "var(--paper-text)",
              }}
              labelStyle={{ color: "var(--muted-on-ink)" }}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="var(--flame-dim)"
              strokeWidth={2.5}
              fill="url(#waitlistFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
