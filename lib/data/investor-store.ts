import { readStore, writeStore, subscribeStore, newId } from "@/lib/store/local-store";
import { SEED_INVESTORS } from "./seed-investors";
import { logActivity } from "./activity-store";
import type { InvestorLead, InvestorStatus } from "./types";
import { INVESTOR_STATUS_LABEL } from "./types";

const KEY = "mym_investors_v1";

export function getInvestors(): InvestorLead[] {
  return readStore<InvestorLead[]>(KEY, SEED_INVESTORS);
}

function save(leads: InvestorLead[]) {
  writeStore(KEY, leads);
}

export function addInvestorLead(input: {
  name: string;
  fund: string;
  email: string;
  requestedAmount: string;
  wantsDemo: boolean;
}): InvestorLead {
  const lead: InvestorLead = {
    id: newId("inv"),
    name: input.name.trim(),
    fund: input.fund.trim(),
    email: input.email.trim(),
    requestedAmount: input.requestedAmount,
    wantsDemo: input.wantsDemo,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  save([...getInvestors(), lead]);
  logActivity(
    "investor_submitted",
    `${lead.name} (${lead.fund}) requested ${lead.wantsDemo ? "a demo" : "the deck"}`,
    lead.email
  );
  return lead;
}

export function updateInvestorStatus(id: string, status: InvestorStatus): void {
  const current = getInvestors();
  const lead = current.find((l) => l.id === id);
  save(current.map((l) => (l.id === id ? { ...l, status } : l)));
  if (lead) {
    logActivity(
      "investor_status_changed",
      `${lead.name} (${lead.fund}) → ${INVESTOR_STATUS_LABEL[status]}`,
      lead.email
    );
  }
}

export function removeInvestorLead(id: string): void {
  save(getInvestors().filter((l) => l.id !== id));
}

export function subscribeInvestors(cb: () => void): () => void {
  return subscribeStore(KEY, cb);
}
