/** EnglishLiterature — NCERT English summaries, characters, themes. /english-literature + /:slug */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, Sparkles, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { LIT_CHAPTERS, getLitChapter, type LitChapter } from '../data/englishLiterature';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';
const parseSlug = (p: string) => { const m = p.match(/\/english-literature\/([a-z0-9-]+)/); return m ? m[1] : null; };

export default function EnglishLiterature({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  const [query, setQuery] = useState('');
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  const go = (to: string) => { if (window.location.pathname !== to) window.history.pushState({}, '', to); setPath(to); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const slug = parseSlug(path);
  const ch = slug ? getLitChapter(slug) : null;
  const groups = useMemo(() => [...new Set(LIT_CHAPTERS.map((l) => `${l.classLevel} ${l.book}`))], []);
  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => (q ? LIT_CHAPTERS.filter((l) => l.chapter.toLowerCase().includes(q)) : LIT_CHAPTERS), [q]);

  if (ch) return <Detail ch={ch} go={go} setTab={setTab} />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO title="English Literature — NCERT Chapter Summaries & Character Sketches | Syllab.in"
        description={`Free NCERT English summaries, character sketches and themes for Class 9 & 10 (First Flight, Footprints, Beehive, Moments). ${LIT_CHAPTERS.length} chapter companions for quick revision.`}
        keywords="english summary class 10, character sketch, first flight summary, footprints without feet summary, beehive summary, NCERT english chapter summary"
        url={`${SITE}/english-literature`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'English Literature Companions', url: `${SITE}/english-literature`, inLanguage: 'en-IN', isAccessibleForFree: true }} />
      <PageHero emoji="📚" title="English Literature" subtitle="NCERT chapter summaries, character sketches and themes for fast revision — Class 9 & 10 English." className="mb-6" />
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <Search size={16} className="text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a chapter…" className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none dark:text-slate-200" />
      </div>
      {(q ? [['Results', filtered]] as [string, LitChapter[]][] : groups.map((g) => [g, filtered.filter((l) => `${l.classLevel} ${l.book}` === g)] as [string, LitChapter[]])).map(([grp, list]) => (
        list.length ? (
          <section key={grp} className="mb-6">
            <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">Class {grp}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((l) => (
                <button key={l.slug} onClick={() => go(`/english-literature/${l.slug}`)} className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{l.chapter}</span>
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

function Detail({ ch, go, setTab }: { ch: LitChapter; go: (to: string) => void; setTab: (t: string) => void }) {
  const related = LIT_CHAPTERS.filter((l) => l.classLevel === ch.classLevel && l.slug !== ch.slug).slice(0, 6);
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO title={`${ch.chapter} — Summary, Characters & Themes | Syllab.in`} description={`${ch.intro}`.slice(0, 160)}
        keywords={`${ch.chapter.toLowerCase()} summary, ${ch.chapter.toLowerCase()} character sketch, ${ch.chapter.toLowerCase()} theme, class ${ch.classLevel} english ${ch.book.toLowerCase()}`} url={`${SITE}/english-literature/${ch.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'Article', headline: `${ch.chapter} — Summary`, description: ch.intro, inLanguage: 'en-IN', isAccessibleForFree: true, publisher: { '@type': 'Organization', name: 'Syllab.in' } },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'English Literature', item: `${SITE}/english-literature` }, { '@type': 'ListItem', position: 2, name: ch.chapter, item: `${SITE}/english-literature/${ch.slug}` } ] },
          ...(ch.faqs.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: ch.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
        ]} />
      <button onClick={() => go('/english-literature')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All chapters</button>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary"><BookOpen size={13} /> Class {ch.classLevel} · {ch.book}</div>
      <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">{ch.chapter}</h1>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{ch.intro}</p>
      <section className="mt-5"><h2 className="mb-2 text-lg font-black text-slate-900 dark:text-slate-100">Summary</h2><p className="leading-relaxed text-slate-700 dark:text-slate-300">{ch.summary}</p></section>
      {ch.characters.length > 0 && (
        <section className="mt-5"><h2 className="mb-2 text-lg font-black text-slate-900 dark:text-slate-100">Characters</h2>
          <div className="space-y-2">{ch.characters.map((c, i) => <div key={i} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><span className="font-black text-slate-800 dark:text-slate-100">{c.name}:</span> <span className="text-sm text-slate-600 dark:text-slate-300">{c.description}</span></div>)}</div></section>
      )}
      {ch.themes.length > 0 && (
        <section className="mt-5"><h2 className="mb-2 text-lg font-black text-slate-900 dark:text-slate-100">Themes</h2>
          <div className="flex flex-wrap gap-2">{ch.themes.map((t, i) => <span key={i} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{t}</span>)}</div></section>
      )}
      {ch.faqs.length > 0 && (
        <section className="mt-8"><h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">FAQs</h2>
          <div className="space-y-3">{ch.faqs.map((f, i) => <details key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"><summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">{f.q}</summary><p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{f.a}</p></details>)}</div></section>
      )}
      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <Sparkles size={18} className="text-emerald-600" /><p className="flex-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">Get the full NCERT solutions for this chapter, free.</p>
        <button onClick={() => setTab('ncert_solutions')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">NCERT Solutions <ArrowRight size={15} /></button>
      </div>
      {related.length > 0 && (
        <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700"><p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">More Class {ch.classLevel} chapters</p>
          <div className="flex flex-wrap gap-2">{related.map((l) => <button key={l.slug} onClick={() => go(`/english-literature/${l.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">{l.chapter}</button>)}</div></nav>
      )}
    </div>
  );
}
