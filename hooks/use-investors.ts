"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getInvestors,
  addInvestorLead,
  updateInvestorStatus,
  removeInvestorLead,
  subscribeInvestors,
} from "@/lib/data/investor-store";
import type { InvestorLead, InvestorStatus } from "@/lib/data/types";

export function useInvestors() {
  const [leads, setLeads] = useState<InvestorLead[]>([]);

  useEffect(() => {
    // One-time hydration of the client-only store into state on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLeads(getInvestors());
    return subscribeInvestors(() => setLeads(getInvestors()));
  }, []);

  const submit = useCallback(
    (input: { name: string; fund: string; email: string; requestedAmount: string; wantsDemo: boolean }) => {
      return addInvestorLead(input);
    },
    []
  );

  const setStatus = useCallback((id: string, status: InvestorStatus) => {
    updateInvestorStatus(id, status);
  }, []);

  const remove = useCallback((id: string) => {
    removeInvestorLead(id);
  }, []);

  return { leads, submit, setStatus, remove };
}
