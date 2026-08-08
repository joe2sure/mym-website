"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { regions, getRegion, detectRegionFromTimeZone, Region, RegionCode } from "@/lib/regions";

type RegionContextValue = {
  region: Region;
  regions: Region[];
  detecting: boolean;
  setRegionCode: (code: RegionCode) => void;
};

const RegionContext = createContext<RegionContextValue | null>(null);

export function RegionProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState<RegionCode>("NG");
  const [detecting, setDetecting] = useState(true);

  useEffect(() => {
    let detected: RegionCode = "NG";
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      detected = detectRegionFromTimeZone(tz);
    } catch {
      detected = "NG";
    }
    const t = setTimeout(() => {
      setCode(detected);
      setDetecting(false);
    }, 650);
    return () => clearTimeout(t);
  }, []);

  return (
    <RegionContext.Provider
      value={{
        region: getRegion(code),
        regions,
        detecting,
        setRegionCode: (c) => setCode(c),
      }}
    >
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used within a RegionProvider");
  return ctx;
}
