export type ExamCategory = "IIT JEE" | "EAMCET" | "NEET";
export type DailyCategory = ExamCategory | "Classes 5-10";
export type QuestionSubject =
  | "Mathematics"
  | "Physics"
  | "Chemistry"
  | "Biology"
  | "Aptitude"
  | "Science"
  | "English";

export interface Question {
  id: string;
  category: DailyCategory;
  subject: QuestionSubject;
  classLevel?: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}
