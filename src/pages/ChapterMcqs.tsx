/** ChapterMcqs — interactive chapter MCQ quizzes. /mcqs + /:slug */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, Sparkles, ListChecks, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { MCQ_CHAPTERS, getMcqChapter, type McqChapter } from '../data/chapterMcqs';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';
const parseSlug = (p: string) => { const m = p.match(/\/mcqs\/([a-z0-9-]+)/); return m ? m[1] : null; };

export default function ChapterMcqs({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  const [query, setQuery] = useState('');
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  const go = (to: string) => { if (window.location.pathname !== to) window.history.pushState({}, '', to); setPath(to); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const slug = parseSlug(path);
  const chapter = slug ? getMcqChapter(slug) : null;
  const groups = useMemo(() => [...new Set(MCQ_CHAPTERS.map((m) => `${m.classLevel} ${m.subject}`))], []);
  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => (q ? MCQ_CHAPTERS.filter((m) => m.chapter.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q)) : MCQ_CHAPTERS), [q]);

  if (chapter) return <Detail key={chapter.slug} chapter={chapter} go={go} setTab={setTab} />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO title="Chapter-wise MCQs with Answers — Class 9 & 10 | Syllab.in"
        description={`Free chapter-wise MCQs with answers for CBSE Class 9 & 10 Science, Maths and Social Science. ${MCQ_CHAPTERS.length} interactive objective question sets with explanations.`}
        keywords="MCQ questions, class 10 science mcq, class 10 maths mcq, objective questions with answers, CBSE mcq chapter wise, online test"
        url={`${SITE}/mcqs`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Chapter-wise MCQs', url: `${SITE}/mcqs`, inLanguage: 'en-IN', isAccessibleForFree: true }} />
      <PageHero emoji="✅" title="Chapter MCQs" subtitle="Interactive chapter-wise multiple-choice questions with instant answers and explanations — practice and self-test." className="mb-6" />
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <Search size={16} className="text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search chapter…" className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none dark:text-slate-200" />
      </div>
      {(q ? [['Results', filtered]] as [string, McqChapter[]][] : groups.map((g) => [g, filtered.filter((m) => `${m.classLevel} ${m.subject}` === g)] as [string, McqChapter[]])).map(([grp, list]) => (
        list.length ? (
          <section key={grp} className="mb-6">
            <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">{grp}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((m) => (
                <button key={m.slug} onClick={() => go(`/mcqs/${m.slug}`)} className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{m.chapter} <span className="text-xs font-semibold text-slate-400">({m.mcqs.length} MCQs)</span></span>
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

function Detail({ chapter, go, setTab }: { chapter: McqChapter; go: (to: string) => void; setTab: (t: string) => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => chapter.mcqs.map(() => null));
  const related = MCQ_CHAPTERS.filter((m) => m.classLevel === chapter.classLevel && m.subject === chapter.subject && m.slug !== chapter.slug).slice(0, 6);
  const answered = answers.filter((a) => a !== null).length;
  const score = chapter.mcqs.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO title={`${chapter.chapter} MCQs with Answers — Class ${chapter.classLevel.replace('Class ', '')} ${chapter.subject} | Syllab.in`}
        description={`${chapter.intro}`.slice(0, 160)}
        keywords={`${chapter.chapter.toLowerCase()} mcq, class ${chapter.classLevel.replace('Class ', '')} ${chapter.subject.toLowerCase()} mcq, ${chapter.chapter.toLowerCase()} objective questions`} url={`${SITE}/mcqs/${chapter.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'Article', headline: `${chapter.chapter} MCQs`, description: chapter.intro, inLanguage: 'en-IN', isAccessibleForFree: true, publisher: { '@type': 'Organization', name: 'Syllab.in' } },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'MCQs', item: `${SITE}/mcqs` }, { '@type': 'ListItem', position: 2, name: chapter.chapter, item: `${SITE}/mcqs/${chapter.slug}` } ] },
        ]} />
      <button onClick={() => go('/mcqs')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All MCQs</button>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary"><ListChecks size={13} /> {chapter.classLevel} · {chapter.subject}</div>
      <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">{chapter.chapter} — MCQs</h1>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{chapter.intro}</p>
      {answered > 0 && <div className="mt-3 inline-block rounded-xl bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">Score: {score} / {chapter.mcqs.length}  ·  Answered {answered}/{chapter.mcqs.length}</div>}

      <div className="mt-5 space-y-4">
        {chapter.mcqs.map((mq, i) => {
          const sel = answers[i];
          return (
            <div key={i} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <p className="mb-3 text-sm font-bold text-slate-800 dark:text-slate-100">{i + 1}. {mq.q}</p>
              <div className="space-y-1.5">
                {mq.options.map((opt, j) => {
                  const chosen = sel === j;
                  const showState = sel !== null;
                  const isCorrect = j === mq.correct;
                  return (
                    <button key={j} type="button" disabled={sel !== null}
                      onClick={() => setAnswers((a) => a.map((v, k) => (k === i ? j : v)))}
                      className={cn('flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm font-semibold transition',
                        !showState && 'border-slate-200 hover:border-primary hover:bg-primary/5 dark:border-slate-700',
                        showState && isCorrect && 'border-emerald-400 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300',
                        showState && chosen && !isCorrect && 'border-red-400 bg-red-50 text-red-700 dark:bg-red-950/30',
                        showState && !isCorrect && !chosen && 'border-slate-200 text-slate-400 dark:border-slate-700')}>
                      {showState && isCorrect ? <CheckCircle2 size={15} className="shrink-0 text-emerald-600" /> : showState && chosen ? <XCircle size={15} className="shrink-0 text-red-500" /> : <span className="shrink-0 font-black text-slate-400">{String.fromCharCode(65 + j)}.</span>}
                      {opt}
                    </button>
                  );
                })}
              </div>
              {sel !== null && <p className="mt-2 rounded-lg bg-slate-50 p-2.5 text-xs leading-relaxed text-slate-600 dark:bg-slate-800 dark:text-slate-300"><b>Explanation:</b> {mq.explanation}</p>}
            </div>
          );
        })}
      </div>

      {chapter.faqs.length > 0 && (
        <section className="mt-8"><h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">FAQs</h2>
          <div className="space-y-3">{chapter.faqs.map((f, i) => <details key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"><summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">{f.q}</summary><p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{f.a}</p></details>)}</div></section>
      )}
      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <Sparkles size={18} className="text-emerald-600" /><p className="flex-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">Want more practice on this chapter? Use Syllab's free Practice Arena.</p>
        <button onClick={() => setTab('practice')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">Practice <ArrowRight size={15} /></button>
      </div>
      {related.length > 0 && (
        <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700"><p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">More {chapter.classLevel} {chapter.subject} MCQs</p>
          <div className="flex flex-wrap gap-2">{related.map((m) => <button key={m.slug} onClick={() => go(`/mcqs/${m.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">{m.chapter}</button>)}</div></nav>
      )}
    </div>
  );
}
