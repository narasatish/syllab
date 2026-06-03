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
import { loadGeneratedBank } from "./generated";
import { ExamCategory, Question, QuestionSubject } from "./types";

// CLASS_BANK starts with the small, bundled static bank so the first paint is
// instant. The large auto-generated MCQ bank is fetched lazily and merged in by
// ensureGeneratedMerged() (call it from the page that needs it, then re-render).
// NCERT-aligned boards reuse the generated chapters via shared keys.
const CLASS_BANK: Record<string, Question[]> = {};
for (const [cls, qs] of Object.entries(STATIC_CLASS_BANK)) CLASS_BANK[cls] = [...qs];

let mergedGenerated = false;
/** Fetch + merge the auto-generated MCQ bank into CLASS_BANK (once). */
export async function ensureGeneratedMerged(): Promise<void> {
  if (mergedGenerated) return;
  const gen = await loadGeneratedBank();
  for (const [key, qs] of Object.entries(gen)) {
    const cls = key.split("::")[0];
    (CLASS_BANK[cls] ||= []).push(...qs);
  }
  mergedGenerated = true;
}

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
