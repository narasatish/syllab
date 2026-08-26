/**
 * heroQuizSamples.ts — a handful of REAL questions for the homepage showcase.
 *
 * Why a separate file instead of importing the bank: src/data/chapterMcqs.ts is
 * a ~677 KB chunk. Importing it into the homepage to show five questions would
 * undo the load-path work that just moved Firebase and analytics past LCP.
 *
 * Why not hand-written questions: no fabricated content. Every entry here is
 * copied verbatim out of MCQ_CHAPTERS, and heroQuizSamples.test.ts asserts that
 * — question text, all four options and the correct index must still match the
 * real bank exactly. If a question is edited or removed there, the test fails
 * rather than the homepage quietly showing something that no longer exists.
 *
 * GENERATED from the bank, then committed. Re-generate rather than hand-edit.
 */
export interface HeroQuizSample {
  q: string;
  options: string[];
  correct: number;
  classLevel: string;
  subject: string;
  chapter: string;
}

export const HERO_QUIZ_SAMPLES: HeroQuizSample[] = [
  {
    q: "Which mirror is used in a car headlight?",
    options: ["Cylindrical mirror", "Convex mirror", "Plane mirror", "Concave mirror"],
    correct: 3,
    classLevel: "Class 10",
    subject: "Science",
    chapter: "Light Reflection and Refraction",
  },
  {
    q: "The value of sin 0 degrees is:",
    options: ["-1", "1/2", "1", "0"],
    correct: 3,
    classLevel: "Class 10",
    subject: "Mathematics",
    chapter: "Trigonometry",
  },
  {
    q: "The pH of a basic solution is:",
    options: ["Less than 7", "Equal to 7", "Greater than 7", "Between 0 and 7"],
    correct: 2,
    classLevel: "Class 10",
    subject: "Science",
    chapter: "Acids Bases and Salts",
  },
  {
    q: "What is the SI unit of energy?",
    options: ["Joule", "Watt", "Pascal", "Calorie"],
    correct: 0,
    classLevel: "Class 11",
    subject: "Physics",
    chapter: "Units and Measurements",
  },
  {
    q: "How many atoms are in 2 moles of carbon?",
    options: ["2 × 6.02 × 10²³", "6.02 × 10²³", "0.5 × 6.02 × 10²³", "3 × 6.02 × 10²³"],
    correct: 0,
    classLevel: "Class 11",
    subject: "Chemistry",
    chapter: "Mole Concept",
  },
];
