// src/lib/api.ts
// Single source of truth for ALL backend calls.
// Production URL only. No localhost. No fallbacks.

export const API_URL = "https://syllab-backend.onrender.com";

console.log("[api] API_URL:", API_URL);

/* ───────────── Types ───────────── */

export interface ChatTurn {
  role: "user" | "model";
  parts: { text: string }[];
}

export interface MCQ {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Flashcard {
  question: string;
  answer: string;
}

export interface ConceptCard {
  title: string;
  detail: string;
}

export interface StudyMaterial {
  concepts: ConceptCard[];
  flashcards: Flashcard[];
  mcqs: MCQ[];
}

export interface UserStats {
  xp: number;
  level: number;
  accuracy: number;
  streak: number;
  rank: string;
}

/* ───────────── fetch wrapper ───────────── */

async function post<T = any>(path: string, body: any): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`API ${path} ${res.status}: ${errText.slice(0, 200)}`);
  }
  return res.json();
}

async function get<T = any>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`API ${path} ${res.status}: ${errText.slice(0, 200)}`);
  }
  return res.json();
}

/* ───────────── Tutor ───────────── */

export async function askTutor(prompt: string, history: ChatTurn[] = []): Promise<string> {
  const data = await post<{ text: string }>("/api/tutor", { prompt, history });
  return data.text || "";
}

/* ───────────── Practice Arena ───────────── */

export interface GenerateQuestionsArgs {
  classLevel: string | number;
  subject: string;
  chapter: string;
  chapterId?: string;
  difficulty: string;
  count: number;
}

export async function generateQuestions(args: GenerateQuestionsArgs): Promise<{ questions: MCQ[] }> {
  return post<{ questions: MCQ[] }>("/api/questions/batch", args);
}

/* ───────────── Scan & Solve ───────────── */

export async function scanAndSolve(fileDataUrl: string): Promise<string> {
  const data = await post<{ response: string }>("/api/ai", { file: fileDataUrl });
  return data.response || "";
}

/* ───────────── Study Arena ───────────── */

export async function extractStudyConcepts(text: string): Promise<StudyMaterial> {
  const data = await post<{ concepts: ConceptCard[]; flashcards: Flashcard[]; mcqs: MCQ[] }>(
    "/api/study",
    { text }
  );
  return {
    concepts: data.concepts || [],
    flashcards: data.flashcards || [],
    mcqs: data.mcqs || [],
  };
}

export async function generateMoreMCQs(text: string, existingQuestions: string[]): Promise<MCQ[]> {
  const data = await post<{ mcqs: MCQ[] }>("/api/study/more-mcqs", { text, existingQuestions });
  return data.mcqs || [];
}

export async function generateMoreFlashcards(
  text: string,
  existingQuestions: string[]
): Promise<Flashcard[]> {
  const data = await post<{ flashcards: Flashcard[] }>("/api/study/more-flashcards", {
    text,
    existingQuestions,
  });
  return data.flashcards || [];
}

/* ───────────── Concepts (Syllabus Learn button) ───────────── */

export interface LoadConceptArgs {
  classLevel: string | number;
  subject: string;
  chapterTitle: string;
  chapterId: string;
}

export async function loadConcept(args: LoadConceptArgs): Promise<any> {
  const data = await post<{ concept: any }>("/api/concept", args);
  if (!data.concept) throw new Error("No concept returned");
  return data.concept;
}

/* ───────────── Dashboard stats ───────────── */

export async function getUserStats(uid: string): Promise<UserStats> {
  return get<UserStats>(`/api/user/stats/${uid}`);
}