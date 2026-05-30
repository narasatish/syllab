/**
 * PyqPractice — self-contained "PYQ-style" practice papers.
 * Generates ORIGINAL pattern-matched papers (legal, watermarked syllab.in),
 * runs an inline quiz, shows score + text solutions with read-aloud.
 */

import React, { useState } from 'react';
import { Volume2, ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';
import { generateQuestions, MCQ } from '../lib/api';
import { PYQ_EXAMS, PyqExam } from '../data/pyqExams';
import { recordLearningActivity } from '../lib/progressTracker';

interface Props { currentUser?: { uid: string } | null; }

type Q = MCQ & { subject: string };

function say(text: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/[*`#_]/g, ''));
  u.lang = 'en-IN'; u.rate = 0.95;
  window.speechSynthesis.speak(u);
}

export default function PyqPractice({ currentUser }: Props) {
  const [exam, setExam] = useState<PyqExam | null>(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Q[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startExam = async (e: PyqExam) => {
    setExam(e); setLoading(true); setError(null);
    setQuestions([]); setAnswers({}); setSubmitted(false);
    try {
      const all: Q[] = [];
      for (const sec of e.sections) {
        const res = await generateQuestions({
          classLevel: e.classLevel, subject: sec.subject,
          chapter: sec.topic, difficulty: e.difficulty, count: sec.count,
        });
        for (const q of res.questions || []) all.push({ ...q, subject: sec.subject });
      }
      if (!all.length) throw new Error('Could not generate the paper. Please try again.');
      setQuestions(all);
    } catch (err) {
      setError((err as Error)?.message || 'Generation failed. The AI server may be warming up — try again.');
    } finally {
      setLoading(false);
    }
  };

  const submit = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const score = questions.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);
    if (currentUser?.uid) {
      void recordLearningActivity({
        uid: currentUser.uid, type: 'mock_test', title: `${exam?.name} — PYQ-style paper`,
        subject: 'PYQ', classLevel: exam?.classLevel, score, total: questions.length,
        xpGained: score * 3, sourceId: exam?.id,
      });
    }
  };

  const reset = () => { setExam(null); setQuestions([]); setAnswers({}); setSubmitted(false); setError(null); };

  /* ── Exam picker ──────────────────────────────────────────────────────── */
  if (!exam) {
    return (
      <div>
        <div className="mb-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs text-emerald-800">
          📝 <strong>PYQ-style practice:</strong> original papers that match each exam's pattern, difficulty & topics —
          freshly generated, with solutions. (For the actual past papers, use the official link on each card.)
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {PYQ_EXAMS.map(e => (
            <div key={e.id} className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl mb-1">{e.emoji}</div>
                  <h3 className="text-lg font-black text-slate-900">{e.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {e.sections.reduce((n, s) => n + s.count, 0)} questions · {e.sections.map(s => s.subject).join(', ')}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500">{e.note}</p>
              <div className="mt-3 flex items-center gap-2">
                <button onClick={() => startExam(e)}
                  className="rounded-xl bg-primary text-white px-4 py-2.5 text-xs font-black hover:bg-emerald-600 transition-colors">
                  Generate Paper
                </button>
                {e.officialPapers && (
                  <a href={e.officialPapers} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-primary">
                    Official past papers <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── Loading ──────────────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Loader2 size={36} className="animate-spin text-primary mb-4" />
        <p className="font-black text-slate-900">Generating your {exam.name} paper…</p>
        <p className="text-xs text-slate-500 mt-1">Original questions matched to the exam pattern. This can take a few seconds.</p>
        <button onClick={reset} className="mt-4 text-xs font-bold text-slate-400 hover:text-slate-600">← Cancel</button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-rose-600 font-bold mb-4">{error}</p>
        <button onClick={() => startExam(exam)} className="rounded-xl bg-primary text-white px-5 py-2.5 text-sm font-black mr-2">Retry</button>
        <button onClick={reset} className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-black text-slate-600">Back</button>
      </div>
    );
  }

  /* ── Paper ────────────────────────────────────────────────────────────── */
  const score = questions.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={reset} className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-primary">
          <ArrowLeft size={14} /> All papers
        </button>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">syllab.in · PYQ-style</span>
      </div>

      <h2 className="text-xl font-black text-slate-900 mb-1">{exam.name} — Practice Paper</h2>
      <p className="text-xs text-slate-500 mb-5">{questions.length} questions · original, pattern-matched</p>

      {submitted && (
        <div className="mb-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-5 text-white text-center shadow-lg">
          <p className="text-[11px] font-black uppercase tracking-widest text-white/60">Your Score</p>
          <p className="text-4xl font-black mt-1">{score} / {questions.length}</p>
          <p className="text-xs text-white/80 mt-1">{Math.round((score / questions.length) * 100)}% · review the solutions below</p>
        </div>
      )}

      <div className="space-y-5">
        {questions.map((q, i) => {
          const picked = answers[i];
          return (
            <div key={i} className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-slate-900">
                  <span className="text-slate-400 mr-1">Q{i + 1}.</span>{q.question}
                </p>
                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-slate-500">{q.subject}</span>
              </div>
              <div className="mt-3 space-y-2">
                {q.options.map((opt, oi) => {
                  const isPicked = picked === oi;
                  const isCorrect = q.correct === oi;
                  const cls = submitted
                    ? isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : isPicked ? 'bg-rose-50 border-rose-300 text-rose-700'
                      : 'border-slate-100 text-slate-500'
                    : isPicked ? 'bg-primary/10 border-primary/40 text-slate-900' : 'border-slate-150 text-slate-700 hover:border-primary/30';
                  return (
                    <button key={oi} disabled={submitted}
                      onClick={() => setAnswers(a => ({ ...a, [i]: oi }))}
                      className={`block w-full text-left rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${cls}`}>
                      <span className="font-black mr-2">{String.fromCharCode(65 + oi)}.</span>{opt}
                    </button>
                  );
                })}
              </div>
              {submitted && q.explanation && (
                <div className="mt-3 flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2">
                  <button onClick={() => say(`${q.question}. The answer is ${q.options[q.correct]}. ${q.explanation}`)}
                    title="Read solution aloud"
                    className="shrink-0 rounded-lg bg-primary/10 p-1.5 text-primary hover:bg-primary/20">
                    <Volume2 size={14} />
                  </button>
                  <p className="text-xs text-slate-600 leading-relaxed">💡 {q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button onClick={submit}
          className="mt-6 w-full rounded-2xl bg-primary text-white py-3.5 text-sm font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors">
          Submit Paper
        </button>
      ) : (
        <div className="mt-6 flex gap-2">
          <button onClick={() => startExam(exam)} className="flex-1 rounded-2xl bg-slate-900 text-white py-3 text-sm font-black">New Paper</button>
          <button onClick={reset} className="flex-1 rounded-2xl bg-slate-100 text-slate-700 py-3 text-sm font-black">All Exams</button>
        </div>
      )}

      <p className="mt-4 text-center text-[10px] text-slate-400">
        Original practice paper · syllab.in · not a reproduction of any official paper
      </p>
    </div>
  );
}
