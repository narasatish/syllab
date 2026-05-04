// src/pages/Syllabus.tsx
// -----------------------------------------------------------------------------
// Syllab — Syllabus page
//
// Fixes:
//  • Reads class from ?class=N query param (replaces hardcoded class)
//  • Fetches chapter list from backend (/api/syllabus?class=N)
//  • Each ChapterCard shows its OWN summary — never duplicated across chapters
//  • Lazy-loads concept detail per chapter on click (cached in state)
//  • Loading + error fallbacks so the page never goes blank
// -----------------------------------------------------------------------------

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { BookOpen, ChevronLeft, AlertCircle, Loader2, Sparkles } from "lucide-react";

// ------------------------- API base (Vite-safe) ------------------------------
const API_BASE: string =
  (import.meta as any)?.env?.VITE_API_URL || "https://syllab-backend.onrender.com";

// ------------------------- Types ---------------------------------------------
interface Chapter {
  id?: string;
  name: string;
  subject?: string;
  summary?: string;
  topics?: string[];
}

interface ConceptDetail {
  title: string;
  intro: string;
  keyPoints: string[];
  example: string;
}

// ------------------------- Page ---------------------------------------------
const Syllabus: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Read ?class=N from URL — stable across renders
  const classNum = useMemo(() => {
    const p = new URLSearchParams(location.search);
    const n = parseInt(p.get("class") || "10", 10);
    return Number.isFinite(n) && n >= 5 && n <= 12 ? n : 10;
  }, [location.search]);

  // 2. State
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Per-chapter concept detail cache: key = chapter.name, value = ConceptDetail | "loading" | "error"
  const [concepts, setConcepts] = useState<
    Record<string, ConceptDetail | "loading" | { error: string }>
  >({});
  const [openChapter, setOpenChapter] = useState<string | null>(null);

  // 3. Fetch chapter list whenever class changes
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setChapters([]);
    setConcepts({});
    setOpenChapter(null);

    fetch(`${API_BASE}/api/syllabus?class=${classNum}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`Server returned ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        const list: Chapter[] = Array.isArray(data?.chapters) ? data.chapters : [];
        setChapters(list);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Syllabus fetch failed:", err);
        setError(
          err.message || "Could not load syllabus. Please check your connection."
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [classNum]);

  // 4. Lazy-load concept detail for a single chapter
  const loadConcept = useCallback(
    async (chapter: Chapter) => {
      const key = chapter.name;
      if (concepts[key] && concepts[key] !== "loading") return; // already loaded

      setConcepts((c) => ({ ...c, [key]: "loading" }));

      try {
        const url = new URL(`${API_BASE}/api/concept`);
        url.searchParams.set("class", String(classNum));
        url.searchParams.set("chapter", chapter.name);
        if (chapter.subject) url.searchParams.set("subject", chapter.subject);

        const r = await fetch(url.toString());
        if (!r.ok) throw new Error(`Server returned ${r.status}`);
        const data = await r.json();

        setConcepts((c) => ({
          ...c,
          [key]: {
            title: data.title || chapter.name,
            intro: data.intro || "",
            keyPoints: Array.isArray(data.keyPoints) ? data.keyPoints : [],
            example: data.example || "",
          },
        }));
      } catch (err: any) {
        console.error("Concept fetch failed:", err);
        setConcepts((c) => ({ ...c, [key]: { error: err.message || "Failed to load" } }));
      }
    },
    [classNum, concepts]
  );

  const toggleChapter = (chapter: Chapter) => {
    const key = chapter.name;
    if (openChapter === key) {
      setOpenChapter(null);
    } else {
      setOpenChapter(key);
      loadConcept(chapter);
    }
  };

  // 5. Render
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-5">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
          >
            <ChevronLeft className="h-4 w-4" /> Home
          </button>
          <div className="h-6 w-px bg-slate-300" />
          <BookOpen className="h-6 w-6 text-emerald-600" />
          <h1 className="text-2xl font-bold text-slate-900">Class {classNum} Syllabus</h1>
        </div>

        {/* Class switcher row — keeps deep linking to other classes one click away */}
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-6 pb-5">
          {Array.from({ length: 8 }, (_, i) => i + 5).map((n) => (
            <Link
              key={n}
              to={`/syllabus?class=${n}`}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                n === classNum
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Class {n}
            </Link>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {loading && (
          <div className="flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-16 text-slate-600">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading chapters for Class {classNum}...
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-6 py-12 text-center">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <h3 className="text-lg font-semibold text-red-800">Couldn't load the syllabus</h3>
            <p className="max-w-md text-sm text-red-700">{error}</p>
            <button
              onClick={() => navigate(0)}
              className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && chapters.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center text-slate-600">
            No chapters found for Class {classNum} yet.
          </div>
        )}

        {!loading && !error && chapters.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {chapters.map((chapter, idx) => {
              const key = chapter.name;
              const isOpen = openChapter === key;
              const detail = concepts[key];

              return (
                <article
                  key={`${key}-${idx}`}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  <button
                    onClick={() => toggleChapter(chapter)}
                    className="w-full px-5 py-4 text-left hover:bg-slate-50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
                          {chapter.subject || "Chapter"}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-slate-900">
                          {chapter.name}
                        </h3>
                      </div>
                      <span className="text-xs text-slate-400">#{idx + 1}</span>
                    </div>

                    {/* UNIQUE per-chapter summary from the syllabus document */}
                    {chapter.summary && (
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {chapter.summary}
                      </p>
                    )}
                  </button>

                  {/* Expanded concept panel — fetched per chapter, never duplicated */}
                  {isOpen && (
                    <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
                      {detail === "loading" && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Preparing concept...
                        </div>
                      )}
                      {detail && typeof detail === "object" && "error" in detail && (
                        <p className="text-sm text-red-700">
                          Could not load concept: {detail.error}
                        </p>
                      )}
                      {detail &&
                        typeof detail === "object" &&
                        !("error" in detail) && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-emerald-600" />
                              <h4 className="font-semibold text-slate-900">{detail.title}</h4>
                            </div>
                            {detail.intro && (
                              <p className="text-sm leading-relaxed text-slate-700">
                                {detail.intro}
                              </p>
                            )}
                            {detail.keyPoints?.length > 0 && (
                              <ul className="ml-5 list-disc space-y-1 text-sm text-slate-700">
                                {detail.keyPoints.map((kp, i) => (
                                  <li key={i}>{kp}</li>
                                ))}
                              </ul>
                            )}
                            {detail.example && (
                              <div className="rounded-md bg-white px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200">
                                <strong className="text-emerald-700">Example: </strong>
                                {detail.example}
                              </div>
                            )}
                            <Link
                              to={`/arena?class=${classNum}&chapter=${encodeURIComponent(
                                chapter.name
                              )}`}
                              className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                            >
                              Practice this chapter →
                            </Link>
                          </div>
                        )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Syllabus;
