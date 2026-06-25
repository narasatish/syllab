/**
 * homework.ts — "AI Tuition Teacher": daily, chapter-based, free-response
 * homework that behaves like a human tutor who knows the student.
 *
 * Key capabilities:
 *   • Class → Subject → Chapter aware (real curriculum, no "Algebra for Class 1").
 *   • Free-response questions (NO MCQ); type OR upload answers — per question
 *     OR one photo of the whole handwritten sheet.
 *   • Every set has a short CODE (e.g. HW-7K3M). Write it on paper; upload any
 *     day and the AI finds that exact homework and marks it.
 *   • Reads handwriting + diagrams via the vision endpoint and awards marks.
 *   • Performance-aware: reads Practice/Mock/Daily mastery to recommend the
 *     student's weakest topics and tune difficulty.
 *   • Earns XP (real progress system), remembers marks + knowledge, builds a
 *     streak, and resurfaces past mistakes (spaced repetition).
 *
 * Cost-conscious: generation is cache-first in Firestore; grading is ONE
 * batched askTutor call; each uploaded photo costs one vision call.
 */
import { askTutor, scanAndSolve } from './api';
import { getMasteryCounts, recordMasteryResult, getStats, getAllStats } from './mastery';
import { recordLearningActivity } from './progressTracker';
import { SYLLABUS } from '../data/syllabus';
import { db, auth } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

/* ───────────── Types ───────────── */

export type QType = 'short' | 'long' | 'diagram';
export type Tier = 'foundation' | 'standard' | 'advanced';

export interface HwQuestion {
  topic: string;
  type: QType;
  question: string;
  marks: number;          // max marks (1–3)
  answer: string;         // model answer
  explanation: string;
  isReview?: boolean;
}

/** A student's response to one question — typed text and/or an uploaded photo. */
export interface HwAnswer { text?: string; image?: string; }

export interface HomeworkSet {
  id: string;
  code: string;           // short human code, e.g. "HW-7K3M"
  classLevel: string;
  board: string;
  subject: string;
  chapter: string;
  day: number;
  date: string;           // YYYY-MM-DD
  tier: Tier;
  questions: HwQuestion[];
}

export interface GradedItem {
  index: number;
  verdict: 'correct' | 'partial' | 'wrong';
  marks: number;
  maxMarks: number;
  feedback: string;
  correctAnswer: string;
}

export interface HomeworkResult {
  setId: string;
  code: string;
  subject: string;
  chapter: string;
  classLevel: string;
  date: string;           // ISO
  score: number;
  total: number;
  percent: number;
  xpEarned: number;
  items: GradedItem[];
}

export interface StudentProfile {
  tier: Tier; weak: number; mastered: number; total: number; summary: string;
}

export interface ActiveAssignment {
  classLevel: string; board: string; subject: string; chapter: string; day: number; lastDate: string;
}

export interface FocusArea {
  classLevel: string; subject: string; chapter: string; level: string; accuracy: number;
}

/* ───────────── Small helpers ───────────── */

export function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function slug(s: string): string {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
function chapterKey(classLevel: string, subject: string, chapter: string): string {
  return `hw::${slug(classLevel)}::${slug(subject)}::${slug(chapter)}`;
}
/** Deterministic short code from a string (same set → same code). */
function makeCode(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  const base = Math.abs(h).toString(36).toUpperCase().padStart(4, '0').slice(-4);
  return `HW-${base}`;
}
function parseJson<T>(text: string): T | null {
  if (!text) return null;
  let t = text.trim().replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
  const start = t.search(/[[{]/);
  if (start > 0) t = t.slice(start);
  const end = Math.max(t.lastIndexOf('}'), t.lastIndexOf(']'));
  if (end >= 0) t = t.slice(0, end + 1);
  try { return JSON.parse(t) as T; } catch { return null; }
}

/* ───────────── Student profile + performance focus ───────────── */

export function buildProfile(): StudentProfile {
  const counts = getMasteryCounts();
  const weak = (counts.unfamiliar || 0) + (counts.familiar || 0);
  const mastered = (counts.mastered || 0) + (counts.proficient || 0);
  const total = weak + mastered;
  let tier: Tier = 'standard';
  if (total >= 3) {
    if (mastered > weak * 1.5) tier = 'advanced';
    else if (weak > mastered * 1.5) tier = 'foundation';
  }
  const summary = total === 0
    ? 'New student — starting at standard level.'
    : `${mastered} strong topic${mastered === 1 ? '' : 's'}, ${weak} improving → ${tier} level.`;
  return { tier, weak, mastered, total, summary };
}

/**
 * Like a real teacher: look at weak topics from Practice/Mock/Daily (mastery
 * store) and surface chapters the student should work on. Maps known chapter
 * ids/titles back to {class, subject, chapter} via the syllabus.
 */
export function getRecommendedFocus(max = 3): FocusArea[] {
  const weakKeys = [...(getAllStats().unfamiliar || []), ...(getAllStats().familiar || [])];
  const out: FocusArea[] = [];
  const seen = new Set<string>();
  for (const key of weakKeys) {
    const ch = SYLLABUS.find((c) => c.id === key || c.title === key);
    if (!ch) continue;
    const dedupe = `${ch.classLevel}|${ch.subject}|${ch.title}`;
    if (seen.has(dedupe)) continue;
    seen.add(dedupe);
    const st = getStats(key);
    out.push({ classLevel: `Class ${ch.classLevel}`, subject: String(ch.subject), chapter: ch.title, level: st.level, accuracy: st.accuracy });
    if (out.length >= max) break;
  }
  return out;
}

export function getChapterKnowledge(classLevel: string, subject: string, chapter: string) {
  return getStats(chapterKey(classLevel, subject, chapter));
}

const TIER_NOTE: Record<Tier, string> = {
  foundation: 'EASY level — the student is still building basics. Keep questions direct, one concept each.',
  standard: 'MEDIUM level — typical class difficulty, exam-style.',
  advanced: 'CHALLENGING level — the student is strong, so include higher-order / application questions.',
};

/* ───────────── Active assignment / daily cadence ───────────── */

const ACTIVE_KEY = 'syllab.hw.active.v2';
export function getActiveAssignment(): ActiveAssignment | null {
  try { return JSON.parse(localStorage.getItem(ACTIVE_KEY) || 'null'); } catch { return null; }
}
function saveActive(a: ActiveAssignment): void {
  try { localStorage.setItem(ACTIVE_KEY, JSON.stringify(a)); } catch { /* ignore */ }
}
function resolveDay(classLevel: string, board: string, subject: string, chapter: string): number {
  const active = getActiveAssignment();
  const today = todayKey();
  const same = active && active.classLevel === classLevel && active.board === board &&
    active.subject === subject && slug(active.chapter) === slug(chapter);
  if (!same) return 1;
  if (active!.lastDate === today) return active!.day;
  return active!.day + 1;
}

/* ───────────── Code → set storage (upload any day) ───────────── */

const BYCODE_KEY = 'syllab.hw.byCode.v1';
function loadByCode(): Record<string, HomeworkSet> {
  try { return JSON.parse(localStorage.getItem(BYCODE_KEY) || '{}'); } catch { return {}; }
}
function storeByCode(set: HomeworkSet): void {
  try {
    const m = loadByCode();
    m[set.code] = set;
    const entries = Object.entries(m);
    if (entries.length > 40) entries.splice(0, entries.length - 40); // keep last 40
    localStorage.setItem(BYCODE_KEY, JSON.stringify(Object.fromEntries(entries)));
  } catch { /* ignore */ }
}
export function getSetByCode(raw: string): HomeworkSet | null {
  const code = normalizeCode(raw);
  if (!code) return null;
  return loadByCode()[code] || null;
}
export function normalizeCode(raw: string): string {
  const m = String(raw).toUpperCase().match(/HW[-\s]?([A-Z0-9]{3,6})/);
  return m ? `HW-${m[1]}` : '';
}

/* ───────────── Spaced repetition (past mistakes) ───────────── */

const MISTAKES_KEY = 'syllab.hw.mistakes.v1';
interface StoredMistake { subject: string; chapter: string; question: string; answer: string; topic: string; marks: number; ts: number; }
function loadMistakes(): StoredMistake[] {
  try { return JSON.parse(localStorage.getItem(MISTAKES_KEY) || '[]'); } catch { return []; }
}
function saveMistakes(list: StoredMistake[]): void {
  try { localStorage.setItem(MISTAKES_KEY, JSON.stringify(list.slice(-60))); } catch { /* ignore */ }
}
function recordMistake(subject: string, chapter: string, q: HwQuestion): void {
  const list = loadMistakes();
  if (list.some((m) => m.question === q.question)) return;
  list.push({ subject, chapter, question: q.question, answer: q.answer, topic: q.topic, marks: q.marks, ts: Date.now() });
  saveMistakes(list);
}
function clearMistake(question: string): void {
  const list = loadMistakes();
  const next = list.filter((m) => m.question !== question);
  if (next.length !== list.length) saveMistakes(next);
}
function pickReviewMistake(subject: string, chapter: string): HwQuestion | null {
  const list = loadMistakes().filter((m) => m.subject === subject && slug(m.chapter) === slug(chapter));
  if (!list.length) return null;
  const m = list[0];
  return { topic: m.topic || 'Revision', type: 'short', marks: m.marks || 2, question: m.question, answer: m.answer,
    explanation: 'You missed a similar question before — quick revision to lock it in.', isReview: true };
}

/* ───────────── Generation (cache-first, daily, chapter-based) ───────────── */

export async function generateHomework(opts: {
  classLevel: string; board: string; subject: string; chapter: string; count?: number;
}): Promise<HomeworkSet> {
  const chapter = opts.chapter.trim();
  if (!chapter) throw new Error('Please choose or type a chapter first.');

  const profile = buildProfile();
  const count = opts.count ?? 4;
  const day = resolveDay(opts.classLevel, opts.board, opts.subject, chapter);
  const date = todayKey();
  const isBio = /bio/i.test(opts.subject);
  const cacheId = `${slug(opts.classLevel)}_${slug(opts.board)}_${slug(opts.subject)}_${slug(chapter)}_${profile.tier}_d${day}`;
  const code = makeCode(cacheId);

  let questions = await readCache(cacheId);

  if (!questions || !questions.length) {
    const prompt = [
      `You are an experienced Indian school tutor giving DAILY homework (private tuition style).`,
      `Class: ${opts.classLevel}. Board: ${opts.board}. Subject: ${opts.subject}. Chapter: "${chapter}".`,
      `This is DAY ${day} on this chapter — go progressively deeper than earlier days; do NOT repeat day-1 basics later.`,
      TIER_NOTE[profile.tier],
      `Give exactly ${count} FREE-RESPONSE questions. ABSOLUTELY NO multiple-choice and NO options (no A/B/C/D). Proper questions the student SOLVES and WRITES OUT:`,
      `  • Maths/Physics → numericals, derivations, "show that", word problems.`,
      `  • Chemistry → equations, balancing, reasoning, named reactions.`,
      `  • Biology → explanations${isBio ? ', and include at least ONE diagram question ("Draw and label …")' : ''}.`,
      isBio ? `Mark any "draw and label" question with type "diagram".` : '',
      `Make questions class-appropriate for the given class (keep Class 1–5 simple and concrete).`,
      `Assign each question "marks" (1–3 by depth). Whole set doable in ~20–30 minutes.`,
      `Return ONLY strict JSON: {"questions":[{"topic":"sub-topic","type":"short|long|diagram","question":"...","marks":2,"answer":"model answer","explanation":"..."}]}`,
    ].filter(Boolean).join('\n');

    let gen: HwQuestion[] = [];
    try {
      const reply = await askTutor(prompt, []);
      const parsed = parseJson<{ questions: HwQuestion[] }>(reply);
      gen = Array.isArray(parsed?.questions) ? parsed!.questions : [];
    } catch { gen = []; }

    questions = gen.filter((q) => q && q.question && q.answer).map((q) => ({
      topic: q.topic || chapter,
      type: (['short', 'long', 'diagram'].includes(q.type) ? q.type : 'short') as QType,
      question: String(q.question),
      marks: Math.max(1, Math.min(3, Math.round(Number(q.marks) || 2))),
      answer: String(q.answer),
      explanation: String(q.explanation || ''),
    }));
    if (!questions.length) throw new Error('Could not prepare homework right now. Please try again in a moment.');
    void writeCache(cacheId, opts, chapter, day, date, profile.tier, questions);
  }

  saveActive({ classLevel: opts.classLevel, board: opts.board, subject: opts.subject, chapter, day, lastDate: date });

  const review = pickReviewMistake(opts.subject, chapter);
  const finalQs = review ? [review, ...questions] : questions;
  const set: HomeworkSet = {
    id: cacheId, code, classLevel: opts.classLevel, board: opts.board, subject: opts.subject,
    chapter, day, date, tier: profile.tier, questions: finalQs,
  };
  storeByCode(set);
  return set;
}

/* ───────────── Firestore cache (shared, public read) ───────────── */

async function readCache(id: string): Promise<HwQuestion[] | null> {
  try {
    const snap = await getDoc(doc(db, 'homeworkSets', id));
    if (!snap.exists()) return null;
    const data = snap.data() as { questions?: HwQuestion[] };
    return Array.isArray(data.questions) ? data.questions : null;
  } catch { return null; }
}
async function writeCache(id: string, opts: { classLevel: string; board: string; subject: string },
  chapter: string, day: number, date: string, tier: Tier, questions: HwQuestion[]): Promise<void> {
  if (!auth.currentUser) return;
  try {
    await setDoc(doc(db, 'homeworkSets', id), {
      classLevel: opts.classLevel, board: opts.board, subject: opts.subject,
      chapter, day, date, tier, questions, createdAt: Date.now(),
    });
  } catch { /* best-effort */ }
}

/* ───────────── Grading ───────────── */

/** Grade per-question answers (type and/or photo per question). */
export async function gradeHomework(set: HomeworkSet, answers: HwAnswer[]): Promise<HomeworkResult> {
  const resolved: string[] = new Array(set.questions.length).fill('');
  for (let i = 0; i < set.questions.length; i++) {
    const a = answers[i] || {};
    const typed = (a.text || '').trim();
    if (a.image) {
      let read = '';
      try { read = await scanAndSolve(a.image); } catch { read = ''; }
      resolved[i] = [typed, read && `[from uploaded photo] ${read}`].filter(Boolean).join('\n') || '(uploaded a photo, could not read clearly)';
    } else {
      resolved[i] = typed || '(left blank)';
    }
  }
  const graded = await batchGrade(set, set.questions.map((q, i) => ({
    index: i, type: q.type, question: q.question, maxMarks: q.marks, modelAnswer: q.answer, studentAnswer: resolved[i],
  })));
  return finalize(set, graded);
}

/**
 * Grade from ONE uploaded sheet (all answers handwritten on paper). The vision
 * endpoint transcribes the page; the AI then matches each answer to its
 * question by number and grades — like a teacher reading a submitted sheet.
 */
export async function gradeFromSheet(set: HomeworkSet, fileDataUrl: string): Promise<HomeworkResult> {
  let transcript = '';
  try { transcript = await scanAndSolve(fileDataUrl); } catch { transcript = ''; }
  if (!transcript) throw new Error('Could not read the uploaded sheet. Try a clearer, well-lit photo.');

  const payload = set.questions.map((q, i) => ({
    questionNumber: i + 1, type: q.type, question: q.question, maxMarks: q.marks, modelAnswer: q.answer,
  }));
  const prompt = [
    `You are a teacher marking a student's handwritten homework sheet (transcribed from a photo).`,
    `The sheet has answers labelled by question number. Match each answer to the question by its number.`,
    `If a question's answer is missing on the sheet, mark it wrong with 0 and say it was not attempted.`,
    `For "diagram" questions, judge from the description whether the drawing has the correct parts/labels.`,
    `Award marks out of maxMarks (half marks allowed). Be encouraging and specific.`,
    `Return ONLY strict JSON: {"results":[{"index":N,"verdict":"correct|partial|wrong","marks":0..maxMarks,"feedback":"...","correctAnswer":"..."}]} where index = questionNumber-1.`,
    `Questions: ${JSON.stringify(payload)}`,
    `Student's transcribed sheet:\n"""${transcript.slice(0, 6000)}"""`,
  ].join('\n');

  let results: Array<Partial<GradedItem>> = [];
  try {
    const reply = await askTutor(prompt, []);
    const parsed = parseJson<{ results: Array<Partial<GradedItem>> }>(reply);
    results = Array.isArray(parsed?.results) ? parsed!.results : [];
  } catch { results = []; }
  return finalize(set, results);
}

async function batchGrade(set: HomeworkSet, payload: Array<Record<string, unknown>>): Promise<Array<Partial<GradedItem>>> {
  const prompt = [
    `You are a kind but accurate Indian school teacher grading written homework.`,
    `For EACH item compare the student's answer to the model answer; award marks out of maxMarks (half marks allowed).`,
    `For type "diagram", judge whether the described drawing has the correct parts/labels.`,
    `Return ONLY strict JSON: {"results":[{"index":N,"verdict":"correct|partial|wrong","marks":0..maxMarks,"feedback":"1-2 lines","correctAnswer":"..."}]}`,
    `Items: ${JSON.stringify(payload)}`,
  ].join('\n');
  try {
    const reply = await askTutor(prompt, []);
    const parsed = parseJson<{ results: Array<Partial<GradedItem>> }>(reply);
    return Array.isArray(parsed?.results) ? parsed!.results : [];
  } catch { return []; }
}

/** Shared scoring + XP + knowledge + persistence for both grading paths. */
function finalize(set: HomeworkSet, graded: Array<Partial<GradedItem>>): HomeworkResult {
  const items: GradedItem[] = set.questions.map((q, i) => {
    const g = graded.find((x) => Number(x.index) === i);
    const max = q.marks;
    if (g) {
      const marks = Math.max(0, Math.min(max, Number(g.marks) || 0));
      return {
        index: i, marks, maxMarks: max,
        verdict: (['correct', 'partial', 'wrong'].includes(g.verdict as string) ? g.verdict : (marks >= max ? 'correct' : marks > 0 ? 'partial' : 'wrong')) as GradedItem['verdict'],
        feedback: String(g.feedback || q.explanation),
        correctAnswer: String(g.correctAnswer || q.answer),
      };
    }
    return { index: i, verdict: 'partial', marks: 0, maxMarks: max, feedback: 'Compare your answer with the model answer below.', correctAnswer: q.answer };
  });

  const score = items.reduce((s, it) => s + it.marks, 0);
  const total = items.reduce((s, it) => s + it.maxMarks, 0);
  const percent = total ? Math.round((score / total) * 100) : 0;

  // Award XP / record knowledge / save history ONLY the first time a given set
  // (which is day-scoped via its id) is graded — so re-submitting or
  // regenerating the same day can't farm XP or inflate mastery.
  const firstTime = !alreadyGraded(set.id);
  const xpEarned = firstTime ? Math.max(0, Math.round((percent / 100) * 10 * set.questions.length)) : 0;

  const result: HomeworkResult = {
    setId: set.id, code: set.code, subject: set.subject, chapter: set.chapter, classLevel: set.classLevel,
    date: new Date().toISOString(), score: Math.round(score * 10) / 10, total, percent, xpEarned, items,
  };

  if (firstTime) {
    const correctCount = items.filter((it) => it.verdict === 'correct').length;
    recordMasteryResult(chapterKey(set.classLevel, set.subject, set.chapter), correctCount, set.questions.length);
    items.forEach((it) => {
      const q = set.questions[it.index];
      if (it.verdict === 'wrong') recordMistake(set.subject, set.chapter, q);
      else if (it.verdict === 'correct') clearMistake(q.question);
    });
    if (auth.currentUser && xpEarned > 0) {
      void recordLearningActivity({
        uid: auth.currentUser.uid, type: 'practice_session',
        title: `Homework: ${set.chapter} (Day ${set.day})`,
        subject: set.subject, classLevel: set.classLevel,
        score: correctCount, total: set.questions.length, xpGained: xpEarned, sourceId: set.id,
      }).catch(() => {});
    }
    addLocalXp(xpEarned);
    markGraded(set.id);
    saveResult(result);
  }
  return result;
}

/* Idempotency: which set ids have already been graded (and counted). */
const GRADED_KEY = 'syllab.hw.graded.v1';
function alreadyGraded(setId: string): boolean {
  try { return (JSON.parse(localStorage.getItem(GRADED_KEY) || '[]') as string[]).includes(setId); } catch { return false; }
}
function markGraded(setId: string): void {
  try {
    const list = JSON.parse(localStorage.getItem(GRADED_KEY) || '[]') as string[];
    if (!list.includes(setId)) { list.push(setId); localStorage.setItem(GRADED_KEY, JSON.stringify(list.slice(-200))); }
  } catch { /* ignore */ }
}

/* ───────────── History, streak, XP mirror (localStorage) ───────────── */

const RESULTS_KEY = 'syllab.hw.results.v2';
const XP_KEY = 'syllab.hw.xp.v1';
function saveResult(r: HomeworkResult): void {
  try {
    const list: HomeworkResult[] = JSON.parse(localStorage.getItem(RESULTS_KEY) || '[]');
    list.push(r);
    localStorage.setItem(RESULTS_KEY, JSON.stringify(list.slice(-100)));
  } catch { /* ignore */ }
}
export function getHistory(): HomeworkResult[] {
  try { return JSON.parse(localStorage.getItem(RESULTS_KEY) || '[]'); } catch { return []; }
}
function addLocalXp(n: number): void {
  try { localStorage.setItem(XP_KEY, String(getLocalXp() + n)); } catch { /* ignore */ }
}
export function getLocalXp(): number {
  try { return Number(localStorage.getItem(XP_KEY) || '0') || 0; } catch { return 0; }
}
export function getStreak(): number {
  const days = new Set(getHistory().map((r) => fmt(new Date(r.date))));
  if (!days.size) return 0;
  let streak = 0;
  const d = new Date();
  if (!days.has(fmt(d))) d.setDate(d.getDate() - 1);
  while (days.has(fmt(d))) { streak++; d.setDate(d.getDate() - 1); }
  return streak;
}
function fmt(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/* ───────────── Weekly parent report ───────────── */

export interface WeeklyReport { count: number; avgPercent: number; bestSubject: string; needsWork: string; xp: number; text: string; }
export function buildWeeklyReport(studentName = 'Your child'): WeeklyReport | null {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recent = getHistory().filter((r) => new Date(r.date).getTime() >= weekAgo);
  if (!recent.length) return null;
  const bySubject: Record<string, { sum: number; n: number }> = {};
  let totalPct = 0, xp = 0;
  recent.forEach((r) => {
    totalPct += r.percent; xp += r.xpEarned || 0;
    const b = (bySubject[r.subject] ||= { sum: 0, n: 0 }); b.sum += r.percent; b.n += 1;
  });
  const avgPercent = Math.round(totalPct / recent.length);
  const ranked = Object.entries(bySubject).map(([s, v]) => ({ s, avg: Math.round(v.sum / v.n) })).sort((a, b) => b.avg - a.avg);
  const bestSubject = ranked[0]?.s || '—';
  const needsWork = ranked[ranked.length - 1]?.s || '—';
  const text =
    `📚 Syllab Weekly Homework Report\n\n` +
    `${studentName} completed ${recent.length} homework set${recent.length === 1 ? '' : 's'} this week and earned ${xp} XP.\n` +
    `Average score: ${avgPercent}%\nStrongest: ${bestSubject}\nNeeds practice: ${needsWork}\n\n` +
    `Keep the daily streak going at syllab.in 🎯`;
  return { count: recent.length, avgPercent, bestSubject, needsWork, xp, text };
}

/* ───────────── Standalone worksheet solver (other tab) ───────────── */

export async function evaluateWorksheet(fileDataUrl: string): Promise<string> {
  return scanAndSolve(fileDataUrl);
}
