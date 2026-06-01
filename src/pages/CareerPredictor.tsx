/**
 * CareerPredictor — Rank/college predictor, career explorer, interest quiz,
 * stream guidance, exam calendar & scholarships.
 * All numeric outputs are clearly labelled INDICATIVE estimates (data: 2024).
 */

import React, { useState, useMemo } from 'react';
import {
  TrendingUp, GraduationCap, Stethoscope, Compass, AlertCircle,
  Briefcase, Sparkles, CalendarDays, Award, Search,
} from 'lucide-react';
import SEO from '../components/SEO';
import {
  neetMarksToRank, predictNeetColleges, NEET_QUALIFYING_2024,
  STREAM_GUIDES, PREDICTOR_DATA_YEAR,
  ENG_EXAMS, predictEngineering,
  CATEGORIES, type Category,
  CAREER_LIBRARY, CAREER_FIELDS,
  INTEREST_QUIZ, type StreamKey,
  EXAM_CALENDAR, SCHOLARSHIPS,
} from '../data/predictorData';

type Tab = 'jee' | 'neet' | 'careers' | 'quiz' | 'stream' | 'exams';

export default function CareerPredictor() {
  const [tab, setTab] = useState<Tab>('jee');

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title="Free Career Predictor: JEE/NEET Rank & College Predictor, Career Quiz & Exam Dates | Syllab.in"
        description="Free career predictor for Indian students — JEE Main rank & college predictor, NEET marks-to-rank & MBBS college predictor (all categories), career explorer with salaries, interest quiz to find your stream, 2026 exam calendar and scholarships. Indicative estimates based on 2024 data."
        keywords="career predictor free India, JEE rank predictor free, JEE Main percentile to rank, JEE college predictor, NEET rank predictor, NEET college predictor free, MBBS college predictor, EAMCET rank predictor, KCET college predictor, MHT-CET predictor, career quiz after 10th, which stream after 10th, career options after 12th India, career salary India, 2026 exam dates JEE NEET, scholarships for students India"
        url="https://syllab.in/career-predictor"
        jsonLd={[
          {
            '@context': 'https://schema.org', '@type': 'WebApplication',
            name: 'Syllab Career & College Predictor', applicationCategory: 'EducationApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }, isAccessibleForFree: true,
          },
          {
            '@context': 'https://schema.org', '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://syllab.in/' },
              { '@type': 'ListItem', position: 2, name: 'Career & Predictor', item: 'https://syllab.in/career-predictor' },
            ],
          },
          {
            '@context': 'https://schema.org', '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'Is the Syllab career & college predictor free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — the JEE/NEET rank predictor, college predictor, career explorer, interest quiz, exam calendar and scholarships list are 100% free for all Indian students, with no sign-up required.' } },
              { '@type': 'Question', name: 'How accurate is the JEE / NEET rank predictor?', acceptedAnswer: { '@type': 'Answer', text: 'It gives an indicative estimate based on publicly reported 2024 JoSAA/MCC/NTA data. Real cutoffs change every year with exam difficulty, number of applicants and category, so always confirm on the official counselling website before any decision.' } },
              { '@type': 'Question', name: 'Which entrance exams does the predictor cover?', acceptedAnswer: { '@type': 'Answer', text: 'JEE Main, BITSAT, AP & TS EAPCET (EAMCET), KCET, MHT-CET, WBJEE for engineering, plus NEET UG for MBBS/medical colleges. Reservation categories (General, EWS, OBC, SC, ST) are supported.' } },
              { '@type': 'Question', name: 'Can it help me choose a stream after Class 10?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — take the free 6-question interest quiz to get a best-fit stream (Science PCM/PCB, Commerce or Arts), then explore careers with salary ranges, education paths and the exams you would need.' } },
            ],
          },
        ]}
      />

      <header className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">🎯 Career & College Predictor</h1>
        <p className="mt-1 text-sm text-slate-500 font-medium">
          Estimate your rank, explore careers &amp; salaries, find your stream, and track every exam — free.
        </p>
      </header>

      {/* Disclaimer */}
      <div className="mb-6 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
        <AlertCircle size={16} className="shrink-0 mt-0.5" />
        <span>
          Rank/college numbers are <strong>indicative estimates</strong> based on {PREDICTOR_DATA_YEAR} data; salaries and exam
          windows are typical ranges. Actual cutoffs &amp; dates change yearly — always confirm on official sites
          (JoSAA, MCC, NTA, the exam board) before any decision.
        </span>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
        {([
          { id: 'jee', label: 'Engineering', icon: <GraduationCap size={15} /> },
          { id: 'neet', label: 'NEET / Medical', icon: <Stethoscope size={15} /> },
          { id: 'careers', label: 'Explore Careers', icon: <Briefcase size={15} /> },
          { id: 'quiz', label: 'Find My Path', icon: <Sparkles size={15} /> },
          { id: 'stream', label: 'Which Stream?', icon: <Compass size={15} /> },
          { id: 'exams', label: 'Exam Dates', icon: <CalendarDays size={15} /> },
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
      {tab === 'careers' && <CareerExplorer />}
      {tab === 'quiz' && <InterestQuiz onGoStream={() => setTab('stream')} />}
      {tab === 'stream' && <StreamGuide />}
      {tab === 'exams' && <ExamsAndScholarships />}
    </div>
  );
}

/* ─── Engineering (multi-exam + category) ───────────────────────────────────*/
function EngineeringPredictor() {
  const [examId, setExamId] = useState(ENG_EXAMS[0].id);
  const [value, setValue] = useState('');
  const [category, setCategory] = useState<Category>('general');
  const [result, setResult] = useState<ReturnType<typeof predictEngineering>>(null);
  const exam = ENG_EXAMS.find(e => e.id === examId)!;

  const run = () => {
    const v = parseFloat(value);
    if (isNaN(v) || v < 0) { setResult(null); return; }
    setResult(predictEngineering(examId, v, category));
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
        <p className="mt-1.5 text-[11px] text-slate-400">{exam.region} · indicative cutoffs</p>
      </div>

      {/* Category */}
      <div>
        <label className="block text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">Category</label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map(c => (
            <button key={c.id}
              onClick={() => { setCategory(c.id); setResult(null); }}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                category === c.id ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-indigo-600'
              }`}>
              {c.label}
            </button>
          ))}
        </div>
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
              <p className="mt-1 text-[11px] text-white/70">{CATEGORIES.find(c => c.id === category)?.label} category · {exam.name}</p>
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

/* ─── Career Explorer ───────────────────────────────────────────────────────*/
function CareerExplorer() {
  const [field, setField] = useState<typeof CAREER_FIELDS[number]>('All');
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return CAREER_LIBRARY.filter(c =>
      (field === 'All' || c.field === field) &&
      (!query || c.name.toLowerCase().includes(query) || c.summary.toLowerCase().includes(query) ||
        c.skills.some(s => s.toLowerCase().includes(query)))
    );
  }, [field, q]);

  const demandColor: Record<string, string> = {
    'Very High': 'bg-emerald-100 text-emerald-700',
    High: 'bg-teal-100 text-teal-700',
    Growing: 'bg-amber-100 text-amber-700',
    Stable: 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search careers, skills…"
          className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {CAREER_FIELDS.map(f => (
          <button key={f} onClick={() => setField(f)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition-all ${
              field === f ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-primary'
            }`}>{f}</button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {list.map(c => (
          <div key={c.name} className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{c.emoji}</span>
                <div>
                  <h3 className="text-sm font-black text-slate-900 leading-tight">{c.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400">{c.field}</p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-black ${demandColor[c.demand]}`}>{c.demand}</span>
            </div>
            <p className="mt-2 text-xs text-slate-600">{c.summary}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
              <div className="rounded-lg bg-emerald-50 px-2.5 py-1.5">
                <p className="font-black text-emerald-700">{c.salaryEntry}</p>
                <p className="text-[9px] font-bold text-emerald-600/70 uppercase tracking-wide">Entry</p>
              </div>
              <div className="rounded-lg bg-indigo-50 px-2.5 py-1.5">
                <p className="font-black text-indigo-700">{c.salaryExperienced}</p>
                <p className="text-[9px] font-bold text-indigo-600/70 uppercase tracking-wide">Experienced</p>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-slate-500"><span className="font-black text-slate-600">Path:</span> {c.path}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {c.skills.map(s => <span key={s} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{s}</span>)}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {c.exams.map(e => <span key={e} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{e}</span>)}
            </div>
          </div>
        ))}
      </div>
      {!list.length && <p className="text-center text-sm text-slate-500 py-8">No careers match your search. Try another keyword.</p>}
    </div>
  );
}

/* ─── Interest Quiz ─────────────────────────────────────────────────────────*/
function InterestQuiz({ onGoStream }: { onGoStream: () => void }) {
  const [answers, setAnswers] = useState<(StreamKey | null)[]>(() => INTEREST_QUIZ.map(() => null));
  const answered = answers.filter(Boolean).length;
  const done = answered === INTEREST_QUIZ.length;

  const top = useMemo(() => {
    if (!done) return null;
    const tally: Record<string, number> = {};
    answers.forEach(a => { if (a) tally[a] = (tally[a] || 0) + 1; });
    const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] as StreamKey;
  }, [answers, done]);

  const topGuide = STREAM_GUIDES.find(s => s.stream === top);

  const reset = () => setAnswers(INTEREST_QUIZ.map(() => null));

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-4 text-white">
        <p className="text-sm font-black">✨ Answer 6 quick questions — we’ll suggest your best-fit stream &amp; careers.</p>
        <div className="mt-2 h-2 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full bg-white transition-all" style={{ width: `${(answered / INTEREST_QUIZ.length) * 100}%` }} />
        </div>
      </div>

      {INTEREST_QUIZ.map((qq, qi) => (
        <div key={qi} className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm">
          <p className="text-sm font-black text-slate-800 mb-2">{qi + 1}. {qq.q}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {qq.options.map((o, oi) => (
              <button key={oi}
                onClick={() => setAnswers(a => { const n = [...a]; n[qi] = o.stream; return n; })}
                className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-bold transition-all ${
                  answers[qi] === o.stream ? 'bg-primary text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}>
                <span className="text-lg">{o.emoji}</span> {o.text}
              </button>
            ))}
          </div>
        </div>
      ))}

      {done && topGuide && (
        <div className="rounded-2xl bg-white border-2 border-primary/30 p-5 shadow-md">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Your best-fit stream</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">{topGuide.emoji} {topGuide.stream}</h3>
          <p className="mt-1 text-sm text-slate-600">{topGuide.forYou}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {topGuide.careers.map(c => <span key={c} className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">{c}</span>)}
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={onGoStream} className="rounded-xl bg-primary text-white px-4 py-2 text-xs font-black hover:bg-emerald-600 transition-colors">See full stream guide →</button>
            <button onClick={reset} className="rounded-xl bg-slate-100 text-slate-600 px-4 py-2 text-xs font-black hover:bg-slate-200 transition-colors">Retake</button>
          </div>
          <p className="mt-3 text-[11px] text-slate-400">This is a fun guide, not a verdict — your interests can span many streams.</p>
        </div>
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

/* ─── Exam calendar + scholarships ──────────────────────────────────────────*/
function ExamsAndScholarships() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-1.5"><CalendarDays size={15} className="text-primary" /> Major entrance exams — 2026 (indicative windows)</h3>
        <div className="space-y-2">
          {EXAM_CALENDAR.map((e, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-xl bg-white border border-slate-100 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl shrink-0">{e.emoji}</span>
                <div className="min-w-0">
                  <p className="text-sm font-black text-slate-800 truncate">{e.exam}</p>
                  <p className="text-[11px] text-slate-500 truncate">{e.level} · {e.site}</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black text-primary">{e.window}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-1.5"><Award size={15} className="text-amber-500" /> Scholarships for Indian students</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {SCHOLARSHIPS.map((s, i) => (
            <div key={i} className="rounded-xl bg-white border border-slate-100 px-4 py-3 shadow-sm">
              <p className="text-sm font-black text-slate-800">{s.emoji} {s.name}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{s.who}</p>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <span className="text-[11px] font-black text-emerald-600">{s.benefit}</span>
                <span className="text-[10px] font-bold text-slate-400 truncate">{s.site}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
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
