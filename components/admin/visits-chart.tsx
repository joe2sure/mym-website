"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export function VisitsChart({ data }: { data: { label: string; count: number }[] }) {
  return (
    <div className="rounded-2xl border border-[var(--paper-line)] bg-[var(--paper-soft)] p-5">
      <p className="font-mono text-[0.68rem] uppercase tracking-widest text-[var(--muted-on-paper)]">
        Site visits — last 30 days
      </p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
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
            <Line
              type="monotone"
              dataKey="count"
              stroke="var(--flame)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
