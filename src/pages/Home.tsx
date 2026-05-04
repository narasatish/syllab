// src/pages/Home.tsx
// -----------------------------------------------------------------------------
// Syllab — Home page
// • Dynamic class buttons (1..12) generated in a loop — no more hardcoded list
// • Each button navigates to /syllabus?class=N (real React Router navigation)
// • Existing hero / CTA / feature sections kept; only the class grid is rebuilt
// -----------------------------------------------------------------------------

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Sparkles,
  Bot,
  ScanLine,
  Trophy,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

// Generate classes dynamically — fixes the "static class buttons" bug
const CLASSES = Array.from({ length: 8 }, (_, i) => i + 5);
const FEATURES = [
  {
    icon: Bot,
    title: "AI Tutor",
    desc: "Ask any question, get an explanation in plain English — 24/7.",
  },
  {
    icon: ScanLine,
    title: "Scan & Solve",
    desc: "Snap a photo of a problem and get a step-by-step walkthrough.",
  },
  {
    icon: Trophy,
    title: "Practice Arena",
    desc: "Unlimited MCQs per chapter, with weak-area tracking.",
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  const goToClass = (cls: number) => {
    navigate(`/syllabus?class=${cls}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      {/* ---------------- Hero ---------------- */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-emerald-700 shadow-sm">
          <Sparkles className="h-4 w-4" /> NCERT-aligned, CBSE Classes 1–12
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
          Learn smarter with{" "}
          <span className="text-emerald-600">Syllab</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          AI-powered explanations, instant doubt solving, and unlimited practice —
          for every chapter from Class 1 to Class 12.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/syllabus?class=10"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-emerald-700"
          >
            Browse Syllabus <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/arena"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Try Practice Arena
          </Link>
        </div>
      </section>

      {/* ---------------- Class Picker (DYNAMIC) ---------------- */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-6 w-6 text-emerald-600" />
          <h2 className="text-2xl font-bold text-slate-900">Pick your class</h2>
        </div>
        <p className="mt-2 text-slate-600">
          Tap any class to jump straight to its chapters and concepts.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
          {CLASSES.map((cls) => (
            <button
              key={cls}
              type="button"
              onClick={() => goToClass(cls)}
              aria-label={`Go to Class ${cls} syllabus`}
              className="group flex aspect-square flex-col items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <span className="text-xs uppercase tracking-wide text-slate-500 group-hover:text-emerald-600">
                Class
              </span>
              <span className="text-2xl font-bold md:text-3xl">{cls}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-bold text-slate-900">Everything you need</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
