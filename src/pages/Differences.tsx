/**
 * Differences — "Difference Between X and Y" cluster.
 * Index at /difference-between + one page per /difference-between/{slug}.
 * Comparison table + key differences + FAQs, with Article/FAQ/Breadcrumb JSON-LD.
 */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, GitCompareArrows, Search, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { DIFFERENCES, getDifference, type DiffTopic } from '../data/differences';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';

function parseSlug(pathname: string): string | null {
  const m = pathname.match(/\/difference-between\/([a-z0-9-]+)/);
  return m ? m[1] : null;
}

export default function Differences({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  const [query, setQuery] = useState('');
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

  const slug = parseSlug(path);
  const topic = slug ? getDifference(slug) : null;

  if (topic) return <DiffDetail topic={topic} go={go} setTab={setTab} />;
  return <DiffIndex query={query} setQuery={setQuery} go={go} />;
}

/* ── Index ── */
function DiffIndex({ query, setQuery, go }: { query: string; setQuery: (s: string) => void; go: (to: string) => void }) {
  const cats = useMemo(() => [...new Set(DIFFERENCES.map((d) => d.category))], []);
  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () => (q ? DIFFERENCES.filter((d) => d.title.toLowerCase().includes(q) || d.termA.toLowerCase().includes(q) || d.termB.toLowerCase().includes(q)) : DIFFERENCES),
    [q],
  );
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO
        title="Difference Between — Topic-wise Comparisons for Students | Syllab.in"
        description={`Free, clear 'difference between' comparisons for Class 6–12 students — ${DIFFERENCES.length}+ side-by-side comparison tables across Biology, Physics, Chemistry, Maths and more, with key points and FAQs. CBSE/NCERT aligned.`}
        keywords="difference between, comparison, mitosis and meiosis, speed and velocity, mass and weight, acid and base, CBSE difference between, NCERT comparison, class 10 difference between"
        url={`${SITE}/difference-between`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Difference Between — Student Comparisons', url: `${SITE}/difference-between`, inLanguage: 'en-IN', isAccessibleForFree: true }}
      />
      <PageHero emoji="⚖️" title="Difference Between" subtitle="Clear, exam-ready comparisons — side-by-side tables, key differences and FAQs for the topics students search most." className="mb-6" />

      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <Search size={16} className="text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search e.g. mitosis, velocity, acid…"
          className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none dark:text-slate-200" />
      </div>

      {(q ? [['Results', filtered]] as [string, DiffTopic[]][] : cats.map((c) => [c, filtered.filter((d) => d.category === c)] as [string, DiffTopic[]])).map(([cat, list]) => (
        list.length ? (
          <section key={cat} className="mb-6">
            <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">{cat}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((d) => (
                <button key={d.slug} onClick={() => go(`/difference-between/${d.slug}`)}
                  className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{d.termA} <span className="text-slate-400">vs</span> {d.termB}</span>
                  <ArrowRight size={15} className="shrink-0 text-slate-300" />
                </button>
              ))}
            </div>
          </section>
        ) : null
      ))}
      {!filtered.length && <p className="text-sm font-semibold text-slate-400">No comparison found for “{query}”. Try another term.</p>}
    </div>
  );
}

/* ── Detail ── */
function DiffDetail({ topic, go, setTab }: { topic: DiffTopic; go: (to: string) => void; setTab: (t: string) => void }) {
  const related = DIFFERENCES.filter((d) => d.category === topic.category && d.slug !== topic.slug).slice(0, 4);
  const breadcrumbs = [
    { name: 'Difference Between', url: `${SITE}/difference-between` },
    { name: topic.title, url: `${SITE}/difference-between/${topic.slug}` },
  ];
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title={`${topic.title} (with Comparison Table) | Syllab.in`}
        description={`${topic.intro} Compare ${topic.termA} and ${topic.termB} with a clear table, key differences and FAQs — free for ${topic.classLevel} CBSE/NCERT students.`}
        keywords={`difference between ${topic.termA.toLowerCase()} and ${topic.termB.toLowerCase()}, ${topic.termA.toLowerCase()} vs ${topic.termB.toLowerCase()}, ${topic.category.toLowerCase()} comparison, ${topic.classLevel.toLowerCase()} difference between`}
        url={`${SITE}/difference-between/${topic.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'Article', headline: topic.title, description: topic.intro, inLanguage: 'en-IN', isAccessibleForFree: true, author: { '@type': 'Organization', name: 'Syllab.in' }, publisher: { '@type': 'Organization', name: 'Syllab.in' }, mainEntityOfPage: `${SITE}/difference-between/${topic.slug}` },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })) },
          ...(topic.faqs.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: topic.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
        ]}
      />
      <button onClick={() => go('/difference-between')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary">
        <ArrowLeft size={14} /> All comparisons
      </button>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary">
        <GitCompareArrows size={13} /> {topic.category} · {topic.classLevel}
      </div>
      <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">{topic.title}</h1>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{topic.intro}</p>

      {/* Comparison table */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800">
              <th className="border-b border-slate-200 p-3 text-left font-black text-slate-500 dark:border-slate-700">Basis</th>
              <th className="border-b border-slate-200 p-3 text-left font-black text-primary dark:border-slate-700">{topic.termA}</th>
              <th className="border-b border-slate-200 p-3 text-left font-black text-indigo-600 dark:border-slate-700">{topic.termB}</th>
            </tr>
          </thead>
          <tbody>
            {topic.table.map((r, i) => (
              <tr key={i} className="odd:bg-white even:bg-slate-50/60 dark:odd:bg-slate-900 dark:even:bg-slate-800/40">
                <td className="border-b border-slate-100 p-3 font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200">{r.aspect}</td>
                <td className="border-b border-slate-100 p-3 text-slate-600 dark:border-slate-700 dark:text-slate-300">{r.a}</td>
                <td className="border-b border-slate-100 p-3 text-slate-600 dark:border-slate-700 dark:text-slate-300">{r.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key points */}
      {topic.keyPoints.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 text-lg font-black text-slate-900 dark:text-slate-100">Key Differences</h2>
          <ul className="space-y-2">
            {topic.keyPoints.map((p, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <span className="mt-0.5 text-primary">✓</span> {p}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQs */}
      {topic.faqs.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {topic.faqs.map((f, i) => (
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
        <p className="flex-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">Still confused? Ask Syllab's free AI Tutor to explain it your way.</p>
        <button onClick={() => setTab('learning_lab')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">Ask AI Tutor <ArrowRight size={15} /></button>
      </div>

      {related.length > 0 && (
        <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700">
          <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">More {topic.category} comparisons</p>
          <div className="flex flex-wrap gap-2">
            {related.map((d) => (
              <button key={d.slug} onClick={() => go(`/difference-between/${d.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                {d.termA} vs {d.termB}
              </button>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
