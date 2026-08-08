/**
 * QuestionPaperGenerator.tsx — build a printable MCQ practice paper from the
 * real chapter question bank (src/data/chapterMcqs.ts, ~392KB, LAZY-loaded so it
 * never touches the critical path).
 *
 * Honest scope: this is an MCQ practice paper, not a "CBSE sample paper". A real
 * board paper needs 1/2/3/5-mark written questions and we have no verified bank
 * of those — inventing them would put fabricated exam content in front of
 * students and teachers. Every question printed here comes from the real bank.
 *
 * Printing uses the browser's own print dialog (Ctrl/Cmd+P → Save as PDF), so
 * there's no PDF library on this page at all.
 */
import { useEffect, useMemo, useState } from 'react';
import { FileText, Printer, RefreshCw, Loader2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';
import { buildPaper, answerKey, type SourceChapter, type Paper } from '../lib/questionPaper';

const SITE = 'https://syllab.in';

export default function QuestionPaperGenerator() {
  const [bank, setBank] = useState<SourceChapter[] | null>(null);
  const [loadError, setLoadError] = useState('');
  const [cls, setCls] = useState('10');
  const [subject, setSubject] = useState('');
  const [chosen, setChosen] = useState<string[]>([]);
  const [count, setCount] = useState('20');
  const [seed, setSeed] = useState(1);
  const [paper, setPaper] = useState<Paper | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);

  // Lazy-load the question bank only when this page mounts.
  useEffect(() => {
    let alive = true;
    import('../data/chapterMcqs')
      .then((m) => {
        if (!alive) return;
        const rows = (m.MCQ_CHAPTERS || []) as unknown as SourceChapter[];
        setBank(rows.filter((r) => Array.isArray(r.mcqs) && r.mcqs.length > 0));
      })
      .catch(() => alive && setLoadError('Could not load the question bank. Please reload the page.'));
    return () => { alive = false; };
  }, []);

  const classes = useMemo(
    () => [...new Set((bank || []).map((b) => String(b.classLevel)))].sort((a, b) => Number(a) - Number(b)),
    [bank],
  );
  const subjects = useMemo(
    () => [...new Set((bank || []).filter((b) => String(b.classLevel) === cls).map((b) => b.subject))].sort(),
    [bank, cls],
  );
  const chapters = useMemo(
    () => (bank || []).filter((b) => String(b.classLevel) === cls && (!subject || b.subject === subject)),
    [bank, cls, subject],
  );

  // Reset the selection whenever class/subject changes, so stale chapters from a
  // previous class can never end up in a paper.
  useEffect(() => { setChosen([]); setPaper(null); }, [cls, subject]);
  useEffect(() => { if (subjects.length && !subjects.includes(subject)) setSubject(subjects[0]); }, [subjects, subject]);

  const selected = chapters.filter((c) => chosen.includes(c.slug));
  const availableInSelection = selected.reduce((n, c) => n + c.mcqs.length, 0);

  const generate = (newSeed?: number) => {
    if (!selected.length) return;
    const s = newSeed ?? seed;
    setSeed(s);
    setPaper(buildPaper(selected, Number(count) || 0, s));
    setShowAnswers(false);
  };

  const toggle = (slug: string) =>
    setChosen((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));

  const key = paper ? answerKey(paper) : [];
  const selectCls = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-base outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700';

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <style>{`@media print{
        body *{visibility:hidden!important}
        #paper,#paper *{visibility:visible!important}
        #paper{position:absolute;left:0;top:0;width:100%;padding:0}
        .no-print{display:none!important}
        #paper .q{break-inside:avoid;page-break-inside:avoid}
      }`}</style>

      <SEO
        title="Free Question Paper Generator — Printable MCQ Practice Papers | Syllab.in"
        description="Make a printable MCQ practice paper in seconds. Pick a class, subject and chapters, choose how many questions, and print or save as PDF with an answer key. Free for teachers, parents and students — no signup."
        keywords="question paper generator, mcq paper generator, practice paper maker, printable question paper, cbse mcq practice paper, test paper generator for teachers, worksheet generator"
        url={`${SITE}/question-paper-generator`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Question Paper Generator', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/question-paper-generator`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'Is the question paper generator free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — completely free, with no signup. Build a paper, print it or save it as a PDF from your browser.' } },
            { '@type': 'Question', name: 'Where do the questions come from?', acceptedAnswer: { '@type': 'Answer', text: 'Every question comes from Syllab’s chapter-wise MCQ bank, mapped to NCERT/CBSE chapters. This tool generates multiple-choice practice papers; it does not generate long-answer board-pattern questions.' } },
          ] },
        ]}
      />
      <PageHero emoji="📝" title="Question Paper Generator" subtitle="Pick chapters, choose how many questions, print a practice paper with an answer key. Free." className="mb-4" />

      {/* Controls */}
      <div className="no-print rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
        {loadError && <p className="mb-3 rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 text-sm font-bold text-rose-700">{loadError}</p>}
        {!bank && !loadError && (
          <p className="flex items-center gap-2 text-sm font-bold text-slate-500"><Loader2 size={15} className="animate-spin" /> Loading question bank…</p>
        )}

        {bank && (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="block"><span className="text-[11px] font-black uppercase tracking-wide text-slate-500">Class</span>
                <select value={cls} onChange={(e) => setCls(e.target.value)} className={`mt-1 ${selectCls}`}>
                  {classes.map((c) => <option key={c} value={c}>Class {c}</option>)}
                </select></label>
              <label className="block"><span className="text-[11px] font-black uppercase tracking-wide text-slate-500">Subject</span>
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className={`mt-1 ${selectCls}`}>
                  {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                </select></label>
              <label className="block"><span className="text-[11px] font-black uppercase tracking-wide text-slate-500">Questions</span>
                <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(e.target.value)} className={`mt-1 ${selectCls}`} /></label>
            </div>

            <div className="mt-4">
              <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-black uppercase tracking-wide text-slate-500">Chapters ({chosen.length} selected · {availableInSelection} questions available)</span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setChosen(chapters.map((c) => c.slug))} className="text-xs font-black text-primary hover:underline">Select all</button>
                  <button type="button" onClick={() => setChosen([])} className="text-xs font-black text-slate-400 hover:underline">Clear</button>
                </div>
              </div>
              <div className="max-h-56 overflow-auto rounded-xl border border-slate-200 dark:border-slate-700 p-2">
                {chapters.length === 0 && <p className="p-2 text-sm text-slate-500">No chapters with questions for this selection yet.</p>}
                {chapters.map((c) => (
                  <label key={c.slug} className="flex min-h-[40px] cursor-pointer items-center gap-2 rounded-lg px-2 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <input type="checkbox" checked={chosen.includes(c.slug)} onChange={() => toggle(c.slug)} className="h-4 w-4 accent-emerald-600" />
                    <span className="flex-1 text-sm text-slate-700 dark:text-slate-200">{c.chapter}</span>
                    <span className="text-[11px] font-bold text-slate-500">{c.mcqs.length}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => generate()} disabled={!selected.length}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary px-5 text-sm font-black text-white shadow hover:opacity-90 disabled:opacity-40 transition">
                <FileText size={16} /> Generate paper
              </button>
              {paper && (
                <>
                  <button type="button" onClick={() => generate(seed + 1)} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-700 px-4 text-sm font-black text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition">
                    <RefreshCw size={15} /> Shuffle
                  </button>
                  <button type="button" onClick={() => window.print()} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-700 px-4 text-sm font-black text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition">
                    <Printer size={15} /> Print / Save PDF
                  </button>
                  <button type="button" onClick={() => setShowAnswers((v) => !v)} className="inline-flex min-h-[44px] items-center rounded-xl bg-slate-100 dark:bg-slate-700 px-4 text-sm font-black text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition">
                    {showAnswers ? 'Hide' : 'Show'} answer key
                  </button>
                </>
              )}
            </div>

            {paper?.truncated && (
              <p className="mt-3 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-sm font-bold text-amber-800">
                Only {paper.available} question{paper.available === 1 ? '' : 's'} exist for the chapters you picked, so the paper has {paper.available} instead of {paper.requested}. Select more chapters for a longer paper.
              </p>
            )}
          </>
        )}
      </div>

      {/* The printable paper */}
      {paper && paper.questions.length > 0 && (
        <div id="paper" className="mt-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6">
          <header className="mb-5 border-b border-slate-200 pb-3 text-center">
            <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Class {cls} — {subject}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">MCQ Practice Paper · {paper.questions.length} questions · {paper.questions.length} marks</p>
            <p className="mt-1 text-[11px] text-slate-500">Name: ____________________  Date: __________  Time: ____ min</p>
          </header>

          <ol className="space-y-4">
            {paper.questions.map((q, i) => (
              <li key={i} className="q text-sm text-slate-800 dark:text-slate-100">
                <p className="font-bold">{i + 1}. {q.q}</p>
                <ol className="mt-1 grid gap-x-6 gap-y-0.5 sm:grid-cols-2">
                  {q.options.map((o, j) => (
                    <li key={j} className="text-slate-700 dark:text-slate-300">({String.fromCharCode(97 + j)}) {o}</li>
                  ))}
                </ol>
                <p className="mt-0.5 text-[10px] text-slate-400">{q.chapter}</p>
              </li>
            ))}
          </ol>

          {showAnswers && (
            <section className="mt-6 border-t border-slate-200 pt-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">Answer key</h3>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                {key.map((k) => `${k.n}-${k.answer}`).join('   ')}
              </p>
            </section>
          )}
        </div>
      )}

      <section className="no-print mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">Free printable practice papers for teachers, parents and students</h2>
        <p>Choose a class, subject and the chapters you have covered, set the number of questions, and generate a <strong>ready-to-print MCQ practice paper</strong> with an answer key. Questions are spread across the chapters you select, and “Shuffle” gives a fresh paper for a retest or a second section.</p>
        <p>Every question comes from Syllab’s chapter-wise MCQ bank mapped to NCERT/CBSE chapters — nothing is auto-invented. This tool makes <strong>multiple-choice</strong> papers; it does not generate long-answer board-pattern questions. For those, use the free <a href="/sample-papers" className="font-bold text-primary hover:underline">sample papers</a> and <a href="/pyqs" className="font-bold text-primary hover:underline">previous-year questions</a>.</p>
      </section>

      <ToolRelated current="/question-paper-generator" />
    </div>
  );
}
