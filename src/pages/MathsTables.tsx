/** MathsTables — multiplication tables, squares, cubes, primes etc. /maths-tables + /:slug */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, Sparkles, Calculator, Printer } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { exportNcertChapterAsPDF } from '../lib/printPdf';
import { MATHS_TABLES, getMathRef, type MathRef } from '../data/mathsTables';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';
const parseSlug = (p: string) => { const m = p.match(/\/maths-tables\/([a-z0-9-]+)/); return m ? m[1] : null; };

export default function MathsTables({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  const [query, setQuery] = useState('');
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  const go = (to: string) => { if (window.location.pathname !== to) window.history.pushState({}, '', to); setPath(to); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const slug = parseSlug(path);
  const item = slug ? getMathRef(slug) : null;
  const cats = useMemo(() => [...new Set(MATHS_TABLES.map((m) => m.category))], []);
  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => (q ? MATHS_TABLES.filter((m) => m.title.toLowerCase().includes(q)) : MATHS_TABLES), [q]);

  if (item) return <Detail item={item} go={go} setTab={setTab} />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO title="Maths Tables & Charts — Multiplication, Squares, Cubes, Primes | Syllab.in"
        description={`Free maths reference charts — multiplication tables 2 to 20, squares, cubes, square roots, prime numbers and Roman numerals. ${MATHS_TABLES.length} printable tables for students.`}
        keywords="multiplication table, table of 2 to 20, squares 1 to 50, cubes, prime numbers 1 to 100, roman numerals, maths tables chart"
        url={`${SITE}/maths-tables`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Maths Tables & Charts', url: `${SITE}/maths-tables`, inLanguage: 'en-IN', isAccessibleForFree: true }} />
      <PageHero emoji="🔢" title="Maths Tables & Charts" subtitle="Multiplication tables, squares, cubes, roots, primes and Roman numerals — printable charts for fast learning." className="mb-6" />
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <Search size={16} className="text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search e.g. table of 12, squares…" className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none dark:text-slate-200" />
      </div>
      {(q ? [['Results', filtered]] as [string, MathRef[]][] : cats.map((c) => [c, filtered.filter((m) => m.category === c)] as [string, MathRef[]])).map(([cat, list]) => (
        list.length ? (
          <section key={cat} className="mb-6">
            <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">{cat}</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((m) => (
                <button key={m.slug} onClick={() => go(`/maths-tables/${m.slug}`)} className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{m.title}</span>
                  <ArrowRight size={15} className="shrink-0 text-slate-300" />
                </button>
              ))}
            </div>
          </section>
        ) : null
      ))}
      {!filtered.length && <p className="text-sm font-semibold text-slate-400">No table found for “{query}”.</p>}
    </div>
  );
}

function Detail({ item, go, setTab }: { item: MathRef; go: (to: string) => void; setTab: (t: string) => void }) {
  const related = MATHS_TABLES.filter((m) => m.category === item.category && m.slug !== item.slug).slice(0, 6);
  const print = () => exportNcertChapterAsPDF({ title: item.title, subject: 'Maths', items: [{ number: 1, question: item.columns.join('  |  '), solution: item.rows.map((r) => r.join('  =  ')).join('\n') }] });
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <SEO title={`${item.title} — Free Chart | Syllab.in`} description={item.intro}
        keywords={`${item.title.toLowerCase()}, ${item.category.toLowerCase()}, maths chart`} url={`${SITE}/maths-tables/${item.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'Article', headline: item.title, description: item.intro, inLanguage: 'en-IN', isAccessibleForFree: true, publisher: { '@type': 'Organization', name: 'Syllab.in' } },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Maths Tables', item: `${SITE}/maths-tables` }, { '@type': 'ListItem', position: 2, name: item.title, item: `${SITE}/maths-tables/${item.slug}` } ] },
          ...(item.faqs.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: item.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
        ]} />
      <button onClick={() => go('/maths-tables')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All charts</button>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary"><Calculator size={13} /> {item.category}</div>
      <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">{item.title}</h1>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{item.intro}</p>
      <button onClick={print} className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300"><Printer size={15} /> Print / Save PDF</button>
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="bg-slate-50 dark:bg-slate-800">{item.columns.map((c, i) => <th key={i} className="border-b border-slate-200 p-3 text-left font-black text-slate-600 dark:border-slate-700 dark:text-slate-200">{c}</th>)}</tr></thead>
          <tbody>{item.rows.map((r, i) => <tr key={i} className="odd:bg-white even:bg-slate-50/60 dark:odd:bg-slate-900 dark:even:bg-slate-800/40">{r.map((c, j) => <td key={j} className="border-b border-slate-100 p-2.5 font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
      {item.faqs.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">FAQs</h2>
          <div className="space-y-3">{item.faqs.map((f, i) => <details key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"><summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">{f.q}</summary><p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{f.a}</p></details>)}</div>
        </section>
      )}
      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <Sparkles size={18} className="text-emerald-600" /><p className="flex-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">Practice maths with Syllab's free AI Tutor.</p>
        <button onClick={() => setTab('learning_lab')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">AI Tutor <ArrowRight size={15} /></button>
      </div>
      {related.length > 0 && (
        <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700"><p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">More {item.category}</p>
          <div className="flex flex-wrap gap-2">{related.map((m) => <button key={m.slug} onClick={() => go(`/maths-tables/${m.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">{m.title}</button>)}</div></nav>
      )}
    </div>
  );
}
