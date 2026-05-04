// src/pages/Home.tsx
// -----------------------------------------------------------------------------
// Syllab — Home page (minimal version)
// • Doesn't override the global nav/layout
// • Single focused section: pick your class (5-12, dynamic)
// • Clean, light, professional — no oversized hero
// -----------------------------------------------------------------------------

import React from "react";
import { useNavigate } from "react-router-dom";

// Dynamic class list — single source of truth
const CLASSES = Array.from({ length: 8 }, (_, i) => i + 5); // [5..12]

const Home: React.FC = () => {
  const navigate = useNavigate();

  const goToClass = (cls: number) => {
    navigate(`/syllabus?class=${cls}`);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      {/* Compact intro */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Welcome to Syllab
        </h1>
        <p className="mt-3 text-base text-slate-600 md:text-lg">
          Pick your class to explore the NCERT-aligned syllabus, concepts, and practice questions.
        </p>
      </header>

      {/* Class picker */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Pick your class
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8">
          {CLASSES.map((cls) => (
            <button
              key={cls}
              type="button"
              onClick={() => goToClass(cls)}
              aria-label={`Go to Class ${cls} syllabus`}
              className="group flex aspect-square flex-col items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 group-hover:text-emerald-600">
                Class
              </span>
              <span className="mt-0.5 text-3xl font-bold leading-none">{cls}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
