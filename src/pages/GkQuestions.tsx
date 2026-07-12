/**
 * GK Questions — programmatic SEO cluster. One rich, indexable page per class
 * (/gk-questions/class-5 … class-12) plus an index (/gk-questions). Renders real
 * GK question + answer + explanation content (high-intent "GK questions for Class N"
 * searches) and links to the interactive GK quiz. All free, all static data.
 */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Trophy } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { GK_QUESTIONS } from '../data/generalKnowledge';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';
const CLASSES = [5, 6, 7, 8, 9, 10, 11, 12];
const CAT_LABELS: Record<string, string> = {
  history: 'History', geography: 'Geography', polity: 'Polity & Civics',
  static: 'Static GK', 'current-affairs': 'Current Affairs', science: 'Science',
};

function parseClass(pathname: string): number | null {
  const m = pathname.match(/\/gk-questions\/class-(\d+)/);
  const n = m ? Number(m[1]) : NaN;
  return CLASSES.includes(n) ? n : null;
}

export default function GkQuestions({ setTab }: { setTab: (tab: string) => void }) {
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

  const cls = parseClass(path);
  const items = useMemo(() => (cls ? GK_QUESTIONS.filter((q) => q.classLevels.includes(cls)) : []), [cls]);
  const grouped = useMemo(() => {
    const g: Record<string, typeof GK_QUESTIONS> = {};
    for (const q of items) (g[q.category] ||= []).push(q);
    return g;
  }, [items]);

  // ── Index ──
  if (!cls) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <SEO
          title="GK Questions for Kids & Students — Class 5 to 12 (Free, with Answers) | Syllab.in"
          description="Free General Knowledge questions and answers for Indian students Class 5 to 12 — history, geography, polity, science, static GK and current affairs, with explanations."
          keywords="gk questions for kids, general knowledge questions with answers, gk for class 5 6 7 8 9 10, gk questions india, static gk, current affairs for students"
          url={`${SITE}/gk-questions`}
          jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'GK Questions for Students', url: `${SITE}/gk-questions`, inLanguage: 'en-IN', isAccessibleForFree: true }}
        />
        <PageHero emoji="🧠" title="GK Questions for Students" subtitle="Free General Knowledge questions with answers — pick your class." className="mb-6" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CLASSES.map((c) => (
            <button key={c} onClick={() => go(`/gk-questions/class-${c}`)}
              className="rounded-2xl border-2 border-slate-100 bg-white p-5 text-center font-black text-slate-800 shadow-sm transition-all hover:border-primary hover:bg-emerald-50">
              <div className="text-2xl">Class {c}</div>
              <div className="mt-1 text-xs font-bold text-slate-400">{GK_QUESTIONS.filter((q) => q.classLevels.includes(c)).length} questions</div>
            </button>
          ))}
        </div>
        <button onClick={() => setTab('general_knowledge')} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-emerald-600">
          <Trophy size={16} /> Play the GK Quiz
        </button>
      </div>
    );
  }

  // ── Per-class page ──
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title={`GK Questions for Class ${cls} with Answers (Free) | Syllab.in`}
        description={`Free General Knowledge questions and answers for Class ${cls} — ${items.length}+ GK questions across history, geography, polity, science and current affairs, with clear explanations for Indian students.`}
        keywords={`gk questions for class ${cls}, general knowledge for class ${cls}, gk for class ${cls} with answers, class ${cls} gk quiz, gk questions india class ${cls}`}
        url={`${SITE}/gk-questions/class-${cls}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'GK Questions', item: `${SITE}/gk-questions` },
            { '@type': 'ListItem', position: 2, name: `Class ${cls}`, item: `${SITE}/gk-questions/class-${cls}` },
          ] },
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.slice(0, 10).map((q) => ({
            '@type': 'Question', name: q.question,
            acceptedAnswer: { '@type': 'Answer', text: `${q.options[q.correctIndex]}. ${q.explanation}` },
          })) },
        ]}
      />
      <button onClick={() => go('/gk-questions')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All classes</button>
      <PageHero emoji="🧠" title={`GK Questions for Class ${cls}`} subtitle={`${items.length} free General Knowledge questions with answers & explanations.`} className="mb-6" />

      {Object.entries(grouped).map(([cat, qs]) => (
        <section key={cat} className="mb-8">
          <h2 className="mb-3 text-lg font-black text-slate-900">{CAT_LABELS[cat] || cat} <span className="text-sm font-bold text-slate-400">({qs.length})</span></h2>
          <div className="space-y-3">
            {qs.map((q, i) => (
              <div key={q.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="font-bold text-slate-800">Q{i + 1}. {q.question}</p>
                <p className="mt-2 text-sm font-black text-emerald-600">✓ {q.options[q.correctIndex]}</p>
                <p className="mt-1 text-sm text-slate-600">{q.explanation}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4">
        <p className="flex-1 text-sm font-bold text-emerald-800">Want a timed challenge? Play the interactive GK Quiz and earn XP!</p>
        <button onClick={() => setTab('general_knowledge')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">Play GK Quiz <ArrowRight size={15} /></button>
      </div>

      <nav className="mt-6 border-t border-slate-100 pt-4">
        <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">GK for other classes</p>
        <div className="flex flex-wrap gap-2">
          {CLASSES.filter((c) => c !== cls).map((c) => (
            <button key={c} onClick={() => go(`/gk-questions/class-${c}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200">Class {c}</button>
          ))}
        </div>
      </nav>
    </div>
  );
}
