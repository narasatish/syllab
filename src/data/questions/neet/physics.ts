import { JEE_PHY_POOL } from "../jee/physics";

export const NEET_PHY_POOL = [
  ...JEE_PHY_POOL.slice(1),
  JEE_PHY_POOL[0]
].filter(Boolean).map((q, index) => ({
  ...q,
  id: `neet-phy-${String(index + 1).padStart(3, "0")}`,
  category: "NEET" as const
}));
