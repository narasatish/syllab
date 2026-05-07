/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useEffect, useState } from 'react';
import {
  BookOpen,
  Bot,
  Camera,
  Home,
  LogIn,
  LogOut,
  Menu,
  Sparkles,
  Target,
  Trophy,
  User,
  X,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { cn } from './lib/utils';
import { generateQuestions } from './data/questions';
import { SYLLABUS } from './data/syllabus';
import {
  auth,
  DEFAULT_USER_PROGRESS,
  DEFAULT_USER_STATS,
  ensureUserDocuments,
  getUserProgress,
  getUserStats,
  logout,
  resetPassword,
  saveUserProgress,
  saveUserStats,
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
} from './lib/firebase';
import { AuthFormState, Question, UserProgress, UserStats } from './types';

// Lazy load pages for performance
const HomePage = React.lazy(() => import('./pages/Home'));
const SyllabusPage = React.lazy(() => import('./pages/Syllabus'));
const ArenaPage = React.lazy(() => import('./pages/Arena'));
const TutorPage = React.lazy(() => import('./pages/Tutor'));
const DashboardPage = React.lazy(() => import('./pages/Dashboard'));
const ScanPage = React.lazy(() => import('./pages/Scan'));
const StudyArenaPage = React.lazy(() => import('./pages/StudyArena'));
const AboutPage = React.lazy(() => import('./pages/About'));
const ContactPage = React.lazy(() => import('./pages/Contact'));
const SitemapPage = React.lazy(() => import('./pages/Sitemap'));
const AdminPipelinePage = React.lazy(() => import('./pages/AdminPipeline'));

type AuthMethod = 'google' | 'email';
type AuthMode = 'signin' | 'signup' | 'reset';

type SessionSummary = {
  completedChapters: string[];
  lastChapter: string;
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
      setError(authError instanceof Error ? authError.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (loading) {
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={loading ? undefined : onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md rounded-[2.5rem] bg-white p-10 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute right-6 top-6 text-slate-400 transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Close authentication modal"
        >
          <X size={22} />
        </button>

        <div className="space-y-6">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-emerald-500/20">
              <User size={28} />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              {mode === 'signin' ? 'Welcome Back' : mode === 'reset' ? 'Reset Password' : 'Create Your Account'}
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-500">
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
                    'flex-1 rounded-xl py-3 text-[10px] font-black uppercase tracking-widest transition-all',
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
              className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-slate-100 bg-white px-5 py-5 text-sm font-black transition-all hover:border-primary disabled:cursor-not-allowed disabled:opacity-60"
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
                  className="w-full rounded-2xl border-2 border-transparent bg-slate-50 p-4 font-bold outline-none transition-all focus:border-primary focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
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
                    className="w-full rounded-2xl border-2 border-transparent bg-slate-50 p-4 font-bold outline-none transition-all focus:border-primary focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              ) : null}

              <button
                type="button"
                onClick={mode === 'reset' ? handleResetPassword : handleEmailAuth}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-5 text-lg font-black text-white shadow-lg shadow-violet-500/20 transition-all hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
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
  const [activeTab, setActiveTab] = useState('home');
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [stats, setStats] = useState<UserStats>(DEFAULT_USER_STATS);
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_USER_PROGRESS);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [appError, setAppError] = useState<string | null>(null);
  const [practiceConfig, setPracticeConfig] = useState<Record<string, unknown> | null>(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setCurrentUser(user);

          // Use the robust utility to ensure all docs exist
          await ensureUserDocuments(user);

          const [resolvedStats, resolvedProgress] = await Promise.all([
            getUserStats(user.uid),
            getUserProgress(user.uid),
          ]);

          setStats(resolvedStats ?? DEFAULT_USER_STATS);
          setProgress(resolvedProgress ?? DEFAULT_USER_PROGRESS);
          // Successful sign-in: clear any stale "couldn't load account" banner
          setAppError(null);
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
        if (user) {
          setAppError('Unable to load your account data right now.');
        }
      } finally {
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const initApp = async () => {
      try {
        const allQuestions = generateQuestions(SYLLABUS);
        setQuestions(allQuestions);
      } catch (error) {
        console.error('Application initialization error', error);
        setAppError('Unable to initialize the study database.');
      } finally {
        setLoading(false);
      }
    };

    initApp();
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
    };

    setStats(nextStats);
    setProgress(nextProgress);

    if (!currentUser) {
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

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
    { id: 'arena', label: 'Practice Arena', icon: Target },
    { id: 'study_arena', label: 'Study Arena', icon: Sparkles },
    { id: 'tutor', label: 'AI Tutor', icon: Bot },
    { id: 'scan', label: 'Scan & Solve', icon: Camera },
    { id: 'standing', label: 'Standing', icon: Trophy },
  ];

  const isInitializing = loading || authLoading;

  return (
    <div className="flex min-h-screen flex-col bg-bg-beige text-secondary">
      <header className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between border-b border-slate-200/50 bg-white/80 px-8 backdrop-blur-xl">
        <button
          onClick={() => setActiveTab('home')}
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
              onClick={() => setActiveTab(item.id)}
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
                <div className="text-right">
                  <div className="max-w-[180px] truncate text-[10px] font-black text-slate-900">
                    {currentUser.email || 'Student'}
                  </div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-primary">{stats.rank}</div>
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

      <main className="flex-1 overflow-y-auto bg-slate-50/50 px-6 pb-12 pt-24">
        <div className="mx-auto max-w-7xl">
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
                  {activeTab === 'home' ? <HomePage setTab={setActiveTab} currentUser={currentUser} /> : null}
                  {activeTab === 'syllabus' ? (
                    <SyllabusPage
                      setTab={setActiveTab}
                      syllabus={SYLLABUS}
                      setPracticeConfig={setPracticeConfig}
                    />
                  ) : null}
                  {activeTab === 'arena' ? (
                    <ArenaPage
                      questions={questions}
                      practiceConfig={practiceConfig}
                      clearConfig={() => setPracticeConfig(null)}
                      currentUser={currentUser}
                      onSessionComplete={handleSessionComplete}
                    />
                  ) : null}
                  {activeTab === 'study_arena' ? <StudyArenaPage /> : null}
                  {activeTab === 'tutor' ? <TutorPage currentUser={currentUser} /> : null}
                  {activeTab === 'scan' ? <ScanPage /> : null}
                  {activeTab === 'standing' ? (
                    <DashboardPage stats={stats} currentUser={currentUser} setTab={setActiveTab} />
                  ) : null}
                  {activeTab === 'about' ? <AboutPage /> : null}
                  {activeTab === 'contact' ? <ContactPage /> : null}
                  {activeTab === 'sitemap' ? <SitemapPage setTab={setActiveTab} /> : null}
                  {activeTab === 'admin_pipeline' ? <AdminPipelinePage /> : null}
                </motion.div>
              </AnimatePresence>
            </Suspense>
          )}
        </div>
      </main>

      <footer className="bg-secondary text-white border-t border-slate-800 py-24 px-8 mt-24">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8">
            <button
              onClick={() => setActiveTab('home')}
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
              <li><button onClick={() => setActiveTab('syllabus')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Syllabus Explorer</button></li>
              <li><button onClick={() => setActiveTab('arena')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Practice Arena</button></li>
              <li><button onClick={() => setActiveTab('tutor')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">AI Mentoring</button></li>
              <li><button onClick={() => setActiveTab('sitemap')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Platform Sitemap</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-8">Company</h4>
            <ul className="space-y-4">
              <li><button onClick={() => setActiveTab('about')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Our Mission</button></li>
              <li><button onClick={() => setActiveTab('contact')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Contact Support</button></li>
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
    </div>
  );
}
