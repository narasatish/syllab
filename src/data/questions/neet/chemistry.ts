import { JEE_CHEM_POOL } from "../jee/chemistry";

export const NEET_CHEM_POOL = [
  ...JEE_CHEM_POOL.slice(1),
  JEE_CHEM_POOL[0]
].filter(Boolean).map((q, index) => ({
  ...q,
  id: `neet-chem-${String(index + 1).padStart(3, "0")}`,
  category: "NEET" as const
}));
