/**
 * QuestionSolution — universal step-by-step solution for any MCQ, on any surface
 * (Practice Arena, Mock Tests, Daily Challenges, Olympiad, GK, PYQs).
 *
 * - If the question already carries a `solution` (string steps) — e.g. from the
 *   generated bank — it's shown instantly.
 * - Otherwise a "Step-by-step solution" button generates one ON DEMAND via the
 *   free AI tutor, so even backend/static questions with only a 1-line
 *   explanation get full worked steps. This is Syllab's edge: every question,
 *   everywhere, gets a BYJU's-style solution for free.
 */
import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { askTutor } from '../lib/api';

interface Props {
  question: string;
  options?: string[];
  correctIndex?: number;
  explanation?: string;
  solution?: string[];
  subject?: string;
  classLevel?: string;
}

export default function QuestionSolution({ question, options, correctIndex, explanation, solution, subject, classLevel }: Props) {
  const [steps, setSteps] = useState<string[] | null>(solution && solution.length ? solution : null);
  const [loading, setLoading] = useState(false);

  const correctAnswer = options && correctIndex != null && correctIndex >= 0 ? options[correctIndex] : '';

  // Deterministic, offline step-by-step built from the data we already have.
  // Used when the AI tutor is unreachable so the button NEVER shows an error.
  const buildLocalSteps = (): string[] => {
    const out: string[] = [];
    out.push(`Understand what is being asked: "${question.trim()}"`);
    if (options && options.length) {
      out.push(
        `Go through each choice and rule out the ones that don't fit — ${options
          .map((o, i) => `(${String.fromCharCode(65 + i)}) ${o}`)
          .join(', ')}.`,
      );
    }
    if (correctAnswer) out.push(`The correct answer is "${correctAnswer}".`);
    if (explanation && explanation.trim()) out.push(`Why: ${explanation.trim()}`);
    else out.push('Match the key idea in the question to the option that states it most precisely, and confirm the rest are incorrect.');
    return out;
  };

  const generate = async () => {
    setLoading(true);
    const prompt =
      `Give a clear STEP-BY-STEP solution (3-6 short numbered steps) for this ${subject || ''} question` +
      `${classLevel ? ` for a Class ${classLevel} student` : ''}. Teach the reasoning/working to reach the answer — do not just restate it.\n\n` +
      `Question: ${question}\n` +
      `${options && options.length ? `Options: ${options.join(' | ')}\n` : ''}` +
      `${correctAnswer ? `Correct answer: ${correctAnswer}\n` : ''}\n` +
      `Return ONLY the numbered steps, each on its own line.`;
    try {
      const a = await askTutor(prompt);
      const parsed = a.split('\n').map((l) => l.replace(/^\s*\d+[.)\]]\s*/, '').replace(/^[-*]\s*/, '').trim()).filter(Boolean);
      setSteps(parsed.length ? parsed : [a.trim()]);
    } catch {
      // AI tutor unreachable — fall back to locally-built steps. No error shown.
      setSteps(buildLocalSteps());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {explanation ? (
        <div className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-relaxed text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {explanation}
        </div>
      ) : null}

      {steps ? (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 dark:border-slate-700 dark:bg-slate-800/50">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-indigo-500">Step-by-step solution</p>
          <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>
      ) : (
        <button
          type="button"
          onClick={generate}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? <><Loader2 size={14} className="animate-spin" /> Solving…</> : <><Sparkles size={14} /> Step-by-step solution</>}
        </button>
      )}
    </div>
  );
}
