/** EnglishWriting — essays, letters, notice/article/speech writing. /english-writing + /:slug */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, Sparkles, PenLine, Printer } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { exportNcertChapterAsPDF } from '../lib/printPdf';
import { ENGLISH_WRITING, getEnglishWriting, type EnglishWriting as EW } from '../data/englishWriting';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';
const parseSlug = (p: string) => { const m = p.match(/\/english-writing\/([a-z0-9-]+)/); return m ? m[1] : null; };

export default function EnglishWriting({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  const [query, setQuery] = useState('');
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  const go = (to: string) => { if (window.location.pathname !== to) window.history.pushState({}, '', to); setPath(to); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const slug = parseSlug(path);
  const item = slug ? getEnglishWriting(slug) : null;
  const cats = useMemo(() => [...new Set(ENGLISH_WRITING.map((e) => e.category))], []);
  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => (q ? ENGLISH_WRITING.filter((e) => e.title.toLowerCase().includes(q)) : ENGLISH_WRITING), [q]);

  if (item) return <Detail item={item} go={go} setTab={setTab} />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO title="English Writing Skills — Essays, Letters, Notice & Article Writing | Syllab.in"
        description={`Free English writing guides with format and samples — essays, formal & informal letters, notice writing, article, speech, application and more. ${ENGLISH_WRITING.length} model pieces for CBSE students.`}
        keywords="essay writing, letter writing format, notice writing, article writing, speech writing, leave application, formal letter, English writing skills CBSE"
        url={`${SITE}/english-writing`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'English Writing Skills', url: `${SITE}/english-writing`, inLanguage: 'en-IN', isAccessibleForFree: true }} />
      <PageHero emoji="✍️" title="English Writing Skills" subtitle="Format + model samples for essays, letters, notices, articles, speeches and applications — write better, score better." className="mb-6" />
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <Search size={16} className="text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search e.g. essay on pollution, leave application…" className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none dark:text-slate-200" />
      </div>
      {(q ? [['Results', filtered]] as [string, EW[]][] : cats.map((c) => [c, filtered.filter((e) => e.category === c)] as [string, EW[]])).map(([cat, list]) => (
        list.length ? (
          <section key={cat} className="mb-6">
            <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">{cat}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((e) => (
                <button key={e.slug} onClick={() => go(`/english-writing/${e.slug}`)} className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{e.title}</span>
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

function Detail({ item, go, setTab }: { item: EW; go: (to: string) => void; setTab: (t: string) => void }) {
  const related = ENGLISH_WRITING.filter((e) => e.category === item.category && e.slug !== item.slug).slice(0, 6);
  const print = () => exportNcertChapterAsPDF({ title: item.title, subject: 'English', items: [{ number: 1, question: item.title, solution: item.sample }] });
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO title={`${item.title} — Format, Sample & Tips | Syllab.in`} description={`${item.intro}`.slice(0, 160)}
        keywords={`${item.title.toLowerCase()}, ${item.category.toLowerCase()} writing, ${item.title.toLowerCase()} format, ${item.title.toLowerCase()} example`} url={`${SITE}/english-writing/${item.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'Article', headline: item.title, description: item.intro, inLanguage: 'en-IN', isAccessibleForFree: true, publisher: { '@type': 'Organization', name: 'Syllab.in' } },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'English Writing', item: `${SITE}/english-writing` }, { '@type': 'ListItem', position: 2, name: item.title, item: `${SITE}/english-writing/${item.slug}` } ] },
          ...(item.faqs.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: item.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
        ]} />
      <button onClick={() => go('/english-writing')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All writing guides</button>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary"><PenLine size={13} /> {item.category} · {item.classLevel}</div>
      <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">{item.title}</h1>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{item.intro}</p>
      {item.format.length > 0 && (
        <section className="mt-5"><h2 className="mb-2 text-lg font-black text-slate-900 dark:text-slate-100">Format / Structure</h2>
          <ol className="space-y-1.5">{item.format.map((f, i) => <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300"><span className="font-black text-primary">{i + 1}.</span> {f}</li>)}</ol></section>
      )}
      <section className="mt-5">
        <div className="mb-2 flex items-center justify-between"><h2 className="text-lg font-black text-slate-900 dark:text-slate-100">Model Sample</h2>
          <button onClick={print} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300"><Printer size={13} /> PDF</button></div>
        <div className="whitespace-pre-line rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 dark:bg-slate-800 dark:text-slate-300">{item.sample}</div>
      </section>
      {item.tips.length > 0 && (
        <section className="mt-5"><h2 className="mb-2 text-lg font-black text-slate-900 dark:text-slate-100">Tips</h2>
          <ul className="space-y-1.5">{item.tips.map((t, i) => <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300"><span className="mt-0.5 text-primary">✓</span> {t}</li>)}</ul></section>
      )}
      {item.faqs.length > 0 && (
        <section className="mt-8"><h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">FAQs</h2>
          <div className="space-y-3">{item.faqs.map((f, i) => <details key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"><summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">{f.q}</summary><p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{f.a}</p></details>)}</div></section>
      )}
      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <Sparkles size={18} className="text-emerald-600" /><p className="flex-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">Get your writing checked by Syllab's free AI Tutor.</p>
        <button onClick={() => setTab('learning_lab')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">AI Tutor <ArrowRight size={15} /></button>
      </div>
      {related.length > 0 && (
        <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700"><p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">More {item.category}</p>
          <div className="flex flex-wrap gap-2">{related.map((e) => <button key={e.slug} onClick={() => go(`/english-writing/${e.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">{e.title}</button>)}</div></nav>
      )}
    </div>
  );
}
