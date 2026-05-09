import { JEE_PHY_POOL } from "../jee/physics";

export const EAMCET_PHY_POOL = [
  ...JEE_PHY_POOL.slice(2),
  ...JEE_PHY_POOL.slice(0, 2)
].map((q, index) => ({
  ...q,
  id: `eamcet-phy-${String(index + 1).padStart(3, "0")}`,
  category: "EAMCET" as const
}));
