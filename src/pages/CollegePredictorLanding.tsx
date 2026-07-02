/**
 * College Predictor landing pages — SEO entry points for "JEE Main college
 * predictor", "NEET college predictor by rank" etc. Each page explains the
 * predictor and funnels the student into the existing Career & College Predictor
 * tool (setTab('career')), where the actual prediction runs. Static, free, no cost.
 *   /college-predictor              → pick an exam
 *   /college-predictor/jee-main     → JEE Main college predictor landing
 */
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Target, ListChecks, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import HubNav, { HubNavItem } from '../components/HubNav';
import { COLLEGE_PREDICTORS, getCollegePredictor, PREDICTOR_DISCLAIMER } from '../data/collegePredictors';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';

export default function CollegePredictorLanding({ setTab }: { setTab: (tab: string) => void }) {
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

  const slug = path.split('/').filter(Boolean)[1];
  const exam = useMemo(() => (slug ? getCollegePredictor(slug) : undefined), [slug]);

  // ── Per-exam landing ──
  if (exam) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <SEO
          title={`${exam.exam} College Predictor 2026 — Predict Colleges by Rank (Free) | Syllab.in`}
          description={`Free ${exam.exam} college predictor — estimate the ${exam.predicts} you can get by rank, category and quota. ${exam.intro.slice(0, 90)}…`}
          keywords={`${exam.exam.toLowerCase()} college predictor, ${exam.exam.toLowerCase()} college predictor by rank, ${exam.exam.toLowerCase()} rank predictor, ${exam.exam.toLowerCase()} college predictor 2026 free`}
          url={`${SITE}/college-predictor/${exam.slug}`}
          jsonLd={[
            { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'College Predictor', item: `${SITE}/college-predictor` },
              { '@type': 'ListItem', position: 2, name: `${exam.exam} Predictor`, item: `${SITE}/college-predictor/${exam.slug}` },
            ] },
            { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: exam.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
          ]}
        />
        <button onClick={() => go('/college-predictor')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary dark:text-slate-400"><ArrowLeft size={14} /> All predictors</button>
        <PageHero emoji={exam.emoji} title={`${exam.exam} College Predictor`} subtitle={`Predict ${exam.predicts} by your rank — free, indicative, no sign-up.`} className="mb-5" />

        <p className="mb-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{exam.intro}</p>

        <button onClick={() => setTab('career')} className="mb-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-black text-white hover:bg-emerald-600">
          <Target size={16} /> Open the {exam.exam} Predictor <ArrowRight size={15} />
        </button>

        <Section icon={<ListChecks size={16} />} title="What you'll enter">
          <ul className="space-y-1.5">{exam.inputs.map((x, i) => <li key={i} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300"><span className="text-primary">•</span> {x}</li>)}</ul>
        </Section>
        <Section icon={<Sparkles size={16} />} title="How it works">
          <ol className="space-y-1.5">{exam.howItWorks.map((x, i) => <li key={i} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300"><span className="font-black text-primary">{i + 1}.</span> {x}</li>)}</ol>
        </Section>
        <Section icon={<Target size={16} />} title="Tips to get a better seat">
          <ul className="space-y-1.5">{exam.tips.map((x, i) => <li key={i} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300"><span className="text-primary">✓</span> {x}</li>)}</ul>
        </Section>

        <h2 className="mt-8 mb-3 text-lg font-black text-slate-900 dark:text-slate-100">FAQs</h2>
        <div className="space-y-2">
          {exam.faqs.map((f, i) => (
            <details key={i} className="rounded-xl border border-slate-100 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
              <summary className="cursor-pointer text-sm font-bold text-slate-800 dark:text-slate-100">{f.q}</summary>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{f.a}</p>
            </details>
          ))}
        </div>

        <p className="mt-6 rounded-xl bg-amber-50 p-3 text-xs text-amber-800 dark:bg-amber-950 dark:text-amber-200">{PREDICTOR_DISCLAIMER}</p>

        <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
          <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400 dark:text-slate-500">Other college predictors</p>
          <div className="flex flex-wrap gap-2">
            {COLLEGE_PREDICTORS.filter((p) => p.slug !== exam.slug).map((p) => (
              <button key={p.slug} onClick={() => go(`/college-predictor/${p.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">{p.exam}</button>
            ))}
          </div>
        </nav>
      </div>
    );
  }

  // ── Index ──
  const collegeHubItems: HubNavItem[] = [
    { label: 'Engineering', emoji: '🏛️', path: '/colleges', tab: 'colleges' },
    { label: 'Medical', emoji: '🩺', path: '/medical-colleges', tab: 'medical_colleges' },
    { label: 'College Finder', emoji: '🔎', path: '/best-colleges', tab: 'college_finder' },
    { label: 'Predictor', emoji: '🎯', path: '/college-predictor', tab: 'college_predictor' },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title="Free College Predictor 2026 — JEE Main, NEET, EAMCET, KCET & More | Syllab.in"
        description="Free college predictors for Indian students — predict your colleges by rank for JEE Main, NEET, TS/AP EAPCET, KCET, MHT-CET, WBJEE and BITSAT, with category and quota. Indicative & free."
        keywords="college predictor free, jee main college predictor, neet college predictor, eamcet college predictor, college predictor by rank, rank predictor 2026"
        url={`${SITE}/college-predictor`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'College Predictors', url: `${SITE}/college-predictor`, inLanguage: 'en-IN', isAccessibleForFree: true }}
      />
      <HubNav items={collegeHubItems} active="college_predictor" label="College Hub" />
      <PageHero emoji="🎯" title="Free College Predictor" subtitle="Predict the colleges you can get by your rank — pick your exam." className="mb-6" />
      <div className="grid gap-3 sm:grid-cols-2">
        {COLLEGE_PREDICTORS.map((p) => (
          <button key={p.slug} onClick={() => go(`/college-predictor/${p.slug}`)}
            className="flex items-start gap-3 rounded-2xl border-2 border-slate-100 bg-white p-4 text-left shadow-sm transition-all hover:border-primary hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">
            <span className="text-2xl">{p.emoji}</span>
            <span>
              <span className="block font-black text-slate-900 dark:text-slate-100">{p.exam} College Predictor</span>
              <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{p.predicts}</span>
            </span>
          </button>
        ))}
      </div>
      <button onClick={() => setTab('career')} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-emerald-600">
        <Target size={16} /> Open the Career & College Predictor
      </button>
    </div>
  );
}

function Section({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="mb-5 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-2 flex items-center gap-1.5 font-black text-slate-900 dark:text-slate-100">{icon} {title}</h2>
      {children}
    </section>
  );
}
