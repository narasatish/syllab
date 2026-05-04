// src/lib/api.ts
//
// Centralised API base URL.
// Reads VITE_API_URL / VITE_API_BASE_URL / VITE_API_BASE from .env.
// Falls back to the production Render backend, NEVER to localhost in prod.
const API_URL = "https://syllab.onrender.com";

// One-time log so production console shows what URL we're hitting.
if (typeof window !== "undefined") {
  // eslint-disable-next-line no-console
  console.log("[api] API_URL:", API_URL);
}

/* ============================================================
   Shared types
   ============================================================ */
export interface ChatTurn {
  role: "user" | "model";
  parts: { text: string }[];
}

export interface Concept {
  title: string;
  detail: string;
}

export interface Flashcard {
  question: string;
  answer: string;
}

export interface MCQ {
  question: string;
  options: string[];
  correct: number; // 0-based index of the correct option
  explanation: string;
}

export interface StudyMaterial {
  concepts: Concept[];
  flashcards: Flashcard[];
  mcqs: MCQ[];
}

// Backwards-compatible alias
export type StudyConcepts = StudyMaterial;

/* ============================================================
   Study Arena
   ============================================================ */

/** Initial study kit generation: POST /api/study  { text } */
export async function extractStudyConcepts(text: string): Promise<StudyMaterial> {
  const res = await fetch(`${API_URL}/api/study`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error(`Study API failed: ${res.status}`);
  const data = await res.json();
  return {
    concepts: data.concepts ?? [],
    flashcards: data.flashcards ?? [],
    mcqs: data.mcqs ?? [],
  };
}

/** Generate additional concepts that don't repeat existing titles */
export async function generateMoreConcepts(
  text: string,
  existingTitles: string[]
): Promise<Concept[]> {
  const res = await fetch(`${API_URL}/api/study/more-concepts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, existingTitles }),
  });
  if (!res.ok) throw new Error(`More concepts API failed: ${res.status}`);
  const data = await res.json();
  return data.concepts ?? [];
}

/** Lazy-load the initial flashcards: POST /api/study/flashcards */
export async function generateFlashcards(text: string): Promise<Flashcard[]> {
  const res = await fetch(`${API_URL}/api/study/flashcards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error(`Flashcards API failed: ${res.status}`);
  const data = await res.json();
  return data.flashcards ?? [];
}

/** Generate additional flashcards that don't repeat existing ones */
export async function generateMoreFlashcards(
  text: string,
  existingQuestions: string[]
): Promise<Flashcard[]> {
  const res = await fetch(`${API_URL}/api/study/more-flashcards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, existingQuestions }),
  });
  if (!res.ok) throw new Error(`More flashcards API failed: ${res.status}`);
  const data = await res.json();
  return data.flashcards ?? [];
}

/** Lazy-load the initial MCQs: POST /api/study/mcqs */
export async function generateMCQs(text: string): Promise<MCQ[]> {
  const res = await fetch(`${API_URL}/api/study/mcqs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error(`MCQs API failed: ${res.status}`);
  const data = await res.json();
  return data.mcqs ?? [];
}

/** Generate additional MCQs that don't repeat existing ones */
export async function generateMoreMCQs(
  text: string,
  existingQuestions: string[]
): Promise<MCQ[]> {
  const res = await fetch(`${API_URL}/api/study/more-mcqs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, existingQuestions }),
  });
  if (!res.ok) throw new Error(`More MCQs API failed: ${res.status}`);
  const data = await res.json();
  return data.mcqs ?? [];
}

/* ============================================================
   Chat / Tutor / Scan
   ============================================================ */

/** General AI Chat — POST /api/chat */
export async function chatWithAI(message: string): Promise<string> {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error(`Chat API failed: ${res.status}`);
  const data = await res.json();
  return data.text;
}

/** Syllab AI Tutor — POST /api/tutor */
export async function askTutor(
  prompt: string,
  history: ChatTurn[] = []
): Promise<string> {
  const res = await fetch(`${API_URL}/api/tutor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, history }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Tutor API failed: ${res.status}`);
  }

  const data = await res.json();
  return data.text;
}

/** Scan & Solve image / PDF — POST /api/ai */
export async function scanAndSolve(fileBase64: string): Promise<string> {
  const res = await fetch(`${API_URL}/api/ai`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file: fileBase64 }),
  });
  if (!res.ok) throw new Error(`Scan API failed: ${res.status}`);
  const data = await res.json();
  return data.response;
}

/* ============================================================
   Auth helpers
   ============================================================ */

/** Send branded password-reset email — POST /api/auth/send-reset-email */
export async function sendResetEmail(email: string): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_URL}/api/auth/send-reset-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Reset email failed: ${res.status}`);
  }
  return res.json();
}