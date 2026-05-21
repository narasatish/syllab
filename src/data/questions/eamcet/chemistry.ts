import { JEE_CHEM_POOL } from "../jee/chemistry";

export const EAMCET_CHEM_POOL = [
  ...JEE_CHEM_POOL.slice(3),
  ...JEE_CHEM_POOL.slice(0, 3)
].map((q, index) => ({
  ...q,
  id: `eamcet-chem-${String(index + 1).padStart(3, "0")}`,
  category: "EAMCET" as const
}));
