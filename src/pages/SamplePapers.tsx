/**
 * SamplePapers — original CBSE-pattern model papers. /sample-papers + /:slug.
 */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, Sparkles, FileText, Printer, Eye, EyeOff, Clock, Award } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { exportNcertChapterAsPDF } from '../lib/printPdf';
import { SAMPLE_PAPERS, getSamplePaper, type SamplePaper } from '../data/samplePapers';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';
const parseSlug = (p: string) => { const m = p.match(/\/sample-papers\/([a-z0-9-]+)/); return m ? m[1] : null; };

export default function SamplePapers({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  const [query, setQuery] = useState('');
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const go = (to: string) => { if (window.location.pathname !== to) window.history.pushState({}, '', to); setPath(to); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const slug = parseSlug(path);
  const paper = slug ? getSamplePaper(slug) : null;
  if (paper) return <Detail paper={paper} go={go} setTab={setTab} />;

  const groups = useMemo(() => [...new Set(SAMPLE_PAPERS.map((p) => p.classLevel))].sort(), []);
  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => (q ? SAMPLE_PAPERS.filter((p) => p.title.toLowerCase().includes(q) || p.subject.toLowerCase().includes(q)) : SAMPLE_PAPERS), [q]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO
        title="CBSE Sample Papers 2026 (with Solutions) — Class 9 to 12 | Syllab.in"
        description={`Free CBSE sample papers with solutions — ${SAMPLE_PAPERS.length}+ original model question papers for Class 9, 10, 11 & 12 Maths, Science, Social Science & English, exam-pattern with marking scheme and answers.`}
        keywords="CBSE sample papers, class 10 sample paper, class 9 sample paper, class 12 sample paper, model question paper, sample paper with solutions, CBSE 2026 sample paper, practice paper"
        url={`${SITE}/sample-papers`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'CBSE Sample Papers', url: `${SITE}/sample-papers`, inLanguage: 'en-IN', isAccessibleForFree: true }}
      />
      <PageHero emoji="📄" title="Sample Papers" subtitle="Original CBSE-pattern model papers with full solutions — practice exam-style, check answers, and download as PDF. Free." className="mb-6" />
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <Search size={16} className="text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search e.g. Class 10 Maths…" className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none dark:text-slate-200" />
      </div>
      {(q ? [['Results', filtered]] as [string, SamplePaper[]][] : groups.map((g) => [g, filtered.filter((p) => p.classLevel === g)] as [string, SamplePaper[]])).map(([grp, list]) => (
        list.length ? (
          <section key={grp} className="mb-6">
            <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">{grp}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((p) => (
                <button key={p.slug} onClick={() => go(`/sample-papers/${p.slug}`)} className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
                  <span><span className="text-sm font-black text-slate-800 dark:text-slate-100">{p.subject}</span> <span className="text-xs text-slate-500"> · {p.totalMarks} marks · {p.duration}</span></span>
                  <ArrowRight size={15} className="shrink-0 text-slate-300" />
                </button>
              ))}
            </div>
          </section>
        ) : null
      ))}
      {!filtered.length && <p className="text-sm font-semibold text-slate-400">No sample paper found for “{query}”.</p>}
    </div>
  );
}

function Detail({ paper, go, setTab }: { paper: SamplePaper; go: (to: string) => void; setTab: (t: string) => void }) {
  const [showAnswers, setShowAnswers] = useState(false);
  const related = SAMPLE_PAPERS.filter((p) => p.classLevel === paper.classLevel && p.slug !== paper.slug).slice(0, 5);

  const downloadPaper = () => {
    let n = 0;
    const items = paper.sections.flatMap((s) => [
      { number: 0, question: `${s.name} (${s.marks} marks) — ${s.instructions}`, solution: '' },
      ...s.questions.map((qq) => ({ number: ++n, question: `[${qq.marks}] ${qq.q}`, solution: showAnswers ? qq.answer : '' })),
    ]);
    exportNcertChapterAsPDF({ title: paper.title, classLevel: paper.classLevel.replace('Class ', ''), subject: paper.subject, items });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title={`${paper.title} — Free PDF | Syllab.in`}
        description={`${paper.intro} ${paper.totalMarks} marks, ${paper.duration}. Free CBSE-pattern ${paper.classLevel} ${paper.subject} sample paper with solutions.`.slice(0, 160)}
        keywords={`${paper.classLevel.toLowerCase()} ${paper.subject.toLowerCase()} sample paper, cbse ${paper.subject.toLowerCase()} sample paper, ${paper.classLevel.toLowerCase()} ${paper.subject.toLowerCase()} model paper, sample paper with solutions`}
        url={`${SITE}/sample-papers/${paper.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'Article', headline: paper.title, description: paper.intro, inLanguage: 'en-IN', isAccessibleForFree: true, author: { '@type': 'Organization', name: 'Syllab.in' }, publisher: { '@type': 'Organization', name: 'Syllab.in' }, mainEntityOfPage: `${SITE}/sample-papers/${paper.slug}` },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Sample Papers', item: `${SITE}/sample-papers` },
            { '@type': 'ListItem', position: 2, name: paper.title, item: `${SITE}/sample-papers/${paper.slug}` },
          ] },
          ...(paper.faqs.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: paper.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
        ]}
      />
      <button onClick={() => go('/sample-papers')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All sample papers</button>
      <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">{paper.title}</h1>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{paper.intro}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300"><Award size={13} /> {paper.totalMarks} marks</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300"><Clock size={13} /> {paper.duration}</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{paper.board}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => setShowAnswers((s) => !s)} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-black text-white hover:bg-emerald-600">
          {showAnswers ? <><EyeOff size={15} /> Hide answers</> : <><Eye size={15} /> Show answers</>}
        </button>
        <button type="button" onClick={downloadPaper} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300"><Printer size={15} /> Download PDF{showAnswers ? ' (with answers)' : ''}</button>
      </div>

      <article className="mt-6 space-y-6">
        {paper.sections.map((s, i) => (
          <section key={i}>
            <div className="mb-2 flex items-center justify-between rounded-xl bg-slate-900 px-4 py-2 text-white">
              <span className="text-sm font-black">{s.name}</span>
              <span className="text-xs font-bold text-slate-300">{s.marks} marks</span>
            </div>
            <p className="mb-3 text-xs font-semibold italic text-slate-500">{s.instructions}</p>
            <ol className="space-y-3">
              {s.questions.map((qq, j) => (
                <li key={j} className="rounded-xl border border-slate-100 p-4 dark:border-slate-700">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{j + 1}. {qq.q}</p>
                    <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-black text-slate-500 dark:bg-slate-800">{qq.marks}</span>
                  </div>
                  {showAnswers && <p className="mt-2 rounded-lg bg-emerald-50 p-3 text-sm leading-relaxed text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"><b>Answer:</b> {qq.answer}</p>}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </article>

      {paper.faqs.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {paper.faqs.map((f, i) => (
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
        <p className="flex-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">Want unlimited practice? Try Syllab's free AI Tutor &amp; daily homework.</p>
        <button onClick={() => setTab('learning_lab')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">Open AI Tutor <ArrowRight size={15} /></button>
      </div>

      {related.length > 0 && (
        <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700">
          <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">More {paper.classLevel} sample papers</p>
          <div className="flex flex-wrap gap-2">
            {related.map((p) => (
              <button key={p.slug} onClick={() => go(`/sample-papers/${p.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">{p.subject}</button>
            ))}
          </div>
        </nav>
      )}
      <div className="mt-6 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        <FileText size={14} /> These are original Syllab practice papers modelled on the CBSE exam pattern — not official CBSE papers.
      </div>
    </div>
  );
}
