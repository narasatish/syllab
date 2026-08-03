/**
 * StudyPlanner.tsx — free revision-timetable generator. Enter your exam date,
 * subjects and hours/day; get a day-by-day plan (learn → revise → mock) you can
 * save to this device or print/PDF. Pure client-side; indexable SEO page.
 */
import { useMemo, useState, useEffect, useCallback } from 'react';
import { Printer, RotateCcw } from 'lucide-react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';
import SyllabusTracker from '../components/SyllabusTracker';
import { buildStudyPlan, type PlanDay } from '../lib/studyPlanner';
import { buildSyllabusPlan } from '../lib/syllabusPlan';
import type { ChapterRef } from '../lib/studyPlan';

const SITE = 'https://syllab.in';
const STORE_KEY = 'syllab_study_plan_v1';

const phaseStyle: Record<PlanDay['phase'], string> = {
  Learn: 'bg-sky-50 text-sky-700 border-sky-200',
  Revise: 'bg-amber-50 text-amber-700 border-amber-200',
  Mock: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

function todayISO(): string {
  const d = new Date(); d.setHours(0, 0, 0, 0);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function prettyDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
}

type Mode = 'quick' | 'syllabus';

export default function StudyPlanner() {
  const [mode, setMode] = useState<Mode>('quick');
  const [subjectsRaw, setSubjectsRaw] = useState('');
  const [examDate, setExamDate] = useState('');
  const [hours, setHours] = useState('5');

  // Chapter-level state, owned by <SyllabusTracker/> and mirrored here so the
  // plan can be built from the chapters that are still left.
  const [trackChapters, setTrackChapters] = useState<ChapterRef[]>([]);
  const [trackDone, setTrackDone] = useState<Set<string>>(new Set());
  // Stable identity: the tracker calls this from an effect, so a new function
  // every render would loop.
  const onTrackerChange = useCallback((chs: ChapterRef[], done: Set<string>) => {
    setTrackChapters(chs);
    setTrackDone(done);
  }, []);

  // Restore a saved plan's inputs on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.subjectsRaw) setSubjectsRaw(s.subjectsRaw);
        if (s.examDate) setExamDate(s.examDate);
        if (s.hours) setHours(String(s.hours));
      }
    } catch { /* ignore */ }
  }, []);

  const subjects = useMemo(
    () => subjectsRaw.split(',').map((s) => s.trim()).filter(Boolean),
    [subjectsRaw],
  );

  const days = useMemo(() => {
    if (!examDate) return 0;
    const start = todayISO();
    const [sy, sm, sd] = start.split('-').map(Number);
    const [ey, em, ed] = examDate.split('-').map(Number);
    const diff = Math.round((Date.UTC(ey, em - 1, ed) - Date.UTC(sy, sm - 1, sd)) / 86400000);
    return diff; // days from today up to (and including) the day before the exam
  }, [examDate]);

  const plan = useMemo<PlanDay[]>(() => {
    if (days <= 0) return [];
    if (mode === 'syllabus') {
      if (!trackChapters.length) return [];
      return buildSyllabusPlan({
        chapters: trackChapters, doneIds: trackDone,
        days, hoursPerDay: Number(hours) || 0, startISO: todayISO(),
      });
    }
    if (!subjects.length) return [];
    return buildStudyPlan({ subjects, days, hoursPerDay: Number(hours) || 0, startISO: todayISO() });
  }, [mode, subjects, trackChapters, trackDone, days, hours]);

  // Chapter titles are only present on syllabus-mode plans.
  const showChapters = plan.some((d) => (d as { chapters?: string[] }).chapters?.length);

  // The two modes count "subjects" from different places — quick mode from the
  // text field, syllabus mode from the tracked chapters.
  const summary = useMemo(() => (
    mode === 'syllabus'
      ? {
          subjectCount: new Set(trackChapters.map((c) => String(c.subject))).size,
          chaptersLeft: trackChapters.length - trackDone.size,
        }
      : { subjectCount: subjects.length, chaptersLeft: null as number | null }
  ), [mode, subjects.length, trackChapters, trackDone]);

  const save = () => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ subjectsRaw, examDate, hours })); } catch { /* ignore */ }
  };
  const reset = () => { setSubjectsRaw(''); setExamDate(''); setHours('5'); try { localStorage.removeItem(STORE_KEY); } catch { /* ignore */ } };

  // Save inputs whenever a valid plan exists.
  useEffect(() => { if (plan.length) save(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [plan.length, subjectsRaw, examDate, hours]);

  const totalHours = plan.reduce((s, d) => s + d.hours, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO
        title="Free Study Planner & CBSE Syllabus Tracker (Chapter-wise) | Syllab.in"
        description="Tick off chapters as you finish them and get a free day-by-day timetable built from the syllabus you have LEFT — not a generic schedule. Chapter-wise tracking for CBSE Class 1–12, plus learn → revise → mock phases you can print. No signup."
        keywords="syllabus tracker, cbse syllabus tracker, chapter wise syllabus tracker class 10, study planner, revision timetable generator, syllabus completion tracker, study timetable maker free, exam study plan, board exam timetable, JEE NEET study plan"
        url={`${SITE}/study-planner`}
        jsonLd={{
          '@context': 'https://schema.org', '@type': 'WebApplication',
          name: 'Syllab Study Planner', applicationCategory: 'EducationalApplication',
          operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
          url: `${SITE}/study-planner`, isAccessibleForFree: true,
        }}
      />
      <PageHero emoji="🗓️" title="Study Planner & Syllabus Tracker" subtitle="Tick off chapters as you finish them and get a day-by-day timetable built from what's left. Free, no signup." className="mb-8" />

      <div className="mb-4 flex gap-2 print:hidden" role="tablist" aria-label="Planner mode">
        {([['quick', 'Quick plan'], ['syllabus', 'Syllabus tracker']] as [Mode, string][]).map(([m, label]) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-xl px-4 py-2 text-xs font-black transition ${mode === m ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === 'syllabus' && (
        <div className="mb-4">
          <SyllabusTracker onChange={onTrackerChange} />
        </div>
      )}

      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm print:hidden">
        <div className="grid gap-4 sm:grid-cols-2">
          {mode === 'quick' ? (
            <label className="block">
              <span className="text-xs font-bold text-slate-500">Subjects (comma-separated)</span>
              <input value={subjectsRaw} onChange={(e) => setSubjectsRaw(e.target.value)} placeholder="Mathematics, Physics, Chemistry, Biology"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary focus:bg-white dark:bg-slate-900 dark:border-slate-700" />
            </label>
          ) : (
            <p className="self-end text-xs font-bold text-slate-400">
              {trackChapters.length
                ? `${trackChapters.length - trackDone.size} chapters left to cover`
                : 'Pick a class and subjects above to load your chapters.'}
            </p>
          )}
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs font-bold text-slate-500">Exam date</span>
              <input type="date" value={examDate} min={todayISO()} onChange={(e) => setExamDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary focus:bg-white dark:bg-slate-900 dark:border-slate-700" />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-slate-500">Hours / day</span>
              <input type="number" inputMode="decimal" value={hours} min="1" max="16" onChange={(e) => setHours(e.target.value)} placeholder="5"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary focus:bg-white dark:bg-slate-900 dark:border-slate-700" />
            </label>
          </div>
        </div>

        {examDate && days <= 0 && (
          <p className="mt-3 text-sm font-bold text-rose-500">Pick an exam date in the future to build your plan.</p>
        )}
        {plan.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-black text-white hover:opacity-90 transition"><Printer size={14} /> Print / Save as PDF</button>
            <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 px-4 py-2 text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-slate-200"><RotateCcw size={14} /> Reset</button>
            <span className="text-xs font-bold text-slate-400">
              {plan.length} days · {summary.subjectCount} subjects
              {summary.chaptersLeft !== null && ` · ${summary.chaptersLeft} chapters to cover`}
              {' '}· ~{totalHours} study hours
            </span>
          </div>
        )}
      </div>

      {plan.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">Your {plan.length}-day plan</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800 text-[10px] font-black uppercase tracking-wide text-slate-400">
                <tr><th className="px-3 py-2">Day</th><th className="px-3 py-2">Date</th><th className="px-3 py-2">Focus</th>{showChapters && <th className="px-3 py-2">Chapters</th>}<th className="px-3 py-2">Phase</th><th className="px-3 py-2">Hours</th></tr>
              </thead>
              <tbody>
                {plan.map((d, i) => (
                  <tr key={d.date} className="border-t border-slate-100 dark:border-slate-700">
                    <td className="px-3 py-2 font-black text-slate-500">{i + 1}</td>
                    <td className="px-3 py-2 font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">{prettyDate(d.date)}</td>
                    <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{d.subjects.join(' + ')}</td>
                    {showChapters && (
                      <td className="px-3 py-2 text-slate-600 dark:text-slate-400">
                        {(d as { chapters?: string[] }).chapters?.join(' · ') || <span className="text-slate-300">—</span>}
                      </td>
                    )}
                    <td className="px-3 py-2"><span className={`rounded-full border px-2 py-0.5 text-[10px] font-black ${phaseStyle[d.phase]}`}>{d.phase === 'Mock' ? 'Mock test' : d.phase}</span></td>
                    <td className="px-3 py-2 font-bold text-slate-600 dark:text-slate-400">{d.hours}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-400">Plan saved on this device automatically. Tip: pair it with our free <a href="/mock-tests" className="font-bold text-primary hover:underline">mock tests</a> and <a href="/pyqs" className="font-bold text-primary hover:underline">previous-year questions</a> on the Mock and Revise days.</p>
        </div>
      )}

      {plan.length === 0 && (
        <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">How the study planner works</h2>
          <p>Tell us your <strong>exam date</strong>, the <strong>subjects</strong> you need to cover and how many <strong>hours a day</strong> you can study. The planner splits your time into three phases: a <strong>learn phase</strong> that spreads every subject evenly, a <strong>revise phase</strong> in the final quarter that cycles quickly through all subjects, and a <strong>mock-test day</strong> right before the exam.</p>
          <p>It works for CBSE board exams, JEE, NEET and college semesters alike. Your plan is saved on your device, and you can print it or save it as a PDF to stick on your wall. 100% free, no sign-up.</p>

          <h2 className="pt-2 text-lg font-black text-slate-900 dark:text-slate-100">Syllabus tracker: plan around what's actually left</h2>
          <p>Switch to <strong>Syllabus tracker</strong> to pick your class and subjects and load the real NCERT chapter list. Tick chapters off as you finish them and you get a live completion percentage for every subject — so you can see at a glance that Physics is 80% done while Chemistry is sitting at 30%.</p>
          <p>The timetable is then built from the chapters you <strong>haven't</strong> covered yet, naming each one on the day it's scheduled, and alternating between subjects so nothing gets left until the last week. Finish the syllabus and the whole plan turns into revision and mocks.</p>
          <p>Your ticks are shared with the <a href="/study-room" className="font-bold text-primary hover:underline">Study Room</a> — completing a chapter's flashcards there marks it done here too, so there's only ever one list to keep up to date.</p>
        </section>
      )}

      <ToolRelated current="/study-planner" />
    </div>
  );
}
