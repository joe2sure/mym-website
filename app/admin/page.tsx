"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { useVisits } from "@/hooks/use-visits";
import { useWaitlist } from "@/hooks/use-waitlist";
import { useInvestors } from "@/hooks/use-investors";
import {
  seriesByDay,
  cumulativeByDay,
  tierBreakdown,
  countryBreakdown,
  investorStatusBreakdown,
  summaryStats,
} from "@/lib/analytics/aggregate";
import { KpiCard } from "@/components/admin/kpi-card";
import { VisitsChart } from "@/components/admin/visits-chart";
import { WaitlistGrowthChart } from "@/components/admin/waitlist-growth-chart";
import { TierBreakdown } from "@/components/admin/tier-breakdown";
import { CountryBreakdown } from "@/components/admin/country-breakdown";
import { InvestorPipeline } from "@/components/admin/investor-pipeline";

export default function AdminOverviewPage() {
  const { session } = useAuth();
  const { visits } = useVisits();
  const { entries: waitlist } = useWaitlist();
  const { leads: investors } = useInvestors();

  const stats = summaryStats(visits, waitlist, investors);
  const visitSeries = seriesByDay(visits, 30);
  const waitlistGrowth = cumulativeByDay(waitlist, 30);
  const tiers = tierBreakdown(waitlist);
  const waitlistCountries = countryBreakdown(waitlist, 8);
  const visitorCountries = countryBreakdown(visits, 8);
  const pipeline = investorStatusBreakdown(investors);

  return (
    <div>
      <p className="section-label mb-2 text-[var(--flame-dim)]">Admin · Analytics</p>
      <h1 className="font-display text-3xl text-[var(--ink-text)]">
        Welcome back, {session?.name?.split(" ")[0]}.
      </h1>
      <p className="mt-2 max-w-lg text-[0.9rem] text-[var(--muted-on-paper)]">
        Live snapshot of site traffic, waitlist demand, and the investor pipeline.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          label="Site visits"
          value={stats.totalVisits.toLocaleString()}
          sublabel={`${stats.visitsThisWeek} this week · ${stats.uniqueSessions} unique`}
        />
        <KpiCard
          label="Waitlist"
          value={stats.totalWaitlist.toLocaleString()}
          sublabel={`${stats.waitlistThisWeek} this week · ${stats.converted} converted`}
        />
        <KpiCard
          label="Investor leads"
          value={stats.totalInvestors.toLocaleString()}
          sublabel={`${stats.demoRequests} demo requests`}
        />
        <KpiCard
          label="Visit → waitlist"
          value={`${stats.conversionRate}%`}
          sublabel="of unique visitors joined"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <VisitsChart data={visitSeries} />
        <WaitlistGrowthChart data={waitlistGrowth} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <TierBreakdown data={tiers} />
        <InvestorPipeline data={pipeline} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <CountryBreakdown title="Waitlist signups by country" data={waitlistCountries} />
        <CountryBreakdown title="Site visits by country" data={visitorCountries} />
      </div>
    </div>
  );
}
