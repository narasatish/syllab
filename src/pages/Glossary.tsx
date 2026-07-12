/**
 * Glossary — student definitions cluster. /glossary + /glossary/{slug}.
 */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, Sparkles, BookText } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { GLOSSARY, getGlossaryTerm, type GlossaryTerm } from '../data/glossary';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';
const parseSlug = (p: string) => { const m = p.match(/\/glossary\/([a-z0-9-]+)/); return m ? m[1] : null; };

export default function Glossary({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  const [query, setQuery] = useState('');
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const go = (to: string) => { if (window.location.pathname !== to) window.history.pushState({}, '', to); setPath(to); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const slug = parseSlug(path);
  const term = slug ? getGlossaryTerm(slug) : null;

  // All hooks must run before any early return (consistent hook count).
  const cats = useMemo(() => [...new Set(GLOSSARY.map((g) => g.category))], []);
  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => (q ? GLOSSARY.filter((g) => g.term.toLowerCase().includes(q)) : GLOSSARY), [q]);

  if (term) return <Detail term={term} go={go} setTab={setTab} />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO
        title="Glossary — Key Science, Maths & Subject Definitions for Students | Syllab.in"
        description={`Free student glossary — clear definitions of ${GLOSSARY.length}+ key terms across Biology, Physics, Chemistry, Maths and more, with examples and FAQs. CBSE/NCERT aligned for Class 6–12.`}
        keywords="definition, glossary, what is photosynthesis, science definitions, maths definitions, CBSE terms, NCERT definitions for students"
        url={`${SITE}/glossary`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Student Glossary', url: `${SITE}/glossary`, inLanguage: 'en-IN', isAccessibleForFree: true }}
      />
      <PageHero emoji="📖" title="Glossary & Definitions" subtitle="Clear, exam-ready definitions of the terms students search most — with examples and quick FAQs." className="mb-6" />
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <Search size={16} className="text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search e.g. photosynthesis, velocity…" className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none dark:text-slate-200" />
      </div>
      {(q ? [['Results', filtered]] as [string, GlossaryTerm[]][] : cats.map((c) => [c, filtered.filter((g) => g.category === c)] as [string, GlossaryTerm[]])).map(([cat, list]) => (
        list.length ? (
          <section key={cat} className="mb-6">
            <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">{cat}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((g) => (
                <button key={g.slug} onClick={() => go(`/glossary/${g.slug}`)} className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{g.term}</span>
                  <ArrowRight size={15} className="shrink-0 text-slate-300" />
                </button>
              ))}
            </div>
          </section>
        ) : null
      ))}
      {!filtered.length && <p className="text-sm font-semibold text-slate-400">No term found for “{query}”.</p>}
    </div>
  );
}

function Detail({ term, go, setTab }: { term: GlossaryTerm; go: (to: string) => void; setTab: (t: string) => void }) {
  const related = GLOSSARY.filter((g) => g.category === term.category && g.slug !== term.slug).slice(0, 6);
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title={`What is ${term.term}? Definition, Meaning & Example | Syllab.in`}
        description={`${term.definition} ${term.explanation}`.slice(0, 160)}
        keywords={`${term.term.toLowerCase()} definition, what is ${term.term.toLowerCase()}, ${term.term.toLowerCase()} meaning, ${term.category.toLowerCase()} ${term.classLevel.toLowerCase()}`}
        url={`${SITE}/glossary/${term.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'DefinedTerm', name: term.term, description: term.definition, inDefinedTermSet: `${SITE}/glossary` },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Glossary', item: `${SITE}/glossary` },
            { '@type': 'ListItem', position: 2, name: term.term, item: `${SITE}/glossary/${term.slug}` },
          ] },
          ...(term.faqs.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: term.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
        ]}
      />
      <button onClick={() => go('/glossary')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All definitions</button>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary"><BookText size={13} /> {term.category} · {term.classLevel}</div>
      <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">What is {term.term}?</h1>
      <div className="mt-4 rounded-2xl border-l-4 border-primary bg-primary/5 p-4">
        <p className="font-bold text-slate-800 dark:text-slate-100">{term.definition}</p>
      </div>
      <section className="mt-5">
        <h2 className="mb-2 text-lg font-black text-slate-900 dark:text-slate-100">Explanation</h2>
        <p className="leading-relaxed text-slate-700 dark:text-slate-300">{term.explanation}</p>
      </section>
      {term.example && (
        <section className="mt-5">
          <h2 className="mb-2 text-lg font-black text-slate-900 dark:text-slate-100">Example</h2>
          <p className="rounded-xl bg-slate-50 p-4 leading-relaxed text-slate-700 dark:bg-slate-800 dark:text-slate-300">{term.example}</p>
        </section>
      )}
      {term.faqs.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {term.faqs.map((f, i) => (
              <details key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                <summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">{f.q}</summary>
                <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}
      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <Sparkles size={18} className="text-emerald-600" />
        <p className="flex-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">Want this explained your way? Ask Syllab's free AI Tutor.</p>
        <button onClick={() => setTab('learning_lab')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">Ask AI Tutor <ArrowRight size={15} /></button>
      </div>
      {related.length > 0 && (
        <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700">
          <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">More {term.category} definitions</p>
          <div className="flex flex-wrap gap-2">
            {related.map((g) => (
              <button key={g.slug} onClick={() => go(`/glossary/${g.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">{g.term}</button>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
