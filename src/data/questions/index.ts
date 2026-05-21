import { JEE_MATH_POOL } from "./jee/mathematics";
import { JEE_PHY_POOL } from "./jee/physics";
import { JEE_CHEM_POOL } from "./jee/chemistry";

import { EAMCET_MATH_POOL } from "./eamcet/mathematics";
import { EAMCET_PHY_POOL } from "./eamcet/physics";
import { EAMCET_CHEM_POOL } from "./eamcet/chemistry";

import { NEET_PHY_POOL } from "./neet/physics";
import { NEET_CHEM_POOL } from "./neet/chemistry";
import { BIOLOGY_POOL } from "./neet/biology";
import { CLASS_BANK } from "./classes";
import { ExamCategory, Question, QuestionSubject } from "./types";

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
