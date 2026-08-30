import type { PageView, WaitlistEntry, InvestorLead, InvestorStatus } from "@/lib/data/types";
import { TIER_LABEL, INVESTOR_STATUS_LABEL } from "@/lib/data/types";
import type { Tier } from "@/lib/auth/types";

function dayKey(iso: string): string {
  return iso.slice(0, 10); // YYYY-MM-DD
}

function lastNDays(n: number): string[] {
  const days: string[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

export function shortDateLabel(key: string): string {
  const [, m, d] = key.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}`;
}

export function seriesByDay<T extends { createdAt: string }>(
  items: T[],
  days = 30
): { date: string; label: string; count: number }[] {
  const buckets = new Map<string, number>();
  for (const item of items) {
    const key = dayKey(item.createdAt);
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }
  return lastNDays(days).map((date) => ({
    date,
    label: shortDateLabel(date),
    count: buckets.get(date) ?? 0,
  }));
}

export function cumulativeByDay<T extends { createdAt: string }>(
  items: T[],
  days = 30
): { date: string; label: string; total: number }[] {
  const before = items.filter((i) => dayKey(i.createdAt) < lastNDays(days)[0]).length;
  const daily = seriesByDay(items, days);
  let running = before;
  return daily.map((d) => {
    running += d.count;
    return { date: d.date, label: d.label, total: running };
  });
}

export function tierBreakdown(entries: WaitlistEntry[]) {
  const total = entries.length || 1;
  const tiers: Tier[] = ["free", "plus", "gold"];
  return tiers.map((tier) => {
    const count = entries.filter((e) => e.tier === tier).length;
    return { tier, label: TIER_LABEL[tier], count, pct: Math.round((count / total) * 100) };
  });
}

export function countryBreakdown(items: { country: string }[], topN = 8) {
  const counts = new Map<string, number>();
  for (const item of items) counts.set(item.country, (counts.get(item.country) ?? 0) + 1);
  const total = items.length || 1;
  return Array.from(counts.entries())
    .map(([country, count]) => ({ country, count, pct: Math.round((count / total) * 100) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);
}

export function investorStatusBreakdown(leads: InvestorLead[]) {
  const order: InvestorStatus[] = [
    "new",
    "contacted",
    "demo_scheduled",
    "demo_completed",
    "committed",
    "passed",
  ];
  return order.map((status) => ({
    status,
    label: INVESTOR_STATUS_LABEL[status],
    count: leads.filter((l) => l.status === status).length,
  }));
}

export function summaryStats(visits: PageView[], waitlist: WaitlistEntry[], investors: InvestorLead[]) {
  const uniqueSessions = new Set(visits.map((v) => v.sessionId)).size;

  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const waitlistThisWeek = waitlist.filter((e) => new Date(e.createdAt) >= weekAgo).length;
  const visitsThisWeek = visits.filter((v) => new Date(v.createdAt) >= weekAgo).length;

  const demoRequests = investors.filter((l) => l.wantsDemo).length;
  const converted = waitlist.filter((e) => e.status === "converted").length;
  const conversionRate = visits.length ? Math.round((waitlist.length / uniqueSessions) * 1000) / 10 : 0;

  return {
    totalVisits: visits.length,
    uniqueSessions,
    visitsThisWeek,
    totalWaitlist: waitlist.length,
    waitlistThisWeek,
    converted,
    totalInvestors: investors.length,
    demoRequests,
    conversionRate, // % of unique sessions that joined the waitlist
  };
}
