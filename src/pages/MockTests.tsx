import React from 'react';
import { BarChart3, BookOpen, CheckCircle2, ChevronLeft, ChevronRight, ClipboardList, Clock, FlaskConical, Home, Medal, Menu, Plus, Share2, Trophy, Users, X, Zap } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { encodeExamConfig } from '../lib/examCode';
import { FIRESTORE_FEATURES_ENABLED } from '../lib/cloudFeatures';
import SEO from '../components/SEO';
import { cn } from '../lib/utils';
import { MockAnswerStatus, MockAttemptQuestion, recordMockAttempt } from '../lib/mockTestAnalytics';
import { recordLearningActivity } from '../lib/progressTracker';
import { recordMasteryResult } from '../lib/mastery';
import { MockPaper, loadMockTest, MockTestLoadError } from '../lib/mockTestLoader';
import { MockTestMeta, getMocksByExam } from '../data/mockTestsList';
import { OLYMPIAD_POOLS, generateRandomExam, type OlympiadQuestion } from '../data/olympiadQuestions';
import { generateQuestions, getMockQuestionExplanation } from '../lib/api';
import FormulaBank from './FormulaBank';
import PyqPractice from '../components/PyqPractice';
import QuestionSolution from '../components/QuestionSolution';
import ShareResultCard from '../components/ShareResultCard';

// Lazy: DiagramLab pulls ~14 per-class diagram data files (~480KB). It only
// renders under the Diagrams tab, so keep it out of the initial MockTests chunk.
const DiagramLab = React.lazy(() => import('./DiagramLab'));

type ExamSection = 'mocks' | 'olympiads' | 'formulas' | 'diagrams' | 'create' | 'live' | 'pyq';

interface OlympiadMeta {
  id: string;
  title: string;
  subtitle: string;
  classes: string;
  subjects: string[];
  difficulty: string;
  icon: string;
  color: string;
}

const OLYMPIAD_LIST: OlympiadMeta[] = [
  { id: 'math-5-6', title: 'Math Olympiad', subtitle: 'Foundation Level', classes: 'Class 5–6', subjects: ['Arithmetic', 'Geometry', 'Patterns'], difficulty: 'Beginner', icon: '🧮', color: 'bg-sky-50 border-sky-200 text-sky-700' },
  { id: 'math-7-8', title: 'Math Olympiad', subtitle: 'Intermediate Level', classes: 'Class 7–8', subjects: ['Algebra', 'Number Theory', 'Combinatorics'], difficulty: 'Intermediate', icon: '📐', color: 'bg-violet-50 border-violet-200 text-violet-700' },
  { id: 'math-9-10', title: 'Math Olympiad', subtitle: 'Advanced Level', classes: 'Class 9–10', subjects: ['Geometry', 'Inequalities', 'Polynomials'], difficulty: 'Advanced', icon: '∞', color: 'bg-rose-50 border-rose-200 text-rose-700' },
  { id: 'ioqm-prep', title: 'IOQM Prep', subtitle: 'Target IOQM / PRMO', classes: 'Class 10–12', subjects: ['Number Theory', 'Combinatorics', 'Geometry', 'Algebra'], difficulty: 'Expert', icon: '🏆', color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { id: 'science-5-8', title: 'Science Olympiad', subtitle: 'Junior Level', classes: 'Class 5–8', subjects: ['Physics', 'Chemistry', 'Biology'], difficulty: 'Beginner', icon: '🔬', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { id: 'science-9-10', title: 'Science Olympiad', subtitle: 'Senior Level', classes: 'Class 9–10', subjects: ['Physics', 'Chemistry', 'Biology'], difficulty: 'Intermediate', icon: '⚗️', color: 'bg-teal-50 border-teal-200 text-teal-700' },
  { id: 'english-olympiad', title: 'English Olympiad', subtitle: 'Language & Logic', classes: 'Class 5–10', subjects: ['Grammar', 'Vocabulary', 'Reading'], difficulty: 'Intermediate', icon: '📖', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
  { id: 'gk-olympiad', title: 'General Knowledge', subtitle: 'Current Affairs & GK', classes: 'Class 6–10', subjects: ['GK', 'Current Affairs', 'Logical Reasoning'], difficulty: 'Beginner', icon: '🌏', color: 'bg-orange-50 border-orange-200 text-orange-700' },
  { id: 'cs-olympiad', title: 'Coding Olympiad', subtitle: 'Computational Thinking', classes: 'Class 7–12', subjects: ['Algorithms', 'Logic', 'Data Structures'], difficulty: 'Intermediate', icon: '💻', color: 'bg-slate-50 border-slate-200 text-slate-700' },
  { id: 'isi-cmi-prep', title: 'ISI / CMI Prep', subtitle: 'Full Math Mastery', classes: 'Class 11–12', subjects: ['Analysis', 'Group Theory', 'Combinatorics'], difficulty: 'Expert', icon: '🎓', color: 'bg-pink-50 border-pink-200 text-pink-700' },
];

type MockQuestion = MockAttemptQuestion & {
  difficulty?: string;
  year?: number;
  source?: string;
  exam?: string;
};

interface MockTestsPageProps {
  currentUser: FirebaseUser | null;
  setTab: (tab: string) => void;
  onExamModeChange: (enabled: boolean) => void;
  onReward: (summary: { scoreGained: number; xpGained: number }) => Promise<void>;
  userClass?: string;
}

const EXAM_SECONDS = 180 * 60;

const statusStyle: Record<MockAnswerStatus, string> = {
  answered: 'bg-emerald-500 text-white',
  review: 'bg-amber-400 text-slate-900',
  unanswered: 'bg-rose-500 text-white',
  not_visited: 'bg-white text-slate-500 border border-slate-200',
};

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${String(m).padStart(2, '0')}:${s}`;
}

function scoreAttempt(questions: MockQuestion[], answers: Record<string, number>) {
  return questions.reduce(
    (acc, question) => {
      const answer = answers[question.id];
      if (answer === undefined) {
        acc.unanswered += 1;
        return acc;
      }
      if (answer === question.correctAnswer) {
        acc.correct += 1;
        acc.score += question.marks || 4;
      } else {
        acc.incorrect += 1;
        acc.score += question.negativeMarks || -1;
      }
      return acc;
    },
    { score: 0, correct: 0, incorrect: 0, unanswered: 0 },
  );
}

function mockXpFor(correct: number, total: number) {
  const accuracy = total ? correct / total : 0;
  const base = 100;
  const correctXp = correct * 5;
  const bonus = accuracy >= 0.9 ? 150 : accuracy >= 0.8 ? 100 : accuracy >= 0.7 ? 50 : 0;
  return base + correctXp + bonus;
}

export default function MockTestsPage({ currentUser, setTab, onExamModeChange, onReward, userClass }: MockTestsPageProps) {
  const classNum = userClass ? parseInt(userClass, 10) : null;
  const [activeSection, setActiveSection] = React.useState<ExamSection>(
    classNum && classNum <= 10 ? 'olympiads' : 'mocks',
  );
  const [paper, setPaper] = React.useState<MockPaper | null>(null);
  const [selectedMock, setSelectedMock] = React.useState<MockTestMeta | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  // Olympiad exam state
  const [olympiadExam, setOlympiadExam] = React.useState<{ poolId: string; title: string; questions: OlympiadQuestion[] } | null>(null);
  const [olympiadAnswers, setOlympiadAnswers] = React.useState<Record<number, number>>({});
  const [olympiadSubmitted, setOlympiadSubmitted] = React.useState(false);
  // Create Exam state
  const [createClass, setCreateClass] = React.useState('10');
  const [createSubjects, setCreateSubjects] = React.useState<string[]>(['Mathematics']);
  const [createLevel, setCreateLevel] = React.useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [createCount, setCreateCount] = React.useState(20);
  const [shareCode, setShareCode] = React.useState<string | null>(null);
  // Custom exam runtime state (separate Generate / Start / Share)
  const [customExam, setCustomExam] = React.useState<{ title: string; questions: OlympiadQuestion[] } | null>(null);
  const [customAnswers, setCustomAnswers] = React.useState<Record<number, number>>({});
  const [customSubmitted, setCustomSubmitted] = React.useState(false);
  const [customStarted, setCustomStarted] = React.useState(false);
  const [customGenerating, setCustomGenerating] = React.useState(false);
  const [customError, setCustomError] = React.useState<string | null>(null);
  const [resultSyncWarning, setResultSyncWarning] = React.useState<string | null>(null);
  const [shareCopied, setShareCopied] = React.useState(false);
  // Live exam join state
  const [joinCode, setJoinCode] = React.useState('');
  const [joinLoading, setJoinLoading] = React.useState(false);
  const [joinError, setJoinError] = React.useState<string | null>(null);
  // Tracks the exam code that was used to start a live/custom exam (for result saving)
  const [activeExamCode, setActiveExamCode] = React.useState<string | null>(null);
  const [activeExamConfig, setActiveExamConfig] = React.useState<{ class: string; subjects: string[]; level: string } | null>(null);
  const [started, setStarted] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [reviewMode, setReviewMode] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<number | undefined>(undefined);
  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const [statuses, setStatuses] = React.useState<Record<string, MockAnswerStatus>>({});
  const [timeLeft, setTimeLeft] = React.useState(EXAM_SECONDS);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [xpAward, setXpAward] = React.useState(0);
  // Mock question explanations — fetched on demand, cached per question
  const [explanations, setExplanations] = React.useState<Record<string, string | null>>({});
  const [loadingExplanations, setLoadingExplanations] = React.useState<Set<string>>(new Set());

  const current = paper?.questions[currentIndex];
  const result = paper ? scoreAttempt(paper.questions, answers) : { score: 0, correct: 0, incorrect: 0, unanswered: 0 };
  const maxScore = paper ? paper.questions.reduce((total, question) => total + (question.marks || 4), 0) : 0;
  const isLastQuestion = paper && currentIndex === paper.questions.length - 1;
  const accuracy = paper ? Math.round((result.correct / paper.questions.length) * 100) : 0;

  React.useEffect(() => () => onExamModeChange(false), [onExamModeChange]);

  // Auto-join via URL ?code= param (shared link from parent/teacher)
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      setActiveSection('live');
      setJoinCode(code.toUpperCase().replace(/[^A-Z0-9]/g, ''));
      // Auto-trigger join after a brief delay so UI settles
      window.setTimeout(() => handleJoinExam(code.toUpperCase()), 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Save an exam result to Firestore (examResults collection) */
  const saveExamResult = React.useCallback(async (
    score: number,
    total: number,
    title: string,
    examCode?: string | null,
    config?: { class?: string; subjects?: string[]; level?: string } | null,
  ) => {
    if (!FIRESTORE_FEATURES_ENABLED || !currentUser) return;
    try {
      // Determine exam type
      let examType = 'custom';
      if (examCode) examType = 'live_exam';
      else if (config?.subjects?.includes('Olympiad')) examType = 'olympiad';

      await addDoc(collection(db, 'examResults'), {
        userId: currentUser.uid,
        userEmail: currentUser.email || '',
        examCode: examCode || null,
        title,
        classLevel: config?.class || '',
        subjects: config?.subjects || [],
        level: config?.level || '',
        score,
        total,
        percentage: total > 0 ? Math.round((score / total) * 100) : 0,
        type: examType,
        completedAt: serverTimestamp(),
      });
      // Canonical progress write — single row in All Activity + parent dashboard.
      const examXp = total > 0
        ? (() => {
            const pct = (score / total) * 100;
            if (pct >= 90) return 120;
            if (pct >= 75) return 80;
            if (pct >= 60) return 50;
            if (pct >= 40) return 30;
            return 15;
          })()
        : 0;
      void recordLearningActivity({
        uid: currentUser.uid,
        type: examType === 'olympiad' ? 'olympiad' : 'exam',
        title,
        subject: config?.subjects?.[0] || examType,
        classLevel: config?.class,
        score,
        total,
        xpGained: examXp,
        sourceId: examCode || undefined,
      });
    } catch (err) {
      console.error('[Syllab] Failed to save exam result to Firestore:', err);
      setResultSyncWarning('Result saved locally, sync failed — will retry on next attempt');
    }
  }, [currentUser]);

  /** Save exam config to Firestore so students can join with a short code */
  const saveExamCode = async (code: string, config: { class: string; subjects: string[]; level: string; count: number }) => {
    if (!FIRESTORE_FEATURES_ENABLED) return;
    try {
      await setDoc(doc(db, 'examCodes', code), {
        ...config,
        createdBy: currentUser?.email || 'unknown',
        createdAt: serverTimestamp(),
      });
    } catch { /* non-fatal */ }
  };

  /** Join an exam by code — looks up Firestore then generates questions */
  const handleJoinExam = async (codeInput?: string) => {
    const code = (codeInput || joinCode).trim().toUpperCase();
    if (!code) return;
    setJoinLoading(true);
    setJoinError(null);
    try {
      let config: { class: string; subjects: string[]; level: string; count: number } | null = null;

      // 1. Try Firestore lookup first
      if (FIRESTORE_FEATURES_ENABLED) {
        const snap = await getDoc(doc(db, 'examCodes', code));
        if (snap.exists()) {
          config = snap.data() as typeof config;
        }
      }

      // 2. Fallback: try decoding as base64 config (full URL code)
      if (!config) {
        try {
          const padded = code + '='.repeat((4 - (code.length % 4)) % 4);
          const decoded = JSON.parse(atob(padded));
          if (decoded.class && decoded.subjects) config = decoded;
        } catch { /* not a valid base64 config */ }
      }

      if (!config) {
        setJoinError(`No exam found with code "${code}". Check the code and try again.`);
        return;
      }

      // 3. Pre-fill create exam fields and generate
      setCreateClass(config.class || '10');
      setCreateSubjects(Array.isArray(config.subjects) ? config.subjects : [config.subjects as unknown as string]);
      setCreateLevel((config.level as 'Easy' | 'Medium' | 'Hard') || 'Medium');
      setCreateCount(config.count || 20);
      setActiveExamCode(code);
      setActiveExamConfig({ class: config.class || '10', subjects: Array.isArray(config.subjects) ? config.subjects : [config.subjects as unknown as string], level: config.level || 'Medium' });
      setActiveSection('create');

      // Trigger generation automatically
      window.setTimeout(async () => {
        const btn = document.getElementById('generate-exam-btn');
        if (btn) (btn as HTMLButtonElement).click();
      }, 300);
    } catch {
      setJoinError('Could not join exam. Check your connection and try again.');
    } finally {
      setJoinLoading(false);
    }
  };

  const visitQuestion = React.useCallback((index: number) => {
    if (!paper) return;
    const target = paper.questions[index];
    if (!target) return;
    setCurrentIndex(index);
    setSelected(answers[target.id]);
    setStatuses((currentStatuses) => ({
      ...currentStatuses,
      [target.id]: currentStatuses[target.id] || 'unanswered',
    }));
  }, [answers, paper]);

  const submitTest = React.useCallback(async (answersToSubmit = answers, statusesToSubmit = statuses) => {
    if (!paper || submitted) return;
    const finalStatuses = paper.questions.reduce<Record<string, MockAnswerStatus>>((acc, question) => {
      acc[question.id] = statusesToSubmit[question.id] || 'not_visited';
      return acc;
    }, {});
    const finalResult = scoreAttempt(paper.questions, answersToSubmit);
    const examName = selectedMock?.exam || 'JEE';
    recordMockAttempt({
      userId: currentUser?.uid || 'guest',
      exam: examName,
      mockId: paper.id,
      title: paper.title,
      elapsedSeconds: EXAM_SECONDS - timeLeft,
      score: finalResult.score,
      maxScore,
      correct: finalResult.correct,
      incorrect: finalResult.incorrect,
      unanswered: finalResult.unanswered,
      answers: answersToSubmit,
      statuses: finalStatuses,
      questions: paper.questions.map((question) => ({
        id: question.id,
        subject: question.subject,
        chapter: question.chapter,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        marks: question.marks || 4,
        negativeMarks: question.negativeMarks || -1,
      })),
    });
    const gainedXp = mockXpFor(finalResult.correct, paper.questions.length);
    // Canonical progress write — one row per mock test.
    if (currentUser) {
      void recordLearningActivity({
        uid: currentUser.uid,
        type: 'mock_test',
        title: paper.title,
        subject: selectedMock?.exam || 'Mock Test',
        score: finalResult.correct,
        total: paper.questions.length,
        xpGained: gainedXp,
        sourceId: paper.id,
      });
    }
    // Record mastery: group by chapter and record performance per chapter
    if (paper.questions.length > 0) {
      const chapterGroups = new Map<string | undefined, { correct: number; total: number }>();
      for (const question of paper.questions) {
        const chapter = question.chapter;
        const wasCorrect = answersToSubmit[question.id] === question.correctAnswer ? 1 : 0;
        if (!chapterGroups.has(chapter)) {
          chapterGroups.set(chapter, { correct: 0, total: 0 });
        }
        const group = chapterGroups.get(chapter)!;
        group.correct += wasCorrect;
        group.total += 1;
      }
      for (const [chapter, { correct, total }] of chapterGroups) {
        if (chapter) {
          recordMasteryResult(chapter, correct, total);
        }
      }
    }
    setXpAward(gainedXp);
    await onReward({ scoreGained: Math.max(0, finalResult.score), xpGained: gainedXp });
    setStatuses(finalStatuses);
    setAnswers(answersToSubmit);
    setSubmitted(true);
    setReviewMode(false);
    onExamModeChange(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    }
  }, [answers, currentUser?.uid, maxScore, onExamModeChange, onReward, paper, selectedMock?.exam, statuses, submitted, timeLeft]);

  React.useEffect(() => {
    if (!started || submitted) return;
    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [started, submitted]);

  React.useEffect(() => {
    if (started && !submitted && timeLeft === 0) {
      void submitTest();
    }
  }, [started, submitted, submitTest, timeLeft]);

  const saveAndNext = () => {
    if (!paper || !current) return;
    const nextAnswers = selected === undefined ? answers : { ...answers, [current.id]: selected };
    const nextStatuses = { ...statuses, [current.id]: selected === undefined ? 'unanswered' as const : 'answered' as const };
    setAnswers(nextAnswers);
    setStatuses(nextStatuses);
    if (isLastQuestion) {
      void submitTest(nextAnswers, nextStatuses);
      return;
    }
    const nextIndex = Math.min(paper.questions.length - 1, currentIndex + 1);
    setCurrentIndex(nextIndex);
    setSelected(nextAnswers[paper.questions[nextIndex].id]);
    setStatuses((currentStatuses) => ({
      ...currentStatuses,
      [paper.questions[nextIndex].id]: currentStatuses[paper.questions[nextIndex].id] || 'unanswered',
    }));
  };

  const markForReview = () => {
    if (!paper || !current) return;
    const nextAnswers = selected === undefined ? answers : { ...answers, [current.id]: selected };
    setAnswers(nextAnswers);
    setStatuses((currentStatuses) => ({ ...currentStatuses, [current.id]: 'review' }));
    const nextIndex = Math.min(paper.questions.length - 1, currentIndex + 1);
    setCurrentIndex(nextIndex);
    setSelected(nextAnswers[paper.questions[nextIndex].id]);
    setStatuses((currentStatuses) => ({
      ...currentStatuses,
      [paper.questions[nextIndex].id]: currentStatuses[paper.questions[nextIndex].id] || 'unanswered',
    }));
  };

  const startTest = () => {
    if (!paper) return;
    setStarted(true);
    onExamModeChange(true);
    visitQuestion(0);
    document.documentElement.requestFullscreen?.().catch(() => undefined);
  };

  const loadMock = async (meta: MockTestMeta) => {
    // Privacy + result-tracking gate: must sign in before taking any mock.
    // Browsing the list above is fine; starting the timer requires an account.
    if (!currentUser) {
      setError('Please sign in or sign up — your mock test result needs to be saved to your account.');
      // Bubble up to App to open the login modal
      window.dispatchEvent(new CustomEvent('syllab:require-login'));
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const loadedPaper = await loadMockTest(meta);
      setPaper(loadedPaper);
      setSelectedMock(meta);
      setAnswers({});
      setStatuses({});
      setCurrentIndex(0);
      setSelected(undefined);
      setTimeLeft(EXAM_SECONDS);
      setStarted(false);
      setSubmitted(false);
      setReviewMode(false);
    } catch (err) {
      const message = err instanceof MockTestLoadError ? err.message : 'Failed to load mock test. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const goBackToMocksList = () => {
    setPaper(null);
    setSelectedMock(null);
    setStarted(false);
    setSubmitted(false);
    setReviewMode(false);
    setAnswers({});
    setStatuses({});
    setCurrentIndex(0);
    setSelected(undefined);
    setTimeLeft(EXAM_SECONDS);
    setError(null);
  };

  const clearResponse = () => {
    if (!current) return;
    const nextAnswers = { ...answers };
    delete nextAnswers[current.id];
    setAnswers(nextAnswers);
    setSelected(undefined);
    setStatuses((currentStatuses) => ({ ...currentStatuses, [current.id]: 'unanswered' }));
  };

  /**
   * Generate the custom exam:
   *   1) Calls the backend per subject to fetch real MCQs
   *   2) Builds an exam preview (does NOT auto-start)
   *   3) Creates a shareable code in parallel
   * User can then click "Start Exam" or "Share Code" separately.
   */
  const generateCustomExam = async () => {
    if (createSubjects.length === 0) return;
    setCustomGenerating(true);
    setCustomError(null);
    setShareCode(null);
    setShareCopied(false);
    try {
      const perSubject = Math.max(3, Math.ceil(createCount / createSubjects.length));
      const collected: OlympiadQuestion[] = [];
      for (const subject of createSubjects) {
        try {
          const result = await generateQuestions({
            classLevel: createClass,
            subject,
            chapter: 'general',
            difficulty: createLevel.toLowerCase(),
            count: perSubject,
          });
          (result.questions || []).forEach((q) => {
            collected.push({
              question: q.question,
              options: q.options || [],
              correct: typeof q.correct === 'number' ? q.correct : 0,
              explanation: q.explanation || '',
            });
          });
        } catch {
          // skip this subject silently; we may still have enough from others
        }
      }
      if (collected.length === 0) {
        setCustomError('Could not generate questions right now. Please check your connection and try again.');
        return;
      }
      // Shuffle to mix subjects, then cap
      for (let i = collected.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [collected[i], collected[j]] = [collected[j], collected[i]];
      }
      const finalQuestions = collected.slice(0, createCount);
      const config = { class: createClass, subjects: createSubjects, level: createLevel, count: finalQuestions.length };
      const code = encodeExamConfig(config);
      setShareCode(code);
      // Save code to Firestore so students can join with just the short code
      void saveExamCode(code, config);
      const examTitle = `Class ${createClass} · ${createSubjects.join(', ')} · ${createLevel}`;
      setCustomExam({
        title: examTitle,
        questions: finalQuestions,
      });
      setCustomAnswers({});
      setCustomSubmitted(false);
      setCustomStarted(false);
      // Track config for result saving (only set if not already set via a join code)
      if (!activeExamCode) {
        setActiveExamConfig({ class: createClass, subjects: createSubjects, level: createLevel });
      }
    } finally {
      setCustomGenerating(false);
    }
  };

  const copyShareLink = async () => {
    if (!shareCode) return;
    const url = `${window.location.origin}/exams?code=${shareCode}`;
    try {
      await navigator.clipboard?.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      setShareCopied(false);
    }
  };

  const closeCustomExam = () => {
    setCustomExam(null);
    setCustomAnswers({});
    setCustomSubmitted(false);
    setCustomStarted(false);
    setShareCode(null);
    setShareCopied(false);
    setActiveExamCode(null);
    setActiveExamConfig(null);
  };

  const subjectOptions: Record<string, string[]> = {
    '5': ['Mathematics', 'Science', 'English', 'Social Science'],
    '6': ['Mathematics', 'Science', 'English', 'Social Science'],
    '7': ['Mathematics', 'Science', 'English', 'Social Science'],
    '8': ['Mathematics', 'Science', 'English', 'Social Science'],
    '9': ['Mathematics', 'Science', 'English', 'Social Science', 'Hindi'],
    '10': ['Mathematics', 'Science', 'English', 'Social Science', 'Hindi'],
    '11': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'],
    '12': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'],
  };

  // Show mocks list if no paper is loaded
  if (!paper) {
    const sectionTabs: { id: ExamSection; label: string; icon: React.ReactNode }[] = [
      { id: 'mocks',    label: 'Mock Tests',    icon: <ClipboardList size={15} /> },
      { id: 'pyq',      label: 'PYQ Practice',  icon: <ClipboardList size={15} /> },
      { id: 'olympiads',label: 'Olympiads',     icon: <Medal size={15} /> },
      { id: 'formulas', label: 'Formula Bank',  icon: <BookOpen size={15} /> },
      { id: 'diagrams', label: 'Diagram Lab',   icon: <FlaskConical size={15} /> },
      { id: 'create',   label: 'Create Exam',   icon: <Plus size={15} /> },
      { id: 'live',     label: 'Live Exams',    icon: <Users size={15} /> },
    ];

    return (
      <main className="space-y-8 pb-12">
        <SEO
          title="Mock Tests, Olympiads & Custom Exams | JEE NEET EAMCET"
          description="Free mock tests for JEE Mains, NEET, EAMCET, VIT, BITSAT; Math & Science Olympiads; formula bank; labelled science diagrams; and custom exam creator — all in one place."
          keywords="JEE mock test free, NEET mock test, EAMCET mock test, Math Olympiad, Science Olympiad, custom exam creator, live exam code, online mock test India, formula bank, science diagrams"
          url="https://syllab.in/exams"
          jsonLd={[
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Syllab.in Mock Tests & Exam Preparation',
              url: 'https://syllab.in/exams',
              itemListElement: [
                { '@type': 'ListItem', position: 1, item: { '@type': 'Course', name: 'JEE Mains Mock Test', description: 'Full-length JEE Mains mock test with Physics, Chemistry and Mathematics.' } },
                { '@type': 'ListItem', position: 2, item: { '@type': 'Course', name: 'NEET Mock Test', description: 'Full-length NEET mock test with Physics, Chemistry and Biology.' } },
                { '@type': 'ListItem', position: 3, item: { '@type': 'Course', name: 'EAMCET Mock Test', description: 'EAMCET Engineering and Medical mock tests.' } },
                { '@type': 'ListItem', position: 4, item: { '@type': 'Course', name: 'Math & Science Olympiad', description: 'Olympiad-level questions for Math and Science competitions.' } },
              ],
            },
          ]}
        />

        {resultSyncWarning && (
          <div className="rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-700 flex items-center justify-between gap-4">
            <span>{resultSyncWarning}</span>
            <button
              type="button"
              onClick={() => setResultSyncWarning(null)}
              className="text-amber-700 hover:text-amber-900 text-xs font-black uppercase tracking-widest"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Hero */}
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary">
              <Trophy size={14} />
              Exams Hub
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">Exams & Tests</h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
              Mock tests for JEE/NEET/EAMCET, Math & Science Olympiads, Formula Bank, Diagram Lab, and create your own custom shareable exams.
            </p>
          </div>
          {/* SEO cross-links → per-exam mock-test landing pages */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="self-center text-[10px] font-black uppercase tracking-widest text-slate-400">Exam guides:</span>
            {([['jee-main', 'JEE Main'], ['neet', 'NEET'], ['ap-eapcet', 'AP EAPCET'], ['ts-eapcet', 'TS EAPCET'], ['bitsat', 'BITSAT'], ['kcet', 'KCET'], ['mht-cet', 'MHT-CET'], ['wbjee', 'WBJEE']] as const).map(([slug, label]) => (
              <a key={slug} href={`/mock-tests/${slug}`} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:bg-emerald-100 hover:text-emerald-700">{label}</a>
            ))}
          </div>
          {/* Tab bar */}
          <div className="mt-6 flex flex-wrap gap-2">
            {sectionTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSection(tab.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all',
                  activeSection === tab.id
                    ? 'bg-primary text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
          {/* Class-aware suggestion banner */}
          {classNum && classNum >= 6 && classNum <= 10 && activeSection === 'mocks' && (
            <div className="mt-4 rounded-2xl bg-sky-50 border border-sky-200 px-4 py-3 text-sm font-bold text-sky-700 flex items-center justify-between gap-3 flex-wrap">
              <span>🏆 Class {userClass} students shine in Olympiads — Math, Science, English & GK!</span>
              <button type="button" onClick={() => setActiveSection('olympiads')} className="rounded-xl bg-sky-600 text-white px-4 py-1.5 text-xs font-black hover:bg-sky-700 transition-colors">
                View Olympiads
              </button>
            </div>
          )}
          {classNum && classNum >= 11 && activeSection === 'olympiads' && (
            <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm font-bold text-amber-700 flex items-center justify-between gap-3 flex-wrap">
              <span>📋 Class {userClass} — JEE / NEET mock tests are your best prep tool!</span>
              <button type="button" onClick={() => setActiveSection('mocks')} className="rounded-xl bg-amber-600 text-white px-4 py-1.5 text-xs font-black hover:bg-amber-700 transition-colors">
                View Mock Tests
              </button>
            </div>
          )}
        </section>

        {error && (
          <section className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6 shadow-xl shadow-rose-200/40">
            <div className="flex gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-black text-rose-900">Error Loading Mock</h3>
                <p className="mt-1 text-sm font-medium text-rose-700">{error}</p>
              </div>
              <button type="button" onClick={() => setError(null)} className="flex-shrink-0 text-rose-600 hover:text-rose-700">
                <X size={20} />
              </button>
            </div>
          </section>
        )}

        {/* ─── Mock Tests Section — grouped into 3 category tabs ─── */}
        {activeSection === 'mocks' && (
          <MockTestsTabs
            loadMock={loadMock}
            loading={loading}
            selectedMock={selectedMock}
          />
        )}

        {/* ─── PYQ Practice Section ─── */}
        {activeSection === 'pyq' && (
          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900">📝 PYQ Practice Papers</h2>
              <p className="text-sm text-slate-500 mt-1">Original, exam-pattern papers with instant solutions — CBSE, JEE & NEET.</p>
            </div>
            <PyqPractice currentUser={currentUser} />
          </section>
        )}

        {/* ─── Olympiads Section ─── */}
        {activeSection === 'olympiads' && (
          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900">Olympiad Exams</h2>
              <p className="mt-2 text-sm font-medium text-slate-500">
                Challenge-level papers based on national Olympiad patterns. Tap a card to start.
              </p>
            </div>
            {olympiadExam ? (
              <OlympiadExamRunner
                exam={olympiadExam}
                answers={olympiadAnswers}
                setAnswers={setOlympiadAnswers}
                submitted={olympiadSubmitted}
                setSubmitted={setOlympiadSubmitted}
                onClose={() => { setOlympiadExam(null); setOlympiadAnswers({}); setOlympiadSubmitted(false); }}
                onRegenerate={() => {
                  const fresh = generateRandomExam(olympiadExam.poolId, 10);
                  setOlympiadExam({ ...olympiadExam, questions: fresh });
                  setOlympiadAnswers({});
                  setOlympiadSubmitted(false);
                }}
                onSubmit={(score, total) => {
                  void saveExamResult(score, total, olympiadExam.title, null, { subjects: ['Olympiad'] });
                }}
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {OLYMPIAD_LIST.map((olym) => (
                  <OlympiadCard
                    key={olym.id}
                    olympiad={olym}
                    onStart={() => {
                      const questions = generateRandomExam(olym.id, 10);
                      setOlympiadExam({ poolId: olym.id, title: `${olym.title} — ${olym.subtitle}`, questions });
                      setOlympiadAnswers({});
                      setOlympiadSubmitted(false);
                    }}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* ─── Formula Bank Section ─── */}
        {activeSection === 'formulas' && (
          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900">📐 Formula Bank</h2>
              <p className="mt-1 text-sm font-medium text-slate-500">Class-wise formulas for Maths, Physics, Chemistry &amp; Aptitude — quick reference for exams.</p>
            </div>
            <FormulaBank />
          </section>
        )}

        {/* ─── Diagram Lab Section ─── */}
        {activeSection === 'diagrams' && (
          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900">🔬 Diagram Lab</h2>
              <p className="mt-1 text-sm font-medium text-slate-500">Biology, Physics &amp; Chemistry diagrams with labelled parts, explanations, and exam tips.</p>
            </div>
            <React.Suspense fallback={<p className="text-sm font-medium text-slate-400">Loading Diagram Lab…</p>}>
              <DiagramLab />
            </React.Suspense>
          </section>
        )}

        {/* ─── Create Exam Section ─── */}
        {activeSection === 'create' && (
          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
            {/* If exam already generated and started → show the runner */}
            {customExam && customStarted ? (
              <OlympiadExamRunner
                exam={{ poolId: 'custom', title: customExam.title, questions: customExam.questions }}
                answers={customAnswers}
                setAnswers={setCustomAnswers}
                submitted={customSubmitted}
                setSubmitted={setCustomSubmitted}
                onClose={closeCustomExam}
                onRegenerate={() => { setCustomStarted(false); }}
                onSubmit={(score, total) => {
                  void saveExamResult(score, total, customExam.title, activeExamCode, activeExamConfig);
                }}
              />
            ) : customExam ? (
              /* Generated preview — Start + Share */
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Custom Exam Ready</p>
                  <h2 className="text-2xl font-black text-slate-900">{customExam.title}</h2>
                  <p className="mt-2 text-sm font-medium text-slate-500">
                    {customExam.questions.length} questions generated. Tap <strong>Start Exam</strong> when you're ready, or share the code with friends.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Start Exam panel */}
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <h3 className="text-sm font-black text-emerald-700">Take it yourself</h3>
                    <p className="mt-1 text-xs text-emerald-600">Begin the exam now. Answers are scored at the end.</p>
                    <button
                      type="button"
                      onClick={() => setCustomStarted(true)}
                      className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg hover:bg-emerald-700"
                    >
                      ▶ Start Exam
                    </button>
                  </div>
                  {/* Share panel */}
                  <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5">
                    <h3 className="text-sm font-black text-violet-700">Share with friends</h3>
                    <p className="mt-1 text-xs text-violet-600">Give this code to challenge classmates.</p>
                    <div className="mt-3 rounded-xl bg-white border border-violet-100 p-3 text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-violet-500">Share Code</p>
                      <p className="text-2xl font-black tracking-widest text-violet-700">{shareCode}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void copyShareLink()}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white hover:bg-violet-700"
                    >
                      <Share2 size={14} /> {shareCopied ? '✓ Link Copied' : 'Copy Share Link'}
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => void generateCustomExam()}
                    disabled={customGenerating}
                    className="rounded-xl bg-slate-100 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-200 disabled:opacity-50"
                  >
                    🎲 Re-generate Different Questions
                  </button>
                  <button
                    type="button"
                    onClick={closeCustomExam}
                    className="rounded-xl bg-slate-100 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-200"
                  >
                    ← Back to Form
                  </button>
                </div>
              </div>
            ) : (
              /* Form to configure exam */
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-slate-900">Create a Custom Exam</h2>
                  <p className="mt-2 text-sm font-medium text-slate-500">
                    Pick class, subjects, difficulty. Click <strong>Generate Exam</strong>; we'll fetch real questions. Then choose to <strong>Start</strong> or <strong>Share</strong>.
                  </p>
                </div>
                <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                  <div className="space-y-5">
                    {/* Class */}
                    <div>
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Class</label>
                      <div className="flex flex-wrap gap-2">
                        {['5','6','7','8','9','10','11','12'].map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => { setCreateClass(c); setCreateSubjects([]); }}
                            className={cn(
                              'rounded-xl px-4 py-2 text-xs font-black transition-all',
                              createClass === c ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                            )}
                          >
                            Class {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Subjects */}
                    <div>
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Subjects (select one or more)</label>
                      <div className="flex flex-wrap gap-2">
                        {(subjectOptions[createClass] || []).map((subj) => (
                          <button
                            key={subj}
                            type="button"
                            onClick={() =>
                              setCreateSubjects((prev) =>
                                prev.includes(subj) ? prev.filter((s) => s !== subj) : [...prev, subj],
                              )
                            }
                            className={cn(
                              'rounded-xl px-4 py-2 text-xs font-black transition-all',
                              createSubjects.includes(subj) ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                            )}
                          >
                            {subj}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Difficulty */}
                    <div>
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Difficulty Level</label>
                      <div className="flex gap-2">
                        {(['Easy', 'Medium', 'Hard'] as const).map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => setCreateLevel(lvl)}
                            className={cn(
                              'rounded-xl px-5 py-2.5 text-xs font-black transition-all',
                              createLevel === lvl ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                            )}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Number of questions */}
                    <div>
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Number of Questions</label>
                      <div className="flex gap-2">
                        {[10, 20, 30].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setCreateCount(n)}
                            className={cn(
                              'rounded-xl px-4 py-2.5 text-xs font-black transition-all',
                              createCount === n ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                            )}
                          >
                            {n} Qs
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      id="generate-exam-btn"
                      type="button"
                      disabled={createSubjects.length === 0 || customGenerating}
                      onClick={() => void generateCustomExam()}
                      className="flex items-center gap-2 rounded-2xl bg-primary px-7 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {customGenerating ? '⏳ Generating Real Questions…' : '🎲 Generate Exam'}
                    </button>
                    {customError && (
                      <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-bold text-rose-700">{customError}</div>
                    )}
                    {customGenerating && (
                      <p className="text-[10px] font-bold text-slate-400">This may take 10–30 seconds depending on subject count. We're fetching fresh questions from the AI backend.</p>
                    )}
                  </div>

                  {/* Live preview */}
                  <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-6">
                    <h3 className="mb-4 text-sm font-black text-slate-700">Configuration</h3>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex justify-between"><span className="font-bold text-slate-400">Class</span><span className="font-black">{createClass}</span></div>
                      <div className="flex justify-between"><span className="font-bold text-slate-400">Subjects</span><span className="font-black text-right">{createSubjects.join(', ') || '—'}</span></div>
                      <div className="flex justify-between"><span className="font-bold text-slate-400">Level</span><span className="font-black">{createLevel}</span></div>
                      <div className="flex justify-between"><span className="font-bold text-slate-400">Questions</span><span className="font-black">{createCount}</span></div>
                    </div>
                    <div className="mt-5 rounded-2xl border border-dashed border-slate-200 p-4 text-center text-xs font-bold text-slate-400">
                      Click "Generate Exam" to create the test. You'll then see <strong>Start</strong> and <strong>Share</strong> options.
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        )}

        {/* ─── Live Exams Section ─── */}
        {activeSection === 'live' && (
          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
            <div className="mb-8 flex flex-col gap-3">
              <h2 className="text-2xl font-black text-slate-900">Live Exams</h2>
              <p className="text-sm font-medium text-slate-500">
                Join a live exam with a code, or host one for your class. Live scoreboards, synchronized timers.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Join exam by code */}
              <div className="rounded-[1.5rem] border-2 border-primary/20 bg-primary/5 p-8">
                <div className="mb-4 text-5xl text-center">📡</div>
                <h3 className="mb-2 text-lg font-black text-slate-900 text-center">Join an Exam</h3>
                <p className="mb-5 text-sm text-slate-500 text-center">Enter the code from your teacher or parent to start the exam instantly.</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={12}
                    value={joinCode}
                    onChange={e => { setJoinCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')); setJoinError(null); }}
                    onKeyDown={e => e.key === 'Enter' && void handleJoinExam()}
                    placeholder="EXAM CODE"
                    className="flex-1 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-center text-lg font-black uppercase tracking-widest outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => void handleJoinExam()}
                    disabled={joinLoading || !joinCode.trim()}
                    className="rounded-2xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-widest text-white disabled:opacity-50"
                  >
                    {joinLoading ? '...' : 'Join'}
                  </button>
                </div>
                {joinError && (
                  <p className="mt-3 text-xs font-bold text-rose-600">{joinError}</p>
                )}
                {joinLoading && (
                  <p className="mt-3 text-[10px] font-bold text-slate-400 text-center">Looking up exam… generating questions…</p>
                )}
              </div>
              {/* Host / create exam */}
              <div className="rounded-[1.5rem] border-2 border-dashed border-violet-200 bg-violet-50 p-8 text-center">
                <div className="mb-4 text-5xl">🏟️</div>
                <h3 className="mb-2 text-lg font-black text-slate-900">Host an Exam</h3>
                <p className="mb-5 text-sm text-slate-500">Create an exam, get a code, share it. Students enter the code to take the same exam.</p>
                <button type="button" onClick={() => setActiveSection('create')} className="rounded-2xl bg-violet-600 px-7 py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg">
                  Create Exam →
                </button>
              </div>
            </div>
            <div className="mt-6 rounded-[1.5rem] bg-slate-50 border border-slate-200 p-5">
              <div className="flex items-start gap-3">
                <Zap size={20} className="mt-0.5 shrink-0 text-slate-500" />
                <div>
                  <p className="text-sm font-black text-slate-700">How it works</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    1. Parent or teacher goes to <strong>Create Exam</strong>, sets class/subjects/difficulty, generates exam, copies the share code.<br/>
                    2. Student comes here, types the code, and the exact same exam starts automatically.<br/>
                    3. Results are shown immediately after submission.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    );
  }

  if (!started) {
    return (
      <main className="space-y-8 pb-12">
        <SEO
          title={`${paper.title} | Mock Test`}
          description={`Attempt a ${paper.questions.length}-question, ${paper.duration}-minute mock test with review palette and instant analysis.`}
          keywords="mock test, practice test, entrance exam"
          url="https://syllab.in/mock-tests"
        />
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          <div className="max-w-3xl">
            <button
              type="button"
              onClick={goBackToMocksList}
              className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-200"
            >
              <ChevronLeft size={14} />
              Back to Mocks
            </button>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary">
              <ClipboardList size={14} />
              Full test mode
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">Mock Tests</h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
              {paper.questions.length} questions, {paper.duration} minutes, +4 and -1 marking. Your submitted answers will be available in Progress Hub analysis.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">{paper.title}</h2>
              <p className="mt-2 text-sm font-medium text-slate-500">
                {paper.questions.length} questions. Your submitted answers will be available in Progress Hub analysis.
              </p>
            </div>
            <button
              type="button"
              onClick={startTest}
              className="rounded-2xl bg-primary px-7 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-emerald-500/20"
            >
              Start Test
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen space-y-4 bg-slate-100 p-3 sm:p-4">
      <SEO
        title={`${paper.title} | Mock Test`}
        description="Take a JEE full mock test with Physics, Chemistry, and Mathematics questions, timed exam mode, scoring, explanations, and analysis."
        url="https://syllab.in/mock-tests"
      />

      {submitted && !reviewMode ? (
        <ResultScreen
          title={paper.title}
          result={result}
          maxScore={maxScore}
          totalQuestions={paper.questions.length}
          elapsedSeconds={EXAM_SECONDS - timeLeft}
          accuracy={accuracy}
          xpAward={xpAward}
          onReview={() => {
            setReviewMode(true);
            setCurrentIndex(0);
            setSelected(answers[paper.questions[0].id]);
          }}
          onAnalysis={() => setTab('progress')}
          onHome={() => setTab('home')}
        />
      ) : (
      <>
      {reviewMode && paper && (
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          <AnalysisPanel
            questions={paper.questions}
            answers={answers}
            result={result}
            maxScore={maxScore}
            elapsedSeconds={EXAM_SECONDS - timeLeft}
            accuracy={accuracy}
          />
        </section>
      )}
      <section className="sticky top-0 z-20 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/60">
        <div className="mb-3 flex items-center gap-2">
          <button
            type="button"
            onClick={goBackToMocksList}
            className="inline-flex items-center gap-1 rounded-2xl bg-slate-100 px-3 py-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-200"
          >
            <ChevronLeft size={14} />
            Back
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-black text-slate-900">{paper.title}</h1>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Question {currentIndex + 1} / {paper.questions.length} Â· {current?.subject}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={cn('flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-black', timeLeft < 600 ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-700')}>
              <Clock size={17} />
              {formatTime(timeLeft)}
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen((open) => !open)}
              className="rounded-2xl bg-slate-100 p-3 text-slate-600 lg:hidden"
              aria-label="Toggle question palette"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            {submitted ? (
              <button type="button" onClick={() => setReviewMode(false)} className="rounded-2xl bg-slate-900 px-5 py-3 text-xs font-black uppercase tracking-widest text-white">
                Score
              </button>
            ) : (
            <button type="button" onClick={() => void submitTest()} className="rounded-2xl bg-slate-900 px-5 py-3 text-xs font-black uppercase tracking-widest text-white">
              Submit
            </button>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <article className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-7">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
              {current.subject}
            </span>
            {current.chapter ? (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                {current.chapter}
              </span>
            ) : null}
          </div>

          <h2 className="max-w-4xl text-[17px] font-semibold leading-7 text-slate-900 sm:text-lg">
            {currentIndex + 1}. {current.question}
          </h2>

          <div className="mt-6 grid gap-3">
            {current.options.map((option, optionIndex) => {
              const isSelected = selected === optionIndex;
              const isCorrect = submitted && current.correctAnswer === optionIndex;
              const isWrong = submitted && answers[current.id] === optionIndex && optionIndex !== current.correctAnswer;
              return (
                <button
                  key={`${current.id}-${optionIndex}`}
                  type="button"
                  disabled={submitted}
                  onClick={() => setSelected(optionIndex)}
                  className={cn(
                    'flex items-start gap-3 rounded-2xl border p-4 text-left text-sm font-medium leading-6 transition-all',
                    isSelected ? 'border-primary bg-emerald-50 text-slate-900' : 'border-slate-100 bg-slate-50 text-slate-700 hover:border-primary/40',
                    isCorrect && 'border-emerald-500 bg-emerald-50 text-emerald-800',
                    isWrong && 'border-rose-500 bg-rose-50 text-rose-700',
                  )}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-slate-500">
                    {String.fromCharCode(65 + optionIndex)}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {submitted ? (
            <div className="mt-6 space-y-4">
              <div>
                <div className="mb-2 font-black text-slate-900">
                  Solution · Correct option {String.fromCharCode(65 + current.correctAnswer)}
                </div>
                <QuestionSolution
                  question={current.question}
                  options={current.options}
                  correctIndex={current.correctAnswer}
                  explanation={current.explanation}
                  solution={(current as { solution?: string[] }).solution}
                  subject={current.subject}
                />
              </div>
              {reviewMode && (
                <QuestionExplainButton
                  questionId={current.id}
                  question={current.question}
                  options={current.options}
                  correctAnswerIndex={current.correctAnswer}
                  explanation={explanations[current.id]}
                  isLoading={loadingExplanations.has(current.id)}
                  onFetch={async () => {
                    if (explanations[current.id] !== undefined) return; // Already loaded or attempted
                    setLoadingExplanations((prev) => new Set([...prev, current.id]));
                    try {
                      const exp = await getMockQuestionExplanation(
                        current.question,
                        current.options,
                        current.correctAnswer,
                      );
                      setExplanations((prev) => ({ ...prev, [current.id]: exp }));
                    } catch (err) {
                      const msg = (err as Error)?.message || 'Could not load explanation.';
                      setExplanations((prev) => ({ ...prev, [current.id]: null }));
                      console.error('[QuestionExplainButton]', msg);
                    } finally {
                      setLoadingExplanations((prev) => {
                        const next = new Set(prev);
                        next.delete(current.id);
                        return next;
                      });
                    }
                  }}
                />
              )}
            </div>
          ) : null}

          <div className="mt-7 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => visitQuestion(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600 disabled:opacity-40"
              >
                <ChevronLeft size={15} />
                Previous
              </button>
              <button
                type="button"
                onClick={() => visitQuestion(Math.min(paper.questions.length - 1, currentIndex + 1))}
                disabled={currentIndex === paper.questions.length - 1}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600 disabled:opacity-40"
              >
                Next
                <ChevronRight size={15} />
              </button>
            </div>
            {!submitted ? (
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={clearResponse} className="rounded-2xl bg-slate-100 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600">
                Clear
              </button>
              <button type="button" onClick={markForReview} className="rounded-2xl bg-amber-400 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-900">
                Mark Review
              </button>
              <button type="button" onClick={saveAndNext} className="rounded-2xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-widest text-white">
                {isLastQuestion ? 'Submit Test' : 'Save & Next'}
              </button>
            </div>
            ) : null}
          </div>
        </article>

        <aside className={cn('rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-200/50 lg:block', sidebarOpen ? 'block' : 'hidden')}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900">Questions</h2>
            <span className="text-xs font-black text-slate-400">{Object.keys(answers).length} saved</span>
          </div>
          <div className="mb-5 grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500">
            <Legend color="bg-emerald-500" label="Saved" />
            <Legend color="bg-amber-400" label="Review" />
            <Legend color="bg-rose-500" label="Unanswered" />
            <Legend color="bg-white border border-slate-200" label="Not visited" />
          </div>
          <div className="max-h-[calc(100dvh-300px)] overflow-y-auto pr-1">
            {['Physics', 'Chemistry', 'Mathematics'].map((subject) => (
              <div key={subject} className="mb-5">
                <div className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">{subject}</div>
                <div className="grid grid-cols-5 gap-2">
                  {paper.questions.map((question, questionIndex) => question.subject === subject ? (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() => visitQuestion(questionIndex)}
                      className={cn(
                        'flex aspect-square items-center justify-center rounded-xl text-xs font-black transition-all',
                        statusStyle[statuses[question.id] || 'not_visited'],
                        currentIndex === questionIndex && 'ring-2 ring-slate-900 ring-offset-2',
                      )}
                    >
                      {questionIndex + 1}
                    </button>
                  ) : null)}
                </div>
              </div>
            ))}
          </div>
          {submitted ? (
            <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700">
              <CheckCircle2 className="mb-2" size={20} />
              Review your saved answers and explanations.
            </div>
          ) : (
            <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm font-bold text-amber-700">
              <CheckCircle2 className="mb-2" size={20} />
              Save answers before moving if you want them counted.
            </div>
          )}
        </aside>
      </section>
      </>
      )}
    </main>
  );
}

function OlympiadCard({ olympiad, onStart }: { olympiad: OlympiadMeta; onStart: () => void }) {
  const pool = OLYMPIAD_POOLS[olympiad.id];
  const available = !!pool && pool.length >= 10;
  // Whole card is clickable when an exam pool exists — fixes "subjects don't do anything"
  const handleCardClick = () => { if (available) onStart(); };
  return (
    <div
      role={available ? 'button' : undefined}
      tabIndex={available ? 0 : -1}
      onClick={handleCardClick}
      onKeyDown={(e) => { if (available && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onStart(); } }}
      className={cn(
        'flex flex-col rounded-2xl border p-5 transition-all hover:shadow-lg',
        olympiad.color,
        available && 'cursor-pointer hover:-translate-y-0.5',
      )}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="text-3xl">{olympiad.icon}</span>
        <div>
          <h3 className="text-sm font-black text-slate-900">{olympiad.title}</h3>
          <p className="text-xs font-bold text-slate-500">{olympiad.subtitle}</p>
        </div>
      </div>
      <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{olympiad.classes}</p>
      <div className="mb-4 flex flex-wrap gap-1">
        {olympiad.subjects.map((s) => (
          <button
            key={s}
            type="button"
            onClick={(e) => { e.stopPropagation(); if (available) onStart(); }}
            disabled={!available}
            className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-bold text-slate-600 hover:bg-white hover:text-slate-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {s}
          </button>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between gap-2">
        <span className={cn(
          'rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest',
          olympiad.difficulty === 'Expert' ? 'bg-rose-100 text-rose-700' :
          olympiad.difficulty === 'Advanced' ? 'bg-amber-100 text-amber-700' :
          olympiad.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
          'bg-emerald-100 text-emerald-700',
        )}>{olympiad.difficulty}</span>
        {available ? (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onStart(); }}
            className="rounded-full bg-slate-900 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-slate-800"
          >
            🎲 Generate Exam
          </button>
        ) : (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-700">Coming Soon</span>
        )}
      </div>
    </div>
  );
}

function OlympiadExamRunner({
  exam, answers, setAnswers, submitted, setSubmitted, onClose, onRegenerate, onSubmit,
}: {
  exam: { poolId: string; title: string; questions: OlympiadQuestion[] };
  answers: Record<number, number>;
  setAnswers: (a: Record<number, number>) => void;
  submitted: boolean;
  setSubmitted: (v: boolean) => void;
  onClose: () => void;
  onRegenerate: () => void;
  onSubmit?: (score: number, total: number) => void;
}) {
  const score = exam.questions.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);
  const total = exam.questions.length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Olympiad Exam · {total} Questions · Randomly Generated</p>
          <h3 className="text-xl font-black text-slate-900">{exam.title}</h3>
        </div>
        <div className="flex gap-2">
          <button onClick={onRegenerate} className="inline-flex items-center gap-1.5 rounded-xl bg-violet-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-violet-700 hover:bg-violet-200">
            🎲 New Exam
          </button>
          <button onClick={onClose} className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-200">
            ← Back to List
          </button>
        </div>
      </div>

      {exam.questions.map((q, i) => {
        const selected = answers[i];
        return (
          <div key={i} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="mb-3 font-bold text-slate-800">{i + 1}. {q.question}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {q.options.map((opt, oi) => {
                const isSelected = selected === oi;
                const isCorrect = submitted && oi === q.correct;
                const isWrong = submitted && isSelected && oi !== q.correct;
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={submitted}
                    onClick={() => setAnswers({ ...answers, [i]: oi })}
                    className={cn(
                      'rounded-xl border-2 px-4 py-2.5 text-left text-sm font-bold transition-all',
                      !submitted && isSelected && 'border-primary bg-emerald-50',
                      !isSelected && !submitted && 'border-slate-200 hover:border-primary/40',
                      isCorrect && 'border-emerald-500 bg-emerald-100 text-emerald-700',
                      isWrong && 'border-rose-500 bg-rose-50 text-rose-700',
                    )}
                  >
                    <span className="font-black">{String.fromCharCode(65 + oi)}.</span> {opt}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <div className="mt-3 rounded-xl bg-indigo-50 border border-indigo-100 p-3 text-xs font-medium text-indigo-700">
                💡 {q.explanation}
              </div>
            )}
          </div>
        );
      })}

      {!submitted ? (
        <button
          type="button"
          onClick={() => {
            setSubmitted(true);
            const finalScore = exam.questions.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);
            onSubmit?.(finalScore, exam.questions.length);
          }}
          disabled={Object.keys(answers).length < total}
          className="w-full rounded-2xl bg-primary px-6 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg disabled:opacity-50"
        >
          Submit Exam ({Object.keys(answers).length}/{total} answered)
        </button>
      ) : (
        <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-sky-50 border border-emerald-200 p-6 text-center">
          <p className="text-3xl font-black text-emerald-700">{score} / {total}</p>
          <p className="text-sm font-bold text-emerald-600">{Math.round((score / total) * 100)}% — {score >= total * 0.8 ? 'Excellent! 🏆' : score >= total * 0.5 ? 'Good job! 💪' : 'Keep practicing! 📚'}</p>
          <button onClick={onRegenerate} className="mt-4 rounded-xl bg-violet-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow">
            🎲 Try Another Random Exam
          </button>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────
 * MockTestsTabs — Groups all mock-test exams into 3 high-level tabs:
 *   • IIT JEE / NEET (national engineering & medical entrance)
 *   • EAMCET & State exams (AP/TS/KA/MH/WB/TN/UP/GJ/OD)
 *   • BITSAT / VITEEE (private deemed-university entrances)
 * Each tab shows its grouped exam sections — keeps the top of the page
 * clean while still giving access to every exam.
 * ─────────────────────────────────────────────────────────────────────── */
type ExamCategoryId = 'jee-neet' | 'state' | 'private';
const EXAM_CATEGORIES: { id: ExamCategoryId; label: string; emoji: string; bg: string; exams: string[]; descriptions: Record<string, string> }[] = [
  {
    id: 'jee-neet',
    label: 'IIT JEE & NEET',
    emoji: '🏆',
    bg: 'bg-indigo-600',
    exams: ['JEE', 'NEET'],
    descriptions: {
      JEE: 'JEE Main — National engineering entrance for NITs, IIITs, and JEE Advanced gateway',
      NEET: 'NEET UG — National medical entrance for MBBS/BDS admissions',
    },
  },
  {
    id: 'state',
    label: 'EAMCET & State Exams',
    emoji: '🇮🇳',
    bg: 'bg-emerald-600',
    exams: ['EAMCET', 'APEAMCET', 'KCET', 'MHTCET', 'WBJEE', 'TNEA', 'UPSEE', 'COMEDK', 'GUJCET', 'OJEE'],
    descriptions: {
      EAMCET: 'TS EAMCET — Telangana State Engineering, Agriculture & Medical Common Entrance',
      APEAMCET: 'AP EAMCET — Andhra Pradesh Engineering, Agriculture & Medical entrance',
      KCET: 'KCET — Karnataka Common Entrance Test (Engineering & Medical)',
      MHTCET: 'MHT-CET — Maharashtra Common Entrance Test',
      WBJEE: 'WBJEE — West Bengal Joint Entrance Exam',
      TNEA: 'TNEA — Tamil Nadu Engineering Admissions',
      UPSEE: 'UPSEE / UPCET — Uttar Pradesh State Entrance',
      COMEDK: 'COMEDK UGET — Karnataka Private Engineering & Medical',
      GUJCET: 'GUJCET — Gujarat Common Entrance Test',
      OJEE: 'OJEE — Odisha Joint Entrance Exam',
    },
  },
  {
    id: 'private',
    label: 'BITSAT & Private',
    emoji: '🎓',
    bg: 'bg-violet-600',
    exams: ['BITSAT', 'VIT'],
    descriptions: {
      BITSAT: 'BITSAT — BITS Pilani / Goa / Hyderabad admission test',
      VIT: 'VITEEE — VIT Vellore & Chennai engineering entrance exam',
    },
  },
];

function MockTestsTabs({
  loadMock,
  loading,
  selectedMock,
}: {
  loadMock: (mock: MockTestMeta) => Promise<void> | void;
  loading: boolean;
  selectedMock: MockTestMeta | null;
}) {
  const [activeCategory, setActiveCategory] = React.useState<ExamCategoryId>('jee-neet');
  const category = EXAM_CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <>
      {/* Top-level category tabs (only 3) */}
      <section className="rounded-[2rem] bg-white p-4 shadow-xl shadow-slate-200/50 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {EXAM_CATEGORIES.map((cat) => {
            const active = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all',
                  active ? `${cat.bg} text-white shadow-lg` : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                )}
              >
                <span className="text-base">{cat.emoji}</span>
                {cat.label}
                <span className={cn('ml-1 rounded-full px-1.5 text-[10px]', active ? 'bg-white/20' : 'bg-slate-200 text-slate-500')}>
                  {cat.exams.reduce((sum, e) => sum + getMocksByExam(e).length, 0)}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs font-medium text-slate-500">
          Pick a category above, then a mock test to start a 3-hour exam-like simulation with negative marking.
        </p>
      </section>

      {/* Render exams inside the selected category */}
      {category.exams.map((exam) => {
        const mocksByExam = getMocksByExam(exam);
        if (mocksByExam.length === 0) return null;
        return (
          <section key={exam} className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
            <div>
              <h2 className="mb-2 text-2xl font-black text-slate-900">{exam}</h2>
              <p className="mb-4 text-sm font-medium text-slate-500">{category.descriptions[exam]}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mocksByExam.map((mock) => (
                <MockCard
                  key={mock.id}
                  mock={mock}
                  onStart={() => void loadMock(mock)}
                  isLoading={loading && selectedMock?.id === mock.id}
                />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

function MockCard({ mock, onStart, isLoading }: { mock: MockTestMeta; onStart: () => void; isLoading: boolean }) {
  const isAvailable = mock.available;
  return (
    <div className={`flex flex-col rounded-2xl border p-5 transition-all ${
      isAvailable
        ? 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-lg'
        : 'border-slate-100 bg-slate-50/60 opacity-70'
    }`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-black text-slate-900">{mock.title}</h3>
        {!isAvailable && (
          <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-amber-700">
            Soon
          </span>
        )}
      </div>
      <div className="mt-3 flex flex-col gap-2 text-xs font-medium text-slate-500">
        <div className="flex items-center gap-2">
          <Clock size={14} />
          {mock.duration} minutes
        </div>
        <div className="flex items-center gap-2">
          <ClipboardList size={14} />
          {mock.questionsCount} questions
        </div>
      </div>
      <button
        type="button"
        disabled={isLoading || !isAvailable}
        onClick={onStart}
        className={`mt-4 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest text-white disabled:cursor-not-allowed ${
          isAvailable ? 'bg-primary disabled:opacity-60' : 'bg-slate-300'
        }`}
      >
        {!isAvailable ? 'Coming Soon' : (isLoading ? 'Loading...' : 'Start Test')}
      </button>
    </div>
  );
}

function ResultScreen({
  title,
  result,
  maxScore,
  totalQuestions,
  elapsedSeconds,
  accuracy,
  xpAward,
  onReview,
  onAnalysis,
  onHome,
}: {
  title: string;
  result: { score: number; correct: number; incorrect: number; unanswered: number };
  maxScore: number;
  totalQuestions: number;
  elapsedSeconds: number;
  accuracy: number;
  xpAward: number;
  onReview: () => void;
  onAnalysis: () => void;
  onHome: () => void;
}) {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-5xl flex-col justify-center rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-10">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-lg shadow-emerald-500/20">
        <Trophy size={30} />
      </div>
      <div className="text-center">
        <div className="mb-3 text-[10px] font-black uppercase tracking-widest text-primary">Test submitted</div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm font-medium text-slate-500">
          Your attempt has been saved. You can review detailed solutions here or from Progress Hub.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-6">
        {[
          { label: 'Score', value: `${result.score}/${maxScore}` },
          { label: 'Accuracy', value: `${accuracy}%` },
          { label: 'Correct', value: result.correct },
          { label: 'Incorrect', value: result.incorrect },
          { label: 'Unanswered', value: result.unanswered },
          { label: 'XP Earned', value: `+${xpAward}` },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-slate-50 p-4 text-center">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</div>
            <div className="mt-1 text-2xl font-black text-slate-900">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-center text-sm font-bold text-slate-500">
        Time taken: {formatTime(elapsedSeconds)} Â· Questions: {totalQuestions}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button onClick={onAnalysis} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-xs font-black uppercase tracking-widest text-white">
          <BarChart3 size={17} />
          Go to Analysis
        </button>
        <button onClick={onReview} className="rounded-2xl bg-slate-900 px-6 py-4 text-xs font-black uppercase tracking-widest text-white">
          Review Solutions
        </button>
        <button onClick={onHome} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-600">
          <Home size={17} />
          Exit
        </button>
      </div>

      <div className="mt-8 border-t border-slate-100 pt-8">
        <div className="text-center">
          <p className="mb-4 text-sm font-bold text-slate-500">Share your score on WhatsApp & social media</p>
          <ShareResultCard
            score={result.correct}
            total={totalQuestions}
            title={title}
          />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────
 * AnalysisPanel — Shows overall stats and weak-area breakdown after submission
 * ─────────────────────────────────────────────────────────────────────── */
function AnalysisPanel({
  questions,
  answers,
  result,
  maxScore,
  elapsedSeconds,
  accuracy,
}: {
  questions: MockQuestion[];
  answers: Record<string, number>;
  result: { score: number; correct: number; incorrect: number; unanswered: number };
  maxScore: number;
  elapsedSeconds: number;
  accuracy: number;
}) {
  // Group questions by best available field: topic → subject → chapter
  const grouped: Record<string, MockQuestion[]> = {};
  questions.forEach((q) => {
    // Use a grouping key — prefer topic, fallback to subject, then chapter
    const key = q.subject || 'General';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(q);
  });

  // For each group, compute accuracy
  const groupStats = Object.entries(grouped).map(([group, qs]) => {
    const correctInGroup = qs.filter((q) => answers[q.id] === q.correctAnswer).length;
    const accuracy = qs.length > 0 ? (correctInGroup / qs.length) * 100 : 0;
    return { group, count: qs.length, correct: correctInGroup, accuracy };
  });

  // Sort by accuracy (weakest first)
  groupStats.sort((a, b) => a.accuracy - b.accuracy);

  const timeStr = (() => {
    const m = Math.floor(elapsedSeconds / 60);
    const s = elapsedSeconds % 60;
    return `${m}m ${s}s`;
  })();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900">Performance Analysis</h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Review your overall accuracy and identify weak areas to focus on.
        </p>
      </div>

      {/* Overall stats grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Score', value: `${result.score}/${maxScore}` },
          { label: 'Accuracy', value: `${accuracy}%` },
          { label: 'Correct', value: result.correct },
          { label: 'Time', value: timeStr },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-slate-50 p-4 text-center">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {item.label}
            </div>
            <div className="mt-2 text-lg font-black text-slate-900 sm:text-2xl">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Weak areas breakdown */}
      <div>
        <h3 className="mb-3 text-sm font-black text-slate-900">Weak Areas (sorted by accuracy)</h3>
        <div className="space-y-3">
          {groupStats.map((stat) => {
            // Simple bar fill percentage
            const fillPercent = stat.accuracy;
            const barColor =
              fillPercent >= 75 ? 'bg-emerald-500' : fillPercent >= 50 ? 'bg-amber-500' : 'bg-rose-500';
            const textColor =
              fillPercent >= 75 ? 'text-emerald-700' : fillPercent >= 50 ? 'text-amber-700' : 'text-rose-700';

            return (
              <div
                key={stat.group}
                className="rounded-2xl bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="font-bold text-slate-900">{stat.group}</span>
                  <span className={`text-sm font-black ${textColor}`}>
                    {stat.correct}/{stat.count} ({Math.round(fillPercent)}%)
                  </span>
                </div>
                {/* Bar */}
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full transition-all ${barColor}`}
                    style={{ width: `${Math.max(5, fillPercent)}%` }}
                  />
                </div>
                {/* Suggestion */}
                {fillPercent < 75 && (
                  <p className="mt-2 text-xs font-medium text-slate-600">
                    💡 Focus on {stat.group} — practice more questions from this area.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────
 * QuestionExplainButton — "Why?" button that fetches AI explanation on demand
 * ─────────────────────────────────────────────────────────────────────── */
function QuestionExplainButton({
  questionId,
  question,
  options,
  correctAnswerIndex,
  explanation,
  isLoading,
  onFetch,
}: {
  questionId: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string | null | undefined;
  isLoading: boolean;
  onFetch: () => Promise<void>;
}) {
  const [expanded, setExpanded] = React.useState(false);

  // If explanation is not yet loaded, show the fetch button
  if (explanation === undefined) {
    return (
      <button
        type="button"
        onClick={async () => {
          await onFetch();
          setExpanded(true);
        }}
        disabled={isLoading}
        className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 border border-indigo-200 px-4 py-2.5 text-xs font-black uppercase tracking-widest text-indigo-700 hover:bg-indigo-100 disabled:opacity-50"
      >
        {isLoading ? '⏳ Loading…' : '💡 Why This Answer?'}
      </button>
    );
  }

  // If fetch failed (explanation is null), show error
  if (explanation === null) {
    return (
      <div className="rounded-xl bg-rose-50 border border-rose-100 px-4 py-3 text-sm font-medium text-rose-700">
        ⚠️ Could not load explanation. Please try again later.
      </div>
    );
  }

  // Explanation loaded and not null — show expanded view
  return (
    <div
      className="rounded-xl bg-indigo-50 border border-indigo-200 p-4 text-sm text-indigo-700"
    >
      <div
        className="flex items-start justify-between gap-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setExpanded(!expanded);
          }
        }}
      >
        <span className="font-bold">💡 Why This Answer?</span>
        <span className={`text-xs ${expanded ? 'rotate-180' : ''} transition-transform`}>
          ▼
        </span>
      </div>
      {expanded && (
        <p className="mt-3 text-sm leading-relaxed font-medium text-indigo-600">
          {explanation}
        </p>
      )}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn('h-3 w-3 rounded', color)} />
      {label}
    </div>
  );
}
