export type ExamCategory = "IIT JEE" | "EAMCET" | "NEET";
export type DailyCategory = ExamCategory | "Classes 5-10" | "Classes 1-4";
export type QuestionSubject =
  | "Mathematics"
  | "Physics"
  | "Chemistry"
  | "Biology"
  | "Aptitude"
  | "Science"
  | "English"
  | "Social Science";

export interface Question {
  id: string;
  category: DailyCategory;
  subject: QuestionSubject;
  classLevel?: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  /** Optional step-by-step worked solution (BYJU's-style), shown after answering. */
  solution?: string[];
}
