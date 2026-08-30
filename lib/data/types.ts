import type { Tier } from "@/lib/auth/types";

export type WaitlistStatus = "new" | "contacted" | "invited" | "converted";

export type WaitlistEntry = {
  id: string;
  email: string;
  /** Which pricing tier they said they'd join the waitlist for. */
  tier: Tier;
  country: string;
  status: WaitlistStatus;
  source: "landing_page" | "referral" | "admin_manual";
  createdAt: string; // ISO timestamp
};

export type InvestorStatus =
  | "new"
  | "contacted"
  | "demo_scheduled"
  | "demo_completed"
  | "passed"
  | "committed";

export type InvestorLead = {
  id: string;
  name: string;
  fund: string;
  email: string;
  /** Free-text ticket size, e.g. "$250k–$500k" — this is a mock lead form, not a cap table. */
  requestedAmount: string;
  wantsDemo: boolean;
  status: InvestorStatus;
  createdAt: string; // ISO timestamp
};

export const WAITLIST_STATUS_LABEL: Record<WaitlistStatus, string> = {
  new: "New",
  contacted: "Contacted",
  invited: "Invited",
  converted: "Converted",
};

export const INVESTOR_STATUS_LABEL: Record<InvestorStatus, string> = {
  new: "New",
  contacted: "Contacted",
  demo_scheduled: "Demo scheduled",
  demo_completed: "Demo completed",
  passed: "Passed",
  committed: "Committed",
};

export const TIER_LABEL: Record<Tier, string> = {
  free: "Match",
  plus: "Match+",
  gold: "Match Gold",
};

export type Device = "mobile" | "desktop" | "tablet";
export type Referrer = "direct" | "search" | "social" | "referral";

export type PageView = {
  id: string;
  path: string;
  country: string;
  device: Device;
  referrer: Referrer;
  sessionId: string;
  createdAt: string; // ISO timestamp
};

export const REFERRER_LABEL: Record<Referrer, string> = {
  direct: "Direct",
  search: "Search",
  social: "Social",
  referral: "Referral",
};

export type ActivityType =
  | "waitlist_joined"
  | "waitlist_status_changed"
  | "investor_submitted"
  | "investor_status_changed"
  | "admin_login"
  | "user_login";

export type ActivityEvent = {
  id: string;
  type: ActivityType;
  summary: string;
  actor: string; // email of the person the event is about/by
  createdAt: string; // ISO timestamp
};

export const ACTIVITY_TYPE_LABEL: Record<ActivityType, string> = {
  waitlist_joined: "Waitlist join",
  waitlist_status_changed: "Waitlist status change",
  investor_submitted: "Investor lead",
  investor_status_changed: "Investor status change",
  admin_login: "Admin login",
  user_login: "User login",
};
