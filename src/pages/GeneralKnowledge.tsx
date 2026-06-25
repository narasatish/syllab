import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Clock, Zap, ChevronDown, Trophy, BarChart3, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';
import SEO from '../components/SEO';
import { GK_QUESTIONS, getDailyGKQuiz, getQuestionsByCategory, GKItem } from '../data/generalKnowledge';
import FunFactCarousel from '../components/FunFactCarousel';

type ViewMode = 'daily' | 'practice';
type CategoryType = 'history' | 'geography' | 'polity' | 'static' | 'current-affairs' | 'science';

/** How many questions per practice set */
const SET_SIZE = 10;

/** localStorage key for tracking seen question IDs per category */
const LS_SEEN_KEY = 'syllab_gk_seen_v1';

interface QuizSession {
  questions: GKItem[];
  currentIndex: number;
  selectedAnswers: (number | null)[];
  submitted: boolean;
}

/** Read the set of seen question IDs from localStorage. Defensive. */
function readSeenIds(): Set<string> {
  try {
    const raw = localStorage.getItem(LS_SEEN_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

/** Persist the set back to localStorage. */
function writeSeenIds(seen: Set<string>) {
  try {
    localStorage.setItem(LS_SEEN_KEY, JSON.stringify(Array.from(seen)));
  } catch {
    /* ignore quota errors */
  }
}

/** Pick N random items from an array, no repeats. */
function sampleN<T>(arr: T[], n: number): T[] {
  if (arr.length <= n) return [...arr].sort(() => Math.random() - 0.5);
  const copy = [...arr];
  const result: T[] = [];
  for (let i = 0; i < n && copy.length > 0; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

/**
 * Generate a fresh set of questions from a category, avoiding any IDs the
 * user has seen before. If everything has been seen, reset that category's
 * seen set and return a fresh sample (so the experience never feels stuck).
 *
 * Returns the new set AND the updated seen set (caller decides when to persist).
 */
function generateSet(category: CategoryType, currentSeen: Set<string>): { set: GKItem[]; newSeen: Set<string> } {
  const all = getQuestionsByCategory(category);
  const unseen = all.filter((q) => !currentSeen.has(q.id));

  let chosen: GKItem[];
  let workingSeen = new Set(currentSeen);

  if (unseen.length >= SET_SIZE) {
    chosen = sampleN(unseen, SET_SIZE);
  } else if (unseen.length > 0) {
    // Use all remaining unseen + top up from seen pool (reset that category)
    const topUpFrom = all.filter((q) => !unseen.includes(q));
    chosen = [...unseen, ...sampleN(topUpFrom, SET_SIZE - unseen.length)];
    // Reset this category's seen markers
    for (const q of all) workingSeen.delete(q.id);
  } else {
    // Everything seen — reset and start fresh
    for (const q of all) workingSeen.delete(q.id);
    chosen = sampleN(all, SET_SIZE);
  }

  // Mark the newly-shown questions as seen
  chosen.forEach((q) => workingSeen.add(q.id));
  return { set: chosen, newSeen: workingSeen };
}

interface ScoreData {
  totalQuizzes: number;
  totalCorrect: number;
  totalXPEarned: number;
  categoryScores: Record<CategoryType, { correct: number; total: number }>;
}

const CATEGORY_ICONS: Record<CategoryType, string> = {
  history: '📚',
  geography: '🗺️',
  polity: '⚖️',
  static: '🎓',
  'current-affairs': '📰',
  science: '🔬',
};

const CATEGORY_LABELS: Record<CategoryType, string> = {
  history: 'Indian History',
  geography: 'Geography',
  polity: 'Polity & Constitution',
  static: 'Static GK',
  'current-affairs': 'Current Affairs 2025-26',
  science: 'Science & Discovery',
};

export default function GeneralKnowledgePage({ setTab }: { setTab?: (tab: string) => void }) {
  const [viewMode, setViewMode] = useState<ViewMode>('daily');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [quiz, setQuiz] = useState<QuizSession | null>(null);
  // Tracks IDs the user has already practiced (across sessions) so "Generate new set"
  // can hand back genuinely fresh questions until everything's been seen.
  const [seenIds, setSeenIds] = useState<Set<string>>(() => readSeenIds());
  const [scores, setScores] = useState<ScoreData>(() => {
    try {
      const stored = localStorage.getItem('syllab_gk_scores');
      return stored ? JSON.parse(stored) : {
        totalQuizzes: 0,
        totalCorrect: 0,
        totalXPEarned: 0,
        categoryScores: {
          history: { correct: 0, total: 0 },
          geography: { correct: 0, total: 0 },
          polity: { correct: 0, total: 0 },
          static: { correct: 0, total: 0 },
          'current-affairs': { correct: 0, total: 0 },
          science: { correct: 0, total: 0 },
        },
      };
    } catch {
      return {
        totalQuizzes: 0,
        totalCorrect: 0,
        totalXPEarned: 0,
        categoryScores: {
          history: { correct: 0, total: 0 },
          geography: { correct: 0, total: 0 },
          polity: { correct: 0, total: 0 },
          static: { correct: 0, total: 0 },
          'current-affairs': { correct: 0, total: 0 },
          science: { correct: 0, total: 0 },
        },
      };
    }
  });

  const startDailyQuiz = () => {
    const questions = getDailyGKQuiz();
    setQuiz({
      questions,
      currentIndex: 0,
      selectedAnswers: new Array(questions.length).fill(null),
      submitted: false,
    });
    setViewMode('daily');
  };

  const startCategoryQuiz = (category: CategoryType) => {
    const all = getQuestionsByCategory(category);
    if (all.length === 0) {
      alert('No questions available for this category');
      return;
    }
    const { set, newSeen } = generateSet(category, seenIds);
    setSeenIds(newSeen);
    writeSeenIds(newSeen);
    setSelectedCategory(category);
    setQuiz({
      questions: set,
      currentIndex: 0,
      selectedAnswers: new Array(set.length).fill(null),
      submitted: false,
    });
    setViewMode('practice');
  };

  /** "Generate new set" — replaces current quiz with fresh non-repeating questions. */
  const generateNewSet = () => {
    if (!selectedCategory) return;
    const { set, newSeen } = generateSet(selectedCategory, seenIds);
    setSeenIds(newSeen);
    writeSeenIds(newSeen);
    setQuiz({
      questions: set,
      currentIndex: 0,
      selectedAnswers: new Array(set.length).fill(null),
      submitted: false,
    });
  };

  const handleSelectAnswer = (index: number) => {
    if (!quiz || quiz.submitted) return;
    const updated = [...quiz.selectedAnswers];
    updated[quiz.currentIndex] = index;
    setQuiz({ ...quiz, selectedAnswers: updated });
  };

  const handleSubmit = () => {
    if (!quiz) return;

    // Calculate results
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (quiz.selectedAnswers[i] === q.correctIndex) {
        correct++;
      }
    });

    const category = quiz.questions[0].category;
    const xpEarned = correct * 10; // 10 XP per correct answer

    // Update scores
    const newScores = { ...scores };
    newScores.totalQuizzes += 1;
    newScores.totalCorrect += correct;
    newScores.totalXPEarned += xpEarned;
    newScores.categoryScores[category].correct += correct;
    newScores.categoryScores[category].total += quiz.questions.length;

    setScores(newScores);
    try {
      localStorage.setItem('syllab_gk_scores', JSON.stringify(newScores));
    } catch {
      /* ignore */
    }

    setQuiz({ ...quiz, submitted: true });
  };

  const handleNext = () => {
    if (!quiz || quiz.currentIndex >= quiz.questions.length - 1) return;
    setQuiz({ ...quiz, currentIndex: quiz.currentIndex + 1 });
  };

  const handlePrev = () => {
    if (!quiz || quiz.currentIndex <= 0) return;
    setQuiz({ ...quiz, currentIndex: quiz.currentIndex - 1 });
  };

  const closeQuiz = () => {
    setQuiz(null);
    setSelectedCategory(null);
  };

  if (quiz) {
    const q = quiz.questions[quiz.currentIndex];
    const selectedAnswer = quiz.selectedAnswers[quiz.currentIndex];
    const isAnswerCorrect = selectedAnswer === q.correctIndex;
    const progress = ((quiz.currentIndex + 1) / quiz.questions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto">
        <SEO
          title="General Knowledge Quiz | GK Questions for Indian Students | Syllab.in"
          description="Practice Indian GK with 200+ questions on history, geography, polity, current affairs, science. Free daily GK quiz for Class 5-12 students."
          keywords="GK questions India, general knowledge MCQ free, Indian history MCQ, current affairs 2026, GK quiz Class 8 9 10, CBSE GK questions, competitive exam GK"
          url="https://syllab.in/gk-quiz"
        />

        <div className="mb-8">
          <button
            onClick={closeQuiz}
            className="mb-6 text-sm font-black text-slate-500 hover:text-slate-700 flex items-center gap-2"
          >
            ← Back to GK Hub
          </button>

          <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 mb-6">
            <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
              <div className="min-w-0">
                <h2 className="text-xl font-black text-slate-900">
                  {viewMode === 'daily' ? '📅 Daily GK Challenge' : `🎯 ${CATEGORY_LABELS[selectedCategory!]}`}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Question {quiz.currentIndex + 1} of {quiz.questions.length}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {viewMode === 'practice' && selectedCategory && (
                  <button
                    type="button"
                    onClick={generateNewSet}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 px-4 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                    title="Generate a fresh set of questions — no repeats from what you've seen"
                  >
                    <RefreshCw size={14} />
                    Generate new set
                  </button>
                )}
                <div className="text-right">
                  <div className="text-2xl font-black text-primary">{progress.toFixed(0)}%</div>
                  <div className="text-xs text-slate-500 font-bold">Complete</div>
                </div>
              </div>
            </div>

            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            {viewMode === 'practice' && selectedCategory && (() => {
              const total = getQuestionsByCategory(selectedCategory).length;
              const seenInCat = getQuestionsByCategory(selectedCategory).filter(q => seenIds.has(q.id)).length;
              return (
                <p className="mt-3 text-xs font-medium text-slate-500">
                  You've practiced <span className="font-black text-slate-700">{seenInCat}</span> of {total} {CATEGORY_LABELS[selectedCategory]} questions.
                  {seenInCat >= total && ' Pool will reset on next "Generate new set".'}
                </p>
              );
            })()}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50">
            <h3 className="text-lg font-black text-slate-900 mb-6">{q.question}</h3>

            <div className="space-y-3 mb-8">
              {q.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={quiz.submitted}
                  className={cn(
                    'w-full p-4 rounded-2xl border-2 text-left font-bold transition-all',
                    selectedAnswer === idx
                      ? 'border-primary bg-emerald-50'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300',
                    quiz.submitted && idx === q.correctIndex && 'border-emerald-400 bg-emerald-100',
                    quiz.submitted && selectedAnswer === idx && idx !== q.correctIndex && 'border-rose-400 bg-rose-100',
                    quiz.submitted && 'cursor-not-allowed',
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-6 h-6 rounded-full border-2 flex items-center justify-center font-black text-sm',
                        selectedAnswer === idx ? 'border-primary bg-primary text-white' : 'border-slate-300',
                      )}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {quiz.submitted && (
              <div
                className={cn(
                  'p-4 rounded-2xl mb-8',
                  isAnswerCorrect
                    ? 'bg-emerald-50 border border-emerald-200'
                    : 'bg-rose-50 border border-rose-200',
                )}
              >
                <div className={cn('font-black mb-2', isAnswerCorrect ? 'text-emerald-700' : 'text-rose-700')}>
                  {isAnswerCorrect ? '✓ Correct!' : '✗ Incorrect'}
                </div>
                <p className={cn('text-sm', isAnswerCorrect ? 'text-emerald-600' : 'text-rose-600')}>
                  {q.explanation}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handlePrev}
                disabled={quiz.currentIndex === 0}
                className="px-6 py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              {!quiz.submitted ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-emerald-600 transition-all"
                >
                  Submit Answers
                </button>
              ) : (
                quiz.currentIndex === quiz.questions.length - 1 && (
                  <button
                    onClick={closeQuiz}
                    className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-emerald-600 transition-all"
                  >
                    View Results
                  </button>
                )
              )}

              <button
                onClick={handleNext}
                disabled={quiz.currentIndex >= quiz.questions.length - 1}
                className="px-6 py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalAccuracy =
    scores.totalQuizzes > 0
      ? Math.round((scores.totalCorrect / (scores.totalQuizzes * 10)) * 100)
      : 0;

  return (
    <div className="max-w-6xl mx-auto">
      <SEO
        title="General Knowledge Quiz | GK Questions for Indian Students | Syllab.in"
        description="Practice Indian GK with 200+ questions on history, geography, polity, current affairs, science. Free daily GK quiz for Class 5-12 students."
        keywords="GK questions India, general knowledge MCQ free, Indian history MCQ, current affairs 2026, GK quiz Class 8 9 10, CBSE GK questions, competitive exam GK"
        url="https://syllab.in/gk-quiz"
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20">
            🧠
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900">General Knowledge Hub</h1>
            <p className="text-slate-600 font-bold mt-1">180+ GK questions + curious facts for Class 5-12</p>
          </div>
        </div>
      </div>

      {/* Fun Facts Carousel — auto-rotating animated cards to spark curiosity */}
      <FunFactCarousel />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl p-6 shadow-lg shadow-emerald-500/10">
          <div className="flex items-center gap-3 mb-2">
            <Trophy size={20} className="text-emerald-600" />
            <span className="text-sm font-bold text-slate-600">Quizzes Taken</span>
          </div>
          <div className="text-3xl font-black text-emerald-700">{scores.totalQuizzes}</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 shadow-lg shadow-blue-500/10">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle size={20} className="text-blue-600" />
            <span className="text-sm font-bold text-slate-600">Correct Answers</span>
          </div>
          <div className="text-3xl font-black text-blue-700">{scores.totalCorrect}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6 shadow-lg shadow-purple-500/10">
          <div className="flex items-center gap-3 mb-2">
            <Zap size={20} className="text-purple-600" />
            <span className="text-sm font-bold text-slate-600">XP Earned</span>
          </div>
          <div className="text-3xl font-black text-purple-700">{scores.totalXPEarned}</div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-6 shadow-lg shadow-amber-500/10">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 size={20} className="text-amber-600" />
            <span className="text-sm font-bold text-slate-600">Accuracy</span>
          </div>
          <div className="text-3xl font-black text-amber-700">{totalAccuracy}%</div>
        </div>
      </div>

      {/* Daily Challenge */}
      <div className="mb-10">
        <div className="bg-gradient-to-r from-primary to-emerald-500 text-white rounded-2xl p-8 shadow-xl shadow-emerald-500/20">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Clock size={24} />
                <h2 className="text-2xl font-black">Daily GK Challenge</h2>
              </div>
              <p className="text-emerald-100 font-bold mb-6 max-w-2xl">
                10 random GK questions from all categories. Same questions for all students every day. Complete your daily streak and earn 100 XP!
              </p>
              <button
                onClick={startDailyQuiz}
                className="px-8 py-4 bg-white text-primary font-black rounded-xl hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl"
              >
                Start Daily Quiz →
              </button>
            </div>
            <div className="text-6xl">📅</div>
          </div>
        </div>
      </div>

      {/* Category Selector */}
      <div className="mb-10">
        <h2 className="text-2xl font-black text-slate-900 mb-6">Practice by Category</h2>
        <p className="text-sm font-medium text-slate-500 mb-6">
          Each set has {SET_SIZE} random questions. Click "Generate new set" inside a quiz to get fresh non-repeating questions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(Object.keys(CATEGORY_LABELS) as CategoryType[]).map((category) => {
            const categoryScore = scores.categoryScores[category];
            const accuracy =
              categoryScore.total > 0
                ? Math.round((categoryScore.correct / categoryScore.total) * 100)
                : 0;
            const catQuestions = getQuestionsByCategory(category);
            const totalInCategory = catQuestions.length;
            const seenInCategory = catQuestions.filter(q => seenIds.has(q.id)).length;

            return (
              <button
                key={category}
                onClick={() => startCategoryQuiz(category)}
                className="group bg-white border-2 border-slate-200 rounded-2xl p-6 hover:border-primary hover:shadow-xl hover:shadow-emerald-500/10 transition-all text-left"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{CATEGORY_ICONS[category]}</div>
                  {categoryScore.total > 0 && (
                    <div className="bg-emerald-50 px-3 py-1 rounded-lg">
                      <div className="text-sm font-black text-emerald-700">{accuracy}%</div>
                    </div>
                  )}
                </div>
                <h3 className="font-black text-slate-900 text-lg group-hover:text-primary transition-colors">
                  {CATEGORY_LABELS[category]}
                </h3>
                <p className="text-sm text-slate-600 font-bold mt-2">
                  {categoryScore.total > 0
                    ? `${categoryScore.correct}/${categoryScore.total} correct`
                    : 'Not attempted'}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-500">
                  <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${totalInCategory ? (seenInCategory / totalInCategory) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="shrink-0">{seenInCategory}/{totalInCategory}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Descriptions */}
      <div className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50">
        <h2 className="text-2xl font-black text-slate-900 mb-8">What You'll Learn</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-black text-slate-900 mb-4">
              <span>📚</span> Indian History
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Freedom struggle, Mughal empire, dynasties, important dates, freedom fighters, revolts of 1857 and independence movement.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-black text-slate-900 mb-4">
              <span>🗺️</span> Geography
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              States and capitals, rivers and mountains, deserts, climate zones, landmarks, and geographical features of India.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-black text-slate-900 mb-4">
              <span>⚖️</span> Polity & Constitution
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Indian Constitution, Fundamental Rights, government structure, Parliament, President, PM, and democratic principles.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-black text-slate-900 mb-4">
              <span>🎓</span> Static GK
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              National symbols, awards, inventions, famous personalities, currency, sports, and significant discoveries worldwide.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-black text-slate-900 mb-4">
              <span>📰</span> Current Affairs 2025-26
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Olympics 2024, space missions, ISRO achievements, government initiatives, important events, and recent developments.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-black text-slate-900 mb-4">
              <span>🔬</span> Science & Discovery
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Scientists, theories, units of measurement, chemistry, physics, biology, and scientific discoveries.
            </p>
          </div>
        </div>
      </div>

      {/* GK Facts & Biographies — merged in from the former standalone GK Facts page.
          Routes (/gk-facts and /gk-facts/*) stay live; this is the in-hub entry point. */}
      <div className="mt-8 bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50">
        <h2 className="text-2xl font-black text-slate-900 mb-2">GK Facts &amp; Biographies</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          Beyond the quiz, explore detailed static GK reference lists (countries &amp; capitals, important days,
          rivers, awards, national symbols and more) plus biographies of scientists, freedom fighters and leaders.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setTab?.('static_gk')}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition-all hover:border-emerald-300 hover:bg-emerald-50"
          >
            <span className="text-2xl">🎓</span>
            <span>
              <span className="block text-base font-black text-slate-900">Static GK Topics</span>
              <span className="block text-xs font-semibold text-slate-500">Capitals, days, symbols, awards, geography &amp; more</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => setTab?.('static_gk')}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition-all hover:border-emerald-300 hover:bg-emerald-50"
          >
            <span className="text-2xl">👤</span>
            <span>
              <span className="block text-base font-black text-slate-900">Biographies</span>
              <span className="block text-xs font-semibold text-slate-500">Kalam, Gandhi, Ramanujan, Einstein &amp; many more</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
