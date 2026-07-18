/**
 * EverydayToolsPage.tsx — a set of free everyday calculators in one page:
 * unit converter, percentage, age, date difference, BMI and a lorem-ipsum
 * generator. All maths lives in the pure, unit-tested src/lib/everyday module;
 * this file is just the UI. Indexable SEO page.
 */
import { useEffect, useMemo, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';
import {
  convertUnit, unitsFor, percentage, ageBetween, dateDifference, bmi, lorem, tidy,
  type UnitCategory, type PercentMode,
} from '../lib/everyday';

const SITE = 'https://syllab.in';
const inputCls = 'rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700';
const selectCls = inputCls + ' pr-8';

type Tab = 'convert' | 'percent' | 'age' | 'datediff' | 'bmi' | 'lorem';
const TABS: { id: Tab; label: string }[] = [
  { id: 'convert', label: 'Unit converter' },
  { id: 'percent', label: 'Percentage' },
  { id: 'age', label: 'Age' },
  { id: 'datediff', label: 'Date difference' },
  { id: 'bmi', label: 'BMI' },
  { id: 'lorem', label: 'Lorem ipsum' },
];

const CATEGORIES: UnitCategory[] = ['length', 'weight', 'temperature', 'data', 'speed', 'area'];

function ResultBox({ children }: { children: React.ReactNode }) {
  return <div className="mt-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 p-4 text-center">{children}</div>;
}

/* ── Unit converter ── */
function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const units = useMemo(() => unitsFor(category), [category]);
  const [from, setFrom] = useState(units[0]);
  const [to, setTo] = useState(units[1]);
  const [value, setValue] = useState('1');

  // Reset from/to when the CATEGORY changes (keyed on category only, so stale
  // units from the previous category never linger).
  useEffect(() => {
    const u = unitsFor(category);
    setFrom(u[0]);
    setTo(u[1] || u[0]);
  }, [category]);

  const result = convertUnit(category, Number(value) || 0, from, to);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button key={c} type="button" onClick={() => setCategory(c)}
            className={`rounded-full px-3 py-1 text-xs font-black capitalize transition ${category === c ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>{c}</button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <label className="block"><span className="text-[11px] font-bold text-slate-500">Value</span>
          <input type="number" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} className={`mt-1 w-full ${inputCls}`} /></label>
        <label className="block"><span className="text-[11px] font-bold text-slate-500">From</span>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className={`mt-1 w-full ${selectCls}`}>{units.map((u) => <option key={u} value={u}>{u}</option>)}</select></label>
        <label className="block"><span className="text-[11px] font-bold text-slate-500">To</span>
          <select value={to} onChange={(e) => setTo(e.target.value)} className={`mt-1 w-full ${selectCls}`}>{units.map((u) => <option key={u} value={u}>{u}</option>)}</select></label>
      </div>
      {result != null && (
        <ResultBox>
          <div className="text-3xl font-black text-emerald-700 dark:text-emerald-300">{tidy(result, 6)}</div>
          <div className="text-[12px] font-bold text-emerald-600/80">{tidy(Number(value) || 0, 6)} {from} = {tidy(result, 6)} {to}</div>
        </ResultBox>
      )}
    </div>
  );
}

/* ── Percentage ── */
function Percentage() {
  const [mode, setMode] = useState<PercentMode>('of');
  const [a, setA] = useState('20');
  const [b, setB] = useState('150');
  const result = percentage(mode, Number(a) || 0, Number(b) || 0);
  const modes: { id: PercentMode; label: string; la: string; lb: string; unit: string }[] = [
    { id: 'of', label: 'A% of B', la: 'Percent (A)', lb: 'Of value (B)', unit: '' },
    { id: 'isWhat', label: 'A is what % of B', la: 'Value (A)', lb: 'Of total (B)', unit: '%' },
    { id: 'change', label: '% change A → B', la: 'From (A)', lb: 'To (B)', unit: '%' },
  ];
  const cfg = modes.find((m) => m.id === mode)!;
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {modes.map((m) => (
          <button key={m.id} type="button" onClick={() => setMode(m.id)} className={`rounded-full px-3 py-1 text-xs font-black transition ${mode === m.id ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>{m.label}</button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block"><span className="text-[11px] font-bold text-slate-500">{cfg.la}</span>
          <input type="number" inputMode="decimal" value={a} onChange={(e) => setA(e.target.value)} className={`mt-1 w-full ${inputCls}`} /></label>
        <label className="block"><span className="text-[11px] font-bold text-slate-500">{cfg.lb}</span>
          <input type="number" inputMode="decimal" value={b} onChange={(e) => setB(e.target.value)} className={`mt-1 w-full ${inputCls}`} /></label>
      </div>
      {result != null ? (
        <ResultBox><div className="text-3xl font-black text-emerald-700 dark:text-emerald-300">{tidy(result, 4)}{cfg.unit}</div></ResultBox>
      ) : <ResultBox><div className="text-sm font-bold text-slate-400">Enter values (B can’t be 0 for this mode).</div></ResultBox>}
    </div>
  );
}

/* ── Age ── */
function todayISO() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function AgeCalc() {
  const [dob, setDob] = useState('');
  const res = dob ? ageBetween(dob, todayISO()) : null;
  return (
    <div>
      <label className="block max-w-xs"><span className="text-[11px] font-bold text-slate-500">Date of birth</span>
        <input type="date" max={todayISO()} value={dob} onChange={(e) => setDob(e.target.value)} className={`mt-1 w-full ${inputCls}`} /></label>
      {res && (
        <ResultBox>
          <div className="text-3xl font-black text-emerald-700 dark:text-emerald-300">{res.years} yr · {res.months} mo · {res.days} d</div>
          <div className="text-[12px] font-bold text-emerald-600/80">That’s {res.totalDays.toLocaleString('en-IN')} days old</div>
        </ResultBox>
      )}
      {dob && !res && <ResultBox><div className="text-sm font-bold text-slate-400">Please choose a date in the past.</div></ResultBox>}
    </div>
  );
}

/* ── Date difference ── */
function DateDiff() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const res = a && b ? dateDifference(a, b) : null;
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 max-w-lg">
        <label className="block"><span className="text-[11px] font-bold text-slate-500">Start date</span>
          <input type="date" value={a} onChange={(e) => setA(e.target.value)} className={`mt-1 w-full ${inputCls}`} /></label>
        <label className="block"><span className="text-[11px] font-bold text-slate-500">End date</span>
          <input type="date" value={b} onChange={(e) => setB(e.target.value)} className={`mt-1 w-full ${inputCls}`} /></label>
      </div>
      {res && (
        <ResultBox>
          <div className="text-3xl font-black text-emerald-700 dark:text-emerald-300">{res.days.toLocaleString('en-IN')} days</div>
          <div className="text-[12px] font-bold text-emerald-600/80">{res.weeks} week{res.weeks === 1 ? '' : 's'}{res.remainderDays ? ` and ${res.remainderDays} day${res.remainderDays === 1 ? '' : 's'}` : ''}</div>
        </ResultBox>
      )}
    </div>
  );
}

/* ── BMI ── */
function BmiCalc() {
  const [kg, setKg] = useState('');
  const [cm, setCm] = useState('');
  const res = bmi(Number(kg) || 0, Number(cm) || 0);
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 max-w-lg">
        <label className="block"><span className="text-[11px] font-bold text-slate-500">Weight (kg)</span>
          <input type="number" inputMode="decimal" value={kg} onChange={(e) => setKg(e.target.value)} className={`mt-1 w-full ${inputCls}`} /></label>
        <label className="block"><span className="text-[11px] font-bold text-slate-500">Height (cm)</span>
          <input type="number" inputMode="decimal" value={cm} onChange={(e) => setCm(e.target.value)} className={`mt-1 w-full ${inputCls}`} /></label>
      </div>
      {res && (
        <ResultBox>
          <div className="text-3xl font-black text-emerald-700 dark:text-emerald-300">{res.bmi}</div>
          <div className="text-[12px] font-bold text-emerald-600/80">{res.category}</div>
        </ResultBox>
      )}
    </div>
  );
}

/* ── Lorem ipsum ── */
function Lorem() {
  const [kind, setKind] = useState<'words' | 'sentences' | 'paragraphs'>('paragraphs');
  const [count, setCount] = useState('3');
  const [copied, setCopied] = useState(false);
  const text = lorem(kind, Number(count) || 1);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard blocked */ }
  };
  return (
    <div>
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex gap-2">
          {(['words', 'sentences', 'paragraphs'] as const).map((k) => (
            <button key={k} type="button" onClick={() => setKind(k)} className={`rounded-full px-3 py-1 text-xs font-black capitalize transition ${kind === k ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>{k}</button>
          ))}
        </div>
        <label className="block"><span className="text-[11px] font-bold text-slate-500">How many (1–200)</span>
          <input type="number" min={1} max={200} value={count} onChange={(e) => setCount(e.target.value)} className={`mt-1 w-28 ${inputCls}`} /></label>
        <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 px-3 py-2 text-xs font-black text-slate-600 dark:text-slate-200 hover:bg-slate-200">
          {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
        </button>
      </div>
      <textarea readOnly value={text} className="mt-4 h-56 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed outline-none dark:bg-slate-900 dark:border-slate-700" />
    </div>
  );
}

export default function EverydayToolsPage() {
  const [tab, setTab] = useState<Tab>('convert');
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title="Everyday Calculators — Unit Converter, Percentage, Age, BMI | Syllab.in"
        description="Free everyday calculators in one place: unit converter (length, weight, temperature, data, speed, area), percentage calculator, age calculator, date difference, BMI and a lorem ipsum generator. No signup, works in your browser."
        keywords="unit converter, percentage calculator, age calculator, date difference calculator, bmi calculator, lorem ipsum generator, everyday calculators, online calculator free"
        url={`${SITE}/everyday`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Everyday Tools', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: `${SITE}/everyday`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'What can these everyday calculators do?', acceptedAnswer: { '@type': 'Answer', text: 'Convert units (length, weight, temperature, data, speed, area), work out percentages three ways, calculate exact age from a date of birth, find the number of days between two dates, compute BMI, and generate lorem ipsum placeholder text — all free and in your browser.' } },
          ] },
        ]}
      />
      <PageHero emoji="🧰" title="Everyday Tools" subtitle="Unit converter, percentage, age, date difference, BMI and lorem ipsum — all in one place." className="mb-4" />

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button key={t.id} type="button" onClick={() => setTab(t.id)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-black transition ${tab === t.id ? 'bg-primary text-white shadow' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>{t.label}</button>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
        {tab === 'convert' && <UnitConverter />}
        {tab === 'percent' && <Percentage />}
        {tab === 'age' && <AgeCalc />}
        {tab === 'datediff' && <DateDiff />}
        {tab === 'bmi' && <BmiCalc />}
        {tab === 'lorem' && <Lorem />}
      </div>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">Six everyday calculators, one free page</h2>
        <p>A quick <strong>unit converter</strong>, <strong>percentage calculator</strong>, <strong>age calculator</strong>, <strong>date-difference</strong> counter, <strong>BMI</strong> calculator and a <strong>lorem ipsum</strong> generator — no signup, nothing uploaded. For exam-specific maths (CGPA, attendance, CUET score and more), see the <a href="/calculators" className="font-bold text-primary hover:underline">Student Calculators</a>.</p>
      </section>

      <ToolRelated current="/everyday" />
    </div>
  );
}
