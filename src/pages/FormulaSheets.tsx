/**
 * Formula Sheets — free, comprehensive CBSE/NCERT formula & key-concept sheets.
 * Index at /formula-sheets + one rich, indexable, PDF-downloadable sheet per
 * /formula-sheets/{slug}. High-intent revision searches ("class 12 physics formula
 * sheet pdf") and a strong linkable/shareable asset. All free, static data.
 */
import { useEffect, useState } from 'react';
import { ArrowLeft, Download, Sparkles, FileText } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { FORMULA_SHEETS as FORMULA_SHEETS_BASE } from '../data/formulaSheets';
import { FORMULA_SHEETS_CHAPTERS } from '../data/formulaSheetsChapters';
// 8 subject overview sheets + ~90 per-chapter sheets (from the verified formula banks).
const FORMULA_SHEETS = [...FORMULA_SHEETS_BASE, ...FORMULA_SHEETS_CHAPTERS];
import { exportNcertChapterAsPDF } from '../lib/printPdf';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';

function parseSlug(pathname: string): string | null {
  const m = pathname.match(/\/formula-sheets\/([a-z0-9-]+)/);
  return m ? m[1] : null;
}

export default function FormulaSheets({ setTab }: { setTab: (tab: string) => void }) {
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

  const slug = parseSlug(path);
  const sheet = slug ? FORMULA_SHEETS.find((s) => s.slug === slug) : null;
  const formulaCount = (s: typeof FORMULA_SHEETS[number]) => s.sections.reduce((n, sec) => n + sec.formulas.length, 0);

  // ── Index ──
  if (!sheet) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <SEO
          title="Free Formula Sheets (PDF) — Maths, Physics & Chemistry Class 10–12 | Syllab.in"
          description="Free downloadable formula sheets for CBSE Class 10, 11 & 12 — Maths, Physics and Chemistry. All important formulas on one page for fast revision before board exams, JEE & NEET. Free PDF, no signup."
          keywords="formula sheet pdf, class 12 physics formula sheet, class 10 maths formulas, class 11 chemistry formulas, all formulas pdf, jee formula sheet, neet formula sheet, cbse formula list free download"
          url={`${SITE}/formula-sheets`}
          jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Formula Sheets for Class 10–12', url: `${SITE}/formula-sheets`, inLanguage: 'en-IN', isAccessibleForFree: true }}
        />
        <PageHero emoji="🧾" title="Free Formula Sheets" subtitle="Every important Maths, Physics & Chemistry formula on one page — download as PDF and revise fast before boards, JEE & NEET." className="mb-6" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FORMULA_SHEETS.map((s) => (
            <button
              key={s.slug}
              onClick={() => go(`/formula-sheets/${s.slug}`)}
              className="group rounded-2xl border-2 border-slate-100 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{s.emoji}</span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-black text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">{formulaCount(s)} formulas</span>
              </div>
              <div className="mt-3 font-black text-slate-800 dark:text-slate-100">{s.title}</div>
              <div className="mt-1 text-xs font-bold text-slate-400">Class {s.classLevel} · {s.subject}</div>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-black text-primary opacity-0 transition-opacity group-hover:opacity-100">View &amp; download →</div>
            </button>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-slate-400">More sheets (Class 9, exam-wise JEE/NEET) coming soon — all free.</p>
      </div>
    );
  }

  // ── Sheet detail ──
  const related = FORMULA_SHEETS.filter((s) => s.slug !== sheet.slug);
  const breadcrumbs = [
    { name: 'Formula Sheets', url: `${SITE}/formula-sheets` },
    { name: sheet.title, url: `${SITE}/formula-sheets/${sheet.slug}` },
  ];

  const downloadPdf = () => {
    let n = 0;
    const items = sheet.sections.flatMap((sec) =>
      sec.formulas.map((f) => ({
        number: ++n,
        question: `${sec.heading} — ${f.name}`,
        solution: f.formula + (f.note ? `\nNote: ${f.note}` : ''),
      })),
    );
    exportNcertChapterAsPDF({ title: sheet.title, classLevel: sheet.classLevel, subject: sheet.subject, items });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title={`${sheet.title} (PDF) — All Important Formulas Free | Syllab.in`}
        description={`${sheet.intro.slice(0, 150)}`}
        keywords={`${sheet.title.toLowerCase()}, class ${sheet.classLevel} ${sheet.subject.toLowerCase()} formulas, ${sheet.subject.toLowerCase()} formula sheet pdf, all formulas class ${sheet.classLevel}, ${sheet.subject.toLowerCase()} important formulas`}
        url={`${SITE}/formula-sheets/${sheet.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })) },
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: sheet.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
        ]}
      />

      <div className="mb-4 flex items-center justify-between gap-2">
        <button onClick={() => go('/formula-sheets')} className="inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary">
          <ArrowLeft size={14} /> All formula sheets
        </button>
        <button onClick={downloadPdf} className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 transition-all hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
          <Download size={14} /> Download PDF
        </button>
      </div>

      <PageHero emoji={sheet.emoji} title={sheet.title} subtitle={sheet.intro} className="mb-6" />

      {/* Formula sections */}
      <div className="space-y-5">
        {sheet.sections.map((sec, si) => (
          <section key={si} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3 text-sm font-black uppercase tracking-wide text-slate-700 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200">
              <Sparkles size={15} className="text-primary" /> {sec.heading}
            </h2>
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {sec.formulas.map((f, fi) => (
                <div key={fi} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4">
                  <div className="shrink-0 text-sm font-bold text-slate-700 dark:text-slate-300 sm:w-2/5">{f.name}</div>
                  <div className="flex-1">
                    <code className="block whitespace-pre-wrap rounded-lg bg-slate-900 px-3 py-1.5 font-mono text-sm font-bold text-emerald-300">{f.formula}</code>
                    {f.note ? <div className="mt-1 text-xs text-slate-400">{f.note}</div> : null}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* FAQs */}
      {sheet.faqs.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {sheet.faqs.map((f, i) => (
              <details key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                <summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">{f.q}</summary>
                <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* CTA + related */}
      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <FileText size={18} className="text-emerald-600" />
        <p className="flex-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">Tip: download the PDF, print it, and stick it above your study desk for daily revision.</p>
        <button onClick={() => setTab('mock_tests')} className="rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">Practise free mock tests</button>
      </div>

      <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700">
        <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">Other Formula Sheets</p>
        <div className="flex flex-wrap gap-2">
          {related.map((s) => (
            <button key={s.slug} onClick={() => go(`/formula-sheets/${s.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
              {s.emoji} {s.title}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
