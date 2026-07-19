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
  { path: '/pdf-tools', emoji: '📄', title: 'PDF Tools', desc: 'Merge, split, rotate, watermark, page numbers, images→PDF & PDF→text. Private — files never leave your browser.' },
  { path: '/image-tools', emoji: '🖼️', title: 'Image Tools', desc: 'Compress, resize, convert (JPG/PNG/WebP), rotate, flip, crop & HEIC→JPG. 100% in your browser.' },
  { path: '/compare', emoji: '🔍', title: 'Compare Text & Docs', desc: 'Diff two texts or documents (PDF/DOCX/TXT) and highlight what changed. Private — nothing uploaded.' },
  { path: '/notes', emoji: '📝', title: 'Notepad', desc: 'A private rich-text notepad that auto-saves in your browser. Multiple notes, formatting, offline.' },
  { path: '/everyday', emoji: '🧰', title: 'Everyday Tools', desc: 'Unit converter, percentage, age, date difference, BMI & lorem ipsum — six calculators in one.' },
  { path: '/roman-numerals', emoji: 'Ⅹ', title: 'Roman Numerals', desc: 'Convert numbers to Roman numerals and back (1–3999), live, with validation.' },
  { path: '/contrast-checker', emoji: '🎨', title: 'Contrast Checker', desc: 'WCAG colour contrast ratio with AA/AAA pass-fail and a live preview.' },
  { path: '/timestamp', emoji: '🕑', title: 'Timestamp Converter', desc: 'Unix epoch ⇄ human date (seconds/ms auto-detected), ISO 8601 + UTC, with a Now button.' },
  { path: '/csv-to-json', emoji: '🔀', title: 'CSV → JSON', desc: 'Paste CSV, get clean JSON — quote-aware, private, copy in one click.' },
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
