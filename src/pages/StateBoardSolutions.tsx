/**
 * StateBoardSolutions — free, indexable state-board (AP/TS/Karnataka/Maharashtra)
 * textbook solutions. Index groups by board → class → subject; each chapter lives at
 * /state-board-solutions/<board>/class-<n>/<subject>/<chapter> (prerendered for SEO).
 */
import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ArrowLeft, BookOpen, Download } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { cn } from '../lib/utils';
import { exportNcertChapterAsPDF } from '../lib/printPdf';
import { usePathname } from '../lib/isomorphic';
import {
  loadStateBoardSolutions, allChapters, findChapter, qaForKey,
  BOARD_LABEL, type SBChapter,
} from '../lib/stateBoardSolutions';

const SITE = 'https://syllab.in';
const BOARD_ORDER = ['AP', 'TS', 'Karnataka', 'Maharashtra'];

function parsePath(pathname: string): { boardSlug?: string; classLevel?: string; subjSlug?: string; chapSlug?: string } {
  const p = pathname.split('/').filter(Boolean); // ['state-board-solutions','ts','class-10','science','slug']
  return { boardSlug: p[1], classLevel: p[2]?.replace(/^class-/, ''), subjSlug: p[3], chapSlug: p[4] };
}

export default function StateBoardSolutions() {
  const [ready, setReady] = useState(false);
  const [path, setPath] = useState(usePathname());

  useEffect(() => {
    loadStateBoardSolutions().then(() => setReady(true));
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
    return <div className="mx-auto max-w-5xl px-4 py-16 text-center text-sm font-bold text-slate-400">Loading state-board solutions…</div>;
  }

  const { boardSlug, classLevel, subjSlug, chapSlug } = parsePath(path);
  if (boardSlug && classLevel && subjSlug && chapSlug) {
    const ch = findChapter(boardSlug, classLevel, subjSlug, chapSlug);
    if (ch) return <ChapterView ch={ch} goBack={goBack} />;
  }
  return <Index all={allChapters()} go={go} />;
}

function Index({ all, go }: { all: SBChapter[]; go: (to: string) => void }) {
  // Group by board → class → subject.
  const byBoard: Record<string, Record<string, Record<string, SBChapter[]>>> = {};
  for (const c of all) {
    ((byBoard[c.board] ||= {})[c.classLevel] ||= {})[c.subject] ||= [];
    byBoard[c.board][c.classLevel][c.subject].push(c);
  }
  const boards = Object.keys(byBoard).sort((a, b) => BOARD_ORDER.indexOf(a) - BOARD_ORDER.indexOf(b));

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title="State Board Solutions — AP, Telangana, Karnataka & Maharashtra (Free) | Syllab.in"
        description="Free chapter-wise textbook solutions for AP (SSC), Telangana (SSC), Karnataka (SSLC) and Maharashtra (SSC) state boards — Class 9 & 10 Maths and Science, step-by-step answers for board exam prep."
        keywords="AP SSC solutions, TS SSC solutions, Karnataka SSLC solutions, Maharashtra SSC solutions, state board maths solutions, 10th class state syllabus science solutions free, SCERT textbook solutions"
        url={`${SITE}/state-board-solutions`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'State Board Solutions (AP/TS/Karnataka/Maharashtra)', url: `${SITE}/state-board-solutions`, inLanguage: 'en-IN', isAccessibleForFree: true }}
      />
      <PageHero emoji="🏫" title="State Board Solutions" subtitle="Free chapter-wise textbook solutions for AP, Telangana, Karnataka & Maharashtra boards — Class 9 & 10 Maths and Science." className="mb-6" />
      {boards.map((board) => (
        <section key={board} className="mb-8">
          <h2 className="mb-3 text-base font-black text-slate-900 dark:text-slate-100">{BOARD_LABEL[board] || board}</h2>
          {Object.keys(byBoard[board]).sort((a, b) => Number(a) - Number(b)).map((cls) => (
            <div key={cls} className="mb-4">
              <h3 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">Class {cls}</h3>
              {Object.keys(byBoard[board][cls]).sort().map((subj) => (
                <div key={subj} className="mb-3">
                  <div className="mb-1.5 text-sm font-black text-slate-700 dark:text-slate-300">{subj}</div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {byBoard[board][cls][subj].map((c) => (
                      <button key={c.key} onClick={() => go(`/state-board-solutions/${c.boardSlug}/class-${c.classLevel}/${c.subjectSlug}/${c.slug}`)}
                        className="flex items-center justify-between gap-2 rounded-2xl border border-slate-100 bg-white p-3.5 text-left shadow-sm transition-all hover:border-primary/30 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
                        <span className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                          <BookOpen size={15} className="shrink-0 text-primary" /> {c.title}
                        </span>
                        <ChevronRight size={15} className="shrink-0 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

function ChapterView({ ch, goBack }: { ch: SBChapter; goBack: (parent: string) => void }) {
  const qa = qaForKey(ch.key);
  const url = `${SITE}/state-board-solutions/${ch.boardSlug}/class-${ch.classLevel}/${ch.subjectSlug}/${ch.slug}`;
  const handleExportPDF = () => {
    exportNcertChapterAsPDF({
      title: `${ch.title} — ${ch.boardLabel} Class ${ch.classLevel} ${ch.subject}`,
      classLevel: ch.classLevel, subject: ch.subject,
      items: qa.map((item, i) => ({ number: i + 1, question: item.q, solution: item.solution })),
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title={`${ch.title} — ${ch.boardLabel} Class ${ch.classLevel} ${ch.subject} Solutions (Free) | Syllab.in`}
        description={`Free step-by-step ${ch.boardLabel} Class ${ch.classLevel} ${ch.subject} solutions for "${ch.title}" — important questions with detailed answers, download PDF for board exam preparation.`}
        keywords={`${ch.title} ${ch.board} solutions, ${ch.boardLabel} Class ${ch.classLevel} ${ch.subject} ${ch.title}, state board ${ch.title} questions answers free`}
        url={url}
        jsonLd={{
          '@context': 'https://schema.org', '@type': 'Article',
          headline: `${ch.title} — ${ch.boardLabel} Class ${ch.classLevel} ${ch.subject} Solutions`,
          url, inLanguage: 'en-IN', isAccessibleForFree: true,
          author: { '@type': 'Organization', name: 'Syllab.in' },
        }}
      />
      <div className="mb-3 flex items-center justify-between gap-2">
        <button onClick={() => goBack('/state-board-solutions')} className="inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary">
          <ArrowLeft size={14} /> All state-board solutions
        </button>
        <button onClick={handleExportPDF} className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 hover:bg-emerald-100 transition-all dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
          <Download size={14} /> <span>Download PDF</span>
        </button>
      </div>
      <PageHero emoji="🏫" title={ch.title} subtitle={`${ch.boardLabel} · Class ${ch.classLevel} ${ch.subject} · ${qa.length} questions`} className="mb-6" />
      <div className="space-y-4">
        {qa.map((item, i) => (
          <div key={i} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <p className="mb-2 font-black text-slate-900 dark:text-slate-100">
              <span className={cn('mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-black text-primary')}>{i + 1}</span>
              {item.q}
            </p>
            <div className="whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.solution}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
