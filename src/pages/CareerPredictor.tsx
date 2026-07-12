/**
 * CareerPredictor — Rank/college predictor, career explorer, interest quiz,
 * stream guidance, exam calendar & scholarships.
 * All numeric outputs are clearly labelled INDICATIVE estimates (data: 2024).
 */

import React, { useState, useMemo } from 'react';
import {
  TrendingUp, GraduationCap, Stethoscope, Compass, AlertCircle,
  Briefcase, Sparkles, CalendarDays, Award, Search, Building2, MapPin,
} from 'lucide-react';
import SEO from '../components/SEO';
import CareerCompass from '../components/CareerCompass';
import { cn } from '../lib/utils';
import {
  neetMarksToRank, predictNeetColleges, NEET_QUALIFYING_2024,
  STREAM_GUIDES, PREDICTOR_DATA_YEAR,
  ENG_EXAMS, predictEngineering,
  CATEGORIES, type Category,
  CAREER_LIBRARY, CAREER_FIELDS,
  INTEREST_QUIZ, type StreamKey,
  EXAM_CALENDAR, SCHOLARSHIPS,
  CAREERS_BY_AI_IMPACT,
} from '../data/predictorData';
import { COLLEGES as ALL_COLLEGES, COLLEGE_STATE_INFO, stateSlugForCollege, getStateRank } from '../data/colleges';

type Tab = 'jee' | 'neet' | 'colleges' | 'careers' | 'quiz' | 'stream' | 'exams' | 'ai-impact';

export default function CareerPredictor() {
  const [tab, setTab] = useState<Tab>('jee');

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title="Free Career Predictor: JEE/NEET Rank & College Predictor + Top Engineering Colleges 2026 | Syllab.in"
        description="Free career predictor for Indian students — JEE Main & state (EAMCET/KCET/MHT-CET/WBJEE) rank & college predictor with category + women quota, NEET MBBS college predictor, a directory of top engineering colleges (NIRF rank, fees, cutoffs, admission process), career explorer with salaries, interest quiz, 2026 exam calendar and scholarships. Indicative estimates based on 2024 data."
        keywords="career predictor free India, JEE rank predictor free, JEE Main percentile to rank, JEE college predictor, NEET rank predictor, NEET college predictor free, MBBS college predictor, EAMCET rank predictor, KCET college predictor, MHT-CET predictor, top engineering colleges India 2026, best engineering colleges Tamil Nadu Karnataka Maharashtra Telangana, college fees NIRF ranking, engineering admission process, women quota engineering, SC ST OBC category rank, career quiz after 10th, which stream after 10th, career salary India, 2026 exam dates JEE NEET, scholarships for students India"
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

      <CareerCompass
        subtitle="Find your best-fit career, compare India's top colleges, and predict the rank you need to get in — all free."
        steps={[
          { n: 1, label: 'Discover', title: 'Find your path', desc: 'Take the interest quiz — get your best-fit stream & careers with salaries.', cta: 'Start quiz', icon: <Sparkles size={16} />, onClick: () => setTab('quiz') },
          { n: 2, label: 'Decide', title: 'Compare colleges', desc: 'Top engineering & medical colleges — NIRF rank, fees, cutoffs & placements.', cta: 'Browse colleges', icon: <Building2 size={16} />, onClick: () => setTab('colleges') },
          { n: 3, label: 'Get In', title: 'Predict your rank', desc: 'JEE/NEET rank & college predictor with category and women-quota support.', cta: 'Predict now', icon: <TrendingUp size={16} />, onClick: () => setTab('jee') },
        ]}
      />

      {/* SEO cross-link → free career guides cluster */}
      <a href="/career" className="mb-5 flex items-center justify-between gap-3 rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-left transition hover:bg-indigo-100 dark:border-indigo-900 dark:bg-indigo-950/40">
        <span className="text-sm font-black text-indigo-900 dark:text-indigo-200">📚 Free career guides — which stream after 10th/12th, how to become an engineer, doctor, data scientist, CA & more</span>
        <span className="shrink-0 text-sm font-black text-indigo-700 dark:text-indigo-300">Browse guides →</span>
      </a>

      {/* Disclaimer */}
      <div className="mb-5 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
        <AlertCircle size={16} className="shrink-0 mt-0.5" />
        <span>
          Rank/college numbers are <strong>indicative estimates</strong> based on {PREDICTOR_DATA_YEAR} data; salaries and exam
          windows are typical ranges. Actual cutoffs &amp; dates change yearly — always confirm on official sites
          (JoSAA, MCC, NTA, the exam board) before any decision.
        </span>
      </div>

      {/* Tabs — branded, scrollable, sticky on scroll */}
      <div className="sticky top-2 z-10 mb-6 flex gap-1.5 overflow-x-auto rounded-2xl border border-slate-100 bg-white/90 dark:border-slate-800 dark:bg-slate-900/90 p-1.5 shadow-sm backdrop-blur no-scrollbar">
        {([
          { id: 'jee', label: 'Engineering', icon: <GraduationCap size={15} /> },
          { id: 'neet', label: 'NEET / Medical', icon: <Stethoscope size={15} /> },
          { id: 'colleges', label: 'Top Colleges', icon: <Building2 size={15} /> },
          { id: 'careers', label: 'Explore Careers', icon: <Briefcase size={15} /> },
          { id: 'quiz', label: 'Find My Path', icon: <Sparkles size={15} /> },
          { id: 'stream', label: 'Which Stream?', icon: <Compass size={15} /> },
          { id: 'exams', label: 'Exam Dates', icon: <CalendarDays size={15} /> },
          { id: 'ai-impact', label: 'AI Impact', icon: <Sparkles size={15} /> },
        ] as const).map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={cn(
              'shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all',
              tab === t.id
                ? 'bg-indigo-900 text-white shadow-sm shadow-indigo-900/30'
                : 'text-slate-500 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-900 dark:text-slate-400 dark:hover:text-indigo-400',
            )}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {tab === 'jee' && <EngineeringPredictor />}
      {tab === 'neet' && <NeetPredictor />}
      {tab === 'colleges' && <CollegeExplorer />}
      {tab === 'careers' && <CareerExplorer />}
      {tab === 'quiz' && <InterestQuiz onGoStream={() => setTab('stream')} />}
      {tab === 'stream' && <StreamGuide />}
      {tab === 'exams' && <ExamsAndScholarships />}
      {tab === 'ai-impact' && <AiImpactAnalysis />}
    </div>
  );
}

/* ─── Engineering (multi-exam + category) ───────────────────────────────────*/
function EngineeringPredictor() {
  const [examId, setExamId] = useState(ENG_EXAMS[0].id);
  const [value, setValue] = useState('');
  const [category, setCategory] = useState<Category>('general');
  const [women, setWomen] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof predictEngineering>>(null);
  const exam = ENG_EXAMS.find(e => e.id === examId)!;

  const run = () => {
    const v = parseFloat(value);
    if (isNaN(v) || v < 0) { setResult(null); return; }
    setResult(predictEngineering(examId, v, category, women));
  };

  return (
    <div className="space-y-5">
      {/* Exam selector */}
      <div>
        <label className="block text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Choose your exam</label>
        <div className="flex flex-wrap gap-1.5">
          {ENG_EXAMS.map(e => (
            <button key={e.id}
              onClick={() => { setExamId(e.id); setResult(null); setValue(''); }}
              className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                examId === e.id ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-primary dark:bg-slate-800 dark:text-slate-300 dark:hover:text-emerald-400'
              }`}>
              {e.emoji} {e.name}
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500">{exam.region} · indicative cutoffs</p>
      </div>

      {/* Category + Women quota */}
      <div>
        <label className="block text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Category</label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map(c => (
            <button key={c.id}
              onClick={() => { setCategory(c.id); setResult(null); }}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                category === c.id ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-indigo-400'
              }`}>
              {c.label}
            </button>
          ))}
          <button
            onClick={() => { setWomen(w => !w); setResult(null); }}
            aria-label="Toggle women quota"
            aria-pressed={women}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              women ? 'bg-pink-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-pink-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-pink-400'
            }`}>
            ♀ Women quota
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
        <label className="block text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">{exam.inputLabel}</label>
        <div className="flex gap-2">
          <input type="number" inputMode="decimal" value={value} onChange={e => setValue(e.target.value)}
            placeholder={`max ${exam.inputMax}`} min={0} max={exam.inputMax} step="0.01"
            className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <button onClick={run} className="rounded-xl bg-primary text-white px-6 py-3 text-sm font-black hover:bg-emerald-600 transition-colors">Predict</button>
        </div>
      </div>

      {result && (
        <>
          {result.estimatedRank !== null && (
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white text-center shadow-lg">
              {result.categoryRank !== null ? (
                <div className="grid grid-cols-2 divide-x divide-white/20">
                  <div className="px-2">
                    <p className="text-[11px] font-black uppercase tracking-widest text-white/60">Overall Rank</p>
                    <p className="text-3xl font-black mt-1">~{result.estimatedRank.toLocaleString()}</p>
                  </div>
                  <div className="px-2">
                    <p className="text-[11px] font-black uppercase tracking-widest text-white/60">Your Category Rank</p>
                    <p className="text-3xl font-black mt-1 flex items-center justify-center gap-1.5"><TrendingUp size={22} /> ~{result.categoryRank.toLocaleString()}</p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-[11px] font-black uppercase tracking-widest text-white/60">Estimated Rank</p>
                  <p className="text-4xl font-black mt-1 flex items-center justify-center gap-2"><TrendingUp size={28} /> ~{result.estimatedRank.toLocaleString()}</p>
                </>
              )}
              <p className="mt-2 text-[11px] text-white/70">
                {CATEGORIES.find(c => c.id === category)?.label}{women ? ' · Women quota' : ''} · {exam.name}
                {result.categoryRank !== null && ' · admission uses your category rank'}
              </p>
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
      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
        <label className="block text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Your NEET Marks (out of 720)</label>
        <div className="flex gap-2">
          <input type="number" inputMode="numeric" value={marks} onChange={e => setMarks(e.target.value)}
            placeholder="e.g. 620" max={720}
            className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20" />
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
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search careers, skills…"
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {CAREER_FIELDS.map(f => (
          <button key={f} onClick={() => setField(f)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition-all ${
              field === f ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-primary dark:bg-slate-800 dark:text-slate-300 dark:hover:text-emerald-400'
            }`}>{f}</button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {list.map(c => {
          const aiBadgeColor = {
            Low: 'bg-emerald-100 text-emerald-700',
            Medium: 'bg-amber-100 text-amber-700',
            High: 'bg-red-100 text-red-700',
          }[c.aiImpact];
          const aiBadgeEmoji = {
            Low: '🟢',
            Medium: '🟡',
            High: '🔴',
          }[c.aiImpact];
          return (
            <div key={c.name} className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{c.emoji}</span>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 leading-tight">{c.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500">{c.field}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-black ${demandColor[c.demand]}`}>{c.demand}</span>
              </div>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{c.summary}</p>
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
              <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400"><span className="font-black text-slate-600 dark:text-slate-300">Path:</span> {c.path}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {c.skills.map(s => <span key={s} className="rounded-full bg-slate-100 dark:bg-slate-700 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:text-slate-300">{s}</span>)}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {c.exams.map(e => <span key={e} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{e}</span>)}
              </div>
              <div className="mt-2 rounded-lg p-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                <p className={`text-[10px] font-black px-1.5 py-0.5 rounded inline-flex items-center gap-1 ${aiBadgeColor}`}>
                  {aiBadgeEmoji} AI Impact: {c.aiImpact}
                </p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1">{c.aiReason}</p>
              </div>
            </div>
          );
        })}
      </div>
      {!list.length && <p className="text-center text-sm text-slate-500 dark:text-slate-400 py-8">No careers match your search. Try another keyword.</p>}
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
      <div className="sticky top-2 z-10 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-4 text-white shadow-lg shadow-fuchsia-500/20">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-black">✨ Find your best-fit stream &amp; careers</p>
          <span className="shrink-0 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-black">{answered} / {INTEREST_QUIZ.length}</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full bg-white transition-all duration-300" style={{ width: `${(answered / INTEREST_QUIZ.length) * 100}%` }} />
        </div>
        <p className="mt-1.5 text-[11px] font-semibold text-white/80">{done ? '🎉 All done — see your result below.' : `Answer ${INTEREST_QUIZ.length - answered} more to see your stream.`}</p>
      </div>

      {INTEREST_QUIZ.map((qq, qi) => (
        <div key={qi} className={`rounded-2xl border bg-white p-4 shadow-sm transition-colors dark:bg-slate-800 ${answers[qi] ? 'border-primary/30' : 'border-slate-100 dark:border-slate-700'}`}>
          <div className="mb-3 flex items-start gap-2.5">
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-black ${answers[qi] ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'}`}>{answers[qi] ? '✓' : qi + 1}</span>
            <p className="pt-0.5 text-sm font-black text-slate-800 dark:text-slate-100">{qq.q}</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {qq.options.map((o, oi) => {
              const sel = answers[qi] === o.stream;
              return (
                <button key={oi}
                  onClick={() => setAnswers(a => { const n = [...a]; n[qi] = o.stream; return n; })}
                  className={`flex items-center gap-2.5 rounded-xl border px-3 py-3 text-left text-[13px] font-bold transition-all ${
                    sel ? 'border-primary bg-primary text-white shadow-sm shadow-primary/30'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-primary/40 hover:bg-white dark:border-slate-700 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                  }`}>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-lg ${sel ? 'bg-white/20' : 'bg-white dark:bg-slate-800'}`}>{o.emoji}</span>
                  <span className="leading-snug">{o.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {done && topGuide && (
        <div className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-primary/30 p-5 shadow-md">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Your best-fit stream</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">{topGuide.emoji} {topGuide.stream}</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{topGuide.forYou}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {topGuide.careers.map(c => <span key={c} className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">{c}</span>)}
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={onGoStream} className="rounded-xl bg-primary text-white px-4 py-2 text-xs font-black hover:bg-emerald-600 transition-colors">See full stream guide →</button>
            <button onClick={reset} className="rounded-xl bg-slate-100 text-slate-600 px-4 py-2 text-xs font-black hover:bg-slate-200 transition-colors">Retake</button>
          </div>
          <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">This is a fun guide, not a verdict — your interests can span many streams.</p>
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
        <div key={s.stream} className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
          <div className="text-3xl mb-2">{s.emoji}</div>
          <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">{s.stream}</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.forYou}</p>
          <div className="mt-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Careers</p>
            <div className="flex flex-wrap gap-1.5">{s.careers.map(c => <span key={c} className="rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-[11px] font-bold text-slate-600 dark:text-slate-300">{c}</span>)}</div>
          </div>
          <div className="mt-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Key exams</p>
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
        <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-1.5"><CalendarDays size={15} className="text-primary" /> Major entrance exams — 2026 (indicative windows)</h3>
        <div className="space-y-2">
          {EXAM_CALENDAR.map((e, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl shrink-0">{e.emoji}</span>
                <div className="min-w-0">
                  <p className="text-sm font-black text-slate-800 dark:text-slate-100 truncate">{e.exam}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{e.level} · {e.site}</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black text-primary">{e.window}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-1.5"><Award size={15} className="text-amber-500" /> Scholarships for Indian students</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {SCHOLARSHIPS.map((s, i) => (
            <div key={i} className="rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-3 shadow-sm">
              <p className="text-sm font-black text-slate-800 dark:text-slate-100">{s.emoji} {s.name}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{s.who}</p>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <span className="text-[11px] font-black text-emerald-600">{s.benefit}</span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 truncate">{s.site}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Top Colleges directory (CollegeDunia-style) ───────────────────────────*/
function CollegeExplorer() {
  const [state, setState] = useState<string>('All');
  const [q, setQ] = useState('');
  const states = ['All', ...COLLEGE_STATE_INFO.map(s => s.name)];

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return ALL_COLLEGES.filter(c =>
      (state === 'All' || c.state === state) &&
      (!query || c.name.toLowerCase().includes(query) || c.city.toLowerCase().includes(query) ||
        c.topBranches.some(b => b.toLowerCase().includes(query)))
    ).sort((a, b) => (a.nirf ?? 9999) - (b.nirf ?? 9999));
  }, [state, q]);

  const typeColor: Record<string, string> = {
    IIT: 'bg-rose-100 text-rose-700',
    'NIT/IIIT': 'bg-amber-100 text-amber-700',
    Government: 'bg-emerald-100 text-emerald-700',
    'Private/Deemed': 'bg-indigo-100 text-indigo-700',
  };

  return (
    <div className="space-y-4">
      <a href="/colleges" className="block rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-600 p-4 text-white hover:scale-[1.01] transition">
        <p className="text-sm font-black">🏛️ {ALL_COLLEGES.length} top colleges across India — click any to open its full page (fees, NIRF + multi-source rankings, hostel, placements, admission) →</p>
        <p className="mt-0.5 text-[11px] text-white/80">15+ colleges per state · indicative 2024 figures.</p>
      </a>

      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search college, city or branch…"
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {states.map(s => (
          <button key={s} onClick={() => setState(s)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition-all ${
              state === s ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-primary dark:bg-slate-800 dark:text-slate-300 dark:hover:text-emerald-400'
            }`}>{s}</button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {list.map(c => {
          const href = `/colleges/${stateSlugForCollege(c)}/${c.slug}`;
          return (
          <a key={c.slug} href={href}
            onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', href); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo({ top: 0 }); }}
            className="block rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-black text-primary">#{getStateRank(c.slug)} in state</span>
                  <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 leading-tight truncate">{c.shortName || c.name}</h3>
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] font-bold text-slate-400 dark:text-slate-500"><MapPin size={11} />{c.city} · {c.state}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-black ${typeColor[c.type]}`}>{c.type}</span>
                {c.nirf && <span className="text-[10px] font-black text-slate-500">NIRF #{c.nirf}</span>}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
              <div className="rounded-lg bg-emerald-50 px-2.5 py-1.5">
                <p className="text-[9px] font-bold text-emerald-600/70 uppercase tracking-wide">Fees / year</p>
                <p className="font-black text-emerald-700">{c.feesPerYear}</p>
              </div>
              <div className="rounded-lg bg-blue-50 px-2.5 py-1.5">
                <p className="text-[9px] font-bold text-blue-600/70 uppercase tracking-wide">Avg package</p>
                <p className="font-black text-blue-700">{c.placementAvg}</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {c.topBranches.map(b => <span key={b} className="rounded-full bg-slate-100 dark:bg-slate-700 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:text-slate-300">{b}</span>)}
            </div>
            <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-black text-primary">View full details →</span>
          </a>
          );
        })}
      </div>
      {!list.length && <p className="text-center text-sm text-slate-500 dark:text-slate-400 py-8">No colleges match your search.</p>}
      <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">Showing {list.length} colleges · click any for its full page.</p>
    </div>
  );
}

/* ─── AI Impact Analysis ──────────────────────────────────────────────────*/
function AiImpactAnalysis() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-5 text-white">
        <h3 className="text-sm font-black">🤖 Will AI take my job? (2026 insights)</h3>
        <p className="mt-2 text-xs leading-relaxed text-white/90">
          McKinsey estimates <strong>~23% of India's workforce</strong> exposed to automation. Yet NASSCOM projects <strong>2–3 million new AI-related jobs by 2030</strong>. The shift isn't about job loss—it's about <strong>which skills stay valuable</strong>. Careers involving creativity, human judgment, patient care, and emotional intelligence remain protected. Routine, repeatable tasks (data entry, basic support) face high automation risk.
        </p>
        <p className="mt-2 text-[10px] text-white/70 italic">Note: These are indicative estimates for guidance. Your skills, adaptability, and continuous learning matter more than any forecast.</p>
      </div>

      <div className="space-y-4">
        {(['Low', 'Medium', 'High'] as const).map(level => {
          const levelData = CAREERS_BY_AI_IMPACT[level];
          const levelColor = {
            Low: 'from-emerald-50 to-green-50 border-emerald-200',
            Medium: 'from-amber-50 to-yellow-50 border-amber-200',
            High: 'from-red-50 to-rose-50 border-red-200',
          }[level];
          const levelBadgeColor = {
            Low: 'bg-emerald-100 text-emerald-700',
            Medium: 'bg-amber-100 text-amber-700',
            High: 'bg-red-100 text-red-700',
          }[level];
          const levelEmoji = { Low: '🟢', Medium: '🟡', High: '🔴' }[level];

          return (
            <div key={level} className={`rounded-2xl bg-gradient-to-br ${levelColor} border-2 p-5`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`rounded-full px-3 py-1 text-xs font-black ${levelBadgeColor}`}>
                  {levelEmoji} {level} Impact
                </span>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                {levelData.map(career => (
                  <div key={career.name} className="rounded-xl bg-white/70 p-3 border border-white/50">
                    <p className="text-xs font-black text-slate-800">{career.name}</p>
                    <p className="text-[10px] text-slate-600 mt-1">{career.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
        <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 mb-2">What can YOU do?</h4>
        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
          <li className="flex gap-2"><span className="font-black text-primary">1.</span> <span><strong>Develop uniquely human skills:</strong> creativity, communication, empathy, leadership.</span></li>
          <li className="flex gap-2"><span className="font-black text-primary">2.</span> <span><strong>Master AI tools:</strong> the best jobs in 2030 will be for people who use AI, not compete with it.</span></li>
          <li className="flex gap-2"><span className="font-black text-primary">3.</span> <span><strong>Choose careers with human judgment:</strong> healthcare, law, teaching, design, strategy, and counselling.</span></li>
          <li className="flex gap-2"><span className="font-black text-primary">4.</span> <span><strong>Stay adaptable:</strong> the job market shifts; your ability to learn new things is your real job security.</span></li>
        </ul>
      </div>
    </div>
  );
}

/* ─── Shared bits ───────────────────────────────────────────────────────────*/
function CollegeList({ title, empty, children }: { title: string; empty: string; children: React.ReactNode[] }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
      <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 mb-3">{title}</h3>
      {children.length ? <div className="space-y-2">{children}</div> : <p className="text-sm text-slate-500 dark:text-slate-400">{empty}</p>}
    </div>
  );
}
function Row({ a, b, c, tag }: { a: string; b: string; c: string; tag: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 dark:bg-slate-700 px-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-black text-slate-800 dark:text-slate-100 truncate">{a}</p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{b}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs font-black text-primary">{c}</p>
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500">{tag}</p>
      </div>
    </div>
  );
}
