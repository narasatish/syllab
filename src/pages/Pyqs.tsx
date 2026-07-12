/**
 * Pyqs — chapter-wise solved Previous Year Questions. Index at /pyqs, detail at
 * /pyqs/:slug. Path-driven; each chapter is downloadable as a watermarked PDF.
 */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, FileQuestion, Download } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { PYQ_CHAPTERS, getPyqChapter, type PyqChapter } from '../data/pyqs';
import { exportArticleAsPDF } from '../lib/printPdf';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';

function downloadPyqPdf(c: PyqChapter) {
  const sections = [
    { heading: 'About these questions', body: c.intro },
    ...c.questions.map((qq, i) => ({
      heading: `Q${i + 1} · ${qq.marks} mark${qq.marks > 1 ? 's' : ''} · ${qq.year}`,
      body: `${qq.q}\n\nSolution:\n${qq.answer}`,
    })),
    ...(c.faqs.length ? [{ heading: 'FAQs', body: c.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n') }] : []),
  ];
  exportArticleAsPDF({ title: `${c.chapter} — Previous Year Questions`, subtitle: `${c.classLevel} · ${c.subject} · ${c.exam}`, sections });
}

export default function Pyqs() {
  const [path, setPath] = useState(usePathname());
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

  const slug = useMemo(() => {
    const m = path.match(/^\/pyqs\/([^/]+)/);
    return m ? m[1] : null;
  }, [path]);
  const ch = slug ? getPyqChapter(slug) : null;

  const byClass = useMemo(() => {
    const groups: Record<string, PyqChapter[]> = {};
    for (const c of PYQ_CHAPTERS) (groups[c.classLevel] ||= []).push(c);
    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
  }, []);

  if (ch) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <SEO
          title={`${ch.chapter} — Previous Year Questions with Solutions (${ch.classLevel} ${ch.subject}) | Syllab.in`}
          description={`${ch.intro} Free solved previous year questions (PYQ) for ${ch.classLevel} ${ch.subject} ${ch.chapter} — ${ch.exam}, with full step-by-step answers.`.slice(0, 160)}
          keywords={`${ch.chapter.toLowerCase()} previous year questions, ${ch.chapter.toLowerCase()} pyq, ${ch.classLevel.toLowerCase()} ${ch.subject.toLowerCase()} important questions, ${ch.chapter.toLowerCase()} board questions with solutions`}
          url={`${SITE}/pyqs/${ch.slug}`}
          jsonLd={[
            { '@context': 'https://schema.org', '@type': 'Article', headline: `${ch.chapter} — Previous Year Questions`, description: ch.intro, inLanguage: 'en-IN', isAccessibleForFree: true, publisher: { '@type': 'Organization', name: 'Syllab.in' } },
            { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Previous Year Questions', item: `${SITE}/pyqs` },
              { '@type': 'ListItem', position: 2, name: ch.chapter, item: `${SITE}/pyqs/${ch.slug}` },
            ] },
            ...(ch.faqs.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: ch.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
          ]}
        />
        <button onClick={() => go('/pyqs')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All PYQs</button>
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary"><FileQuestion size={13} /> {ch.classLevel} · {ch.subject} · {ch.exam}</div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">{ch.chapter} — Previous Year Questions</h1>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{ch.intro}</p>
        <button onClick={() => downloadPyqPdf(ch)} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white shadow-sm transition-colors hover:bg-emerald-600">
          <Download size={15} /> Download PDF
        </button>

        <div className="mt-6 space-y-4">
          {ch.questions.map((qq, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-black text-white dark:bg-slate-100 dark:text-slate-900">Q{i + 1}</span>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-black text-amber-700">{qq.marks} mark{qq.marks > 1 ? 's' : ''}</span>
                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-black text-blue-700">{qq.year}</span>
                {qq.frequency && <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-black text-emerald-700">🔁 {qq.frequency}</span>}
              </div>
              <p className="font-bold leading-relaxed text-slate-900 dark:text-slate-100">{qq.q}</p>
              <details className="mt-3 group">
                <summary className="cursor-pointer text-sm font-black text-primary">Show solution</summary>
                <p className="mt-2 whitespace-pre-line leading-relaxed text-sm text-slate-700 dark:text-slate-300">{qq.answer}</p>
              </details>
            </div>
          ))}
        </div>

        {ch.faqs.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">FAQs</h2>
            <div className="space-y-3">
              {ch.faqs.map((f, i) => (
                <details key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                  <summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">{f.q}</summary>
                  <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title="Previous Year Questions (PYQ) Chapter-wise with Solutions | Syllab.in"
        description="Free chapter-wise previous year questions (PYQ) with full step-by-step solutions for CBSE Class 10 & 12 — Maths, Science, Physics, Chemistry, Biology. Practise real board-exam questions."
        keywords="previous year questions, pyq chapter wise, cbse class 10 pyq, class 12 board questions with solutions, important board questions, pyq with answers free"
        url={`${SITE}/pyqs`}
        jsonLd={[{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Previous Year Questions (PYQ)', url: `${SITE}/pyqs`, isAccessibleForFree: true }]}
      />
      <PageHero emoji="📜" title="Previous Year Questions" subtitle="Real board-exam questions, chapter by chapter — each with a full worked solution. The smartest way to revise." className="mb-6" />
      {PYQ_CHAPTERS.length === 0 ? (
        <p className="rounded-2xl bg-slate-50 p-6 text-center font-bold text-slate-500 dark:bg-slate-800">More chapters coming soon.</p>
      ) : byClass.map(([cls, list]) => (
        <div key={cls} className="mb-8">
          <h2 className="mb-3 text-xs font-black uppercase tracking-widest text-slate-400">{cls}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c) => (
              <button key={c.slug} onClick={() => go(`/pyqs/${c.slug}`)} className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
                <FileQuestion size={20} className="text-primary" />
                <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-primary">{c.subject} · {c.exam}</p>
                <h3 className="mt-1 font-black text-slate-900 dark:text-slate-100">{c.chapter}</h3>
                <p className="mt-1 text-xs font-bold text-slate-400">{c.questions.length} solved questions →</p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
