/**
 * CollegeFinder — high-intent college-discovery pages, reusing existing engineering
 * + medical college data:
 *  - /colleges-accepting/<exam>  → colleges that accept JEE/NEET/EAMCET/KCET/...
 *  - /best-colleges/<course>     → "Best CSE / MBBS / ECE ... colleges in India" (ranked)
 * Plus index pages at /colleges-accepting and /best-colleges. All free, static data.
 */
import { useEffect, useState } from 'react';
import { ArrowLeft, ChevronRight, Award } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { COLLEGES, stateSlugForCollege, type CollegeFull } from '../data/colleges';
import { MEDICAL_COLLEGES, medStateSlug, type MedicalCollege } from '../data/medicalColleges';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';
const navTo = (href: string) => { window.history.pushState({}, '', href); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo({ top: 0, behavior: 'smooth' }); };

const EXAMS: { slug: string; label: string; medical?: boolean }[] = [
  { slug: 'jee-main', label: 'JEE Main' }, { slug: 'jee-advanced', label: 'JEE Advanced' },
  { slug: 'neet', label: 'NEET', medical: true }, { slug: 'bitsat', label: 'BITSAT' },
  { slug: 'viteee', label: 'VITEEE' }, { slug: 'tnea', label: 'TNEA' },
  { slug: 'kcet', label: 'KCET' }, { slug: 'comedk', label: 'COMEDK' },
  { slug: 'mht-cet', label: 'MHT-CET' }, { slug: 'ts-eapcet', label: 'TS EAPCET' },
  { slug: 'ap-eapcet', label: 'AP EAPCET' }, { slug: 'wbjee', label: 'WBJEE' },
];

const COURSES: { slug: string; label: string; short: string; matchers: string[]; medical?: boolean }[] = [
  { slug: 'cse', label: 'Computer Science Engineering (CSE)', short: 'CSE', matchers: ['cse', 'computer', 'cs +', 'software'] },
  { slug: 'ai-ml', label: 'AI, ML & Data Science', short: 'AI/ML', matchers: ['ai', 'ml', 'data science', 'aids', 'computational'] },
  { slug: 'ece', label: 'Electronics & Communication (ECE)', short: 'ECE', matchers: ['ece', 'electronics'] },
  { slug: 'it', label: 'Information Technology (IT)', short: 'IT', matchers: ['it', 'ise', 'information'] },
  { slug: 'electrical', label: 'Electrical Engineering (EEE)', short: 'Electrical', matchers: ['electrical', 'eee'] },
  { slug: 'mechanical', label: 'Mechanical Engineering', short: 'Mechanical', matchers: ['mechanical', 'aero'] },
  { slug: 'civil', label: 'Civil Engineering', short: 'Civil', matchers: ['civil'] },
  { slug: 'mbbs', label: 'MBBS (Medical)', short: 'MBBS', matchers: [], medical: true },
];

const engLink = (c: CollegeFull) => `/colleges/${stateSlugForCollege(c)}/${c.slug}`;
const medLink = (c: MedicalCollege) => `/medical-colleges/${medStateSlug(c.state)}/${c.slug}`;

export default function CollegeFinder() {
  const [path, setPath] = useState(usePathname());
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const go = (to: string) => { if (window.location.pathname !== to) window.history.pushState({}, '', to); setPath(to); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const parts = path.split('/').filter(Boolean);
  const mode = parts[0]; // 'best-colleges' | 'colleges-accepting'
  const slug = parts[1];

  if (mode === 'colleges-accepting') {
    const exam = slug ? EXAMS.find((e) => e.slug === slug) : null;
    if (exam) return <ExamView exam={exam} go={go} />;
    return <ExamIndex go={go} />;
  }
  // default: best-colleges
  const course = slug ? COURSES.find((c) => c.slug === slug) : null;
  if (course) return <CourseView course={course} go={go} />;
  return <CourseIndex go={go} />;
}

function Crumb({ to, go }: { to: string; go: (t: string) => void }) {
  return <button onClick={() => go(to)} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> Back</button>;
}

function CollegeRow({ rank, name, sub, fees, extra, href }: { rank: number; name: string; sub: string; fees: string; extra: string; href: string }) {
  return (
    <button onClick={() => navTo(href)} className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3.5 text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-black text-primary">{rank}</div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-black text-slate-900 dark:text-slate-100">{name}</div>
        <div className="truncate text-[11px] text-slate-500 dark:text-slate-400">{sub}</div>
      </div>
      <div className="shrink-0 text-right">
        <div className="text-xs font-black text-emerald-700 dark:text-emerald-300">{fees}</div>
        <div className="text-[10px] text-slate-400">{extra}</div>
      </div>
      <ChevronRight size={15} className="shrink-0 text-slate-400" />
    </button>
  );
}

function ExamIndex({ go }: { go: (t: string) => void }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO title="Colleges Accepting JEE, NEET, EAMCET, KCET & More (2026) | Syllab.in"
        description="Find the colleges that accept each entrance exam — JEE Main, JEE Advanced, NEET, BITSAT, VITEEE, KCET, COMEDK, MHT-CET, EAMCET, WBJEE. Fees, cutoffs & admission, free."
        keywords="colleges accepting jee main, colleges accepting neet, colleges accepting kcet, colleges accepting eamcet, exam wise college list india"
        url={`${SITE}/colleges-accepting`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Colleges by Entrance Exam', url: `${SITE}/colleges-accepting`, inLanguage: 'en-IN' }} />
      <PageHero emoji="🎯" title="Colleges by Entrance Exam" subtitle="Pick your exam to see the colleges that accept it — with fees, cutoffs and admission." className="mb-6" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {EXAMS.map((e) => {
          const n = e.medical ? MEDICAL_COLLEGES.length : COLLEGES.filter((c) => c.exams.includes(e.label)).length;
          return (
            <button key={e.slug} onClick={() => go(`/colleges-accepting/${e.slug}`)} className="rounded-2xl border-2 border-slate-100 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
              <div className="font-black text-slate-800 dark:text-slate-100">{e.label}</div>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{n} colleges{e.medical ? ' (MBBS)' : ''}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ExamView({ exam, go }: { exam: typeof EXAMS[number]; go: (t: string) => void }) {
  const eng = exam.medical ? [] : COLLEGES.filter((c) => c.exams.includes(exam.label)).sort((a, b) => (a.nirf || 999) - (b.nirf || 999));
  const med = exam.medical ? [...MEDICAL_COLLEGES].sort((a, b) => (a.nirf || 999) - (b.nirf || 999)) : [];
  const total = eng.length + med.length;
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO title={`Colleges Accepting ${exam.label} (2026) — Full List, Fees & Cutoffs | Syllab.in`}
        description={`Complete list of top colleges that accept ${exam.label} — ${total} colleges with fees, ${exam.medical ? 'NEET' : ''} cutoffs, seats and admission process. Free, indicative.`}
        keywords={`colleges accepting ${exam.label.toLowerCase()}, ${exam.label.toLowerCase()} college list, ${exam.label.toLowerCase()} cutoff colleges, ${exam.label.toLowerCase()} colleges fees`}
        url={`${SITE}/colleges-accepting/${exam.slug}`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: `Colleges accepting ${exam.label}`, url: `${SITE}/colleges-accepting/${exam.slug}`, inLanguage: 'en-IN' }} />
      <Crumb to="/colleges-accepting" go={go} />
      <PageHero emoji="🎯" title={`Colleges Accepting ${exam.label}`} subtitle={`${total} top colleges that admit through ${exam.label} — ranked by NIRF, with fees & cutoffs.`} className="mb-6" />
      <div className="space-y-2">
        {eng.map((c, i) => <CollegeRow key={c.slug} rank={i + 1} name={c.shortName || c.name} sub={`${c.city} · ${c.type}${c.nirf ? ` · NIRF #${c.nirf}` : ''}`} fees={c.feesPerYear} extra={c.cutoff} href={engLink(c)} />)}
        {med.map((c, i) => <CollegeRow key={c.slug} rank={i + 1} name={c.shortName || c.name} sub={`${c.city} · ${c.type}${c.nirf ? ` · NIRF #${c.nirf}` : ''}`} fees={c.feesPerYear} extra={c.neetCutoff} href={medLink(c)} />)}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={() => navTo(`/college-predictor/${exam.slug === 'jee-main' ? 'jee-main' : exam.medical ? 'neet' : exam.slug}`)} className="rounded-xl bg-primary px-4 py-2.5 text-sm font-black text-white hover:bg-emerald-600">{exam.label} College Predictor</button>
        <button onClick={() => navTo(exam.medical ? '/previous-year-papers/neet' : '/mock-tests/jee-main')} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-black text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200">{exam.medical ? 'NEET Previous Papers' : 'Free Mock Tests'}</button>
      </div>
    </div>
  );
}

function CourseIndex({ go }: { go: (t: string) => void }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO title="Best Colleges by Course — CSE, ECE, MBBS & More (2026 Rankings) | Syllab.in"
        description="Find the best colleges in India for your course — CSE, AI/ML, ECE, IT, Mechanical, Civil engineering and MBBS. Ranked by NIRF with fees, cutoffs & placements. Free."
        keywords="best CSE colleges India, best MBBS colleges India, best ECE colleges, best engineering colleges by branch, course wise college ranking"
        url={`${SITE}/best-colleges`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Best Colleges by Course', url: `${SITE}/best-colleges`, inLanguage: 'en-IN' }} />
      <PageHero emoji="🏆" title="Best Colleges by Course" subtitle="Pick a course to see India's top colleges for it — ranked by NIRF, with fees & placements." className="mb-6" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((c) => (
          <button key={c.slug} onClick={() => go(`/best-colleges/${c.slug}`)} className="rounded-2xl border-2 border-slate-100 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-2"><Award size={16} className="text-primary" /><span className="font-black text-slate-800 dark:text-slate-100">{c.short}</span></div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{c.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function CourseView({ course, go }: { course: typeof COURSES[number]; go: (t: string) => void }) {
  const list = course.medical
    ? [...MEDICAL_COLLEGES].sort((a, b) => (a.nirf || 999) - (b.nirf || 999)).slice(0, 30)
    : COLLEGES.filter((c) => c.topBranches.some((b) => course.matchers.some((m) => b.toLowerCase().includes(m)))).sort((a, b) => (a.nirf || 999) - (b.nirf || 999)).slice(0, 40);
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO title={`Best ${course.short} Colleges in India 2026 — Ranking, Fees & Cutoffs | Syllab.in`}
        description={`Top ${course.label} colleges in India — ranked by NIRF with fees, cutoffs, placements and admission. ${list.length} best colleges for ${course.short}. Free, indicative.`}
        keywords={`best ${course.short.toLowerCase()} colleges india, top ${course.short.toLowerCase()} colleges, ${course.short.toLowerCase()} college ranking, ${course.label.toLowerCase()} fees cutoff`}
        url={`${SITE}/best-colleges/${course.slug}`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: `Best ${course.short} Colleges in India`, url: `${SITE}/best-colleges/${course.slug}`, inLanguage: 'en-IN' }} />
      <Crumb to="/best-colleges" go={go} />
      <PageHero emoji="🏆" title={`Best ${course.short} Colleges in India`} subtitle={`Top ${list.length} colleges for ${course.label} — ranked by NIRF, with fees & cutoffs.`} className="mb-6" />
      <div className="space-y-2">
        {course.medical
          ? (list as MedicalCollege[]).map((c, i) => <CollegeRow key={c.slug} rank={i + 1} name={c.shortName || c.name} sub={`${c.city} · ${c.type}${c.nirf ? ` · NIRF #${c.nirf}` : ''}`} fees={c.feesPerYear} extra={c.neetCutoff} href={medLink(c)} />)
          : (list as CollegeFull[]).map((c, i) => <CollegeRow key={c.slug} rank={i + 1} name={c.shortName || c.name} sub={`${c.city} · ${c.type}${c.nirf ? ` · NIRF #${c.nirf}` : ''}`} fees={c.feesPerYear} extra={c.cutoff} href={engLink(c)} />)}
      </div>
      <p className="mt-6 rounded-xl bg-amber-50 p-3 text-[11px] text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">Rankings & figures are indicative (NIRF-based) — verify on official college / counselling sites.</p>
    </div>
  );
}
