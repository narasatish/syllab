import { buildHeatmap, strongestSubjects, type HeatmapChapter } from '../lib/syllabusHeatmap';

interface Props {
  chapters: HeatmapChapter[];
  completedIds: string[] | undefined | null;
  classLevel: string;
}

/**
 * GitHub-contribution-style grid of the student's syllabus: one row per
 * subject, one square per chapter, filled once the chapter is done.
 *
 * All the maths is in lib/syllabusHeatmap.ts so it can be tested without a
 * DOM; this only renders. Squares are two-state on purpose — completion is
 * stored as a boolean, so a "partly done" shade would be inventing a signal
 * we do not have.
 *
 * Each square carries a title and an aria-label rather than relying on colour
 * alone, so the grid is not meaningless to a screen reader or to someone with
 * colour-vision deficiency.
 */
export default function SyllabusHeatmap({ chapters, completedIds, classLevel }: Props) {
  const summary = buildHeatmap(chapters, completedIds, classLevel);
  if (!summary.total) return null;

  const top = strongestSubjects(summary, 2);

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-black tracking-tight">Your syllabus map</h3>
        <p className="label">
          {summary.doneCount} of {summary.total} chapters · {summary.percent}%
        </p>
      </div>

      <div className="space-y-3">
        {summary.rows.map((row) => (
          <div key={row.subject}>
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{row.subject}</span>
              <span className="label-caps">{row.doneCount}/{row.total}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {row.cells.map((cell) => (
                <span
                  key={cell.id}
                  title={`${cell.title} — ${cell.done ? 'completed' : 'not started'}`}
                  aria-label={`${cell.title}, ${cell.done ? 'completed' : 'not started'}`}
                  className={
                    'h-4 w-4 rounded-[4px] border ' +
                    (cell.done
                      ? 'border-primary/40 bg-primary'
                      : 'border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800')
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {top.length ? (
        <p className="mt-4 text-xs font-medium text-slate-500">
          Strongest so far: {top.map((r) => `${r.subject} (${r.percent}%)`).join(', ')}
        </p>
      ) : (
        <p className="mt-4 text-xs font-medium text-slate-500">
          Finish a chapter in Practice and it lights up here.
        </p>
      )}
    </section>
  );
}
