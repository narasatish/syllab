import { JEE_MATH_POOL } from "../jee/mathematics";

export const EAMCET_MATH_POOL = [
  ...JEE_MATH_POOL.slice(2),
  ...JEE_MATH_POOL.slice(0, 2)
].map((q, index) => ({
  ...q,
  id: `eamcet-math-${String(index + 1).padStart(3, "0")}`,
  category: "EAMCET" as const
}));
