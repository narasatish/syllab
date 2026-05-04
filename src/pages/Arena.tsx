// src/pages/Arena.tsx
// -----------------------------------------------------------------------------
// Syllab — Practice Arena
//
// Fixes:
//  • Reads ?class= and ?chapter= query params for direct linking from Syllabus
//  • Calls POST /api/questions/batch using VITE_API_URL
//  • Loading spinner + error banner — never a blank screen
//  • Falls back to a friendly empty state if the AI returns nothing
//  • Tracks correct/wrong per question; shows score + explanation at the end
// -----------------------------------------------------------------------------

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Trophy,
  ChevronLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from "lucide-react";

// ------------------------- API base (Vite-safe) ------------------------------
const API_BASE: string =
  (import.meta as any)?.env?.VITE_API_URL || "https://syllab-backend.onrender.com";

// ------------------------- Types ---------------------------------------------
interface MCQ {
  q: string;
  options: string[];
  correct: number;
  explanation?: string;
}

type LoadState = "idle" | "loading" | "ready" | "error";

// ------------------------- Page ---------------------------------------------
const Arena: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const initialClass = useMemo(() => {
    const n = parseInt(params.get("class") || "10", 10);
    return Number.isFinite(n) && n >= 1 && n <= 12 ? n : 10;
  }, [params]);
  const initialChapter = params.get("chapter") || "";

  // Form state
  const [classNum, setClassNum] = useState<number>(initialClass);
  const [chapter, setChapter] = useState<string>(initialChapter);
  const [count, setCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");

  // Quiz state
  const [state, setState] = useState<LoadState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [questions, setQuestions] = useState<MCQ[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]); // chosen index per question
  const [showResult, setShowResult] = useState<boolean>(false);

  // Auto-start when ?chapter= is in the URL
  useEffect(() => {
    if (initialChapter) {
      void startQuiz(initialClass, initialChapter, 10, "medium");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  const startQuiz = useCallback(
    async (cls: number, chap: string, n: number, diff: "easy" | "medium" | "hard") => {
      if (!chap.trim()) {
        setState("error");
        setErrorMsg("Please enter a chapter name first.");
        return;
      }
      setState("loading");
      setErrorMsg("");
      setQuestions([]);
      setCurrent(0);
      setAnswers([]);
      setShowResult(false);

      try {
        const res = await fetch(`${API_BASE}/api/questions/batch`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ classNum: cls, chapter: chap, count: n, difficulty: diff }),
        });

        if (!res.ok) {
          const body = await res.text().catch(() => "");
          throw new Error(`Server returned ${res.status}. ${body.slice(0, 200)}`);
        }

        const data = await res.json();
        const list: MCQ[] = Array.isArray(data?.questions) ? data.questions : [];

        if (list.length === 0) {
          throw new Error("The server didn't return any questions for this chapter.");
        }

        setQuestions(list);
        setState("ready");
      } catch (err: any) {
        console.error("Arena fetch failed:", err);
        setErrorMsg(err.message || "Could not load questions. Please try again.");
        setState("error");
      }
    },
    []
  );

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    void startQuiz(classNum, chapter, count, difficulty);
  };

  const handleAnswer = (chosen: number) => {
    if (answers[current] !== undefined) return; // already answered
    const next = [...answers];
    next[current] = chosen;
    setAnswers(next);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setShowResult(true);
    }
  };

  const score = answers.reduce(
    (s, a, i) => (a === questions[i]?.correct ? s + 1 : s),
    0
  );

  // ----------------------- Render -------------------------------------------
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-5">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
          >
            <ChevronLeft className="h-4 w-4" /> Home
          </button>
          <div className="h-6 w-px bg-slate-300" />
          <Trophy className="h-6 w-6 text-emerald-600" />
          <h1 className="text-2xl font-bold text-slate-900">Practice Arena</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* ---------------- Setup form (shown when idle or error) ---------------- */}
        {(state === "idle" || state === "error") && (
          <>
            <form
              onSubmit={handleStart}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2"
            >
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Class</span>
                <select
                  value={classNum}
                  onChange={(e) => setClassNum(parseInt(e.target.value, 10))}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      Class {n}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Chapter</span>
                <input
                  type="text"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  placeholder="e.g. Light – Reflection and Refraction"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Number of questions</span>
                <select
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value, 10))}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  {[5, 10, 15, 20, 25, 30].map((n) => (
                    <option key={n} value={n}>
                      {n} questions
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Difficulty</span>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </label>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  Start practice
                </button>
              </div>
            </form>

            {state === "error" && (
              <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
                <div className="text-sm">
                  <p className="font-medium text-red-800">Couldn't load questions</p>
                  <p className="mt-1 text-red-700">{errorMsg}</p>
                  <p className="mt-2 text-red-700/80">
                    Tip: the backend may be cold-starting (Render free tier sleeps
                    after inactivity). Wait ~30 seconds and try again, or check{" "}
                    <Link
                      to="/"
                      className="underline"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(`${API_BASE}/api/version`, "_blank");
                      }}
                    >
                      the API status
                    </Link>
                    .
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* ---------------- Loading ---------------- */}
        {state === "loading" && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-20 text-slate-600 shadow-sm">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="font-medium">Generating {count} questions for {chapter}...</p>
            <p className="text-sm text-slate-500">This usually takes 5–10 seconds.</p>
          </div>
        )}

        {/* ---------------- Quiz ---------------- */}
        {state === "ready" && !showResult && questions[current] && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
              <span>
                Question {current + 1} of {questions.length}
              </span>
              <span>Class {classNum} · {chapter}</span>
            </div>

            <h2 className="text-lg font-semibold text-slate-900">{questions[current].q}</h2>

            <div className="mt-5 space-y-2">
              {questions[current].options.map((opt, i) => {
                const chosen = answers[current];
                const isChosen = chosen === i;
                const isCorrect = i === questions[current].correct;
                const answered = chosen !== undefined;

                let style = "border-slate-200 bg-white hover:bg-slate-50";
                if (answered) {
                  if (isCorrect) style = "border-emerald-500 bg-emerald-50";
                  else if (isChosen) style = "border-red-500 bg-red-50";
                  else style = "border-slate-200 bg-white opacity-60";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}
                    className={`flex w-full items-center justify-between rounded-lg border-2 px-4 py-3 text-left text-sm transition ${style}`}
                  >
                    <span>{opt}</span>
                    {answered && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                    {answered && isChosen && !isCorrect && <XCircle className="h-5 w-5 text-red-600" />}
                  </button>
                );
              })}
            </div>

            {answers[current] !== undefined && questions[current].explanation && (
              <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-200">
                <strong className="text-slate-900">Explanation: </strong>
                {questions[current].explanation}
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <button
                onClick={handleNext}
                disabled={answers[current] === undefined}
                className="rounded-lg bg-emerald-600 px-5 py-2 font-medium text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {current < questions.length - 1 ? "Next" : "Finish"}
              </button>
            </div>
          </div>
        )}

        {/* ---------------- Result ---------------- */}
        {state === "ready" && showResult && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <Trophy className="mx-auto h-12 w-12 text-emerald-600" />
            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              You scored {score} / {questions.length}
            </h2>
            <p className="mt-2 text-slate-600">
              {score === questions.length
                ? "Perfect run! Try a harder difficulty next."
                : score >= questions.length * 0.7
                ? "Strong work — review the missed ones and you're set."
                : "Keep practicing — review each explanation carefully."}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => startQuiz(classNum, chapter, count, difficulty)}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white shadow-sm hover:bg-emerald-700"
              >
                <RefreshCw className="h-4 w-4" /> Try again
              </button>
              <button
                onClick={() => {
                  setState("idle");
                  setShowResult(false);
                  setQuestions([]);
                  setAnswers([]);
                  setCurrent(0);
                }}
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
              >
                Pick another chapter
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Arena;
