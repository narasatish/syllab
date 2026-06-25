/**
 * WhatToStudy — "focus where the marks are": CBSE unit-wise weightage per subject
 * + a typical exam calendar. Index at /what-to-study, detail at /what-to-study/:slug.
 * Path-driven (pushState/popstate), matching the study clusters.
 */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Target, CalendarDays } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { WEIGHTAGE_SUBJECTS, EXAM_CALENDAR, getWeightageSubject } from '../data/whatToStudy';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';
const BAR = ['bg-emerald-500', 'bg-blue-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-teal-500', 'bg-indigo-500'];

export default function WhatToStudy({ setTab }: { setTab?: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const go = (to: string) => {
    if (window.location.pathname !== to) window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const slug = useMemo(() => {
    const m = path.match(/^\/what-to-study\/([^/]+)/);
    return m ? m[1] : null;
  }, [path]);
  const subj = slug ? getWeightageSubject(slug) : null;

  if (subj) {
    const sorted = [...subj.units].sort((a, b) => b.marks - a.marks);
    const max = sorted[0]?.marks || 1;
    const top = sorted.slice(0, Math.ceil(sorted.length / 2));
    const topMarks = top.reduce((s, u) => s + u.marks, 0);
    const topPct = Math.round((topMarks / subj.totalMarks) * 100);
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <SEO
          title={`Most Important Chapters — ${subj.classLevel} ${subj.subject} (Marks Weightage) | Syllab.in`}
          description={`${subj.intro} See the full CBSE unit-wise marks weightage for ${subj.classLevel} ${subj.subject} and study where the marks are.`.slice(0, 160)}
          keywords={`${subj.classLevel.toLowerCase()} ${subj.subject.toLowerCase()} important chapters, ${subj.classLevel.toLowerCase()} ${subj.subject.toLowerCase()} weightage, cbse ${subj.subject.toLowerCase()} marks distribution, most important chapters ${subj.subject.toLowerCase()}`}
          url={`${SITE}/what-to-study/${subj.slug}`}
          jsonLd={[{ '@context': 'https://schema.org', '@type': 'Article', headline: `Most Important Chapters — ${subj.classLevel} ${subj.subject}`, description: subj.intro, inLanguage: 'en-IN', isAccessibleForFree: true, publisher: { '@type': 'Organization', name: 'Syllab.in' } }]}
        />
        <button onClick={() => go('/what-to-study')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All subjects</button>
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary"><Target size={13} /> {subj.exam} · {subj.totalMarks} marks</div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">{subj.classLevel} {subj.subject} — What to Study First</h1>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{subj.intro}</p>

        <div className="my-5 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
          🎯 Smart plan: the top {top.length} units below cover <span className="font-black">{topMarks} of {subj.totalMarks} marks (~{topPct}%)</span>. Nail these first.
        </div>

        <div className="space-y-3">
          {sorted.map((u, i) => (
            <div key={u.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center justify-between gap-3">
                <span className="font-black text-slate-900 dark:text-slate-100">{u.name}</span>
                <span className="shrink-0 rounded-full bg-slate-900 px-2.5 py-1 text-xs font-black text-white dark:bg-slate-100 dark:text-slate-900">{u.marks} marks</span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div className={`h-full rounded-full ${BAR[i % BAR.length]}`} style={{ width: `${Math.round((u.marks / max) * 100)}%` }} />
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{u.tip}</p>
            </div>
          ))}
        </div>

        <button onClick={() => setTab?.('arena')} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-black text-white hover:bg-emerald-600">
          <Target size={16} /> Practise these chapters now
        </button>
        <p className="mt-4 text-xs text-slate-400">Weightage follows CBSE’s published unit-wise distribution and may be revised each year — always check the latest official syllabus.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title="What to Study — Most Important Chapters by Marks + Exam Calendar | Syllab.in"
        description="Stop guessing what to study. See CBSE unit-wise marks weightage for Class 10 & 12 (Maths, Science, Physics, Chemistry, Biology) and a typical exam calendar for boards, JEE, NEET and CUET."
        keywords="most important chapters class 10, class 12 marks weightage, what to study for boards, cbse weightage, exam calendar 2026, jee neet cuet dates"
        url={`${SITE}/what-to-study`}
        jsonLd={[{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'What to Study — Marks Weightage & Exam Calendar', url: `${SITE}/what-to-study`, isAccessibleForFree: true }]}
      />
      <PageHero emoji="🎯" title="What to Study" subtitle="Focus where the marks are. See each subject's chapter weightage, then plan your prep around the exam calendar." className="mb-6" />

      <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">Marks weightage by subject</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WEIGHTAGE_SUBJECTS.map((s) => (
          <button key={s.slug} onClick={() => go(`/what-to-study/${s.slug}`)} className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <Target size={20} className="text-primary" />
            <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-primary">{s.exam} · {s.totalMarks} marks</p>
            <h3 className="mt-1 font-black text-slate-900 dark:text-slate-100">{s.classLevel} {s.subject}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{s.intro}</p>
          </button>
        ))}
      </div>

      <h2 className="mb-3 mt-10 flex items-center gap-2 text-lg font-black text-slate-900 dark:text-slate-100"><CalendarDays size={18} className="text-primary" /> Exam calendar (typical windows)</h2>
      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
        {EXAM_CALENDAR.map((e, i) => (
          <div key={e.exam} className={`flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between ${i % 2 ? 'bg-slate-50 dark:bg-slate-800/50' : 'bg-white dark:bg-slate-800'}`}>
            <div>
              <p className="font-black text-slate-900 dark:text-slate-100">{e.exam}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{e.note}</p>
            </div>
            <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">{e.window}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-400">These are the usual months — exact dates change every year. Always confirm on the official sites (cbse.gov.in, nta.ac.in).</p>
    </div>
  );
}
