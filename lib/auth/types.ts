export type Role = "admin" | "user";

export type Tier = "free" | "plus" | "gold";

export type MockUser = {
  id: string;
  name: string;
  email: string;
  /** Mock/demo only — never store plaintext passwords in a real app. */
  password: string;
  role: Role;
  tier: Tier | null; // null for admin accounts
  country: string;
  joinedAt: string;
};

export type Session = {
  userId: string;
  name: string;
  email: string;
  role: Role;
};
