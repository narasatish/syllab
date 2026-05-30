/**
 * CareerPredictor — Rank/College predictor + stream guidance.
 * All outputs are clearly labelled INDICATIVE estimates (data: 2024).
 */

import React, { useState } from 'react';
import { TrendingUp, GraduationCap, Stethoscope, Compass, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';
import {
  neetMarksToRank, predictNeetColleges, NEET_QUALIFYING_2024,
  STREAM_GUIDES, PREDICTOR_DATA_YEAR,
  ENG_EXAMS, predictEngineering,
} from '../data/predictorData';

type Tab = 'jee' | 'neet' | 'stream';

export default function CareerPredictor() {
  const [tab, setTab] = useState<Tab>('jee');

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title="Free JEE Rank Predictor, NEET College Predictor & Stream Guide | Syllab.in"
        description="Free JEE Main rank predictor (percentile to rank), JEE college predictor, NEET marks-to-rank & medical college predictor, and after-10th stream guidance for Indian students. Indicative estimates based on 2024 data."
        keywords="JEE rank predictor free, JEE Main percentile to rank, JEE college predictor free, NEET rank predictor, NEET college predictor free, NEET marks vs rank, which stream after 10th, career guidance after 10th 12th, JoSAA cutoff predictor, MBBS college predictor India"
        url="https://syllab.in/career-predictor"
        jsonLd={{
          '@context': 'https://schema.org', '@type': 'WebApplication',
          name: 'Syllab Rank & College Predictor', applicationCategory: 'EducationApplication',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }, isAccessibleForFree: true,
        }}
      />

      <header className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">🎯 Career & College Predictor</h1>
        <p className="mt-1 text-sm text-slate-500 font-medium">
          Estimate your rank, find likely colleges, and pick the right stream — free.
        </p>
      </header>

      {/* Disclaimer */}
      <div className="mb-6 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
        <AlertCircle size={16} className="shrink-0 mt-0.5" />
        <span>
          These are <strong>indicative estimates</strong> based on {PREDICTOR_DATA_YEAR} data. Actual cutoffs change every year
          with exam difficulty, applicants and category. Always confirm on official counselling sites
          (JoSAA, MCC, NTA) before any decision.
        </span>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
        {([
          { id: 'jee', label: 'Engineering', icon: <GraduationCap size={15} /> },
          { id: 'neet', label: 'NEET / Medical', icon: <Stethoscope size={15} /> },
          { id: 'stream', label: 'Which Stream?', icon: <Compass size={15} /> },
        ] as const).map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black transition-all ${
              tab === t.id ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-primary'
            }`}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {tab === 'jee' && <EngineeringPredictor />}
      {tab === 'neet' && <NeetPredictor />}
      {tab === 'stream' && <StreamGuide />}
    </div>
  );
}

/* ─── Engineering (multi-exam) ──────────────────────────────────────────────*/
function EngineeringPredictor() {
  const [examId, setExamId] = useState(ENG_EXAMS[0].id);
  const [value, setValue] = useState('');
  const [result, setResult] = useState<ReturnType<typeof predictEngineering>>(null);
  const exam = ENG_EXAMS.find(e => e.id === examId)!;

  const run = () => {
    const v = parseFloat(value);
    if (isNaN(v) || v < 0) { setResult(null); return; }
    setResult(predictEngineering(examId, v));
  };

  return (
    <div className="space-y-5">
      {/* Exam selector */}
      <div>
        <label className="block text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">Choose your exam</label>
        <div className="flex flex-wrap gap-1.5">
          {ENG_EXAMS.map(e => (
            <button key={e.id}
              onClick={() => { setExamId(e.id); setResult(null); setValue(''); }}
              className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                examId === e.id ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-primary'
              }`}>
              {e.emoji} {e.name}
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-[11px] text-slate-400">{exam.region} · cutoffs for General/OC category (indicative)</p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
        <label className="block text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">{exam.inputLabel}</label>
        <div className="flex gap-2">
          <input type="number" inputMode="decimal" value={value} onChange={e => setValue(e.target.value)}
            placeholder={`max ${exam.inputMax}`} min={0} max={exam.inputMax} step="0.01"
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <button onClick={run} className="rounded-xl bg-primary text-white px-6 py-3 text-sm font-black hover:bg-emerald-600 transition-colors">Predict</button>
        </div>
      </div>

      {result && (
        <>
          {result.estimatedRank !== null && (
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white text-center shadow-lg">
              <p className="text-[11px] font-black uppercase tracking-widest text-white/60">Estimated Rank</p>
              <p className="text-4xl font-black mt-1 flex items-center justify-center gap-2"><TrendingUp size={28} /> ~{result.estimatedRank.toLocaleString()}</p>
            </div>
          )}
          <CollegeList title={`Colleges you could target — ${exam.name}`} empty="Aim a bit higher to open up colleges in our list — and check official counselling for the full list.">
            {result.colleges.map((c, i) => (
              <Row key={i} a={c.college} b={c.branch}
                c={exam.metric === 'rank' ? `≤ ${c.cutoff.toLocaleString()}` : exam.metric === 'percentile' ? `${c.cutoff} %ile` : `score ${c.cutoff}`}
                tag={exam.region} />
            ))}
          </CollegeList>
        </>
      )}
    </div>
  );
}

/* ─── NEET ───────────────────────────────────────────────────────────────── */
function NeetPredictor() {
  const [marks, setMarks] = useState('');
  const [result, setResult] = useState<{ rank: number; qualified: boolean; colleges: ReturnType<typeof predictNeetColleges> } | null>(null);

  const run = () => {
    const m = parseInt(marks, 10);
    if (isNaN(m) || m < -180 || m > 720) { setResult(null); return; }
    const rank = neetMarksToRank(m);
    setResult({ rank, qualified: m >= NEET_QUALIFYING_2024.general, colleges: predictNeetColleges(rank) });
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
        <label className="block text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">Your NEET Marks (out of 720)</label>
        <div className="flex gap-2">
          <input type="number" inputMode="numeric" value={marks} onChange={e => setMarks(e.target.value)}
            placeholder="e.g. 620" max={720}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <button onClick={run} className="rounded-xl bg-primary text-white px-6 py-3 text-sm font-black hover:bg-emerald-600 transition-colors">Predict</button>
        </div>
      </div>

      {result && (
        <>
          <div className="rounded-2xl bg-gradient-to-br from-rose-600 to-pink-700 p-5 text-white text-center shadow-lg">
            <p className="text-[11px] font-black uppercase tracking-widest text-white/60">Estimated All India Rank</p>
            <p className="text-4xl font-black mt-1">~{result.rank.toLocaleString()}</p>
            <p className="mt-2 text-xs font-bold text-white/80">
              {result.qualified ? '✅ Above the General qualifying cutoff (164)' : '⚠️ Below the 2024 General qualifying cutoff (164)'}
            </p>
          </div>
          <CollegeList title="Medical colleges you could target (MBBS)" empty="Focus on raising your score to qualify for counselling.">
            {result.colleges.map((c, i) => (
              <Row key={i} a={c.college} b={c.course} c={`≤ ${c.closingRank.toLocaleString()}`} tag={c.quota} />
            ))}
          </CollegeList>
        </>
      )}
    </div>
  );
}

/* ─── Stream guidance ───────────────────────────────────────────────────────*/
function StreamGuide() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {STREAM_GUIDES.map(s => (
        <div key={s.stream} className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
          <div className="text-3xl mb-2">{s.emoji}</div>
          <h3 className="text-lg font-black text-slate-900">{s.stream}</h3>
          <p className="mt-1 text-sm text-slate-600">{s.forYou}</p>
          <div className="mt-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Careers</p>
            <div className="flex flex-wrap gap-1.5">{s.careers.map(c => <span key={c} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">{c}</span>)}</div>
          </div>
          <div className="mt-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Key exams</p>
            <div className="flex flex-wrap gap-1.5">{s.exams.map(e => <span key={e} className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">{e}</span>)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Shared bits ───────────────────────────────────────────────────────────*/
function CollegeList({ title, empty, children }: { title: string; empty: string; children: React.ReactNode[] }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
      <h3 className="text-sm font-black text-slate-900 mb-3">{title}</h3>
      {children.length ? <div className="space-y-2">{children}</div> : <p className="text-sm text-slate-500">{empty}</p>}
    </div>
  );
}
function Row({ a, b, c, tag }: { a: string; b: string; c: string; tag: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-black text-slate-800 truncate">{a}</p>
        <p className="text-[11px] text-slate-500 truncate">{b}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs font-black text-primary">{c}</p>
        <p className="text-[10px] font-bold text-slate-400">{tag}</p>
      </div>
    </div>
  );
}
