// Region-aware pricing. Meet Your Match launches first in Nigeria/West Africa,
// then the UK/Eurozone and North America — prices are set per-market rather
// than a flat FX conversion, matching local purchasing power.

export type RegionCode = "NG" | "GH" | "GB" | "EU" | "US";

export type Region = {
  code: RegionCode;
  label: string;
  shortLabel: string;
  flag: string;
  currency: string;
  symbol: string;
  prices: {
    free: string;
    plus: string;
    gold: string;
  };
  note: string;
};

export const regions: Region[] = [
  {
    code: "NG",
    label: "Nigeria",
    shortLabel: "NG",
    flag: "🇳🇬",
    currency: "NGN",
    symbol: "₦",
    prices: { free: "₦0", plus: "₦4,500", gold: "₦9,000" },
    note: "Launch market pricing for Nigeria",
  },
  {
    code: "GH",
    label: "Ghana & West Africa",
    shortLabel: "GH",
    flag: "🇬🇭",
    currency: "GHS",
    symbol: "₵",
    prices: { free: "₵0", plus: "₵85", gold: "₵170" },
    note: "Regional pricing for Ghana and neighboring markets",
  },
  {
    code: "GB",
    label: "United Kingdom",
    shortLabel: "UK",
    flag: "🇬🇧",
    currency: "GBP",
    symbol: "£",
    prices: { free: "£0", plus: "£10", gold: "£19" },
    note: "UK pricing, billed in GBP",
  },
  {
    code: "EU",
    label: "Europe",
    shortLabel: "EU",
    flag: "🇪🇺",
    currency: "EUR",
    symbol: "€",
    prices: { free: "€0", plus: "€11", gold: "€22" },
    note: "Eurozone pricing, billed in EUR",
  },
  {
    code: "US",
    label: "United States & Canada",
    shortLabel: "US",
    flag: "🇺🇸",
    currency: "USD",
    symbol: "$",
    prices: { free: "$0", plus: "$12", gold: "$24" },
    note: "North America pricing, billed in USD",
  },
];

export function detectRegionFromTimeZone(timeZone: string): RegionCode {
  if (timeZone.includes("Lagos") || timeZone.includes("Africa/Lagos")) return "NG";
  if (timeZone.includes("Accra")) return "GH";
  if (timeZone.includes("London")) return "GB";
  if (timeZone.startsWith("Europe/")) return "EU";
  if (timeZone.startsWith("America/") || timeZone.includes("Toronto")) return "US";
  if (timeZone.startsWith("Africa/")) return "NG";
  return "US";
}

export function getRegion(code: RegionCode): Region {
  return regions.find((r) => r.code === code) ?? regions[4];
}
