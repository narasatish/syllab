/**
 * syllabusPlan.ts — chapter-level syllabus tracking for the Study Planner.
 *
 * The planner used to take free-text subject names, so a plan could only ever
 * say "Day 3: Science". This turns it into a real syllabus tracker: you pick a
 * class and its subjects, tick chapters off as you finish them, and the plan is
 * built from the chapters you have LEFT — by name, in a sensible order.
 *
 * Completion is deliberately NOT stored here. Chapters already carry a
 * `completed` flag in the shared study memory (`studyPlan.ts`), written by the
 * Study Room's flashcard sessions. Reusing that store means ticking a chapter
 * here and finishing it in the Study Room are the same fact, not two that drift.
 *
 * Everything below is pure: no Date.now(), no localStorage, no framework — the
 * caller passes the chapter list, the done-set and an explicit start date.
 */
import type { ChapterRef } from './studyPlan';
import { addDays, type PlanDay } from './studyPlanner';

/** A plan day that can name the specific chapters to cover. */
export interface SyllabusPlanDay extends PlanDay {
  chapters: string[];
}

export interface SubjectProgress {
  subject: string;
  total: number;
  done: number;
  pct: number;
}

export interface SyllabusProgress {
  total: number;
  done: number;
  remaining: number;
  pct: number;
  bySubject: SubjectProgress[];
}

const pct = (done: number, total: number) => (total > 0 ? Math.round((done / total) * 100) : 0);

/** Overall + per-subject completion for the selected chapters. */
export function syllabusProgress(
  chapters: readonly ChapterRef[],
  doneIds: ReadonlySet<string>,
): SyllabusProgress {
  const bySubjectMap = new Map<string, { total: number; done: number }>();
  let done = 0;

  for (const c of chapters) {
    const isDone = doneIds.has(c.id);
    if (isDone) done++;
    const key = String(c.subject);
    const agg = bySubjectMap.get(key) ?? { total: 0, done: 0 };
    agg.total++;
    if (isDone) agg.done++;
    bySubjectMap.set(key, agg);
  }

  return {
    total: chapters.length,
    done,
    remaining: chapters.length - done,
    pct: pct(done, chapters.length),
    bySubject: Array.from(bySubjectMap, ([subject, a]) => ({
      subject,
      total: a.total,
      done: a.done,
      pct: pct(a.done, a.total),
    })),
  };
}

/** Chapters still to cover, in the order they appear in the syllabus. */
export function remainingChapters(
  chapters: readonly ChapterRef[],
  doneIds: ReadonlySet<string>,
): ChapterRef[] {
  return chapters.filter((c) => !doneIds.has(c.id));
}

/**
 * Round-robin the remaining chapters across subjects, so a plan alternates
 * (Physics → Chemistry → Maths → Physics …) instead of spending its first two
 * weeks on one subject and leaving another untouched until the end.
 */
function interleaveBySubject(chapters: readonly ChapterRef[]): ChapterRef[] {
  const queues = new Map<string, ChapterRef[]>();
  for (const c of chapters) {
    const key = String(c.subject);
    const q = queues.get(key) ?? [];
    q.push(c);
    queues.set(key, q);
  }
  const lists = Array.from(queues.values());
  const out: ChapterRef[] = [];
  for (let i = 0; out.length < chapters.length; i++) {
    for (const list of lists) if (i < list.length) out.push(list[i]);
  }
  return out;
}

/**
 * Build a day-by-day plan over the chapters still left.
 *
 * Same three phases as the subject planner — learn, then a revise tail, then a
 * mock day — but each learn day names the actual chapters to cover. Chapters
 * are spread as evenly as the day count allows; when there are more days than
 * chapters the surplus days become revision rather than padding.
 */
export function buildSyllabusPlan(opts: {
  chapters: readonly ChapterRef[];
  doneIds: ReadonlySet<string>;
  days: number;
  hoursPerDay: number;
  startISO: string;
}): SyllabusPlanDay[] {
  const days = Math.floor(Number(opts.days) || 0);
  const hours = opts.hoursPerDay > 0 ? opts.hoursPerDay : 0;
  if (days <= 0 || !opts.chapters.length) return [];

  const todo = interleaveBySubject(remainingChapters(opts.chapters, opts.doneIds));
  const subjects = Array.from(new Set(opts.chapters.map((c) => String(c.subject))));

  const hasMock = days >= 3;
  let reviseDays = days >= 4 ? Math.max(1, Math.round(days * 0.25)) : 0;
  let learnDays = Math.max(0, days - reviseDays - (hasMock ? 1 : 0));

  // Nothing left to learn (or no room to learn it) — the whole run is revision.
  if (!todo.length) {
    reviseDays = days - (hasMock ? 1 : 0);
    learnDays = 0;
  } else if (learnDays > todo.length) {
    // More days than chapters: cap the learn phase and give the rest to revision
    // instead of scheduling half-empty days.
    reviseDays += learnDays - todo.length;
    learnDays = todo.length;
  }

  const plan: SyllabusPlanDay[] = [];
  let dayIdx = 0;
  let taken = 0;

  for (let i = 0; i < learnDays; i++) {
    // Distribute the remainder across the earliest days rather than dumping it
    // on the last one, so the workload tapers off towards the exam.
    const left = todo.length - taken;
    const daysLeft = learnDays - i;
    const n = Math.ceil(left / daysLeft);
    const slice = todo.slice(taken, taken + n);
    taken += slice.length;
    plan.push({
      date: addDays(opts.startISO, dayIdx++),
      phase: 'Learn',
      subjects: Array.from(new Set(slice.map((c) => String(c.subject)))),
      chapters: slice.map((c) => c.title),
      hours,
    });
  }

  let r = 0;
  for (let i = 0; i < reviseDays; i++) {
    const a = subjects[r % subjects.length];
    const b = subjects.length > 1 ? subjects[(r + 1) % subjects.length] : '';
    r += 2;
    plan.push({
      date: addDays(opts.startISO, dayIdx++),
      phase: 'Revise',
      subjects: b ? [a, b] : [a],
      chapters: [],
      hours,
    });
  }

  if (hasMock) {
    plan.push({
      date: addDays(opts.startISO, dayIdx++),
      phase: 'Mock',
      subjects: [...subjects],
      chapters: [],
      hours,
    });
  }

  return plan;
}
