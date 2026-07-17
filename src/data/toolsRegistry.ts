/**
 * toolsRegistry.ts — single source of truth for the free student tools. Used by
 * the /tools hub page and the shared "Related tools" strip so the two never
 * drift apart.
 */
export interface ToolEntry { path: string; emoji: string; title: string; desc: string }

export const TOOLS: ToolEntry[] = [
  { path: '/calculators', emoji: '🧮', title: 'Student Calculators', desc: 'Percentage, CGPA↔%, attendance "can I bunk?", SGPA, CBSE grade, CUET score & education-loan EMI — 10 in one.' },
  { path: '/unit-converter', emoji: '📐', title: 'Unit Converter', desc: 'Length, mass, temperature, speed, energy, pressure, volume, area, time & digital storage.' },
  { path: '/periodic-table', emoji: '⚛️', title: 'Periodic Table', desc: 'All 118 elements — tap any for atomic mass, group, period, state & electron configuration.' },
  { path: '/pomodoro', emoji: '⏳', title: 'Pomodoro Timer', desc: 'Study in focused 25-minute sprints with breaks, a session counter and a gentle chime.' },
  { path: '/marks-tracker', emoji: '📊', title: 'Marks Tracker', desc: 'Overall percentage, CBSE grade, strongest & weakest subject, and marks needed to hit a target.' },
  { path: '/study-planner', emoji: '🗓️', title: 'Study Planner', desc: 'A day-by-day revision timetable from your exam date, subjects and hours — save or print it.' },
  { path: '/flashcards', emoji: '🃏', title: 'Flashcards', desc: 'Make your own decks and revise with spaced repetition (SM-2) — the smart way to memorise.' },
  { path: '/answer-evaluator', emoji: '✍️', title: 'AI Answer Evaluator', desc: 'Paste a question & your answer for an examiner-style score, gaps and full-marks points.' },
  { path: '/cutoffs', emoji: '🎯', title: 'College Cutoffs', desc: 'Browse indicative closing cutoffs for top engineering colleges, filtered by exam.' },
  { path: '/career-predictor', emoji: '🔮', title: 'Career & College Predictor', desc: 'JEE/NEET rank & college predictor with category support, plus a career interest quiz.' },
];

/** Pick up to `n` tools other than `currentPath`, starting after it (wraps). */
export function relatedTools(currentPath: string, n = 3): ToolEntry[] {
  const idx = TOOLS.findIndex((t) => t.path === currentPath);
  const others = TOOLS.filter((t) => t.path !== currentPath);
  if (idx < 0) return others.slice(0, n);
  // rotate so the suggestions differ per page
  const rotated = [...TOOLS.slice(idx + 1), ...TOOLS.slice(0, idx)].filter((t) => t.path !== currentPath);
  return rotated.slice(0, n);
}
