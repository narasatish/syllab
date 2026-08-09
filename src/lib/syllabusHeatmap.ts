/**
 * syllabusHeatmap.ts — turns a student's completed-chapter list into the
 * GitHub-style grid the dashboard renders.
 *
 * Pure and data-only: no React, no SYLLABUS import. The caller passes the
 * chapters in, which keeps this testable with small fixtures and keeps the
 * 60 KB syllabus module out of anything that only needs the maths.
 *
 * `completedChapters` holds chapter IDs (Arena writes `q.chapter_id` into it),
 * so matching is on `chapter.id`, never on the title — titles repeat across
 * classes ("Light" exists in more than one) and would produce false positives.
 */

export interface HeatmapChapter {
  id: string;
  title: string;
  subject: string;
  classLevel: string;
}

export interface HeatmapCell {
  id: string;
  title: string;
  done: boolean;
}

export interface HeatmapRow {
  subject: string;
  cells: HeatmapCell[];
  doneCount: number;
  total: number;
  /** 0–100, rounded. 0 when the subject somehow has no chapters. */
  percent: number;
}

export interface HeatmapSummary {
  rows: HeatmapRow[];
  doneCount: number;
  total: number;
  percent: number;
}

/**
 * Build the grid for one class level.
 *
 * Rows come back sorted by subject name so the layout is stable between
 * renders — an unsorted Map iteration would reshuffle rows whenever the
 * underlying data order changed, which reads as flicker.
 */
export function buildHeatmap(
  chapters: HeatmapChapter[],
  completedIds: string[] | undefined | null,
  classLevel: string,
): HeatmapSummary {
  const done = new Set(completedIds ?? []);
  const mine = chapters.filter((c) => String(c.classLevel) === String(classLevel));

  const bySubject = new Map<string, HeatmapCell[]>();
  for (const c of mine) {
    const cells = bySubject.get(c.subject) ?? [];
    cells.push({ id: c.id, title: c.title, done: done.has(c.id) });
    bySubject.set(c.subject, cells);
  }

  const rows: HeatmapRow[] = [...bySubject.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([subject, cells]) => {
      const d = cells.filter((c) => c.done).length;
      return { subject, cells, doneCount: d, total: cells.length, percent: pct(d, cells.length) };
    });

  const total = mine.length;
  const doneCount = rows.reduce((n, r) => n + r.doneCount, 0);
  return { rows, doneCount, total, percent: pct(doneCount, total) };
}

function pct(done: number, total: number): number {
  if (!total) return 0;
  return Math.round((done / total) * 100);
}

/**
 * Intensity bucket for a cell, GitHub-contribution style.
 *
 * Deliberately only two states. A "partially done" shade would be a lie: we
 * record chapter completion as a boolean, so there is no half-finished signal
 * to colour with.
 */
export function cellLevel(cell: HeatmapCell): 0 | 1 {
  return cell.done ? 1 : 0;
}

/** Subjects with at least one chapter completed, most-progressed first. */
export function strongestSubjects(summary: HeatmapSummary, limit = 3): HeatmapRow[] {
  return summary.rows
    .filter((r) => r.doneCount > 0)
    .sort((a, b) => b.percent - a.percent || b.doneCount - a.doneCount)
    .slice(0, limit);
}
