/** ConceptExplainers — deep "concept explained" pages. /concepts + /concepts/:slug */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, Sparkles, Lightbulb, AlertTriangle, Download } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { CONCEPT_EXPLAINERS, getConcept, type ConceptExplainer } from '../data/conceptExplainers';
import { VISUAL_LESSONS } from '../data/visualLessons';
import { exportArticleAsPDF } from '../lib/printPdf';
import { usePathname } from '../lib/isomorphic';

const STOP = new Set(['the', 'and', 'of', 'a', 'an', 'in', 'on', 'to', 'for', 'human', 'system', 'cell', 'law', 'laws']);
/** Find a Visual Learning lesson that shares a meaningful keyword with the concept. */
function matchVisual(title: string) {
  const words = title.toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter((w) => w.length >= 6 && !STOP.has(w));
  return VISUAL_LESSONS.find((v) => {
    const vt = v.title.toLowerCase();
    return words.some((w) => vt.includes(w));
  });
}

function downloadConceptPdf(c: ConceptExplainer) {
  const sections = [
    { heading: 'Overview', body: c.intro },
    ...c.sections.map((s) => ({ heading: s.heading, body: s.body })),
    ...(c.realLife.length ? [{ heading: 'Real-life Examples', body: c.realLife.map((r) => `• ${r}`).join('\n') }] : []),
    ...(c.examples.length ? [{ heading: 'Worked Examples', body: c.examples.map((e) => `Problem: ${e.problem}\nSolution: ${e.solution}`).join('\n\n') }] : []),
    ...(c.commonMistakes.length ? [{ heading: 'Common Mistakes', body: c.commonMistakes.map((m) => `✗ ${m}`).join('\n') }] : []),
    ...(c.faqs.length ? [{ heading: 'FAQs', body: c.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n') }] : []),
  ];
  exportArticleAsPDF({ title: c.title, subtitle: `${c.subject} · ${c.classLevel}`, sections });
}

const SITE = 'https://syllab.in';
const parseSlug = (p: string) => { const m = p.match(/\/concepts\/([a-z0-9-]+)/); return m ? m[1] : null; };

export default function ConceptExplainers({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  const [query, setQuery] = useState('');
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  const go = (to: string) => { if (window.location.pathname !== to) window.history.pushState({}, '', to); setPath(to); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const slug = parseSlug(path);
  const concept = slug ? getConcept(slug) : null;
  const subjects = useMemo(() => [...new Set(CONCEPT_EXPLAINERS.map((c) => c.subject))], []);
  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => (q ? CONCEPT_EXPLAINERS.filter((c) => c.title.toLowerCase().includes(q)) : CONCEPT_EXPLAINERS), [q]);

  if (concept) return <Detail concept={concept} go={go} setTab={setTab} />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO title="Concepts Explained Simply — Science & Maths for Students | Syllab.in"
        description={`Key school concepts explained in simple language with real-life examples, worked problems and common mistakes. ${CONCEPT_EXPLAINERS.length} deep explainers across Physics, Chemistry, Biology and Maths.`}
        keywords="concept explained, photosynthesis explained, newtons laws explained, trigonometry explained, science concepts simple, CBSE concepts"
        url={`${SITE}/concepts`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Concepts Explained', url: `${SITE}/concepts`, inLanguage: 'en-IN', isAccessibleForFree: true }} />
      <PageHero emoji="💡" title="Concepts Explained" subtitle="Tough topics made simple — clear explanations, real-life examples, worked problems and the mistakes to avoid." className="mb-6" />
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <Search size={16} className="text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search e.g. photosynthesis, trigonometry…" className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none dark:text-slate-200" />
      </div>
      {(q ? [['Results', filtered]] as [string, ConceptExplainer[]][] : subjects.map((s) => [s, filtered.filter((c) => c.subject === s)] as [string, ConceptExplainer[]])).map(([sub, list]) => (
        list.length ? (
          <section key={sub} className="mb-6">
            <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">{sub}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((c) => (
                <button key={c.slug} onClick={() => go(`/concepts/${c.slug}`)} className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{c.title}</span>
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

function Detail({ concept: c, go, setTab }: { concept: ConceptExplainer; go: (to: string) => void; setTab: (t: string) => void }) {
  const related = CONCEPT_EXPLAINERS.filter((x) => x.subject === c.subject && x.slug !== c.slug).slice(0, 6);
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO title={`${c.title} — Explained Simply with Examples | Syllab.in`} description={`${c.intro}`.slice(0, 160)}
        keywords={`${c.title.toLowerCase()} explained, ${c.title.toLowerCase()} definition, ${c.title.toLowerCase()} examples, ${c.subject.toLowerCase()} ${c.classLevel.toLowerCase()}`} url={`${SITE}/concepts/${c.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'Article', headline: `${c.title} — Explained Simply`, description: c.intro, inLanguage: 'en-IN', isAccessibleForFree: true, author: { '@type': 'Organization', name: 'Syllab.in' }, publisher: { '@type': 'Organization', name: 'Syllab.in' }, mainEntityOfPage: `${SITE}/concepts/${c.slug}` },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Concepts', item: `${SITE}/concepts` }, { '@type': 'ListItem', position: 2, name: c.title, item: `${SITE}/concepts/${c.slug}` } ] },
          ...(c.faqs.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: c.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
        ]} />
      <button onClick={() => go('/concepts')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All concepts</button>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary"><Lightbulb size={13} /> {c.subject} · {c.classLevel}</div>
      <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">{c.title}</h1>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{c.intro}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button onClick={() => downloadConceptPdf(c)} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white shadow-sm transition-colors hover:bg-emerald-600">
          <Download size={15} /> Download PDF
        </button>
        {(() => { const v = matchVisual(c.title); return v ? (
          <a href={`/visual-learning/${v.slug}`} className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2 text-sm font-black text-white shadow-sm transition-colors hover:bg-teal-600">
            🎬 Watch the animated version
          </a>
        ) : null; })()}
      </div>

      <article className="mt-6 space-y-5">
        {c.sections.map((s, i) => (
          <section key={i}>
            <h2 className="mb-1.5 text-lg font-black text-slate-900 dark:text-slate-100">{s.heading}</h2>
            <p className="whitespace-pre-line leading-relaxed text-slate-700 dark:text-slate-300">{s.body}</p>
          </section>
        ))}
      </article>

      {c.realLife.length > 0 && (
        <section className="mt-6 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/20">
          <h2 className="mb-2 text-base font-black text-emerald-800 dark:text-emerald-300">🌍 Real-life examples</h2>
          <ul className="space-y-1.5">{c.realLife.map((r, i) => <li key={i} className="flex gap-2 text-sm leading-relaxed text-emerald-900 dark:text-emerald-200"><span>•</span> {r}</li>)}</ul>
        </section>
      )}

      {c.examples.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 text-lg font-black text-slate-900 dark:text-slate-100">Worked Examples</h2>
          <div className="space-y-3">{c.examples.map((e, i) => (
            <div key={i} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Q{i + 1}. {e.problem}</p>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-300">{e.solution}</p>
            </div>
          ))}</div>
        </section>
      )}

      {c.commonMistakes.length > 0 && (
        <section className="mt-6 rounded-2xl bg-amber-50 p-4 dark:bg-amber-950/20">
          <h2 className="mb-2 flex items-center gap-1.5 text-base font-black text-amber-800 dark:text-amber-300"><AlertTriangle size={16} /> Common mistakes to avoid</h2>
          <ul className="space-y-1.5">{c.commonMistakes.map((m, i) => <li key={i} className="flex gap-2 text-sm leading-relaxed text-amber-900 dark:text-amber-200"><span>✗</span> {m}</li>)}</ul>
        </section>
      )}

      {c.faqs.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
          <div className="space-y-3">{c.faqs.map((f, i) => <details key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"><summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">{f.q}</summary><p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{f.a}</p></details>)}</div>
        </section>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <Sparkles size={18} className="text-emerald-600" /><p className="flex-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">Still have a doubt? Ask Syllab's free AI Tutor to explain it again.</p>
        <button onClick={() => setTab('learning_lab')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">Ask AI Tutor <ArrowRight size={15} /></button>
      </div>
      {related.length > 0 && (
        <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700"><p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">More {c.subject} concepts</p>
          <div className="flex flex-wrap gap-2">{related.map((x) => <button key={x.slug} onClick={() => go(`/concepts/${x.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">{x.title}</button>)}</div></nav>
      )}
    </div>
  );
}
