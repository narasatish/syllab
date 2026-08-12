/**
 * MarksTracker.tsx — free marks / percentage tracker. Add each subject with the
 * marks you scored out of its maximum; see your running overall percentage,
 * CBSE grade, strongest and weakest subject, and how many marks you still need
 * in upcoming exams to hit a target. Saved on-device. Indexable SEO page.
 */
import { useEffect, useMemo, useState } from 'react';
import { Plus, Trash2, RotateCcw } from 'lucide-react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';
import { summarise, marksToTarget, type Subject } from '../lib/marksTracker';
import { percentage } from '../lib/calculators';

const SITE = 'https://syllab.in';
const STORE_KEY = 'syllab_marks_tracker_v1';

interface Row { name: string; obtained: string; max: string }
const EMPTY: Row = { name: '', obtained: '', max: '100' };

export default function MarksTracker() {
  const [rows, setRows] = useState<Row[]>([{ name: '', obtained: '', max: '100' }, { name: '', obtained: '', max: '100' }, { name: '', obtained: '', max: '100' }]);
  const [remainingMax, setRemainingMax] = useState('');
  const [target, setTarget] = useState('75');

  useEffect(() => {
    try { const raw = localStorage.getItem(STORE_KEY); if (raw) { const s = JSON.parse(raw); if (Array.isArray(s.rows) && s.rows.length) setRows(s.rows); if (s.remainingMax != null) setRemainingMax(String(s.remainingMax)); if (s.target != null) setTarget(String(s.target)); } } catch { /* ignore */ }
  }, []);

  const subjects: Subject[] = useMemo(() => rows.map((r) => ({ name: r.name.trim(), obtained: Number(r.obtained), max: Number(r.max) })), [rows]);
  const hasData = subjects.some((s) => s.max > 0 && Number.isFinite(s.obtained) && r0(s.obtained));
  const summary = useMemo(() => summarise(subjects), [subjects]);

  // Persist.
  useEffect(() => { try { localStorage.setItem(STORE_KEY, JSON.stringify({ rows, remainingMax, target })); } catch { /* ignore */ } }, [rows, remainingMax, target]);

  const setRow = (i: number, k: keyof Row, v: string) => setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, [k]: v } : r)));
  const addRow = () => setRows((rs) => [...rs, { ...EMPTY }]);
  const removeRow = (i: number) => setRows((rs) => (rs.length > 1 ? rs.filter((_, idx) => idx !== i) : rs));
  const reset = () => { setRows([{ ...EMPTY }, { ...EMPTY }, { ...EMPTY }]); setRemainingMax(''); setTarget('75'); try { localStorage.removeItem(STORE_KEY); } catch { /* ignore */ } };

  const rem = Number(remainingMax); const tgt = Number(target);
  const needCalc = hasData && rem > 0 && tgt > 0 ? marksToTarget(summary.totalObtained, summary.totalMax, rem, tgt) : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title="Free Marks & Percentage Tracker for Students | Syllab.in"
        description="Track your marks across subjects and see your overall percentage, CBSE grade, strongest and weakest subject instantly — plus the marks you still need in upcoming exams to hit your target. Free, saved on your device."
        keywords="marks tracker, percentage tracker, GPA tracker, overall percentage calculator, marks needed for target, subject-wise marks, exam marks calculator, CBSE percentage tracker"
        url={`${SITE}/marks-tracker`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Marks Tracker', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/marks-tracker`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}
      />
      <PageHero emoji="📊" title="Marks Tracker" subtitle="Add each subject's marks to see your overall percentage, grade, strongest & weakest subject — and what you need to hit your target. Free, saved on your device." className="mb-6" />

      {/* Subject rows */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 shadow-sm">
        <div className="grid grid-cols-[1fr_5rem_5rem_5rem_auto] gap-2 px-1 pb-1 text-[11px] font-black uppercase tracking-wide text-slate-500">
          <span>Subject</span><span>Scored</span><span>Out of</span><span className="text-right">%</span><span />
        </div>
        <div className="space-y-2">
          {rows.map((r, i) => {
            const p = Number(r.max) > 0 && r.obtained !== '' ? percentage(Number(r.obtained), Number(r.max)) : null;
            return (
              <div key={i} className="grid grid-cols-[1fr_5rem_5rem_5rem_auto] items-center gap-2">
                <input value={r.name} onChange={(e) => setRow(i, 'name', e.target.value)} placeholder={`Subject ${i + 1}`} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" />
                <input type="number" inputMode="decimal" value={r.obtained} onChange={(e) => setRow(i, 'obtained', e.target.value)} placeholder="90" className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 text-sm outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" />
                <input type="number" inputMode="decimal" value={r.max} onChange={(e) => setRow(i, 'max', e.target.value)} placeholder="100" className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 text-sm outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" />
                <span className={`text-right text-sm font-black ${p == null ? 'text-slate-300' : p >= 33 ? 'text-slate-700 dark:text-slate-200' : 'text-rose-500'}`}>{p == null ? '—' : `${p}%`}</span>
                <button type="button" onClick={() => removeRow(i)} aria-label="Remove subject" className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500"><Trash2 size={15} /></button>
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <button type="button" onClick={addRow} className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"><Plus size={14} /> Add subject</button>
          <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600"><RotateCcw size={13} /> Reset</button>
        </div>
      </div>

      {/* Summary */}
      {hasData && (
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 p-4 text-center">
            <div className="text-3xl font-black text-emerald-700 dark:text-emerald-300">{summary.percentage}%</div>
            <div className="text-[11px] font-bold text-emerald-600/80">overall ({summary.totalObtained}/{summary.totalMax})</div>
          </div>
          <div className="rounded-2xl bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900 p-4 text-center">
            <div className="text-3xl font-black text-violet-700 dark:text-violet-300">{summary.grade}</div>
            <div className="text-[11px] font-bold text-violet-600/80">CBSE grade</div>
          </div>
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 text-center">
            <div className="text-base font-black text-slate-800 dark:text-slate-100 truncate">{summary.strongest || '—'}</div>
            <div className="text-[11px] font-bold text-slate-500">💪 strongest</div>
          </div>
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 text-center">
            <div className="text-base font-black text-slate-800 dark:text-slate-100 truncate">{summary.weakest || '—'}</div>
            <div className="text-[11px] font-bold text-slate-500">📉 focus here</div>
          </div>
        </div>
      )}

      {/* Target planner */}
      {hasData && (
        <div className="mt-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 shadow-sm">
          <h2 className="text-sm font-black text-slate-900 dark:text-slate-100 mb-2">Reach a target</h2>
          <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
            <label className="block"><span className="text-[11px] font-bold text-slate-500">Marks left to be taken</span>
              <input type="number" inputMode="decimal" value={remainingMax} onChange={(e) => setRemainingMax(e.target.value)} placeholder="e.g. 100" className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" /></label>
            <label className="block"><span className="text-[11px] font-bold text-slate-500">Target overall %</span>
              <input type="number" inputMode="decimal" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="75" className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" /></label>
          </div>
          {needCalc != null && rem > 0 && (
            <p className="mt-3 text-sm font-bold">
              {needCalc === -1 ? <span className="text-rose-600">Even full marks in the remaining {rem} won’t reach {tgt}%.</span>
                : needCalc === 0 ? <span className="text-emerald-700">You’ve already secured {tgt}% — anything more is a bonus! 🎉</span>
                : <span className="text-indigo-700 dark:text-indigo-300">Score <span className="text-lg font-black">{needCalc}</span> of the remaining {rem} marks to reach {tgt}% overall.</span>}
            </p>
          )}
        </div>
      )}

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">Track your marks and hit your target</h2>
        <p>Enter the marks you scored in each subject out of its maximum and instantly see your overall percentage, CBSE grade, and which subject is your strongest and weakest — so you know exactly where to put your effort. Add the marks still to be assessed and a target percentage, and the tracker tells you the exact score you need to get there.</p>
        <p>Everything is saved on your device — free, no sign-up. Pair it with the free <a href="/calculators" className="font-bold text-primary hover:underline">calculators</a> and the <a href="/study-planner" className="font-bold text-primary hover:underline">study planner</a>.</p>
      </section>

      <ToolRelated current="/marks-tracker" />
    </div>
  );
}

function r0(n: number): boolean { return Number.isFinite(n) && n >= 0; }
