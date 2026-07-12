/**
 * Microlearning — bite-sized 5–10 minute learning modules.
 * Routes:
 *   /micro → Index: grid of all modules
 *   /micro/<slug> → Single module: explanation, example, quick quiz
 *
 * Features:
 * - Mobile-first, snackable cards
 * - Per-module SEO with LearningResource JSON-LD
 * - Progress dots and "Next module" CTA after quiz
 * - Instant feedback on MCQs
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, ChevronRight, Clock, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { cn } from '../lib/utils';
import { MICROLEARNING_MODULES, type MicroModule } from '../data/microlearning/modules';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';

function parsePath(pathname: string): { slug?: string } {
  const parts = pathname.split('/').filter(Boolean); // ['micro', 'slug?']
  return { slug: parts[1] };
}

export default function Microlearning() {
  const [ready, setReady] = useState(false);
  const [path, setPath] = useState(usePathname());

  useEffect(() => {
    setReady(true);
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
    return <div className="mx-auto max-w-5xl px-4 py-16 text-center text-sm font-bold text-slate-400">Loading microlearning modules…</div>;
  }

  const { slug } = parsePath(path);
  const module = slug ? MICROLEARNING_MODULES.find(m => m.slug === slug) : null;

  // Single module view
  if (slug && module) {
    return <ModuleView module={module} goBack={goBack} go={go} />;
  }

  // Index view
  return <MicrolearningIndex go={go} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Index: Grid of all modules
// ─────────────────────────────────────────────────────────────────────────────

interface MicrolearningIndexProps {
  go: (to: string) => void;
}

function MicrolearningIndex({ go }: MicrolearningIndexProps) {
  const subjectColors: Record<string, { bg: string; text: string }> = {
    Maths: { bg: 'bg-blue-100', text: 'text-blue-700' },
    Science: { bg: 'bg-green-100', text: 'text-green-700' },
    Physics: { bg: 'bg-purple-100', text: 'text-purple-700' },
    Chemistry: { bg: 'bg-orange-100', text: 'text-orange-700' },
    Biology: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    English: { bg: 'bg-red-100', text: 'text-red-700' },
    History: { bg: 'bg-amber-100', text: 'text-amber-700' },
    Geography: { bg: 'bg-cyan-100', text: 'text-cyan-700' },
    GK: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title="Microlearning — 5-Minute Study Modules for CBSE Class 6–12 | Syllab.in"
        description="Quick, bite-sized 5–10 minute learning modules for CBSE NCERT. Learn one concept at a time with instant MCQ feedback. Free for Class 6 to 12."
        keywords="microlearning India, quick study modules, 5 minute lessons, CBSE revision, NCERT quick notes, instant quiz, learn fast free, bite-sized learning, mobile study app, revision cards free"
        url={`${SITE}/micro`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Microlearning Modules',
          description: 'Quick 5–10 minute learning modules for CBSE students',
          url: `${SITE}/micro`,
          isPartOf: { '@type': 'WebSite', name: 'Syllab.in', url: SITE },
        }}
      />
      <PageHero
        emoji="⚡"
        title="Microlearning"
        subtitle="Master one concept in 5–10 minutes. Tight explanation, worked example, instant quiz. Snackable & mobile-friendly."
        className="mb-8"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MICROLEARNING_MODULES.map((m) => {
          const colors = subjectColors[m.subject] || subjectColors.Maths;
          return (
            <motion.button
              key={m.slug}
              onClick={() => go(`/micro/${m.slug}`)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(MICROLEARNING_MODULES.indexOf(m) * 0.03, 0.2) }}
              className="group rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <h3 className="flex-1 text-base font-black text-slate-900">{m.title}</h3>
                <ChevronRight size={16} className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
              </div>

              <div className="mb-3 flex items-center gap-2">
                <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold', colors.bg, colors.text)}>
                  {m.subject}
                </span>
                <span className="text-xs font-semibold text-slate-500">Class {m.classLevel}</span>
              </div>

              <div className="inline-flex items-center gap-1 rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600">
                <Clock size={13} />
                {m.estMinutes} min
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">{m.summary}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Module View: Full lesson with explanation, example, and quiz
// ─────────────────────────────────────────────────────────────────────────────

interface ModuleViewProps {
  module: MicroModule;
  goBack: (parent: string) => void;
  go: (to: string) => void;
}

function ModuleView({ module, goBack, go }: ModuleViewProps) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const url = `${SITE}/micro/${module.slug}`;
  const isQuizComplete = completedQuestions.length === module.quickQuiz.length;
  const currentQuestion = module.quickQuiz[currentQuizIndex];

  const handleSelectAnswer = (optionText: string) => {
    if (!showFeedback) {
      setSelectedAnswer(optionText);
      setShowFeedback(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < module.quickQuiz.length - 1) {
      const newCompleted = [...completedQuestions, currentQuizIndex];
      setCompletedQuestions(newCompleted);
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz complete
      const newCompleted = [...completedQuestions, currentQuizIndex];
      setCompletedQuestions(newCompleted);
    }
  };

  const handleNextModule = () => {
    const currentIndex = MICROLEARNING_MODULES.findIndex(m => m.slug === module.slug);
    const nextModule = MICROLEARNING_MODULES[currentIndex + 1];
    if (nextModule) go(`/micro/${nextModule.slug}`);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title={`${module.title} — ${module.estMinutes} Min Microlearning | Syllab.in`}
        description={`Learn ${module.title.toLowerCase()} in ${module.estMinutes} minutes. Quick explanation, worked example, and instant MCQs. Free revision for Class ${module.classLevel} students.`}
        keywords={`${module.title}, Class ${module.classLevel} ${module.subject}, quick revision, microlearning, CBSE ${module.title}, study ${module.title}, learn ${module.title} fast, ${module.title} explained simply`}
        url={url}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: module.title,
          description: module.summary,
          url,
          inLanguage: 'en-IN',
          isAccessibleForFree: true,
          author: { '@type': 'Organization', name: 'Syllab.in' },
          educationalLevel: `Class ${module.classLevel}`,
          learningResourceType: 'Microlearning Module',
        }}
      />

      <div className="mb-4 flex items-center justify-between gap-2">
        <button
          onClick={() => goBack('/micro')}
          className="inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary transition"
        >
          <ArrowLeft size={14} /> All modules
        </button>
        <div className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
          <Clock size={13} />
          {module.estMinutes} min
        </div>
      </div>

      <PageHero
        emoji="⚡"
        title={module.title}
        subtitle={`Class ${module.classLevel} · ${module.subject} · ${module.quickQuiz.length} quick questions`}
        className="mb-8"
      />

      {/* TL;DR */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 rounded-2xl border-2 border-emerald-100 bg-emerald-50 p-5"
      >
        <p className="text-sm font-bold text-emerald-700">TL;DR</p>
        <p className="mt-2 text-sm leading-relaxed text-emerald-900">{module.summary}</p>
      </motion.div>

      {/* Explanation */}
      {!quizStarted && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6 space-y-4"
          >
            <h2 className="text-lg font-black text-slate-900">Explanation</h2>
            <div className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
              {module.explanation.trim()}
            </div>
          </motion.div>

          {/* Worked Example */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <h3 className="mb-3 text-base font-black text-slate-900">✓ Worked Example</h3>
            <p className="mb-2 text-sm font-bold text-slate-700">{module.example.title}</p>
            <p className="mb-4 text-sm leading-relaxed text-slate-600">{module.example.problem}</p>

            <div className="space-y-2 rounded-lg bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Solution</p>
              <div className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
                {module.example.solution.trim()}
              </div>
            </div>
          </motion.div>

          {/* Start Quiz Button */}
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            onClick={() => setQuizStarted(true)}
            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 text-sm font-black text-white shadow-lg hover:shadow-xl transition-all hover:scale-102"
          >
            <Sparkles size={15} className="mr-2 inline" />
            Test Your Understanding ({module.quickQuiz.length} questions)
          </motion.button>
        </>
      )}

      {/* Quiz */}
      {quizStarted && (
        <AnimatePresence mode="wait">
          {!isQuizComplete ? (
            <motion.div
              key={`q-${currentQuizIndex}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Progress dots */}
              <div className="flex justify-center gap-1.5">
                {module.quickQuiz.map((_, i) => (
                  <motion.div
                    key={i}
                    className={cn(
                      'h-2 rounded-full transition-all',
                      i < currentQuizIndex ? 'w-4 bg-emerald-500' :
                      i === currentQuizIndex ? 'w-6 bg-emerald-400' : 'w-2 bg-slate-200'
                    )}
                  />
                ))}
              </div>

              {/* Question */}
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                  Question {currentQuizIndex + 1} of {module.quickQuiz.length}
                </p>
                <p className="text-base font-bold text-slate-900">{currentQuestion.q}</p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((option, i) => {
                  const isSelected = selectedAnswer === option.text;
                  const isCorrect = option.isCorrect;
                  const showResult = showFeedback;

                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelectAnswer(option.text)}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      disabled={showResult}
                      className={cn(
                        'w-full rounded-xl border-2 p-4 text-left text-sm font-bold transition-all',
                        !showResult && 'cursor-pointer hover:border-primary/50 hover:bg-slate-50',
                        isSelected && showResult && isCorrect && 'border-emerald-300 bg-emerald-50 text-emerald-900',
                        isSelected && showResult && !isCorrect && 'border-red-300 bg-red-50 text-red-900',
                        !isSelected && showResult && isCorrect && 'border-emerald-200 bg-emerald-50 text-emerald-700',
                        !isSelected && !showResult && 'border-slate-200 bg-white text-slate-700',
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span>{option.text}</span>
                        {showResult && isCorrect && <Check size={18} className="text-emerald-600" />}
                        {showResult && isSelected && !isCorrect && <span className="text-lg">✕</span>}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'rounded-xl p-4 text-sm',
                    selectedAnswer === currentQuestion.answer
                      ? 'border border-emerald-200 bg-emerald-50 text-emerald-900'
                      : 'border border-blue-200 bg-blue-50 text-blue-900'
                  )}
                >
                  <p className="font-bold mb-1">
                    {selectedAnswer === currentQuestion.answer ? '✓ Correct!' : 'Explanation'}
                  </p>
                  <p>{currentQuestion.explain}</p>
                </motion.div>
              )}

              {/* Next button */}
              {showFeedback && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleNextQuestion}
                  className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-black text-white hover:bg-slate-800 transition-all"
                >
                  {currentQuizIndex < module.quickQuiz.length - 1 ? 'Next Question' : 'Finish'}
                </motion.button>
              )}
            </motion.div>
          ) : (
            /* Quiz complete */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <Check size={32} className="text-emerald-600" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">Well done!</h3>
                <p className="mt-1 text-sm text-slate-600">
                  You've completed all {module.quickQuiz.length} questions in this module.
                </p>
              </div>

              <div className="space-y-2">
                {MICROLEARNING_MODULES.findIndex(m => m.slug === module.slug) < MICROLEARNING_MODULES.length - 1 ? (
                  <>
                    <button
                      onClick={handleNextModule}
                      className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 text-sm font-black text-white shadow-lg hover:shadow-xl transition-all hover:scale-102"
                    >
                      Next Module
                      <ChevronRight size={15} className="ml-1 inline" />
                    </button>
                    <button
                      onClick={() => goBack('/micro')}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-50 transition-all"
                    >
                      Back to All Modules
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => goBack('/micro')}
                    className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 text-sm font-black text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    Back to All Modules
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
