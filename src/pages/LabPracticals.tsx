/** LabPracticals — CBSE science practicals + viva. /lab-practicals + /:slug */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, Sparkles, FlaskConical, Download } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { LAB_PRACTICALS, getLabPractical, type LabPractical } from '../data/labPracticals';
import { exportArticleAsPDF } from '../lib/printPdf';
import { usePathname } from '../lib/isomorphic';

function downloadLabPdf(lab: LabPractical) {
  const sections = [
    { heading: 'Aim', body: lab.aim },
    ...(lab.materials.length ? [{ heading: 'Materials Required', body: lab.materials.map((m) => `• ${m}`).join('\n') }] : []),
    ...(lab.theory ? [{ heading: 'Theory / Principle', body: lab.theory }] : []),
    ...(lab.procedure.length ? [{ heading: 'Procedure', body: lab.procedure.map((p, i) => `${i + 1}. ${p}`).join('\n') }] : []),
    ...(lab.observation ? [{ heading: 'Observation', body: lab.observation }] : []),
    ...(lab.result ? [{ heading: 'Result', body: lab.result }] : []),
    ...(lab.precautions.length ? [{ heading: 'Precautions', body: lab.precautions.map((p) => `• ${p}`).join('\n') }] : []),
    ...(lab.viva.length ? [{ heading: 'Viva Voce', body: lab.viva.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n') }] : []),
  ];
  exportArticleAsPDF({ title: lab.title, subtitle: `${lab.classLevel} · ${lab.subject} · Lab Practical`, sections });
}

const SITE = 'https://syllab.in';
const parseSlug = (p: string) => { const m = p.match(/\/lab-practicals\/([a-z0-9-]+)/); return m ? m[1] : null; };

export default function LabPracticals({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  const [query, setQuery] = useState('');
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  const go = (to: string) => { if (window.location.pathname !== to) window.history.pushState({}, '', to); setPath(to); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const slug = parseSlug(path);
  const lab = slug ? getLabPractical(slug) : null;
  const groups = useMemo(() => [...new Set(LAB_PRACTICALS.map((l) => `${l.classLevel} ${l.subject}`))], []);
  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => (q ? LAB_PRACTICALS.filter((l) => l.title.toLowerCase().includes(q) || l.subject.toLowerCase().includes(q)) : LAB_PRACTICALS), [q]);

  if (lab) return <Detail lab={lab} go={go} setTab={setTab} />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO title="Lab Practicals & Viva Questions — CBSE Class 9–12 Science | Syllab.in"
        description={`Free CBSE science lab practicals with aim, materials, theory, procedure, observation, result, precautions and viva questions. ${LAB_PRACTICALS.length} experiments for Physics, Chemistry and Biology.`}
        keywords="lab practicals, science practical class 10, viva questions, physics practical, chemistry practical, biology practical, CBSE practical file, experiment procedure"
        url={`${SITE}/lab-practicals`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Lab Practicals & Viva', url: `${SITE}/lab-practicals`, inLanguage: 'en-IN', isAccessibleForFree: true }} />
      <PageHero emoji="🔬" title="Lab Practicals & Viva" subtitle="Complete CBSE science experiments — aim, procedure, observations, results, precautions and viva Q&A for your practical exam." className="mb-6" />
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <Search size={16} className="text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search experiment…" className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none dark:text-slate-200" />
      </div>
      {(q ? [['Results', filtered]] as [string, LabPractical[]][] : groups.map((g) => [g, filtered.filter((l) => `${l.classLevel} ${l.subject}` === g)] as [string, LabPractical[]])).map(([grp, list]) => (
        list.length ? (
          <section key={grp} className="mb-6">
            <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">{grp}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((l) => (
                <button key={l.slug} onClick={() => go(`/lab-practicals/${l.slug}`)} className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{l.title}</span>
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

function Detail({ lab, go, setTab }: { lab: LabPractical; go: (to: string) => void; setTab: (t: string) => void }) {
  const related = LAB_PRACTICALS.filter((l) => l.classLevel === lab.classLevel && l.subject === lab.subject && l.slug !== lab.slug).slice(0, 6);
  const Block = ({ h, children }: { h: string; children: React.ReactNode }) => (
    <section className="mt-5"><h2 className="mb-1.5 text-lg font-black text-slate-900 dark:text-slate-100">{h}</h2>{children}</section>
  );
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO title={`${lab.title} — Practical, Procedure & Viva | Syllab.in`} description={`${lab.aim}`.slice(0, 160)}
        keywords={`${lab.title.toLowerCase()}, ${lab.subject.toLowerCase()} practical, viva questions ${lab.title.toLowerCase()}, ${lab.classLevel.toLowerCase()} experiment`} url={`${SITE}/lab-practicals/${lab.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'HowTo', name: lab.title, description: lab.aim, inLanguage: 'en-IN', step: lab.procedure.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s })) },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Lab Practicals', item: `${SITE}/lab-practicals` }, { '@type': 'ListItem', position: 2, name: lab.title, item: `${SITE}/lab-practicals/${lab.slug}` } ] },
          ...(lab.viva.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: lab.viva.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
        ]} />
      <button onClick={() => go('/lab-practicals')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All practicals</button>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary"><FlaskConical size={13} /> {lab.classLevel} · {lab.subject}</div>
      <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">{lab.title}</h1>
      <button onClick={() => downloadLabPdf(lab)} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white shadow-sm transition-colors hover:bg-emerald-600">
        <Download size={15} /> Download PDF
      </button>

      <Block h="Aim"><p className="leading-relaxed text-slate-700 dark:text-slate-300">{lab.aim}</p></Block>
      {lab.materials.length > 0 && <Block h="Materials Required"><ul className="space-y-1">{lab.materials.map((m, i) => <li key={i} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300"><span className="text-primary">•</span> {m}</li>)}</ul></Block>}
      {lab.theory && <Block h="Theory / Principle"><p className="whitespace-pre-line leading-relaxed text-slate-700 dark:text-slate-300">{lab.theory}</p></Block>}
      {lab.procedure.length > 0 && <Block h="Procedure"><ol className="space-y-1.5">{lab.procedure.map((p, i) => <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300"><span className="font-black text-primary">{i + 1}.</span> {p}</li>)}</ol></Block>}
      {lab.observation && <Block h="Observation"><p className="whitespace-pre-line leading-relaxed text-slate-700 dark:text-slate-300">{lab.observation}</p></Block>}
      {lab.result && <Block h="Result"><p className="rounded-xl bg-emerald-50 p-3 leading-relaxed text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">{lab.result}</p></Block>}
      {lab.precautions.length > 0 && <Block h="Precautions"><ul className="space-y-1">{lab.precautions.map((p, i) => <li key={i} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300"><span className="text-amber-500">!</span> {p}</li>)}</ul></Block>}

      {lab.viva.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">Viva Voce Questions</h2>
          <div className="space-y-3">{lab.viva.map((f, i) => <details key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"><summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">{f.q}</summary><p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{f.a}</p></details>)}</div>
        </section>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <Sparkles size={18} className="text-emerald-600" /><p className="flex-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">Doubts about this experiment? Ask Syllab's free AI Tutor.</p>
        <button onClick={() => setTab('learning_lab')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">Ask AI Tutor <ArrowRight size={15} /></button>
      </div>
      {related.length > 0 && (
        <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700"><p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">More {lab.classLevel} {lab.subject} practicals</p>
          <div className="flex flex-wrap gap-2">{related.map((l) => <button key={l.slug} onClick={() => go(`/lab-practicals/${l.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">{l.title}</button>)}</div></nav>
      )}
    </div>
  );
}
