import type { Device, Referrer } from "@/lib/data/types";
import { detectRegionFromTimeZone, getRegion } from "@/lib/regions";

export function detectDevice(): Device {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent.toLowerCase();
  if (/ipad|tablet/.test(ua)) return "tablet";
  if (/mobi|iphone|android/.test(ua)) return "mobile";
  return "desktop";
}

export function detectReferrer(): Referrer {
  if (typeof document === "undefined" || !document.referrer) return "direct";
  try {
    const host = new URL(document.referrer).hostname;
    if (/google|bing|duckduckgo|yahoo/.test(host)) return "search";
    if (/facebook|instagram|twitter|x\.com|tiktok|linkedin/.test(host)) return "social";
    return "referral";
  } catch {
    return "direct";
  }
}

/** Rough country guess from the browser timezone — good enough for a
 * demo without a real IP-geolocation service on the backend. */
export function detectCountry(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const code = detectRegionFromTimeZone(tz);
    const region = getRegion(code);
    return region.label.split(" & ")[0].split(",")[0];
  } catch {
    return "Unknown";
  }
}
