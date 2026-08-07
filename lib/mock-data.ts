// Mock data layer — simulates what would normally come from the
// Meet Your Match API. Every number here is illustrative/demo data,
// structured the way the real product would shape it.

export type LiveEvent = {
  id: string;
  city: string;
  country: string;
  kind: "match" | "message" | "date";
  a: string;
  b: string;
  minutesAgo: number;
};

export const liveEvents: LiveEvent[] = [
  { id: "ev1", city: "Lagos", country: "NG", kind: "match", a: "Aisha", b: "Tunde", minutesAgo: 1 },
  { id: "ev2", city: "Nairobi", country: "KE", kind: "date", a: "Wanjiru", b: "Otieno", minutesAgo: 3 },
  { id: "ev3", city: "Austin", country: "US", kind: "message", a: "Maya", b: "Jordan", minutesAgo: 2 },
  { id: "ev4", city: "Accra", country: "GH", kind: "match", a: "Efua", b: "Kwame", minutesAgo: 4 },
  { id: "ev5", city: "Toronto", country: "CA", kind: "match", a: "Sofia", b: "Liam", minutesAgo: 1 },
  { id: "ev6", city: "Lisbon", country: "PT", kind: "date", a: "Ines", b: "Tiago", minutesAgo: 6 },
  { id: "ev7", city: "Enugu", country: "NG", kind: "message", a: "Ngozi", b: "Emeka", minutesAgo: 2 },
  { id: "ev8", city: "London", country: "UK", kind: "match", a: "Priya", b: "Daniel", minutesAgo: 5 },
  { id: "ev9", city: "São Paulo", country: "BR", kind: "match", a: "Camila", b: "Rafael", minutesAgo: 3 },
  { id: "ev10", city: "Nashville", country: "US", kind: "date", a: "Grace", b: "Micah", minutesAgo: 7 },
];

export type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  mock: "swipe" | "chat" | "compatibility" | "verify";
};

export const features: Feature[] = [
  {
    id: "engine",
    eyebrow: "The engine",
    title: "A compatibility score you can actually read",
    description:
      "Every profile carries a live compatibility breakdown instead of a black-box percentage — built from values, lifestyle pace, and how two people actually communicate in-app.",
    bullets: [
      "Weighted signal across 40+ compatibility inputs",
      "Recalculates as conversations happen, not just at sign-up",
      "Shows the 'why' behind a match, not just the score",
    ],
    mock: "compatibility",
  },
  {
    id: "discovery",
    eyebrow: "Discovery",
    title: "Fewer cards, better odds",
    description:
      "Meet Your Match caps daily discovery on purpose. A smaller, better-matched stack outperforms an infinite one — for attention, for intent, and for retention.",
    bullets: [
      "Curated batches instead of infinite scroll",
      "Intent filters: casual, dating, long-term, still deciding",
      "Mutual-interest nudges before the first message",
    ],
    mock: "swipe",
  },
  {
    id: "conversation",
    eyebrow: "Conversation",
    title: "Built to get past 'hey'",
    description:
      "Shared prompts, response-based icebreakers, and a nudge system that moves stalled chats toward a real plan — without pushing anyone into something they didn't ask for.",
    bullets: [
      "Prompt-matched icebreakers pulled from both profiles",
      "Gentle stall-detection nudges after 48 hours of silence",
      "One-tap 'suggest a date' when both sides are ready",
    ],
    mock: "chat",
  },
  {
    id: "trust",
    eyebrow: "Trust & safety",
    title: "Verified people, not just verified photos",
    description:
      "Selfie-liveness checks, ID cross-reference, and always-on moderation sit underneath every profile — visible to users as a simple badge, invisible as friction.",
    bullets: [
      "Liveness-checked selfie verification at sign-up",
      "Real-time abuse & catfish detection on media uploads",
      "In-app panic and block flow reviewed within minutes",
    ],
    mock: "verify",
  },
];

export type Step = {
  index: string;
  title: string;
  description: string;
};

export const steps: Step[] = [
  {
    index: "01",
    title: "Build a profile that isn't a highlight reel",
    description:
      "Guided prompts replace the blank-page problem. Photos, values, and a short compatibility quiz — done in under six minutes.",
  },
  {
    index: "02",
    title: "Get a small, deliberate stack each day",
    description:
      "No infinite scroll. A capped batch of high-fit profiles arrives daily, ranked by the compatibility engine, not by who paid to be seen.",
  },
  {
    index: "03",
    title: "Match with context, not just a photo",
    description:
      "See the compatibility breakdown before the first message — shared pace, values overlap, and what tends to make conversations work.",
  },
  {
    index: "04",
    title: "Move from chat to a real first date",
    description:
      "Icebreakers, scheduling nudges, and safety check-ins carry the conversation forward until it becomes plans.",
  },
];

export type Metric = {
  label: string;
  value: string;
  detail: string;
};

// Illustrative traction metrics for demo purposes.
export const metrics: Metric[] = [
  { label: "Waitlist signups", value: "48,200+", detail: "across 6 launch metros, pre-launch" },
  { label: "Median time to first reply", value: "11 min", detail: "vs. 42 min industry benchmark*" },
  { label: "7-day match-to-chat rate", value: "63%", detail: "matches that produce a real conversation" },
  { label: "Profile verification rate", value: "94%", detail: "of active users complete liveness check" },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "I matched with three people in my first week and actually met one of them for coffee. It felt less like a slot machine and more like the app was paying attention.",
    name: "Chidinma O.",
    role: "Beta user, Lagos",
  },
  {
    id: "t2",
    quote:
      "The compatibility breakdown sounds gimmicky until you see it. Knowing we were both 'early riser, homebody, ready-to-settle' before the first message changed how I opened the chat.",
    name: "Marcus T.",
    role: "Beta user, Austin",
  },
  {
    id: "t3",
    quote:
      "As someone who's been catfished twice on other apps, the verification badge is the first thing I check now. I don't open a chat without it.",
    name: "Funmi A.",
    role: "Beta user, Abuja",
  },
];

export type MarketStat = {
  label: string;
  value: string;
  caption: string;
};

// Illustrative market sizing for demo purposes.
export const marketStats: MarketStat[] = [
  { label: "TAM", value: "$9.9B", caption: "Global online dating services market" },
  { label: "SAM", value: "$1.4B", caption: "English-speaking + West-African urban markets" },
  { label: "SOM", value: "$62M", caption: "Reachable in 36 months at current CAC" },
];

export type RevenueStream = {
  name: string;
  description: string;
  share: number;
};

export const revenueStreams: RevenueStream[] = [
  { name: "Subscriptions", description: "Match+ and Match Gold monthly tiers", share: 58 },
  { name: "Boosts & spotlight", description: "Pay-per-use visibility windows", share: 24 },
  { name: "Verified events", description: "Curated in-person meetups for members", share: 12 },
  { name: "Data-safe partnerships", description: "Anonymized compatibility research licensing", share: 6 },
];

export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Match",
    price: "$0",
    cadence: "forever",
    tagline: "Everything you need to find out if this works for you.",
    features: [
      "Daily curated match batch",
      "Compatibility breakdown on every match",
      "Verified-badge visibility",
      "Standard messaging",
    ],
  },
  {
    id: "plus",
    name: "Match+",
    price: "$12",
    cadence: "per month",
    tagline: "For people who want more control over discovery.",
    features: [
      "Everything in Match",
      "See who's already interested",
      "Unlimited rewinds & filters",
      "2 profile boosts / month",
    ],
    highlighted: true,
  },
  {
    id: "gold",
    name: "Match Gold",
    price: "$24",
    cadence: "per month",
    tagline: "For people ready to move fast, safely.",
    features: [
      "Everything in Match+",
      "Priority placement in daily batch",
      "Advanced intent & lifestyle filters",
      "Dedicated safety concierge line",
    ],
  },
];
