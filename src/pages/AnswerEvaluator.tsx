/**
 * AnswerEvaluator.tsx — free AI answer checker. A student pastes a question,
 * optional max marks and their written answer; the AI examiner (via
 * evaluateAnswer → /api/tutor) returns a score, strengths, gaps, the key points
 * a full-marks answer needs, and a verdict. Indexable SEO page.
 */
import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import AnswerMarkdown from '../components/AnswerMarkdown';
import { evaluateAnswer } from '../lib/api';

const SITE = 'https://syllab.in';

export default function AnswerEvaluator() {
  const [question, setQuestion] = useState('');
  const [marks, setMarks] = useState('');
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = question.trim().length > 3 && answer.trim().length > 3 && !loading;

  const submit = async () => {
    if (!canSubmit) return;
    setLoading(true); setError(''); setResult('');
    try {
      const m = Number(marks);
      const text = await evaluateAnswer(question, answer, Number.isFinite(m) && m > 0 ? m : undefined);
      if (!text.trim()) setError('The evaluator returned an empty response — please try again.');
      else setResult(text);
    } catch {
      setError('Could not reach the AI examiner right now. Please check your connection and try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title="Free AI Answer Checker & Evaluator | Syllab.in"
        description="Paste any exam question and your answer — our free AI examiner scores it out of your chosen marks and shows what you did well, what's missing, and the key points a full-marks answer needs. For CBSE boards, JEE & NEET."
        keywords="AI answer checker, answer evaluator free, AI exam answer grader, check my answer, board exam answer feedback, model answer checker, AI marking, evaluate my answer online"
        url={`${SITE}/answer-evaluator`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab AI Answer Evaluator', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/answer-evaluator`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}
      />
      <PageHero emoji="✍️" title="AI Answer Evaluator" subtitle="Paste a question and your answer — get an instant examiner-style score, what you did well, what's missing, and the points a full-marks answer needs. Free." className="mb-6" />

      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
        <label className="block">
          <span className="text-xs font-bold text-slate-500">Question</span>
          <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={2} placeholder="e.g. Explain why the sky appears blue. (3 marks)"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" />
        </label>
        <label className="mt-3 block max-w-[10rem]">
          <span className="text-xs font-bold text-slate-500">Max marks (optional)</span>
          <input type="number" inputMode="numeric" value={marks} onChange={(e) => setMarks(e.target.value)} min="1" max="100" placeholder="e.g. 3"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" />
        </label>
        <label className="mt-3 block">
          <span className="text-xs font-bold text-slate-500">Your answer</span>
          <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={6} placeholder="Write or paste your full answer here…"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" />
        </label>
        <button type="button" onClick={submit} disabled={!canSubmit}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-black text-white shadow hover:opacity-90 disabled:opacity-40 transition">
          {loading ? <><Loader2 size={16} className="animate-spin" /> Evaluating…</> : <><Sparkles size={16} /> Evaluate my answer</>}
        </button>
        <p className="mt-2 text-[11px] text-slate-400">AI feedback is a study aid and can occasionally be imperfect — treat it as guidance, not the final board score.</p>
      </div>

      {error && (
        <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-700">{error}</div>
      )}

      {result && (
        <div className="mt-5 rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
          <h2 className="mb-2 flex items-center gap-1.5 text-sm font-black text-slate-900 dark:text-slate-100"><Sparkles size={15} className="text-primary" /> Examiner feedback</h2>
          <AnswerMarkdown text={result} />
        </div>
      )}

      {!result && !loading && (
        <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">How the AI answer checker helps</h2>
          <p>Writing practice only improves you if someone tells you what to fix. Paste any board, JEE or NEET question and your written answer, and the AI examiner grades it the way a teacher would — a score out of your chosen marks, what you did well, what is missing or wrong, and the exact points a full-marks answer needs. Use it to sharpen theory answers, definitions, derivations and long-form responses before the real exam.</p>
          <p>It is free and needs no sign-up. Pair it with free <a href="/pyqs" className="font-bold text-primary hover:underline">previous-year questions</a>, <a href="/mock-tests" className="font-bold text-primary hover:underline">mock tests</a> and the <a href="/study-planner" className="font-bold text-primary hover:underline">study planner</a>.</p>
        </section>
      )}
    </div>
  );
}
