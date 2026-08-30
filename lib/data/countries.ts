// Broader than lib/regions.ts (which only covers the 5 launch-priced
// markets) — waitlist signups can come from anywhere, and analytics needs
// a realistic spread of countries to report on.

export type Country = { name: string; flag: string; region: "NG" | "GH" | "GB" | "EU" | "US" | "Other" };

export const COUNTRIES: Country[] = [
  { name: "Nigeria", flag: "🇳🇬", region: "NG" },
  { name: "Ghana", flag: "🇬🇭", region: "GH" },
  { name: "Kenya", flag: "🇰🇪", region: "Other" },
  { name: "South Africa", flag: "🇿🇦", region: "Other" },
  { name: "Egypt", flag: "🇪🇬", region: "Other" },
  { name: "United Kingdom", flag: "🇬🇧", region: "GB" },
  { name: "Germany", flag: "🇩🇪", region: "EU" },
  { name: "France", flag: "🇫🇷", region: "EU" },
  { name: "Ireland", flag: "🇮🇪", region: "EU" },
  { name: "Netherlands", flag: "🇳🇱", region: "EU" },
  { name: "United States", flag: "🇺🇸", region: "US" },
  { name: "Canada", flag: "🇨🇦", region: "US" },
  { name: "United Arab Emirates", flag: "🇦🇪", region: "Other" },
  { name: "India", flag: "🇮🇳", region: "Other" },
  { name: "Brazil", flag: "🇧🇷", region: "Other" },
];

export function findCountry(name: string): Country | undefined {
  return COUNTRIES.find((c) => c.name === name);
}
