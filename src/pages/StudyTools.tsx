/**
 * StudyTools — a free, 100% client-side calculator suite for Indian students.
 * /tools. High-intent, evergreen, linkable utilities (no API, no cost):
 *   • CBSE Percentage Calculator
 *   • CGPA ⇄ Percentage Converter (official CBSE ×9.5 rule)
 *   • Marks-Needed (target) Calculator
 *   • Exam Countdown
 * Each tool ships with substantive explainer + FAQ content so the page ranks
 * as a real resource, not a thin utility.
 */
import { useMemo, useState } from 'react';
import { Calculator, GraduationCap, Target, CalendarClock } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const SITE = 'https://syllab.in';

type ToolId = 'percentage' | 'cgpa' | 'target' | 'countdown';
const TOOLS: { id: ToolId; label: string; icon: typeof Calculator }[] = [
  { id: 'percentage', label: 'Percentage', icon: Calculator },
  { id: 'cgpa', label: 'CGPA ⇄ %', icon: GraduationCap },
  { id: 'target', label: 'Marks Needed', icon: Target },
  { id: 'countdown', label: 'Exam Countdown', icon: CalendarClock },
];

const num = (v: string): number | null => {
  if (v.trim() === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};
const round = (n: number, d = 2) => Math.round(n * 10 ** d) / 10 ** d;

// ── Percentage ───────────────────────────────────────────────────────────────
function PercentageTool() {
  const [rows, setRows] = useState<{ obtained: string; max: string }[]>([
    { obtained: '', max: '100' }, { obtained: '', max: '100' }, { obtained: '', max: '100' },
  ]);
  const setRow = (i: number, k: 'obtained' | 'max', v: string) =>
    setRows((r) => r.map((row, j) => (j === i ? { ...row, [k]: v } : row)));

  const { totalObt, totalMax, pct } = useMemo(() => {
    let o = 0, m = 0;
    for (const r of rows) { const ro = num(r.obtained), rm = num(r.max); if (ro !== null && rm && rm > 0) { o += ro; m += rm; } }
    return { totalObt: o, totalMax: m, pct: m > 0 ? round((o / m) * 100) : null };
  }, [rows]);

  return (
    <div>
      <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">Enter your marks for each subject (obtained / out of). Add as many as you need.</p>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-6 text-xs font-black text-slate-400">{i + 1}.</span>
            <input inputMode="decimal" value={r.obtained} onChange={(e) => setRow(i, 'obtained', e.target.value)} placeholder="obtained" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800" />
            <span className="text-slate-400">/</span>
            <input inputMode="decimal" value={r.max} onChange={(e) => setRow(i, 'max', e.target.value)} placeholder="out of" className="w-24 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800" />
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={() => setRows((r) => [...r, { obtained: '', max: '100' }])} className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-black text-slate-600 hover:border-primary dark:border-slate-700 dark:text-slate-300">+ Add subject</button>
        {rows.length > 1 ? <button onClick={() => setRows((r) => r.slice(0, -1))} className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-black text-slate-600 hover:border-red-400 dark:border-slate-700 dark:text-slate-300">− Remove</button> : null}
      </div>
      <ResultCard show={pct !== null}>
        <p className="text-4xl font-black text-primary">{pct}%</p>
        <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{totalObt} / {totalMax} marks</p>
      </ResultCard>
    </div>
  );
}

// ── CGPA ⇄ Percentage ────────────────────────────────────────────────────────
function CgpaTool() {
  const [cgpa, setCgpa] = useState('');
  const [pct, setPct] = useState('');
  const cgpaVal = num(cgpa), pctVal = num(pct);
  const pctFromCgpa = cgpaVal !== null && cgpaVal >= 0 && cgpaVal <= 10 ? round(cgpaVal * 9.5) : null;
  const cgpaFromPct = pctVal !== null && pctVal >= 0 && pctVal <= 100 ? round(pctVal / 9.5) : null;
  return (
    <div>
      <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">CBSE uses the official rule: <strong>Percentage = CGPA × 9.5</strong>. Fill in either box.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
          <label className="text-xs font-black uppercase tracking-wide text-slate-400">CGPA → Percentage</label>
          <input inputMode="decimal" value={cgpa} onChange={(e) => { setCgpa(e.target.value); setPct(''); }} placeholder="e.g. 9.2" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800" />
          {pctFromCgpa !== null ? <p className="mt-3 text-3xl font-black text-primary">{pctFromCgpa}%</p> : null}
        </div>
        <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
          <label className="text-xs font-black uppercase tracking-wide text-slate-400">Percentage → CGPA</label>
          <input inputMode="decimal" value={pct} onChange={(e) => { setPct(e.target.value); setCgpa(''); }} placeholder="e.g. 87.4" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800" />
          {cgpaFromPct !== null ? <p className="mt-3 text-3xl font-black text-primary">{cgpaFromPct}</p> : null}
        </div>
      </div>
    </div>
  );
}

// ── Marks needed for target ──────────────────────────────────────────────────
function TargetTool() {
  const [scored, setScored] = useState('');
  const [scoredOf, setScoredOf] = useState('');
  const [remainingMax, setRemainingMax] = useState('');
  const [target, setTarget] = useState('');
  const s = num(scored), so = num(scoredOf), rm = num(remainingMax), t = num(target);
  const result = useMemo(() => {
    if (s === null || so === null || rm === null || t === null || so <= 0 || rm <= 0 || t < 0 || t > 100) return null;
    const grandTotal = so + rm;
    const needed = (t / 100) * grandTotal - s;
    const neededPctOfRemaining = round((needed / rm) * 100);
    return { needed: round(needed), rm, neededPctOfRemaining, possible: needed <= rm, alreadyDone: needed <= 0 };
  }, [s, so, rm, t]);
  return (
    <div>
      <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">Find the marks you need in your remaining exams to hit an overall target percentage.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Marks scored so far" value={scored} set={setScored} placeholder="e.g. 240" />
        <Field label="…out of (completed)" value={scoredOf} set={setScoredOf} placeholder="e.g. 300" />
        <Field label="Remaining exams total marks" value={remainingMax} set={setRemainingMax} placeholder="e.g. 200" />
        <Field label="Target overall %" value={target} set={setTarget} placeholder="e.g. 85" />
      </div>
      <ResultCard show={result !== null}>
        {result ? (
          result.alreadyDone ? (
            <p className="text-lg font-black text-emerald-600">🎉 You've already secured your target — even 0 in the rest keeps you above {target}%.</p>
          ) : result.possible ? (
            <>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">You need at least</p>
              <p className="text-4xl font-black text-primary">{result.needed} <span className="text-lg text-slate-400">/ {result.rm}</span></p>
              <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">that's {result.neededPctOfRemaining}% of your remaining marks to reach {target}% overall.</p>
            </>
          ) : (
            <p className="text-lg font-black text-red-500">Reaching {target}% isn't possible now — you'd need {result.needed} out of only {result.rm} remaining marks. Aim for a realistic target.</p>
          )
        ) : null}
      </ResultCard>
    </div>
  );
}

// ── Exam countdown ───────────────────────────────────────────────────────────
function CountdownTool() {
  const [date, setDate] = useState('');
  const days = useMemo(() => {
    if (!date) return null;
    const target = new Date(date + 'T00:00:00');
    if (Number.isNaN(target.getTime())) return null;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return Math.round((target.getTime() - today.getTime()) / 86400000);
  }, [date]);
  return (
    <div>
      <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">Pick your exam date to see how many days you have left to prepare.</p>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800" />
      <ResultCard show={days !== null}>
        {days !== null ? (
          days > 0 ? (
            <><p className="text-4xl font-black text-primary">{days} {days === 1 ? 'day' : 'days'}</p><p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{Math.floor(days / 7)} weeks {days % 7} days to go. Make a plan and start today!</p></>
          ) : days === 0 ? (
            <p className="text-3xl font-black text-emerald-600">It's exam day — you've got this! 💪</p>
          ) : (
            <p className="text-lg font-black text-slate-500">That date has passed ({Math.abs(days)} days ago).</p>
          )
        ) : null}
      </ResultCard>
    </div>
  );
}

// ── Shared UI ────────────────────────────────────────────────────────────────
function Field({ label, value, set, placeholder }: { label: string; value: string; set: (v: string) => void; placeholder: string }) {
  return (
    <div>
      <label className="text-xs font-black uppercase tracking-wide text-slate-400">{label}</label>
      <input inputMode="decimal" value={value} onChange={(e) => set(e.target.value)} placeholder={placeholder} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800" />
    </div>
  );
}
function ResultCard({ show, children }: { show: boolean; children: React.ReactNode }) {
  if (!show) return null;
  return <div className="mt-5 rounded-2xl bg-primary/5 p-5 text-center dark:bg-primary/10">{children}</div>;
}

const FAQS = [
  { q: 'How do I calculate my CBSE percentage from marks?', a: 'Add up the marks you obtained across all subjects, add up the maximum marks, then divide obtained by maximum and multiply by 100. For example, 425 out of 500 is (425 ÷ 500) × 100 = 85%.' },
  { q: 'How do I convert CGPA to percentage in CBSE?', a: 'CBSE uses the official formula Percentage = CGPA × 9.5. So a CGPA of 9.2 equals 9.2 × 9.5 = 87.4%. To go the other way, divide the percentage by 9.5.' },
  { q: 'What marks do I need to reach my target percentage?', a: 'Multiply your target percentage by the grand total of all exams, then subtract the marks you have already scored. The result is the minimum marks you need in your remaining exams. The Marks Needed calculator above does this instantly.' },
  { q: 'Are these calculators free?', a: 'Yes. Every tool on Syllab is completely free, works in your browser with no sign-up, and never stores your marks.' },
];

export default function StudyTools({ setTab }: { setTab?: (tab: string) => void }) {
  const [tool, setTool] = useState<ToolId>('percentage');
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title="Free Student Calculators — CBSE Percentage, CGPA to %, Marks Needed | Syllab.in"
        description="Free online calculators for Indian students: CBSE percentage calculator, CGPA to percentage converter (×9.5), marks-needed target calculator and exam countdown. No sign-up, instant results."
        keywords="cbse percentage calculator, cgpa to percentage calculator, cgpa calculator cbse, marks needed calculator, percentage calculator for students, exam countdown, free student calculator India, class 10 percentage calculator"
        url={`${SITE}/tools`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Student Calculators', applicationCategory: 'EducationalApplication', operatingSystem: 'Any (web)', url: `${SITE}/tools`, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }, inLanguage: 'en-IN', isAccessibleForFree: true, publisher: { '@type': 'Organization', name: 'Syllab.in' } },
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
        ]}
      />
      <PageHero emoji="🧮" title="Free Student Calculators" subtitle="Quick, accurate tools for marks, CGPA and exam planning — free, no sign-up, and your marks never leave your device." className="mb-6" />

      <div className="mb-5 flex flex-wrap gap-2">
        {TOOLS.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTool(t.id)} className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-black transition-colors ${tool === t.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}`}>
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        {tool === 'percentage' ? <PercentageTool /> : null}
        {tool === 'cgpa' ? <CgpaTool /> : null}
        {tool === 'target' ? <TargetTool /> : null}
        {tool === 'countdown' ? <CountdownTool /> : null}
      </div>

      {/* Substantive explainer content (also gives the page real SEO body). */}
      <article className="mt-8 space-y-5 text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="mb-1.5 text-lg font-black text-slate-900 dark:text-slate-100">How to calculate your CBSE percentage</h2>
          <p className="text-sm leading-relaxed">Add the marks you scored in every subject, add the maximum marks, then divide and multiply by 100: <strong>Percentage = (Total obtained ÷ Total maximum) × 100</strong>. For 5 subjects out of 100 each, scoring 425 in total gives (425 ÷ 500) × 100 = <strong>85%</strong>. The calculator above does this for any number of subjects.</p>
        </section>
        <section>
          <h2 className="mb-1.5 text-lg font-black text-slate-900 dark:text-slate-100">CGPA to percentage (CBSE ×9.5 rule)</h2>
          <p className="text-sm leading-relaxed">CBSE grades on a 10-point scale and provides an official conversion: <strong>Percentage = CGPA × 9.5</strong>. So a CGPA of 9.4 equals 89.3%. To convert a percentage back to CGPA, divide by 9.5. Your five main subjects' grade points are averaged to get the overall CGPA.</p>
        </section>
        <section>
          <h2 className="mb-1.5 text-lg font-black text-slate-900 dark:text-slate-100">Frequently asked questions</h2>
          <div className="space-y-2">
            {FAQS.map((f, i) => (
              <details key={i} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                <summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">{f.q}</summary>
                <p className="mt-2 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </article>

      {setTab ? (
        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
          <p className="flex-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">Know your target — now hit it. Practise free mock tests and get an AI tutor on Syllab.</p>
          <button onClick={() => setTab('mock_tests')} className="rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">Free mock tests</button>
        </div>
      ) : null}
    </div>
  );
}
