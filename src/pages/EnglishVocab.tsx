/** EnglishVocab — idioms, proverbs, one-word substitutions etc. /vocabulary + /:slug */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, Sparkles, BookA } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { VOCAB_SETS, getVocabSet, type VocabSet } from '../data/englishVocab';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';
const parseSlug = (p: string) => { const m = p.match(/\/vocabulary\/([a-z0-9-]+)/); return m ? m[1] : null; };

export default function EnglishVocab({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  const [query, setQuery] = useState('');
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  const go = (to: string) => { if (window.location.pathname !== to) window.history.pushState({}, '', to); setPath(to); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const slug = parseSlug(path);
  const set = slug ? getVocabSet(slug) : null;
  const cats = useMemo(() => [...new Set(VOCAB_SETS.map((v) => v.category))], []);
  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => (q ? VOCAB_SETS.filter((v) => v.title.toLowerCase().includes(q)) : VOCAB_SETS), [q]);

  if (set) return <Detail set={set} go={go} setTab={setTab} />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO title="English Vocabulary — Idioms, Proverbs & One-word Substitutions | Syllab.in"
        description={`Free English vocabulary lists — idioms and phrases with meanings, proverbs, one-word substitutions, synonyms and antonyms. ${VOCAB_SETS.length} sets for school and competitive exams.`}
        keywords="idioms and phrases with meanings, proverbs, one word substitution, synonyms and antonyms, English vocabulary list, idioms for exams"
        url={`${SITE}/vocabulary`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'English Vocabulary', url: `${SITE}/vocabulary`, inLanguage: 'en-IN', isAccessibleForFree: true }} />
      <PageHero emoji="🔤" title="English Vocabulary" subtitle="Idioms, proverbs, one-word substitutions, synonyms and antonyms — with meanings and examples for exams and fluency." className="mb-6" />
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <Search size={16} className="text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search e.g. idioms, proverbs…" className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none dark:text-slate-200" />
      </div>
      {(q ? [['Results', filtered]] as [string, VocabSet[]][] : cats.map((c) => [c, filtered.filter((v) => v.category === c)] as [string, VocabSet[]])).map(([cat, list]) => (
        list.length ? (
          <section key={cat} className="mb-6">
            <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">{cat}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((v) => (
                <button key={v.slug} onClick={() => go(`/vocabulary/${v.slug}`)} className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{v.title}</span>
                  <ArrowRight size={15} className="shrink-0 text-slate-300" />
                </button>
              ))}
            </div>
          </section>
        ) : null
      ))}
      {!filtered.length && <p className="text-sm font-semibold text-slate-400">Nothing found for “{query}”.</p>}
    </div>
  );
}

function Detail({ set, go, setTab }: { set: VocabSet; go: (to: string) => void; setTab: (t: string) => void }) {
  const related = VOCAB_SETS.filter((v) => v.category === set.category && v.slug !== set.slug).slice(0, 6);
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO title={`${set.title} (with Meanings & Examples) | Syllab.in`} description={set.intro}
        keywords={`${set.title.toLowerCase()}, ${set.category.toLowerCase()}, english vocabulary`} url={`${SITE}/vocabulary/${set.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'Article', headline: set.title, description: set.intro, inLanguage: 'en-IN', isAccessibleForFree: true, publisher: { '@type': 'Organization', name: 'Syllab.in' } },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Vocabulary', item: `${SITE}/vocabulary` }, { '@type': 'ListItem', position: 2, name: set.title, item: `${SITE}/vocabulary/${set.slug}` } ] },
          ...(set.faqs.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: set.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
        ]} />
      <button onClick={() => go('/vocabulary')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All vocabulary</button>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary"><BookA size={13} /> {set.category}</div>
      <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">{set.title}</h1>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{set.intro}</p>
      <div className="mt-5 space-y-2">
        {set.items.map((it, i) => (
          <div key={i} className="rounded-xl border border-slate-100 p-3 dark:border-slate-700">
            <div className="font-black text-slate-800 dark:text-slate-100">{it.term}</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">{it.meaning}</div>
            {it.example && <div className="mt-1 text-sm italic text-slate-400">e.g. {it.example}</div>}
          </div>
        ))}
      </div>
      {set.faqs.length > 0 && (
        <section className="mt-8"><h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">FAQs</h2>
          <div className="space-y-3">{set.faqs.map((f, i) => <details key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"><summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">{f.q}</summary><p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{f.a}</p></details>)}</div></section>
      )}
      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <Sparkles size={18} className="text-emerald-600" /><p className="flex-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">Practice English with Syllab's free AI voice teacher.</p>
        <button onClick={() => setTab('english_lab')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">English Lab <ArrowRight size={15} /></button>
      </div>
      {related.length > 0 && (
        <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700"><p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">More {set.category}</p>
          <div className="flex flex-wrap gap-2">{related.map((v) => <button key={v.slug} onClick={() => go(`/vocabulary/${v.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">{v.title}</button>)}</div></nav>
      )}
    </div>
  );
}
