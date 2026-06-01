import { JEE_MATH_POOL } from "./jee/mathematics";
import { JEE_PHY_POOL } from "./jee/physics";
import { JEE_CHEM_POOL } from "./jee/chemistry";

import { EAMCET_MATH_POOL } from "./eamcet/mathematics";
import { EAMCET_PHY_POOL } from "./eamcet/physics";
import { EAMCET_CHEM_POOL } from "./eamcet/chemistry";

import { NEET_PHY_POOL } from "./neet/physics";
import { NEET_CHEM_POOL } from "./neet/chemistry";
import { BIOLOGY_POOL } from "./neet/biology";
import { CLASS_BANK as STATIC_CLASS_BANK } from "./classes";
import { GENERATED_BANK } from "./generated";
import { ExamCategory, Question, QuestionSubject } from "./types";

// Merge auto-generated chapter MCQs (scripts/generate-mcqs.ts) into the static
// per-class bank so Daily Challenges / GK / any CLASS_BANK consumer immediately
// gets the larger pool. NCERT-aligned boards reuse these via shared chapters.
const CLASS_BANK: Record<string, Question[]> = (() => {
  const merged: Record<string, Question[]> = {};
  for (const [cls, qs] of Object.entries(STATIC_CLASS_BANK)) merged[cls] = [...qs];
  for (const [key, qs] of Object.entries(GENERATED_BANK)) {
    const cls = key.split("::")[0];
    (merged[cls] ||= []).push(...qs);
  }
  return merged;
})();

export const EXAM_BANK: Record<ExamCategory, Partial<Record<QuestionSubject, Question[]>>> = {
  "IIT JEE": {
    Mathematics: JEE_MATH_POOL,
    Physics: JEE_PHY_POOL,
    Chemistry: JEE_CHEM_POOL
  },

  EAMCET: {
    Mathematics: EAMCET_MATH_POOL,
    Physics: EAMCET_PHY_POOL,
    Chemistry: EAMCET_CHEM_POOL
  },

  NEET: {
    Physics: NEET_PHY_POOL,
    Chemistry: NEET_CHEM_POOL,
    Biology: BIOLOGY_POOL
  }
};

export { CLASS_BANK };
export type { DailyCategory, ExamCategory, Question, QuestionSubject } from "./types";
