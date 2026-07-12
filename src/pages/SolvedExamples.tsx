/** SolvedExamples — chapter-wise worked numericals. /solved-examples + /:slug */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, Sparkles, Calculator, Download } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { SOLVED_SETS, getSolvedSet, type SolvedSet } from '../data/solvedExamples';
import { exportArticleAsPDF } from '../lib/printPdf';
import { usePathname } from '../lib/isomorphic';

function downloadSolvedPdf(set: SolvedSet) {
  const sections = [
    { heading: 'Overview', body: set.intro },
    ...set.examples.map((e, i) => ({ heading: `Example ${i + 1}`, body: `Problem: ${e.problem}\n\nSolution: ${e.solution}\n\nAnswer: ${e.answer}` })),
    ...(set.tips.length ? [{ heading: 'Tips', body: set.tips.map((t) => `• ${t}`).join('\n') }] : []),
    ...(set.faqs.length ? [{ heading: 'FAQs', body: set.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n') }] : []),
  ];
  exportArticleAsPDF({ title: `${set.chapter} — Solved Examples`, subtitle: `${set.classLevel} · ${set.subject} · CBSE`, sections });
}

const SITE = 'https://syllab.in';
const parseSlug = (p: string) => { const m = p.match(/\/solved-examples\/([a-z0-9-]+)/); return m ? m[1] : null; };

export default function SolvedExamples({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  const [query, setQuery] = useState('');
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  const go = (to: string) => { if (window.location.pathname !== to) window.history.pushState({}, '', to); setPath(to); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const slug = parseSlug(path);
  const set = slug ? getSolvedSet(slug) : null;
  const groups = useMemo(() => [...new Set(SOLVED_SETS.map((s) => `${s.classLevel} ${s.subject}`))], []);
  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => (q ? SOLVED_SETS.filter((s) => s.chapter.toLowerCase().includes(q) || s.subject.toLowerCase().includes(q)) : SOLVED_SETS), [q]);

  if (set) return <Detail set={set} go={go} setTab={setTab} />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO title="Solved Numerical Examples (Step-by-Step) — Physics, Maths, Chemistry | Syllab.in"
        description={`Free step-by-step solved numerical examples for CBSE Class 9-12 Physics, Maths and Chemistry. ${SOLVED_SETS.length} chapter sets with full working and final answers.`}
        keywords="solved examples, numerical problems with solutions, physics numericals, maths solved problems, step by step solution, CBSE solved examples"
        url={`${SITE}/solved-examples`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Solved Numerical Examples', url: `${SITE}/solved-examples`, inLanguage: 'en-IN', isAccessibleForFree: true }} />
      <PageHero emoji="🧮" title="Solved Examples" subtitle="Step-by-step worked numericals — learn the method, not just the answer. Physics, Maths & Chemistry, chapter by chapter." className="mb-6" />
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <Search size={16} className="text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search chapter…" className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none dark:text-slate-200" />
      </div>
      {(q ? [['Results', filtered]] as [string, SolvedSet[]][] : groups.map((g) => [g, filtered.filter((s) => `${s.classLevel} ${s.subject}` === g)] as [string, SolvedSet[]])).map(([grp, list]) => (
        list.length ? (
          <section key={grp} className="mb-6">
            <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">{grp}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((s) => (
                <button key={s.slug} onClick={() => go(`/solved-examples/${s.slug}`)} className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{s.chapter} <span className="text-xs font-semibold text-slate-400">({s.examples.length})</span></span>
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

function Detail({ set, go, setTab }: { set: SolvedSet; go: (to: string) => void; setTab: (t: string) => void }) {
  const [shown, setShown] = useState<Record<number, boolean>>({});
  const related = SOLVED_SETS.filter((s) => s.classLevel === set.classLevel && s.subject === set.subject && s.slug !== set.slug).slice(0, 6);
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO title={`${set.chapter} — Solved Numerical Examples (Class ${set.classLevel.replace('Class ', '')} ${set.subject}) | Syllab.in`}
        description={`${set.intro}`.slice(0, 160)}
        keywords={`${set.chapter.toLowerCase()} numericals, ${set.chapter.toLowerCase()} solved examples, class ${set.classLevel.replace('Class ', '')} ${set.subject.toLowerCase()} problems`} url={`${SITE}/solved-examples/${set.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'Article', headline: `${set.chapter} — Solved Examples`, description: set.intro, inLanguage: 'en-IN', isAccessibleForFree: true, publisher: { '@type': 'Organization', name: 'Syllab.in' } },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Solved Examples', item: `${SITE}/solved-examples` }, { '@type': 'ListItem', position: 2, name: set.chapter, item: `${SITE}/solved-examples/${set.slug}` } ] },
        ]} />
      <button onClick={() => go('/solved-examples')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All solved examples</button>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary"><Calculator size={13} /> {set.classLevel} · {set.subject}</div>
      <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">{set.chapter} — Solved Examples</h1>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{set.intro}</p>
      <button onClick={() => downloadSolvedPdf(set)} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white shadow-sm transition-colors hover:bg-emerald-600">
        <Download size={15} /> Download PDF
      </button>

      <div className="mt-5 space-y-3">
        {set.examples.map((e, i) => (
          <div key={i} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Example {i + 1}. {e.problem}</p>
            {shown[i] ? (
              <div className="mt-2">
                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-300">{e.solution}</p>
                {e.answer && <p className="mt-2 rounded-lg bg-emerald-50 p-2.5 text-sm font-bold text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">Answer: {e.answer}</p>}
              </div>
            ) : (
              <button type="button" onClick={() => setShown((s) => ({ ...s, [i]: true }))} className="mt-2 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-black text-primary hover:bg-primary/20">Show step-by-step solution</button>
            )}
          </div>
        ))}
      </div>

      {set.tips.length > 0 && (
        <section className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
          <h2 className="mb-2 text-base font-black text-slate-900 dark:text-slate-100">Problem-solving tips</h2>
          <ul className="space-y-1.5">{set.tips.map((t, i) => <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300"><span className="text-primary">✓</span> {t}</li>)}</ul>
        </section>
      )}
      {set.faqs.length > 0 && (
        <section className="mt-8"><h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">FAQs</h2>
          <div className="space-y-3">{set.faqs.map((f, i) => <details key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"><summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">{f.q}</summary><p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{f.a}</p></details>)}</div></section>
      )}
      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <Sparkles size={18} className="text-emerald-600" /><p className="flex-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">Stuck on a problem? Scan it with Syllab's free AI Tutor for a step-by-step solution.</p>
        <button onClick={() => setTab('learning_lab')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">AI Tutor <ArrowRight size={15} /></button>
      </div>
      {related.length > 0 && (
        <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700"><p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">More {set.classLevel} {set.subject}</p>
          <div className="flex flex-wrap gap-2">{related.map((s) => <button key={s.slug} onClick={() => go(`/solved-examples/${s.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">{s.chapter}</button>)}</div></nav>
      )}
    </div>
  );
}
