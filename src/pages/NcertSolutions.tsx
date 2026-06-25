/**
 * NcertSolutions — free, indexable NCERT exercise solutions (Chegg-style textbook
 * solutions, India edition). Index lists chapters by class+subject; each chapter
 * lives at /ncert-solutions/class-<n>/<subject>/<chapter> (prerendered for SEO).
 */
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ArrowLeft, BookOpen, Download } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { cn } from '../lib/utils';
import { exportNcertChapterAsPDF } from '../lib/printPdf';
import { usePathname } from '../lib/isomorphic';
import {
  loadNcertSolutions, chaptersWithSolutions, findChapter, qaForKey,
  type NcertChapter,
} from '../lib/ncertSolutions';

const SITE = 'https://syllab.in';

function parsePath(pathname: string): { classLevel?: string; subjSlug?: string; chapSlug?: string } {
  const parts = pathname.split('/').filter(Boolean); // ['ncert-solutions', 'class-10', 'science', 'slug']
  const cls = parts[1]?.replace(/^class-/, '');
  return { classLevel: cls, subjSlug: parts[2], chapSlug: parts[3] };
}

export default function NcertSolutions() {
  const [ready, setReady] = useState(false);
  const [path, setPath] = useState(usePathname());

  useEffect(() => {
    loadNcertSolutions().then(() => setReady(true));
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const go = useCallback((to: string) => {
    if (window.location.pathname !== to) window.history.pushState({ syllabNav: true }, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const goBack = useCallback((parent: string) => {
    const st = window.history.state as { syllabNav?: boolean } | null;
    if (st && st.syllabNav && window.history.length > 1) window.history.back();
    else go(parent);
  }, [go]);

  if (!ready) {
    return <div className="mx-auto max-w-5xl px-4 py-16 text-center text-sm font-bold text-slate-400">Loading NCERT solutions…</div>;
  }

  const { classLevel, subjSlug, chapSlug } = parsePath(path);
  const all = chaptersWithSolutions();

  // ── Single chapter view ──
  if (classLevel && subjSlug && chapSlug) {
    const ch = findChapter(classLevel, subjSlug, chapSlug);
    if (ch) return <ChapterView ch={ch} goBack={goBack} />;
  }

  // ── Index view ──
  return <NcertIndex all={all} go={go} />;
}

function NcertIndex({ all, go }: { all: NcertChapter[]; go: (to: string) => void }) {
  // Group by class then subject.
  const byClass: Record<string, Record<string, NcertChapter[]>> = {};
  for (const c of all) {
    (byClass[c.classLevel] ||= {});
    (byClass[c.classLevel][c.subject] ||= []).push(c);
  }
  const classes = Object.keys(byClass).sort((a, b) => Number(a) - Number(b));

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title="Free NCERT Solutions for Class 6–12 (CBSE) — Chapter-wise Answers | Syllab.in"
        description="Free NCERT solutions for CBSE Class 6 to 12 — chapter-wise, step-by-step answers to textbook exercises in Science, Maths, Physics, Chemistry & Biology for Indian students."
        keywords="NCERT solutions free, NCERT solutions Class 9, NCERT solutions Class 10, NCERT solutions Class 11, NCERT solutions Class 12, CBSE NCERT solutions chapter wise, NCERT Maths solutions, NCERT Physics solutions, NCERT Chemistry solutions, NCERT Biology solutions, free textbook solutions India"
        url={`${SITE}/ncert-solutions`}
        jsonLd={{
          '@context': 'https://schema.org', '@type': 'CollectionPage',
          name: 'NCERT Solutions for Class 6–12', url: `${SITE}/ncert-solutions`,
          isPartOf: { '@type': 'WebSite', name: 'Syllab.in', url: SITE },
        }}
      />
      <PageHero
        emoji="📖"
        title="Free NCERT Solutions"
        subtitle="Chapter-wise, step-by-step answers to NCERT textbook exercises for CBSE Class 6–12 — free for every Indian student."
        className="mb-6"
      />
      {classes.length === 0 ? (
        <p className="text-sm font-semibold text-slate-500">Solutions are being added — check back soon.</p>
      ) : classes.map((cls) => (
        <section key={cls} className="mb-7">
          <h2 className="mb-3 text-sm font-black uppercase tracking-widest text-slate-400">Class {cls}</h2>
          {Object.keys(byClass[cls]).sort().map((subj) => (
            <div key={subj} className="mb-4">
              <h3 className="mb-2 text-base font-black text-slate-800">{subj}</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {byClass[cls][subj].map((c) => (
                  <button key={c.key} onClick={() => go(`/ncert-solutions/class-${c.classLevel}/${c.subjectSlug}/${c.slug}`)}
                    className="flex items-center justify-between gap-2 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
                    <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
                      <BookOpen size={15} className="shrink-0 text-primary" /> {c.title}
                    </span>
                    <ChevronRight size={15} className="shrink-0 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

function ChapterView({ ch, goBack }: { ch: NcertChapter; goBack: (parent: string) => void }) {
  const qa = qaForKey(ch.key);
  const url = `${SITE}/ncert-solutions/class-${ch.classLevel}/${ch.subjectSlug}/${ch.slug}`;

  const handleExportPDF = () => {
    exportNcertChapterAsPDF({
      title: ch.title,
      classLevel: ch.classLevel,
      subject: ch.subject,
      items: qa.map((item, i) => ({
        number: i + 1,
        question: item.q,
        solution: item.solution,
      })),
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title={`${ch.title} — Class ${ch.classLevel} ${ch.subject} NCERT Solutions PDF (Free) | Syllab.in`}
        description={`Free step-by-step NCERT solutions for Class ${ch.classLevel} ${ch.subject} chapter "${ch.title}" — important questions with detailed answers, download PDF for CBSE board exam preparation.`}
        keywords={`${ch.title} NCERT solutions PDF free download, Class ${ch.classLevel} ${ch.subject} ${ch.title} solutions, NCERT solutions Class ${ch.classLevel} ${ch.subject} PDF, CBSE ${ch.title} questions answers free`}
        url={url}
        jsonLd={{
          '@context': 'https://schema.org', '@type': 'Article',
          headline: `${ch.title} — Class ${ch.classLevel} ${ch.subject} NCERT Solutions`,
          description: `Step-by-step NCERT solutions for ${ch.title}.`,
          url, inLanguage: 'en-IN', isAccessibleForFree: true,
          author: { '@type': 'Organization', name: 'Syllab.in' },
        }}
      />
      <div className="mb-3 flex items-center justify-between gap-2">
        <button onClick={() => goBack('/ncert-solutions')} className="inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary">
          <ArrowLeft size={14} /> All NCERT solutions
        </button>
        <button
          onClick={handleExportPDF}
          className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 hover:bg-emerald-100 transition-all"
          title="Download chapter solutions as PDF"
        >
          <Download size={14} />
          <span>Download PDF</span>
        </button>
      </div>
      <PageHero
        emoji="📖"
        title={ch.title}
        subtitle={`Class ${ch.classLevel} ${ch.subject} · NCERT solutions · ${qa.length} questions`}
        className="mb-6"
      />
      <div className="space-y-4">
        {qa.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.02, 0.3) }}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="mb-2 font-black text-slate-900">
              <span className={cn('mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-black text-primary')}>{i + 1}</span>
              {item.q}
            </p>
            <div className="whitespace-pre-line text-sm leading-relaxed text-slate-700">{item.solution}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
