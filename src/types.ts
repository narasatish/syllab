export type Subject =
  | "Physics"
  | "Chemistry"
  | "Biology"
  | "Mathematics"
  | "Science"
  | "English"
  | "Social Science"
  | "The World Around Us"
  | "Financial Literacy";
export type ClassLevel = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
export type Difficulty = "easy" | "medium" | "hard" | "mixed";

export interface Topic {
  id: string;
  name: string;
  subject: Subject;
  classLevel: ClassLevel;
}

export interface Chapter {
  id: string;
  title: string;
  subject: Subject;
  classLevel: ClassLevel;
  /** Education board. Undefined = CBSE/NCERT (the default content). */
  board?: 'CBSE' | 'AP' | 'TS' | 'Karnataka' | 'Maharashtra' | 'UP' | 'Bihar' | 'Rajasthan' | 'MP';
  topics: string[];
  ncertUrl?: string;
  sourceBook?: string;
  concepts?: unknown[];
  // Enriched fields
  explanation?: string;
  realWorldExample?: string;
  examInsight?: string;
  difficulty?: "Easy" | "Medium" | "Hard" | "Advanced";
}

export interface Concept {
  id: string;
  subject: string;
  chapterId: string;
  title: string;
  summary: string;
  visuals: {
    type: string;
    title: string;
    desc: string;
    icon: string;
  }[];
  examples: {
    scenario: string;
    details: string;
  }[];
  videoUrl: string;
  // Enriched fields
  formulas?: string[];
  commonMistakes?: string[];
  examTricks?: string[];
  learningPathOrder?: number;
}

export interface Question {
  id: string;
  subject: string;
  chapter_id: string;
  chapter_name: string;
  difficulty: Difficulty;
  question_text: string;
  options: string[];
  correct_index: number;
  explanation: string;
  exam_type_tags: string[];
  points?: number;
}

export interface UserStats {
  score: number;
  xp: number;
  rank: string | number;
  streak: number;
  lastActive?: unknown;
  level: number;
  badges: string[];
  createdAt?: unknown;
  city?: string;
  state?: string;
}

export interface ArenaState {
  chapterId: string;
  currentQuestionIndex: number;
  selectedAnswers: Record<string, number>;
  timeSpent: number;
  totalQuestions: number;
  questions: Question[];
  status: 'active' | 'completed' | 'paused';
}

export interface UserProgress {
  completedChapters: string[];
  lastChapter: string;
  activeArenaState?: ArenaState;
  conceptProgress: Record<string, boolean>; // conceptId -> completed
  updatedAt?: unknown;
}

export interface LeaderboardEntry {
  id: string;
  displayName: string;
  email?: string;
  score: number;
  xp?: number;
  level?: number;
  rank: string | number;
  streak?: number;
  city?: string;
  state?: string;
  avatar?: string;
}

export interface AuthFormState {
  email: string;
  password: string;
}
