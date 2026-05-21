/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useCallback, useEffect, useState } from 'react';
import {
  BookOpen,
  Bot,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardList,
  Home,
  LogIn,
  LogOut,
  Menu,
  Sparkles,
  Target,
  User,
  UserRound,
  X,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { cn } from './lib/utils';
import SEO from './components/SEO';
import { FIREBASE_AUTH_ENABLED, FIRESTORE_FEATURES_ENABLED } from './lib/cloudFeatures';
import { SYLLABUS } from './data/syllabus';
import {
  auth,
  DEFAULT_USER_PROGRESS,
  DEFAULT_USER_STATS,
  getUserProgress,
  getUserStats,
  logout,
  resetPassword,
  saveUserProgress,
  saveUserStats,
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
  tryEnsureUserDocuments,
} from './lib/firebase';
import { AuthFormState, UserProgress, UserStats } from './types';

// Lazy load pages for performance
const HomePage = React.lazy(() => import('./pages/Home'));
const SyllabusPage = React.lazy(() => import('./pages/Syllabus'));
const ArenaPage = React.lazy(() => import('./pages/Arena'));
const TutorPage = React.lazy(() => import('./pages/Tutor'));
const LearningLabPage = React.lazy(() => import('./pages/LearningLab'));
const DailyChallengesPage = React.lazy(() => import('./pages/DailyChallenges'));
const ProgressHubPage = React.lazy(() => import('./pages/ProgressHub'));
const MockTestsPage = React.lazy(() => import('./pages/MockTests'));
const PrepHubPage = React.lazy(() => import('./pages/PrepHub'));
const StudentProfilePage = React.lazy(() => import('./pages/StudentProfile'));
const AboutPage = React.lazy(() => import('./pages/About'));
const ContactPage = React.lazy(() => import('./pages/Contact'));
const SitemapPage = React.lazy(() => import('./pages/Sitemap'));
const AdminPipelinePage = React.lazy(() => import('./pages/AdminPipeline'));
const BlogPage = React.lazy(() => import('./pages/Blog'));
const ClassPage = React.lazy(() => import('./pages/ClassPage'));
const SkillsLabPage = React.lazy(() => import('./pages/SkillsLab'));

type AuthMethod = 'google' | 'email';
type AuthMode = 'signin' | 'signup' | 'reset';

type SessionSummary = {
  completedChapters: string[];
  lastChapter: string;
  scoreGained: number;
  xpGained: number;
};

type RewardSummary = {
  scoreGained: number;
  xpGained: number;
};

const EMPTY_AUTH_FORM: AuthFormState = {
  email: '',
  password: '',
};

const getRankFromXp = (xp: number) => {
  if (xp >= 1500) return 'Scholar';
  if (xp >= 750) return 'Explorer';
  if (xp >= 250) return 'Apprentice';
  return 'Beginner';
};

const TAB_TO_PATH: Record<string, string> = {
  home: '/',
  syllabus: '/syllabus',
  arena: '/practice',
  daily: '/daily-challenges',
  mock_tests: '/mock-tests',
  progress: '/progress',
  learning_lab: '/learning-lab',
  prep_hub: '/preparation',
  about: '/about',
  contact: '/contact',
  sitemap: '/sitemap',
  profile: '/profile',
  admin_pipeline: '/admin',
  blog: '/blog',
  skills_lab: '/skills-lab',
  class_5: '/class-5',
  class_6: '/class-6',
  class_7: '/class-7',
  class_8: '/class-8',
  class_9: '/class-9',
  class_10: '/class-10',
  class_11: '/class-11',
  class_12: '/class-12',
};

const PATH_TO_TAB: Record<string, string> = Object.fromEntries(
  Object.entries(TAB_TO_PATH).map(([tab, path]) => [path, tab])
);

const PAGE_SEO: Record<string, { title: string; description: string; keywords: string; url: string }> = {
  home: {
    title: 'Syllab.in - Free AI Learning App for CBSE, NCERT, JEE and NEET',
    description: 'Syllab.in is a free AI learning platform for Class 5 to 12 students. Study CBSE NCERT chapters, practice MCQs, take mock tests, solve doubts with AI tutor — completely free.',
    keywords: 'Syllab, AI learning app, NCERT, CBSE, JEE, NEET, EAMCET, free online learning, class 5 to 12',
    url: 'https://syllab.in/',
  },
  syllabus: {
    title: 'Class 5 to 12 NCERT Syllabus Explorer | CBSE Chapters | Syllab.in',
    description: 'Explore class-wise and subject-wise NCERT chapters with summaries, concepts, AI tutor support, and practice questions for Class 5 to 12.',
    keywords: 'NCERT syllabus, CBSE chapters, class 5 to 12 syllabus, chapter summary, NCERT notes',
    url: 'https://syllab.in/syllabus',
  },
  arena: {
    title: 'Practice Arena - Chapter Wise MCQs for CBSE NCERT | Syllab.in',
    description: 'Practice timed NCERT-aligned MCQs for every chapter with scoring, explanations, and mistake tracking for Class 5 to 12 students.',
    keywords: 'practice MCQ, CBSE quiz, NCERT questions, chapter wise practice, online quiz',
    url: 'https://syllab.in/practice',
  },
  daily: {
    title: 'Daily Challenges for JEE, NEET, EAMCET and Classes 5 to 10 | Syllab.in',
    description: 'Solve daily timed quiz challenges for JEE, NEET, EAMCET, and school aptitude with score rankings and streak tracking.',
    keywords: 'daily challenges, EAMCET quiz, IIT JEE practice, NEET questions, daily quiz, aptitude quiz',
    url: 'https://syllab.in/daily-challenges',
  },
  progress: {
    title: 'Student Progress Hub with Learning Analytics | Syllab.in',
    description: 'Track your weak topics, XP, learning streaks, paused quizzes, and full study progress in one student dashboard on Syllab.in.',
    keywords: 'student analytics, progress dashboard, learning tracker, AI weakness finder, study progress',
    url: 'https://syllab.in/progress',
  },
  mock_tests: {
    title: 'Free Mock Tests for JEE, NEET, EAMCET and Board Exams | Syllab.in',
    description: 'Attempt free exam-style mock tests for JEE, NEET, EAMCET and CBSE board exams with timed questions and instant scoring.',
    keywords: 'JEE mock test, NEET mock test, EAMCET mock test, free online mock test, board exam practice',
    url: 'https://syllab.in/mock-tests',
  },
  prep_hub: {
    title: 'JEE NEET EAMCET and Board Exam Preparation Hub | Syllab.in',
    description: 'Read exam strategies, chapter-wise weightage guides, JEE syllabus notes, NEET preparation tips and EAMCET practice plans on Syllab.in.',
    keywords: 'JEE syllabus, NEET preparation, EAMCET practice, board exam strategy, exam tips',
    url: 'https://syllab.in/preparation',
  },
  profile: {
    title: 'Student Profile, Stats and Badges | Syllab.in',
    description: 'View your XP, streaks, badges, share achievements and track your learning journey on Syllab.in.',
    keywords: 'student profile, learning streak, badges, XP, referral',
    url: 'https://syllab.in/profile',
  },
  learning_lab: {
    title: 'AI Learning Lab - Generate Notes, Flashcards and Scan Solve | Syllab.in',
    description: 'Upload study material to generate concepts, flashcards, and MCQs instantly, or scan homework problems for step-by-step AI solutions.',
    keywords: 'learning lab, study arena, scan solve, AI notes, MCQ generator, homework solver, flashcards',
    url: 'https://syllab.in/learning-lab',
  },
  about: {
    title: 'About Syllab.in - Free AI Learning for Indian Students',
    description: 'Learn about Syllab.in and its mission to make high-quality AI-powered learning completely free and accessible for every Indian student.',
    keywords: 'about Syllab, AI education India, free learning platform',
    url: 'https://syllab.in/about',
  },
  contact: {
    title: 'Contact Syllab.in Support',
    description: 'Contact Syllab.in for learning support, platform help, partnerships, and academic questions.',
    keywords: 'contact Syllab, student support, help',
    url: 'https://syllab.in/contact',
  },
  sitemap: {
    title: 'Syllab.in Sitemap',
    description: 'Browse the Syllab.in platform sitemap with all pages, subjects, classes, and learning modules.',
    keywords: 'Syllab sitemap, learning pages',
    url: 'https://syllab.in/sitemap',
  },
  admin_pipeline: {
    title: 'Syllab Admin Pipeline',
    description: 'Admin tooling for reviewing learning content and generation workflows.',
    keywords: 'Syllab admin',
    url: 'https://syllab.in/admin',
  },
  skills_lab: {
    title: 'Skills Lab — Python, SQL, AI, Data Analytics & Aptitude | Syllab.in',
    description: 'Learn Python, SQL, AI Basics, Data Analytics, Aptitude, and build Mini Projects with AI-powered coding feedback. Free skills lab for Class 5-12 students.',
    keywords: 'Python for students, SQL basics, AI basics India, data analytics Class 10 11 12, aptitude test, coding for students',
    url: 'https://syllab.in/skills-lab',
  },
  blog: {
    title: 'Study Tips, JEE NEET CBSE Guides | Syllab.in Blog',
    description: 'Expert study guides for CBSE Class 5-12, JEE Mains, NEET preparation. Free study plans, important chapters, and resources for Indian students.',
    keywords: 'CBSE study tips, JEE preparation, NEET study plan, Class 10 board exam tips, free resources India',
    url: 'https://syllab.in/blog',
  },
  class_5: { title: 'Class 5 NCERT Syllabus & Study Guide | Syllab.in', description: 'Class 5 CBSE NCERT complete guide with important chapters, subjects, and free practice for Maths, EVS, English and Hindi.', keywords: 'Class 5 NCERT, Class 5 CBSE, Class 5 Maths, Class 5 EVS', url: 'https://syllab.in/class-5' },
  class_6: { title: 'Class 6 NCERT Syllabus & Study Guide | Syllab.in', description: 'Class 6 CBSE NCERT guide: Maths, Science, Social Science, English and Hindi important chapters and study tips.', keywords: 'Class 6 NCERT, Class 6 CBSE, Class 6 Maths, Class 6 Science', url: 'https://syllab.in/class-6' },
  class_7: { title: 'Class 7 NCERT Syllabus & Study Guide | Syllab.in', description: 'Class 7 CBSE NCERT guide with Algebra, Science, Social Science and Language important chapters and tips.', keywords: 'Class 7 NCERT, Class 7 CBSE, Class 7 Maths, Class 7 Science', url: 'https://syllab.in/class-7' },
  class_8: { title: 'Class 8 NCERT Syllabus & Study Guide | Syllab.in', description: 'Class 8 CBSE NCERT complete guide with Rational Numbers, Microorganisms, History and Language chapters.', keywords: 'Class 8 NCERT, Class 8 CBSE, Class 8 Maths, Class 8 Science', url: 'https://syllab.in/class-8' },
  class_9: { title: 'Class 9 NCERT Syllabus & Study Guide | Syllab.in', description: 'Class 9 CBSE NCERT guide: Number Systems, Motion, Atoms, Democratic Politics — all important chapters and study tips.', keywords: 'Class 9 NCERT, Class 9 CBSE, Class 9 Maths, Class 9 Science, Class 9 Social Science', url: 'https://syllab.in/class-9' },
  class_10: { title: 'Class 10 NCERT Syllabus, Board Exam Tips | Syllab.in', description: 'Class 10 CBSE board exam preparation guide with important NCERT chapters, study plan, and free practice for all subjects.', keywords: 'Class 10 NCERT, Class 10 CBSE board exam, Class 10 Maths, Class 10 Science, board exam tips', url: 'https://syllab.in/class-10' },
  class_11: { title: 'Class 11 NCERT Syllabus, JEE NEET Preparation | Syllab.in', description: 'Class 11 CBSE NCERT guide with Physics, Chemistry, Maths and Biology important chapters for boards and JEE/NEET.', keywords: 'Class 11 NCERT, Class 11 CBSE, Class 11 Physics, Class 11 Chemistry, JEE Class 11', url: 'https://syllab.in/class-11' },
  class_12: { title: 'Class 12 NCERT Syllabus, Board & JEE NEET Guide | Syllab.in', description: 'Class 12 CBSE board exam and JEE/NEET preparation guide with Physics, Chemistry, Maths and Biology important chapters.', keywords: 'Class 12 NCERT, Class 12 CBSE, Class 12 Physics, Class 12 Maths, JEE NEET Class 12', url: 'https://syllab.in/class-12' },
};

function PageFallback() {
  return (
    <div className="flex h-[calc(100vh-220px)] flex-col items-center justify-center space-y-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
        Loading module...
      </p>
    </div>
  );
}

function LoginModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [method, setMethod] = useState<AuthMethod>('google');
  const [mode, setMode] = useState<AuthMode>('signin');
  const [form, setForm] = useState<AuthFormState>(EMPTY_AUTH_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setMethod('google');
      setMode('signin');
      setForm(EMPTY_AUTH_FORM);
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const updateField = (key: keyof AuthFormState, value: string) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleEmailAuth = async () => {
    if (loading) {
      return;
    }
    if (!FIREBASE_AUTH_ENABLED) {
      setError('Authentication is not configured yet. Set a valid Firebase Web API key and VITE_FIREBASE_AUTH_ENABLED=true.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        await signUpWithEmail(form.email, form.password);
      } else {
        await signInWithEmail(form.email, form.password);
      }

      onClose();
    } catch (authError) {
      const message = authError instanceof Error ? authError.message : 'Something went wrong';
      if (mode === 'signup' && message.includes('already registered')) {
        setMode('signin');
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (loading) {
      return;
    }
    if (!FIREBASE_AUTH_ENABLED) {
      setError('Google sign-in is not configured yet. Set a valid Firebase Web API key and VITE_FIREBASE_AUTH_ENABLED=true.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signInWithGoogle();
      onClose();
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (loading) return;
    if (!FIREBASE_AUTH_ENABLED) {
      setError('Password reset is not configured yet. Set a valid Firebase Web API key and VITE_FIREBASE_AUTH_ENABLED=true.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await resetPassword(form.email);
      setError('success:Check your email for the password reset link!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto p-3 sm:items-center sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={loading ? undefined : onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto rounded-[1.75rem] bg-white p-5 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:rounded-[2.5rem] sm:p-8 md:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50 sm:right-6 sm:top-6"
          aria-label="Close authentication modal"
        >
          <X size={22} />
        </button>

        <div className="space-y-5 sm:space-y-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-emerald-500/20 sm:mb-4 sm:h-16 sm:w-16">
              <User size={24} />
            </div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
              {mode === 'signin' ? 'Welcome Back' : mode === 'reset' ? 'Reset Password' : 'Create Your Account'}
            </h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
              {mode === 'signin'
                ? 'Sign in to continue your learning progress.'
                : mode === 'reset'
                  ? 'Enter your email to receive a reset link.'
                  : 'Register to save stats, progress, and mistakes securely.'}
            </p>
          </div>

          {mode !== 'reset' ? (
            <div className="flex rounded-2xl bg-slate-100 p-1">
              {(['google', 'email'] as AuthMethod[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setMethod(value);
                    setError(null);
                  }}
                  disabled={loading}
                  className={cn(
                    'min-w-0 flex-1 rounded-xl py-3 text-[10px] font-black uppercase tracking-widest transition-all',
                    method === value ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600',
                  )}
                >
                  {value === 'google' ? 'Google' : 'Email'}
                </button>
              ))}
            </div>
          ) : null}

          {error ? (
            <div className={cn(
              "rounded-2xl border px-4 py-3 text-sm font-semibold",
              error.startsWith('success:')
                ? "border-emerald-100 bg-emerald-50 text-emerald-600"
                : "border-rose-100 bg-rose-50 text-rose-600"
            )}>
              {error.replace('success:', '')}
            </div>
          ) : null}

          {method === 'google' && mode !== 'reset' ? (
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-slate-100 bg-white px-4 py-4 text-sm font-black transition-all hover:border-primary disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:py-5"
            >
              {loading ? <Zap size={18} className="animate-spin" /> : <LogIn size={18} />}
              <span>{loading ? 'Please wait...' : 'Continue with Google'}</span>
            </button>
          ) : null}

          {(method === 'email' || mode === 'reset') ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  placeholder="name@example.com"
                  disabled={loading}
                  className="w-full rounded-2xl border-2 border-transparent bg-slate-50 p-3.5 text-base font-bold outline-none transition-all focus:border-primary focus:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:p-4"
                />
              </div>

              {mode !== 'reset' ? (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Password
                    </label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => {
                          setMode('reset');
                          setError(null);
                        }}
                        className="mr-2 text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) => updateField('password', event.target.value)}
                    placeholder="Enter your password"
                    disabled={loading}
                    className="w-full rounded-2xl border-2 border-transparent bg-slate-50 p-3.5 text-base font-bold outline-none transition-all focus:border-primary focus:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:p-4"
                  />
                </div>
              ) : null}

              <button
                type="button"
                onClick={mode === 'reset' ? handleResetPassword : handleEmailAuth}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-4 text-base font-black text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 sm:py-5 sm:text-lg"
              >
                {loading ? <Zap className="animate-spin" size={20} /> : <LogIn size={20} />}
                {loading ? 'Sending...' : mode === 'reset' ? 'Send Reset Link' : mode === 'signin' ? 'Login' : 'Sign Up'}
              </button>

              {mode === 'reset' && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setError(null);
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-primary"
                  >
                    Back to Login
                  </button>
                </div>
              )}
            </div>
          ) : null}

          {method === 'email' ? (
            <div className="text-center">
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setMode((current) => (current === 'signin' ? 'signup' : 'signin'));
                  setError(null);
                }}
                className="text-xs font-bold text-slate-500 transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {mode === 'signin'
                  ? "Don't have an account? Create one"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(() => PATH_TO_TAB[window.location.pathname] || 'home');
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [stats, setStats] = useState<UserStats>(DEFAULT_USER_STATS);
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_USER_PROGRESS);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [appError, setAppError] = useState<string | null>(null);
  const [practiceConfig, setPracticeConfig] = useState<Record<string, unknown> | null>(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTutorOpen, setTutorOpen] = useState(false);
  const [isMockExamMode, setMockExamMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthLoading(false);
      try {
        if (user) {
          setCurrentUser(user);

          if (!FIRESTORE_FEATURES_ENABLED) {
            setStats(DEFAULT_USER_STATS);
            setProgress(DEFAULT_USER_PROGRESS);
            setAppError(null);
            return;
          }

          const profileReady = await tryEnsureUserDocuments(user);

          const [resolvedStats, resolvedProgress] = await Promise.all([
            getUserStats(user.uid),
            getUserProgress(user.uid),
          ]);

          setStats(resolvedStats ?? DEFAULT_USER_STATS);
          setProgress(resolvedProgress ?? DEFAULT_USER_PROGRESS);
          // Successful sign-in: clear any stale "couldn't load account" banner
          setAppError(profileReady ? null : 'Signed in, but cloud profile sync is not ready. Local features still work.');
        } else {
          // Signed-out / guest. This is a normal, valid state — never an error.
          setCurrentUser(null);
          setStats(DEFAULT_USER_STATS);
          setProgress(DEFAULT_USER_PROGRESS);
          // Critical: clear stale account-load error so logged-out users don't
          // see "Unable to load your account data right now" forever.
          setAppError((prev) =>
            prev === 'Unable to load your account data right now.' ? null : prev,
          );
        }
      } catch (error) {
        console.error('Auth state initialization failed.', error);
        // Only show this banner when the user is actually signed in. For
        // guests we silently swallow it — they don't have an "account" to load.
        if (user && FIRESTORE_FEATURES_ENABLED) {
          setStats(DEFAULT_USER_STATS);
          setProgress(DEFAULT_USER_PROGRESS);
          setAppError('Signed in, but cloud account data could not be loaded. Check Firestore rules/env.');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, []);

  const navigate = useCallback((tab: string) => {
    setActiveTab(tab);
    const path = TAB_TO_PATH[tab] || '/';
    if (window.location.pathname !== path) {
      window.history.pushState({ tab }, '', path);
    }
  }, []);

  useEffect(() => {
    const handlePop = () => {
      const tab = PATH_TO_TAB[window.location.pathname] || 'home';
      setActiveTab(tab);
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const handleSessionComplete = async (summary: SessionSummary) => {
    const nextXp = stats.xp + summary.xpGained;
    const nextStats: UserStats = {
      ...stats,
      score: stats.score + summary.scoreGained,
      xp: nextXp,
      rank: getRankFromXp(nextXp),
    };

    const nextProgress: UserProgress = {
      completedChapters: Array.from(new Set([...progress.completedChapters, ...summary.completedChapters])),
      lastChapter: summary.lastChapter,
      conceptProgress: progress.conceptProgress || {},
    };

    setStats(nextStats);
    setProgress(nextProgress);

    if (!currentUser || !FIRESTORE_FEATURES_ENABLED) {
      return;
    }

    try {
      await Promise.all([
        saveUserStats(currentUser.uid, nextStats),
        saveUserProgress(currentUser.uid, nextProgress),
      ]);
    } catch (error) {
      console.error('Failed to save session progress.', error);
      setAppError('Progress could not be saved. Please try again.');
    }
  };

  const handleRewardComplete = async (summary: RewardSummary) => {
    if (summary.scoreGained <= 0 && summary.xpGained <= 0) return;
    const nextXp = stats.xp + summary.xpGained;
    const nextStats: UserStats = {
      ...stats,
      score: stats.score + summary.scoreGained,
      xp: nextXp,
      rank: getRankFromXp(nextXp),
    };

    setStats(nextStats);

    if (!currentUser || !FIRESTORE_FEATURES_ENABLED) {
      return;
    }

    try {
      await saveUserStats(currentUser.uid, nextStats);
    } catch (error) {
      console.error('Failed to save XP reward.', error);
      setAppError('XP could not be saved. Please try again.');
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
    { id: 'arena', label: 'Practice Arena', icon: Target },
    { id: 'daily', label: 'Daily Dose', icon: CalendarDays },
    { id: 'mock_tests', label: 'Mock Tests', icon: ClipboardList },
    { id: 'progress', label: 'Progress Hub', icon: ChartNoAxesCombined },
    { id: 'learning_lab', label: 'Learning Lab', icon: Sparkles },
    { id: 'skills_lab', label: 'Skills Lab', icon: Zap },
    { id: 'profile', label: 'Profile', icon: UserRound },
  ];

  const isInitializing = loading || authLoading;
  const seo = PAGE_SEO[activeTab] || PAGE_SEO.home;
  const setTab = navigate;

  return (
    <div className="flex min-h-screen flex-col bg-bg-beige text-secondary">
      <SEO {...seo} />
      {!isMockExamMode ? (
      <header className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between border-b border-slate-200/50 bg-white/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xl font-black text-white shadow-xl shadow-emerald-500/20">
            S
          </div>
          <span className="font-heading text-2xl font-black tracking-tight text-secondary">Syllab</span>
        </button>

        <nav className="hidden items-center gap-1 rounded-2xl border border-slate-200/50 bg-white shadow-sm p-1.5 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.id)}
              className={cn(
                'rounded-xl px-5 py-2.5 text-[9px] font-black uppercase tracking-widest transition-all',
                activeTab === item.id
                  ? 'bg-secondary text-white shadow-xl shadow-slate-900/20'
                  : 'text-slate-500 hover:text-secondary',
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 border-r border-slate-200 pr-6 md:flex">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 shadow-sm">
                  {stats.xp.toLocaleString()} XP
                </div>
                <div className="text-right">
                  <div className="max-w-[180px] truncate text-[10px] font-black text-slate-900">
                    {currentUser.email || 'Student'}
                  </div>
                  <div className="flex items-center justify-end gap-2 text-[8px] font-black uppercase tracking-widest text-primary">
                    <span>{stats.rank}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="p-2 text-slate-400 transition-colors hover:text-rose-500"
                  title="Sign out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setLoginModalOpen(true)}
                className="btn-primary px-6 py-2.5 text-xs font-black uppercase tracking-widest"
              >
                Login
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="p-2 text-slate-600 lg:hidden"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      ) : null}

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white px-6 pt-24 lg:hidden"
          >
            <div className="grid grid-cols-1 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center gap-4 rounded-2xl p-5 text-lg font-black transition-all',
                    activeTab === item.id ? 'bg-primary text-white shadow-xl shadow-emerald-500/20' : 'bg-slate-50 text-slate-500',
                  )}
                >
                  <item.icon size={24} />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />

      <main className={cn(
        'flex-1 overflow-y-auto bg-slate-50/50',
        isMockExamMode ? 'px-0 pb-0 pt-0' : 'px-4 pb-12 pt-24 sm:px-6',
      )}>
        <div className={cn(isMockExamMode ? 'mx-0 max-w-none' : 'mx-auto max-w-7xl')}>
          {appError && currentUser ? (
            <div className="mb-6 rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-700 flex items-center justify-between gap-4">
              <span>{appError}</span>
              <button
                type="button"
                onClick={() => setAppError(null)}
                className="text-amber-700 hover:text-amber-900 text-xs font-black uppercase tracking-widest"
              >
                Dismiss
              </button>
            </div>
          ) : null}

          {isInitializing ? (
            <div className="flex h-[calc(100vh-160px)] flex-col items-center justify-center space-y-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Initializing platform settings...
              </p>
            </div>
          ) : (
            <Suspense fallback={<PageFallback />}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'home' ? <HomePage setTab={navigate} /> : null}
                  {activeTab === 'syllabus' ? (
                    <SyllabusPage
                      setTab={navigate}
                      openTutor={() => setTutorOpen(true)}
                      syllabus={SYLLABUS}
                      setPracticeConfig={setPracticeConfig}
                    />
                  ) : null}
                  {activeTab === 'arena' ? (
                    <ArenaPage
                      practiceConfig={practiceConfig}
                      clearConfig={() => setPracticeConfig(null)}
                      currentUser={currentUser}
                      onSessionComplete={handleSessionComplete}
                    />
                  ) : null}
                  {activeTab === 'daily' ? (
                    <DailyChallengesPage currentUser={currentUser} onReward={handleRewardComplete} />
                  ) : null}
                  {activeTab === 'mock_tests' ? (
                    <MockTestsPage
                      currentUser={currentUser}
                      setTab={navigate}
                      onExamModeChange={setMockExamMode}
                      onReward={handleRewardComplete}
                    />
                  ) : null}
                  {['progress', 'analytics'].includes(activeTab) ? <ProgressHubPage currentUser={currentUser} setTab={navigate} /> : null}
                  {['learning_lab', 'study_arena', 'scan'].includes(activeTab) ? <LearningLabPage /> : null}
                  {activeTab === 'prep_hub' ? <PrepHubPage setTab={navigate} /> : null}
                  {activeTab === 'profile' ? <StudentProfilePage currentUser={currentUser} stats={stats} setTab={navigate} /> : null}
                  {activeTab === 'about' ? <AboutPage /> : null}
                  {activeTab === 'contact' ? <ContactPage /> : null}
                  {activeTab === 'sitemap' ? <SitemapPage setTab={navigate} /> : null}
                  {activeTab === 'admin_pipeline' ? <AdminPipelinePage /> : null}
                  {activeTab === 'blog' ? <BlogPage setTab={navigate} /> : null}
                  {activeTab === 'skills_lab' ? <SkillsLabPage setTab={navigate} /> : null}
                  {activeTab.startsWith('class_') ? (
                    <ClassPage classNum={parseInt(activeTab.replace('class_', ''), 10)} setTab={navigate} />
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </Suspense>
          )}
        </div>
      </main>

      {!isMockExamMode ? (
      <div className="fixed bottom-5 right-5 z-[55] flex flex-col items-end gap-3">
        <AnimatePresence>
          {isTutorOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              className="h-[min(680px,calc(100dvh-7rem))] w-[min(420px,calc(100vw-2rem))]"
            >
              <Suspense fallback={<div className="h-full rounded-3xl bg-white p-8 text-center text-sm font-bold text-slate-400 shadow-2xl">Loading tutor...</div>}>
                <TutorPage currentUser={currentUser} floating onClose={() => setTutorOpen(false)} />
              </Suspense>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => setTutorOpen((open) => !open)}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-2xl shadow-emerald-500/30 transition-transform hover:-translate-y-0.5"
          aria-label={isTutorOpen ? 'Close AI tutor' : 'Open AI tutor'}
          title="AI Tutor"
        >
          <Bot size={24} />
        </button>
      </div>
      ) : null}

      {!isMockExamMode ? (
      <footer className="bg-secondary text-white border-t border-slate-800 py-24 px-8 mt-24">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-12">
          <div className="space-y-8">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xl font-black text-white shadow-lg shadow-emerald-500/20">
                S
              </div>
              <span className="font-heading text-2xl font-black tracking-tight">Syllab</span>
            </button>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              India's AI-powered learning platform for CBSE NCERT practice, concepts, and exam readiness from Class 5 to 12.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-8">Learning Hub</h4>
            <ul className="space-y-4">
              <li><button onClick={() => navigate('syllabus')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Syllabus Explorer</button></li>
              <li><button onClick={() => navigate('arena')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Practice Arena</button></li>
              <li><button onClick={() => navigate('daily')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Daily Challenges</button></li>
              <li><button onClick={() => navigate('mock_tests')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Mock Tests</button></li>
              <li><button onClick={() => navigate('progress')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Progress Hub</button></li>
              <li><button onClick={() => navigate('learning_lab')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Learning Lab</button></li>
              <li><button onClick={() => setTutorOpen(true)} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">AI Mentoring</button></li>
              <li><button onClick={() => navigate('prep_hub')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Preparation Guides</button></li>
              <li><button onClick={() => navigate('blog')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Study Blog</button></li>
              <li><button onClick={() => navigate('skills_lab')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Skills Lab</button></li>
              <li><button onClick={() => navigate('sitemap')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Platform Sitemap</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-8">By Class</h4>
            <ul className="space-y-4">
              {[5,6,7,8,9,10,11,12].map((c) => (
                <li key={c}><button onClick={() => navigate(`class_${c}`)} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Class {c}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-8">Company</h4>
            <ul className="space-y-4">
              <li><button onClick={() => navigate('about')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Our Mission</button></li>
              <li><button onClick={() => navigate('contact')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Contact Support</button></li>
              <li><a href="https://syllab.in/sitemap.xml" target="_blank" rel="noreferrer" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Sitemap</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-8">Stay Connected</h4>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-300 hover:text-primary transition-all cursor-pointer border border-white/5 italic font-black">X</div>
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-300 hover:text-primary transition-all cursor-pointer border border-white/5 italic font-black">in</div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">© 2026 Syllab AI. Designed for Excellence.</div>
          <div className="flex gap-8">
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Privacy Policy</button>
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </footer>
      ) : null}
    </div>
  );
}
