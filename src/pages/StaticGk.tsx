/** StaticGk — general knowledge reference. /gk-facts + /:slug */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, Sparkles, Globe } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { GK_TOPICS, getGkTopic, type GkTopic } from '../data/staticGk';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';
const parseSlug = (p: string) => { const m = p.match(/\/gk-facts\/([a-z0-9-]+)/); return m ? m[1] : null; };

export default function StaticGk({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  const [query, setQuery] = useState('');
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  const go = (to: string) => { if (window.location.pathname !== to) window.history.pushState({}, '', to); setPath(to); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const slug = parseSlug(path);
  const topic = slug ? getGkTopic(slug) : null;
  const cats = useMemo(() => [...new Set(GK_TOPICS.map((g) => g.category))], []);
  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => (q ? GK_TOPICS.filter((g) => g.title.toLowerCase().includes(q)) : GK_TOPICS), [q]);

  if (topic) return <Detail topic={topic} go={go} setTab={setTab} />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO title="General Knowledge (GK) — Static GK for Students & Exams | Syllab.in"
        description={`Free static GK reference — countries & capitals, Indian states & capitals, important days, inventions, national symbols and more. ${GK_TOPICS.length} GK topics for school and competitive exams.`}
        keywords="general knowledge, static GK, countries and capitals, Indian states and capitals, important days, GK for competitive exams, GK facts for students"
        url={`${SITE}/gk-facts`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'General Knowledge', url: `${SITE}/gk-facts`, inLanguage: 'en-IN', isAccessibleForFree: true }} />
      <PageHero emoji="🌍" title="General Knowledge" subtitle="Static GK every student should know — capitals, important days, inventions, symbols and more, for school and competitive exams." className="mb-6" />
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <Search size={16} className="text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search e.g. capitals, important days…" className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none dark:text-slate-200" />
      </div>
      {(q ? [['Results', filtered]] as [string, GkTopic[]][] : cats.map((c) => [c, filtered.filter((g) => g.category === c)] as [string, GkTopic[]])).map(([cat, list]) => (
        list.length ? (
          <section key={cat} className="mb-6">
            <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">{cat}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((g) => (
                <button key={g.slug} onClick={() => go(`/gk-facts/${g.slug}`)} className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{g.title}</span>
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

function Detail({ topic, go, setTab }: { topic: GkTopic; go: (to: string) => void; setTab: (t: string) => void }) {
  const related = GK_TOPICS.filter((g) => g.category === topic.category && g.slug !== topic.slug).slice(0, 6);
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO title={`${topic.title} — GK List | Syllab.in`} description={topic.intro}
        keywords={`${topic.title.toLowerCase()}, general knowledge, gk ${topic.category.toLowerCase()}`} url={`${SITE}/gk-facts/${topic.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'Article', headline: topic.title, description: topic.intro, inLanguage: 'en-IN', isAccessibleForFree: true, publisher: { '@type': 'Organization', name: 'Syllab.in' } },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'General Knowledge', item: `${SITE}/gk-facts` }, { '@type': 'ListItem', position: 2, name: topic.title, item: `${SITE}/gk-facts/${topic.slug}` } ] },
          ...(topic.faqs.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: topic.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
        ]} />
      <button onClick={() => go('/gk-facts')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All GK topics</button>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary"><Globe size={13} /> {topic.category}</div>
      <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">{topic.title}</h1>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{topic.intro}</p>
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
        <table className="w-full border-collapse text-sm">
          <tbody>{topic.items.map((it, i) => (
            <tr key={i} className="odd:bg-white even:bg-slate-50/60 dark:odd:bg-slate-900 dark:even:bg-slate-800/40">
              <td className="border-b border-slate-100 p-3 font-bold text-slate-800 align-top dark:border-slate-700 dark:text-slate-100" style={{ width: '38%' }}>{it.name}</td>
              <td className="border-b border-slate-100 p-3 text-slate-600 dark:border-slate-700 dark:text-slate-300">{it.detail}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {topic.faqs.length > 0 && (
        <section className="mt-8"><h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">FAQs</h2>
          <div className="space-y-3">{topic.faqs.map((f, i) => <details key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"><summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">{f.q}</summary><p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{f.a}</p></details>)}</div></section>
      )}
      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <Sparkles size={18} className="text-emerald-600" /><p className="flex-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">Test your GK with Syllab's free quizzes.</p>
        <button onClick={() => setTab('general_knowledge')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">GK Quiz <ArrowRight size={15} /></button>
      </div>
      {related.length > 0 && (
        <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700"><p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">More {topic.category} GK</p>
          <div className="flex flex-wrap gap-2">{related.map((g) => <button key={g.slug} onClick={() => go(`/gk-facts/${g.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">{g.title}</button>)}</div></nav>
      )}
    </div>
  );
}
