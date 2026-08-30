import { MockUser, Role } from "./types";

// Seeded accounts for the demo. Plaintext passwords are fine here only
// because there is no real backend — this never ships against real users.
export const MOCK_USERS: MockUser[] = [
  {
    id: "adm-001",
    name: "Amara Chukwu",
    email: "admin@meetyourmatch.app",
    password: "admin123",
    role: "admin",
    tier: null,
    country: "Nigeria",
    joinedAt: "2025-11-02",
  },
  {
    id: "adm-002",
    name: "Femi Balogun",
    email: "ops@meetyourmatch.app",
    password: "admin123",
    role: "admin",
    tier: null,
    country: "Nigeria",
    joinedAt: "2025-11-10",
  },
  {
    id: "usr-001",
    name: "Zainab Bello",
    email: "user@meetyourmatch.app",
    password: "user123",
    role: "user",
    tier: "plus",
    country: "Nigeria",
    joinedAt: "2026-01-14",
  },
];

export const DEMO_CREDENTIALS: Record<Role, { email: string; password: string }> = {
  admin: { email: "admin@meetyourmatch.app", password: "admin123" },
  user: { email: "user@meetyourmatch.app", password: "user123" },
};

export function findUserByEmail(email: string): MockUser | undefined {
  return MOCK_USERS.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
}
