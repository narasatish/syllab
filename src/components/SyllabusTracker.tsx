/**
 * SyllabusTracker.tsx — pick a class + subjects, then tick chapters off as you
 * finish them. Feeds the Study Planner so a plan can name real chapters instead
 * of just a subject.
 *
 * Completion is read from and written to the SHARED study memory in
 * studyPlan.ts — the same store the Study Room's flashcard sessions write to.
 * Finishing a chapter there ticks it here, and vice versa; there is deliberately
 * no second source of truth.
 */
import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { ClassLevel, Subject } from '../types';
import {
  availableClasses, subjectsFor, chaptersFor,
  loadMemory, setChapterCompleted, type ChapterRef,
} from '../lib/studyPlan';
import { syllabusProgress } from '../lib/syllabusPlan';

const SEL_KEY = 'syllab_syllabus_sel_v1';

function todayISO(): string {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

interface Props {
  /** Called whenever the chapter selection or completion state changes. */
  onChange: (chapters: ChapterRef[], doneIds: Set<string>) => void;
}

export default function SyllabusTracker({ onChange }: Props) {
  const classes = useMemo(() => availableClasses(), []);
  const [classLevel, setClassLevel] = useState<ClassLevel | ''>('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<Record<string, boolean>>({});

  // Restore the last class/subject choice, and the ticks from shared memory.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SEL_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.classLevel) setClassLevel(s.classLevel);
        if (Array.isArray(s.subjects)) setSubjects(s.subjects);
      }
    } catch { /* ignore */ }
    try {
      const mem = loadMemory();
      setDoneIds(new Set(Object.values(mem.chapters).filter((c) => c.completed).map((c) => c.id)));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!classLevel) return;
    try { localStorage.setItem(SEL_KEY, JSON.stringify({ classLevel, subjects })); } catch { /* ignore */ }
  }, [classLevel, subjects]);

  const availableSubjects = useMemo(
    () => (classLevel ? subjectsFor(classLevel as ClassLevel) : []),
    [classLevel],
  );

  const chapters = useMemo(() => {
    if (!classLevel) return [];
    return subjects.flatMap((s) => chaptersFor(classLevel as ClassLevel, s));
  }, [classLevel, subjects]);

  useEffect(() => { onChange(chapters, doneIds); }, [chapters, doneIds, onChange]);

  const progress = useMemo(() => syllabusProgress(chapters, doneIds), [chapters, doneIds]);

  const toggleSubject = (s: Subject) => {
    setSubjects((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
    setOpen((prev) => ({ ...prev, [s]: true }));
  };

  const toggleChapter = (c: ChapterRef) => {
    const next = new Set(doneIds);
    const nowDone = !next.has(c.id);
    if (nowDone) next.add(c.id); else next.delete(c.id);
    setDoneIds(next);
    try { setChapterCompleted(c, nowDone, todayISO()); } catch { /* ignore */ }
  };

  const markSubject = (s: Subject, done: boolean) => {
    const list = classLevel ? chaptersFor(classLevel as ClassLevel, s) : [];
    const next = new Set(doneIds);
    for (const c of list) {
      if (done) next.add(c.id); else next.delete(c.id);
      try { setChapterCompleted(c, done, todayISO()); } catch { /* ignore */ }
    }
    setDoneIds(next);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm print:hidden">
      <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
        <label className="block">
          <span className="text-xs font-bold text-slate-500">Class</span>
          <select
            value={classLevel}
            onChange={(e) => { setClassLevel(e.target.value as ClassLevel); setSubjects([]); }}
            className="mt-1 w-full min-w-28 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold outline-none focus:border-primary focus:bg-white dark:bg-slate-900 dark:border-slate-700"
          >
            <option value="">Select…</option>
            {classes.map((c) => <option key={c} value={c}>Class {c}</option>)}
          </select>
        </label>

        {availableSubjects.length > 0 && (
          <div>
            <span className="text-xs font-bold text-slate-500">Subjects you're studying</span>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {availableSubjects.map((s) => {
                const on = subjects.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSubject(s)}
                    aria-pressed={on}
                    className={`rounded-full border px-3 py-1.5 text-xs font-black transition ${on ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-primary dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300'}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {chapters.length > 0 && (
        <>
          <div className="mt-5 rounded-xl bg-slate-50 dark:bg-slate-900 p-4">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-xs font-black uppercase tracking-wide text-slate-400">Syllabus covered</span>
              <span className="text-sm font-black text-slate-700 dark:text-slate-200">
                {progress.done} / {progress.total} chapters · {progress.pct}%
              </span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress.pct}%` }}
                role="progressbar"
                aria-valuenow={progress.pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Syllabus completed"
              />
            </div>
            <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {progress.bySubject.map((s) => (
                <div key={s.subject} className="flex items-center gap-2 text-xs">
                  <span className="w-28 shrink-0 truncate font-bold text-slate-600 dark:text-slate-300">{s.subject}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <span className="block h-full rounded-full bg-primary" style={{ width: `${s.pct}%` }} />
                  </span>
                  <span className="w-16 shrink-0 text-right font-black text-slate-500">{s.done}/{s.total}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {subjects.map((s) => {
              const list = classLevel ? chaptersFor(classLevel as ClassLevel, s) : [];
              if (!list.length) return null;
              const doneCount = list.filter((c) => doneIds.has(c.id)).length;
              const isOpen = open[s] !== false;
              return (
                <div key={s} className="rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center justify-between gap-2 px-3 py-2">
                    <button
                      type="button"
                      onClick={() => setOpen((p) => ({ ...p, [s]: !isOpen }))}
                      aria-expanded={isOpen}
                      className="flex flex-1 items-center gap-2 text-left text-sm font-black text-slate-700 dark:text-slate-200"
                    >
                      <ChevronDown size={15} className={`shrink-0 transition-transform ${isOpen ? '' : '-rotate-90'}`} />
                      {s}
                      <span className="text-xs font-bold text-slate-400">{doneCount}/{list.length}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => markSubject(s, doneCount < list.length)}
                      className="shrink-0 rounded-lg bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-[11px] font-black text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                    >
                      {doneCount < list.length ? 'Mark all done' : 'Clear all'}
                    </button>
                  </div>
                  {isOpen && (
                    <ul className="border-t border-slate-100 dark:border-slate-700 px-2 py-1.5">
                      {list.map((c) => {
                        const on = doneIds.has(c.id);
                        return (
                          <li key={c.id}>
                            <button
                              type="button"
                              onClick={() => toggleChapter(c)}
                              aria-pressed={on}
                              className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-900"
                            >
                              <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition ${on ? 'border-primary bg-primary text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                                {on && <Check size={12} strokeWidth={3.5} />}
                              </span>
                              <span className={on ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'}>{c.title}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {classLevel && !subjects.length && (
        <p className="mt-4 text-sm font-bold text-slate-400">Pick at least one subject to see its chapters.</p>
      )}
    </div>
  );
}
