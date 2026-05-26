/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  Bot,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronDown,
  ClipboardList,
  Eye,
  EyeOff,
  Home,
  LogIn,
  LogOut,
  Menu,
  Sparkles,
  Target,
  User,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { AVATAR_REWARDS, isAvatarUnlocked } from './data/avatarRewards';
import { AnimatePresence, motion } from 'framer-motion';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { cn } from './lib/utils';
import SEO from './components/SEO';
import InstallPrompt from './components/InstallPrompt';
import ColdStartBanner from './components/ColdStartBanner';
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
  sendWelcomeEmail,
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
  subscribeToNewsletter,
  syncUserEmail,
  tryEnsureUserDocuments,
} from './lib/firebase';
import { AuthFormState, UserProgress, UserStats } from './types';
import { getCloudRole, getExtendedProfile, getStoredRole, saveUserRole, setStoredRole } from './lib/userProfile';

// Lazy load pages for performance
const HomePage = React.lazy(() => import('./pages/Home'));
const SyllabusPage = React.lazy(() => import('./pages/Syllabus'));
const ArenaPage = React.lazy(() => import('./pages/Arena'));
const TutorPage = React.lazy(() => import('./pages/Tutor'));
const LearningLabPage = React.lazy(() => import('./pages/LearningLab'));
const DailyChallengesPage = React.lazy(() => import('./pages/DailyChallenges'));
const ProgressPage = React.lazy(() => import('./pages/ProgressPage'));
const MockTestsPage = React.lazy(() => import('./pages/MockTests'));
const PrepHubPage = React.lazy(() => import('./pages/PrepHub'));
const StudentProfilePage = React.lazy(() => import('./pages/StudentProfile'));
const ParentDashboardPage = React.lazy(() => import('./pages/ParentDashboard'));
const AboutPage = React.lazy(() => import('./pages/About'));
const ContactPage = React.lazy(() => import('./pages/Contact'));
const SitemapPage = React.lazy(() => import('./pages/Sitemap'));
const AdminPipelinePage = React.lazy(() => import('./pages/AdminPipeline'));
const BlogPage = React.lazy(() => import('./pages/Blog'));
const UpdatesPage = React.lazy(() => import('./pages/Updates'));
const ClassPage = React.lazy(() => import('./pages/ClassPage'));
const SkillsLabPage = React.lazy(() => import('./pages/SkillsLab'));
const EnglishLabPage = React.lazy(() => import('./pages/EnglishLab'));

type AuthMethod = 'google' | 'email';
type AuthMode = 'signin' | 'signup' | 'reset';
type AuthStep = 'auth' | 'role';

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

const getStoredClass = () => {
  try { return localStorage.getItem('syllab_user_class') || ''; } catch { return ''; }
};

const TAB_TO_PATH: Record<string, string> = {
  home: '/',
  syllabus: '/syllabus',
  arena: '/practice',
  daily: '/daily-challenges',
  mock_tests: '/exams',
  progress: '/progress',
  learning_lab: '/learning-lab',
  prep_hub: '/preparation',
  about: '/about',
  contact: '/contact',
  sitemap: '/sitemap',
  profile: '/profile',
  parent: '/parent',
  admin_pipeline: '/admin',
  blog: '/blog',
  updates: '/updates',
  skills_lab: '/skills-lab',
  english_lab: '/english-lab',
  privacy: '/privacy',
  terms: '/terms',
  class_1: '/class-1',
  class_2: '/class-2',
  class_3: '/class-3',
  class_4: '/class-4',
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
    title: 'Syllab.in — Free AI Learning for CBSE, NCERT, JEE & NEET | Class 1–12',
    description: 'Syllab.in is India\'s free AI learning platform for Class 1 to 12. Study CBSE NCERT chapters, practice MCQs, take mock tests, solve doubts with AI tutor. Free for every student.',
    keywords: 'Syllab, free learning app India, AI tutor, NCERT CBSE, JEE preparation, NEET preparation, EAMCET, free education, Class 1 to 12, online learning, edtech India, free mock test, study app India',
    url: 'https://syllab.in/',
  },
  syllabus: {
    title: 'Class 1–12 NCERT Syllabus Explorer | CBSE Chapters & Notes | Syllab.in',
    description: 'Browse NCERT chapters for every class and subject. AI-powered summaries, concept notes, practice questions, and learning guides for Class 1 to 12 CBSE students.',
    keywords: 'NCERT syllabus, CBSE syllabus Class 1 to 12, chapter notes, NCERT chapters, subject-wise chapters, CBSE chapter summary, NCERT notes free, online syllabus guide',
    url: 'https://syllab.in/syllabus',
  },
  arena: {
    title: 'Practice Arena — Chapter-wise MCQs for CBSE NCERT | Syllab.in',
    description: 'Practice timed chapter-wise MCQs for NCERT CBSE with instant scoring, explanations, and AI mistake tracking. Free for all Class 1–12 students.',
    keywords: 'CBSE MCQ practice, NCERT questions, chapter wise quiz, online MCQ test, timed practice, CBSE exam prep, chapter test, free MCQ Class 6 7 8 9 10 11 12',
    url: 'https://syllab.in/practice',
  },
  daily: {
    title: 'Daily Challenges — JEE, NEET, EAMCET & School Quiz | Syllab.in',
    description: 'Take daily quiz challenges for JEE, NEET, EAMCET, and school aptitude with live rankings and streak tracking. Practice every day, improve your rank.',
    keywords: 'daily quiz, JEE daily practice, NEET daily questions, EAMCET quiz, daily challenge app, quiz competition, aptitude quiz, daily MCQ, study daily',
    url: 'https://syllab.in/daily-challenges',
  },
  progress: {
    title: 'Student Progress Dashboard — Analytics, XP & Exam History | Syllab.in',
    description: 'View your XP, streaks, weak topics, exam results, completed chapters, and full learning analytics in your personalised student progress dashboard.',
    keywords: 'student progress dashboard, learning analytics, XP tracker, study streak, weak topics AI, exam history, performance dashboard, CBSE student tracker',
    url: 'https://syllab.in/progress',
  },
  mock_tests: {
    title: 'Mock Tests, Olympiads & Custom Exams | Syllab.in Exams Hub',
    description: 'Free mock tests for JEE, NEET, EAMCET, VIT, BITSAT; Math and Science Olympiads; create custom exams and share live exam codes with students.',
    keywords: 'JEE mock test free, NEET mock test, EAMCET mock test, Math Olympiad, Science Olympiad, custom exam creator, live exam code, online mock test India',
    url: 'https://syllab.in/exams',
  },
  prep_hub: {
    title: 'JEE NEET EAMCET Board Exam Preparation Guides | Syllab.in',
    description: 'Comprehensive preparation guides for JEE Mains, NEET, EAMCET, and CBSE boards — chapter weightage, study plans, important formulas, and tips from top scorers.',
    keywords: 'JEE preparation guide, NEET study plan, EAMCET tips, board exam preparation, CBSE study strategy, JEE syllabus 2025 2026, important chapters JEE NEET, exam strategies',
    url: 'https://syllab.in/preparation',
  },
  profile: {
    title: 'Student Profile, Achievements & Badges | Syllab.in',
    description: 'View your XP, learning streak, badges, and achievements. Share your progress and track your full learning journey on Syllab.in.',
    keywords: 'student profile, XP learning, achievements, badges, learning streak, share score, student leaderboard',
    url: 'https://syllab.in/profile',
  },
  parent: {
    title: 'Parent Hub — Monitor Child Learning, Exam Scores & Progress | Syllab.in',
    description: 'Free parent portal to monitor your child\'s XP, streaks, quiz scores, completed topics, exam results, and weekly study activity. Link multiple children in one dashboard.',
    keywords: 'parent dashboard, child learning tracker, student progress monitor, parent portal India, track child studies, parental monitoring app, exam results parent',
    url: 'https://syllab.in/parent',
  },
  learning_lab: {
    title: 'AI Learning Lab — Notes, Flashcards, MCQ Generator & Scan Solve | Syllab.in',
    description: 'Generate AI concept notes, flashcards, and practice MCQs from any topic. Scan and solve homework problems step-by-step with AI — free for all students.',
    keywords: 'AI notes generator, flashcard maker, AI MCQ generator, scan solve homework, AI study tool, concept notes AI, homework helper India, free AI learning tools',
    url: 'https://syllab.in/learning-lab',
  },
  about: {
    title: 'About Syllab.in — Free AI Education for Every Indian Student',
    description: 'Syllab.in is on a mission to make AI-powered, high-quality education completely free for every Indian student from Class 1 to 12.',
    keywords: 'about Syllab, AI education India, free edtech, Indian student app, mission free learning',
    url: 'https://syllab.in/about',
  },
  contact: {
    title: 'Contact Syllab.in — Student Support & Partnership Enquiries',
    description: 'Get help from Syllab.in support for learning issues, platform questions, school partnerships, and academic queries.',
    keywords: 'contact Syllab, student support, help center, school partnership, edtech support India',
    url: 'https://syllab.in/contact',
  },
  sitemap: {
    title: 'Syllab.in Sitemap — All Pages, Subjects & Classes',
    description: 'Full sitemap of Syllab.in covering all classes, subjects, learning modules, exam hubs, blog posts, and study tools.',
    keywords: 'Syllab sitemap, all pages, classes subjects',
    url: 'https://syllab.in/sitemap',
  },
  admin_pipeline: {
    title: 'Syllab Admin Pipeline',
    description: 'Admin tooling for reviewing learning content and generation workflows.',
    keywords: 'Syllab admin',
    url: 'https://syllab.in/admin',
  },
  skills_lab: {
    title: 'Skills Lab — Python, SQL, AI, Data Science & Aptitude | Syllab.in',
    description: 'Learn Python coding, SQL databases, AI basics, Data Analytics, Aptitude reasoning, and build Mini Projects with AI feedback — free for Class 5–12 students.',
    keywords: 'Python for students India, learn Python free, SQL basics Class 10 11 12, AI basics for students, data analytics beginner, coding skills students, aptitude reasoning, mini projects, free coding course India',
    url: 'https://syllab.in/skills-lab',
  },
  english_lab: {
    title: 'English Lab — Speaking, Reading, Grammar & Vocabulary | Syllab.in',
    description: 'Practice English every day with AI speaking coach, daily grammar challenges, reading passages, NCERT story guides, vocabulary builder, and listening exercises — all free.',
    keywords: 'English speaking practice India, English grammar CBSE, vocabulary builder, NCERT English Class 1 to 10, English reading comprehension, daily English challenge, AI English teacher free',
    url: 'https://syllab.in/english-lab',
  },
  blog: {
    title: 'Study Tips & Guides for CBSE JEE NEET Students | Syllab.in Blog',
    description: 'Free study tips, chapter guides, exam strategies, and preparation advice for CBSE Class 5–12, JEE Mains, NEET, and EAMCET students. Written by educators.',
    keywords: 'CBSE study tips, JEE mains preparation, NEET study guide, board exam tips Class 10, how to study effectively, important chapters CBSE, free study blog India',
    url: 'https://syllab.in/blog',
  },
  updates: {
    title: 'Student Updates — CBSE, JEE, NEET, AI & Coding News | Syllab.in',
    description: 'Latest updates on CBSE, NCERT, JEE, NEET, EAMCET exams, AI tools for students, coding skills, and new features on Syllab.in.',
    keywords: 'CBSE updates 2025 2026, JEE news, NEET latest news, AI tools for students, ChatGPT students, Gemini AI, coding skills India, student news updates',
    url: 'https://syllab.in/updates',
  },
  class_1: { title: 'Class 1 NCERT Syllabus, Subjects & Study Tips | Syllab.in', description: 'Complete Class 1 CBSE NCERT guide with important chapters in Maths, EVS, English and Hindi. Free practice and study tips for Class 1 students.', keywords: 'Class 1 NCERT, Class 1 CBSE, Class 1 Maths, Class 1 EVS, Class 1 English, Class 1 syllabus', url: 'https://syllab.in/class-1' },
  class_2: { title: 'Class 2 NCERT Syllabus, Subjects & Study Tips | Syllab.in', description: 'Class 2 CBSE NCERT guide with important chapters in Maths, EVS, English and Hindi. Build a strong foundation with free study tips.', keywords: 'Class 2 NCERT, Class 2 CBSE, Class 2 Maths, Class 2 EVS, Class 2 English, Class 2 syllabus', url: 'https://syllab.in/class-2' },
  class_3: { title: 'Class 3 NCERT Syllabus, Subjects & Study Tips | Syllab.in', description: 'Class 3 CBSE NCERT complete guide with Maths tables, EVS, English and Hindi chapters. Free study tips and important chapters.', keywords: 'Class 3 NCERT, Class 3 CBSE, Class 3 Maths, Class 3 EVS, Class 3 English, multiplication tables Class 3', url: 'https://syllab.in/class-3' },
  class_4: { title: 'Class 4 NCERT Syllabus, Subjects & Study Tips | Syllab.in', description: 'Class 4 CBSE NCERT guide with important Maths, EVS, English and Hindi chapters. Practice division, fractions, and more — free.', keywords: 'Class 4 NCERT, Class 4 CBSE, Class 4 Maths, Class 4 EVS, Class 4 English, Class 4 syllabus', url: 'https://syllab.in/class-4' },
  class_5: { title: 'Class 5 NCERT Syllabus, Important Chapters & Study Tips | Syllab.in', description: 'Class 5 CBSE NCERT guide with important chapters in Maths, EVS, English and Hindi. Free practice questions and study tips.', keywords: 'Class 5 NCERT, Class 5 CBSE, Class 5 Maths, Class 5 EVS, Class 5 English, Class 5 chapters', url: 'https://syllab.in/class-5' },
  class_6: { title: 'Class 6 NCERT Syllabus, Important Chapters & Study Tips | Syllab.in', description: 'Class 6 CBSE NCERT guide with important Maths, Science, Social Science, English and Hindi chapters and study tips.', keywords: 'Class 6 NCERT, Class 6 CBSE, Class 6 Maths, Class 6 Science, Class 6 Social Science', url: 'https://syllab.in/class-6' },
  class_7: { title: 'Class 7 NCERT Syllabus, Important Chapters & Study Tips | Syllab.in', description: 'Class 7 CBSE NCERT guide with Algebra, Science, Social Science and Language important chapters and free study tips.', keywords: 'Class 7 NCERT, Class 7 CBSE, Class 7 Maths, Class 7 Science, Class 7 algebra', url: 'https://syllab.in/class-7' },
  class_8: { title: 'Class 8 NCERT Syllabus, Important Chapters & Study Tips | Syllab.in', description: 'Class 8 CBSE NCERT complete guide with Rational Numbers, Microorganisms, History and Language chapters for boards.', keywords: 'Class 8 NCERT, Class 8 CBSE, Class 8 Maths, Class 8 Science, Class 8 rational numbers', url: 'https://syllab.in/class-8' },
  class_9: { title: 'Class 9 NCERT Syllabus, Important Chapters & Study Guide | Syllab.in', description: 'Class 9 CBSE NCERT guide: Number Systems, Motion, Atoms, Democratic Politics — important chapters, study tips and free practice.', keywords: 'Class 9 NCERT, Class 9 CBSE, Class 9 Maths, Class 9 Science, Class 9 Social Science, Class 9 board', url: 'https://syllab.in/class-9' },
  class_10: { title: 'Class 10 NCERT Syllabus, Board Exam Preparation | Syllab.in', description: 'Class 10 CBSE board exam guide with important NCERT chapters, study plan, subject weightage and free practice for all subjects.', keywords: 'Class 10 NCERT, Class 10 CBSE board exam, Class 10 Maths, Class 10 Science, board exam tips 2025 2026', url: 'https://syllab.in/class-10' },
  class_11: { title: 'Class 11 NCERT Syllabus, JEE NEET Foundation | Syllab.in', description: 'Class 11 CBSE NCERT guide with Physics, Chemistry, Maths and Biology for boards and JEE/NEET foundation. Free study tips.', keywords: 'Class 11 NCERT, Class 11 CBSE, Class 11 Physics, Class 11 Chemistry, Class 11 Maths, JEE Class 11 preparation', url: 'https://syllab.in/class-11' },
  class_12: { title: 'Class 12 NCERT Syllabus, Board Exam & JEE NEET Guide | Syllab.in', description: 'Class 12 CBSE board exam and JEE/NEET preparation guide with Physics, Chemistry, Maths and Biology important chapters, study plan and tips.', keywords: 'Class 12 NCERT, Class 12 CBSE, Class 12 Physics, Class 12 Maths, Class 12 Chemistry, JEE NEET Class 12, board exam 2025 2026', url: 'https://syllab.in/class-12' },
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
  onAuthComplete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAuthComplete?: (role: 'student' | 'parent') => void;
}) {
  const [method, setMethod] = useState<AuthMethod>('google');
  const [mode, setMode] = useState<AuthMode>('signin');
  const [form, setForm] = useState<AuthFormState>(EMPTY_AUTH_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authStep, setAuthStep] = useState<AuthStep>('auth');
  const [pendingUid, setPendingUid] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setMethod('google');
      setMode('signin');
      setForm(EMPTY_AUTH_FORM);
      setError(null);
      setLoading(false);
      setAuthStep('auth');
      setPendingUid(null);
      setShowPassword(false);
    }
  }, [isOpen]);

  const handleRoleSelect = async (role: 'student' | 'parent') => {
    setStoredRole(role);
    if (pendingUid) {
      saveUserRole(pendingUid, role).catch(() => {/* non-critical */});
    }
    onAuthComplete?.(role);
    onClose();
  };

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
        const user = await signUpWithEmail(form.email, form.password);
        // Send welcome email (fire-and-forget, non-fatal)
        sendWelcomeEmail(user.email || form.email, user.displayName || form.email.split('@')[0]);
        // New user — ask them their role before closing
        setPendingUid(user.uid);
        setAuthStep('role');
      } else {
        await signInWithEmail(form.email, form.password);
        onClose();
      }
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
      const user = await signInWithGoogle();
      // Check Firestore first (cloud-first) — localStorage is only a fast-path cache
      const cloudRole = await getCloudRole(user.uid);
      if (cloudRole) {
        // Sync to localStorage so next check is fast
        setStoredRole(cloudRole);
        onClose();
      } else {
        // New Google user — send welcome email + show role picker
        sendWelcomeEmail(user.email || '', user.displayName || '');
        setPendingUid(user.uid);
        setAuthStep('role');
      }
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

  // Role selection step — shown after a fresh signup or first Google login
  if (authStep === 'role') {
    return (
      <div className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto p-3 sm:items-center sm:p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-full max-w-md rounded-[1.75rem] bg-white p-6 shadow-2xl sm:rounded-[2.5rem] sm:p-10"
        >
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-3xl shadow-xl shadow-emerald-500/20">
              👋
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Welcome to Syllab!</h2>
            <p className="mt-2 text-sm font-medium text-slate-500">Tell us who you are so we can personalise your experience.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleRoleSelect('student')}
              className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-slate-100 bg-slate-50 p-6 text-center transition-all hover:border-primary hover:bg-emerald-50 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-95"
            >
              <span className="text-4xl">🎓</span>
              <div>
                <div className="text-base font-black text-slate-800 group-hover:text-primary">Student</div>
                <div className="mt-1 text-[11px] font-medium text-slate-400">I'm here to learn</div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect('parent')}
              className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-slate-100 bg-slate-50 p-6 text-center transition-all hover:border-blue-400 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/10 active:scale-95"
            >
              <span className="text-4xl">👨‍👩‍👧</span>
              <div>
                <div className="text-base font-black text-slate-800 group-hover:text-blue-600">Parent</div>
                <div className="mt-1 text-[11px] font-medium text-slate-400">I'm tracking my child</div>
              </div>
            </button>
          </div>
          <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-widest text-slate-300">
            You can change this later in your profile
          </p>
        </motion.div>
      </div>
    );
  }

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
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(event) => updateField('password', event.target.value)}
                      placeholder="Enter your password"
                      disabled={loading}
                      className="w-full rounded-2xl border-2 border-transparent bg-slate-50 p-3.5 pr-12 text-base font-bold outline-none transition-all focus:border-primary focus:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:p-4 sm:pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      tabIndex={-1}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
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
  const [userClass, setUserClass] = useState(getStoredClass);
  const [userRole, setUserRole] = useState<'student' | 'parent' | null>(getStoredRole);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleClassChange = (cls: string) => {
    setUserClass(cls);
    try { if (cls) localStorage.setItem('syllab_user_class', cls); else localStorage.removeItem('syllab_user_class'); } catch { /* ignore */ }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthLoading(false);
      try {
        if (user) {
          setCurrentUser(user);
          // Always sync email to Firestore doc — needed for parent-child lookup.
          // Runs on every page load so existing users without email get backfilled.
          void syncUserEmail(user.uid, user.email);

          if (!FIRESTORE_FEATURES_ENABLED) {
            setStats(DEFAULT_USER_STATS);
            setProgress(DEFAULT_USER_PROGRESS);
            setAppError(null);
            return;
          }

          const profileReady = await tryEnsureUserDocuments(user);

          const [resolvedStats, resolvedProgress, extProfile] = await Promise.all([
            getUserStats(user.uid),
            getUserProgress(user.uid),
            getExtendedProfile(user.uid),
          ]);

          setStats(resolvedStats ?? DEFAULT_USER_STATS);
          setProgress(resolvedProgress ?? DEFAULT_USER_PROGRESS);

          // Cloud-first: sync class and role from Firestore so they always win over stale localStorage
          if (extProfile.learning.primaryClass) {
            setUserClass(extProfile.learning.primaryClass);
            try { localStorage.setItem('syllab_user_class', extProfile.learning.primaryClass); } catch { /* ignore */ }
          }
          if (extProfile.role) {
            setUserRole(extProfile.role);
            try { localStorage.setItem('syllab_user_role', extProfile.role); } catch { /* ignore */ }
          }

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

  const handleAuthComplete = (role: 'student' | 'parent') => {
    setUserRole(role);
    if (role === 'parent') {
      setActiveTab('parent');
      const path = TAB_TO_PATH['parent'] || '/parent';
      if (window.location.pathname !== path) {
        window.history.pushState({ tab: 'parent' }, '', path);
      }
    }
    setLoginModalOpen(false);
  };

  const navigate = useCallback((tab: string) => {
    setActiveTab(tab);
    const path = TAB_TO_PATH[tab] || '/';
    if (window.location.pathname !== path) {
      window.history.pushState({ tab }, '', path);
    }
    // Tell any open modal (PPT viewer, concept viewer, tutor, etc.) to close.
    // Modals subscribe to this event so navbar clicks always escape.
    window.dispatchEvent(new CustomEvent('syllab:navigate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    // Parent-only pages are filtered below — students don't see Parent Hub in nav
    ...(userRole !== 'student' ? [] : []),
    { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
    { id: 'arena', label: 'Practice Arena', icon: Target },
    { id: 'daily', label: 'Daily Dose', icon: CalendarDays },
    { id: 'mock_tests', label: 'Exams', icon: ClipboardList },
    { id: 'learning_lab', label: 'Learning Lab', icon: Sparkles },
    { id: 'skills_lab', label: 'Skills Lab', icon: Zap },
    { id: 'english_lab', label: 'English Lab', icon: BookOpen },
    { id: 'updates', label: 'Updates', icon: Sparkles },
    // Progress: show for students and guests; parents use parent hub instead
    ...(userRole !== 'parent' ? [{ id: 'progress', label: 'Progress', icon: ChartNoAxesCombined }] : []),
    // Parent Hub: show for parents and guests (not for students)
    ...(userRole !== 'student' ? [{ id: 'parent', label: 'Parent Hub', icon: Users }] : []),
  ];

  const isInitializing = loading || authLoading;
  const seo = PAGE_SEO[activeTab] || PAGE_SEO.home;

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
          <div className="hidden items-center gap-3 md:flex">
            {currentUser ? (() => {
              const headerAvatar = [...AVATAR_REWARDS].reverse().find(a =>
                a.unlockType !== 'skills' && isAvatarUnlocked(a, stats, 0)
              ) ?? AVATAR_REWARDS[0];
              const displayName = currentUser.displayName || currentUser.email?.split('@')[0] || 'Student';
              return (
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 shadow-sm">
                    {stats.xp.toLocaleString()} XP
                  </div>
                  {userClass ? (
                    <div className="rounded-2xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-black text-blue-700 shadow-sm">
                      Class {userClass}
                    </div>
                  ) : null}
                  <div className="relative" ref={profileDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setProfileDropdownOpen(o => !o)}
                      className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-lg leading-none">{headerAvatar.icon}</span>
                      <span className="max-w-[100px] truncate text-[11px]">{displayName}</span>
                      <ChevronDown size={13} className={cn('transition-transform duration-200', profileDropdownOpen && 'rotate-180')} />
                    </button>
                    {profileDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-slate-200 bg-white shadow-2xl z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100">
                          <div className="flex items-center gap-2">
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stats.rank}</div>
                            {userRole && (
                              <span className={cn('rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider', userRole === 'parent' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600')}>
                                {userRole}
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-bold text-slate-600 truncate">{currentUser.email}</div>
                        </div>
                        <div className="p-2">
                          <button type="button" onClick={() => { navigate('profile'); setProfileDropdownOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-black text-slate-700 hover:bg-slate-50 transition-colors">
                            <User size={15} /> My Profile
                          </button>
                          <button type="button" onClick={() => { navigate('progress'); setProfileDropdownOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-black text-slate-700 hover:bg-slate-50 transition-colors">
                            <ChartNoAxesCombined size={15} /> Progress
                          </button>
                          {userRole === 'parent' && (
                            <button type="button" onClick={() => { navigate('parent'); setProfileDropdownOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-black text-blue-600 hover:bg-blue-50 transition-colors">
                              <Users size={15} /> Parent Hub
                            </button>
                          )}
                          <div className="my-1.5 border-t border-slate-100" />
                          <button type="button" onClick={() => void logout()} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-black text-rose-600 hover:bg-rose-50 transition-colors">
                            <LogOut size={15} /> Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })() : (
              <button
                type="button"
                onClick={() => { navigate('profile'); setLoginModalOpen(true); }}
                className="btn-primary px-6 py-2.5 text-xs font-black uppercase tracking-widest"
              >
                My Profile
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
            className="fixed inset-0 z-40 overflow-y-auto bg-white px-6 pt-24 pb-10 lg:hidden"
          >
            {/* Profile strip */}
            {currentUser ? (
              <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-slate-800">{currentUser.displayName || currentUser.email?.split('@')[0] || 'Student'}</p>
                  <p className="truncate text-[11px] font-medium text-slate-400">{currentUser.email}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-700">{stats.xp.toLocaleString()} XP</span>
                    {userClass ? <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-black text-blue-700">Class {userClass}</span> : null}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-2 ml-3">
                  <button
                    type="button"
                    onClick={() => { navigate('profile'); setMobileMenuOpen(false); }}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-[11px] font-black text-white"
                  >
                    My Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => { void logout(); setMobileMenuOpen(false); }}
                    className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-[11px] font-black text-rose-600"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => { navigate('profile'); setLoginModalOpen(true); setMobileMenuOpen(false); }}
                className="mb-4 w-full rounded-2xl bg-primary py-4 text-sm font-black text-white shadow-lg shadow-emerald-500/20"
              >
                Sign In / My Profile
              </button>
            )}

            <div className="grid grid-cols-1 gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center gap-4 rounded-2xl p-4 text-base font-black transition-all',
                    activeTab === item.id ? 'bg-primary text-white shadow-xl shadow-emerald-500/20' : 'bg-slate-50 text-slate-500',
                  )}
                >
                  <item.icon size={22} />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} onAuthComplete={handleAuthComplete} />

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

          {/* Parent Mode Banner — shown on student-focused pages */}
          {userRole === 'parent' && currentUser && !['parent', 'profile'].includes(activeTab) ? (
            <div className="mb-6 flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700">
              <Users size={16} className="shrink-0" />
              <span className="flex-1">You're browsing as a <strong>Parent</strong>. This is what your child sees.</span>
              <button
                type="button"
                onClick={() => navigate('parent')}
                className="shrink-0 rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-black text-white hover:bg-blue-700 transition-colors"
              >
                Go to Parent Hub →
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
                  {activeTab === 'home' ? <HomePage setTab={navigate} currentUser={currentUser} stats={stats} userClass={userClass} /> : null}
                  {activeTab === 'syllabus' ? (
                    <SyllabusPage
                      setTab={navigate}
                      openTutor={() => setTutorOpen(true)}
                      syllabus={SYLLABUS}
                      setPracticeConfig={setPracticeConfig}
                      userClass={userClass}
                      isLoggedIn={!!currentUser}
                    />
                  ) : null}
                  {activeTab === 'arena' ? (
                    <ArenaPage
                      practiceConfig={practiceConfig}
                      clearConfig={() => setPracticeConfig(null)}
                      currentUser={currentUser}
                      userClass={userClass}
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
                      userClass={userClass}
                    />
                  ) : null}
                  {['learning_lab', 'study_arena', 'scan'].includes(activeTab) ? <LearningLabPage /> : null}
                  {activeTab === 'prep_hub' ? <PrepHubPage setTab={navigate} /> : null}
                  {activeTab === 'profile' ? <StudentProfilePage currentUser={currentUser} stats={stats} setTab={navigate} userClass={userClass} onClassChange={handleClassChange} onOpenLogin={() => setLoginModalOpen(true)} /> : null}
                  {['progress', 'analytics'].includes(activeTab) ? <ProgressPage currentUser={currentUser} stats={stats} setTab={navigate} /> : null}
                  {activeTab === 'parent' ? <ParentDashboardPage currentUser={currentUser} setTab={navigate} /> : null}
                  {activeTab === 'about' ? <AboutPage /> : null}
                  {activeTab === 'contact' ? <ContactPage /> : null}
                  {activeTab === 'sitemap' ? <SitemapPage setTab={navigate} /> : null}
                  {activeTab === 'admin_pipeline' ? <AdminPipelinePage /> : null}
                  {activeTab === 'blog' ? <BlogPage setTab={navigate} /> : null}
                  {activeTab === 'updates' ? <UpdatesPage setTab={navigate} /> : null}
                  {activeTab === 'skills_lab' ? <SkillsLabPage currentUser={currentUser} setTab={navigate} openTutor={() => setTutorOpen(true)} /> : null}
                  {activeTab === 'english_lab' ? <EnglishLabPage currentUser={currentUser} setTab={navigate} /> : null}
                  {activeTab === 'privacy' ? (
                    <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 max-w-3xl mx-auto">
                      <h1 className="text-4xl font-black text-slate-900 mb-6">Privacy Policy</h1>
                      <div className="space-y-6 text-slate-700">
                        <p className="text-center text-lg font-semibold text-slate-500">Coming soon...</p>
                        <p className="text-sm">Our comprehensive Privacy Policy is being prepared. We are committed to protecting your personal information and ensuring transparency about how we collect, use, and protect your data.</p>
                        <p className="text-sm">Please check back soon for the complete Privacy Policy document.</p>
                      </div>
                    </section>
                  ) : null}
                  {activeTab === 'terms' ? (
                    <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 max-w-3xl mx-auto">
                      <h1 className="text-4xl font-black text-slate-900 mb-6">Terms of Service</h1>
                      <div className="space-y-6 text-slate-700">
                        <p className="text-center text-lg font-semibold text-slate-500">Coming soon...</p>
                        <p className="text-sm">Our Terms of Service are being prepared. These terms will outline the rules and regulations for the use of Syllab.in, including your rights and responsibilities as a user.</p>
                        <p className="text-sm">Please check back soon for the complete Terms of Service document.</p>
                      </div>
                    </section>
                  ) : null}
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
      <ColdStartBanner />
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
              India's AI-powered learning platform for CBSE NCERT practice, concepts, and exam readiness from Class 1 to 12.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-8">Learning Hub</h4>
            <ul className="space-y-4">
              <li><button onClick={() => navigate('syllabus')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Syllabus Explorer</button></li>
              <li><button onClick={() => navigate('arena')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Practice Arena</button></li>
              <li><button onClick={() => navigate('daily')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Daily Challenges</button></li>
              <li><button onClick={() => navigate('mock_tests')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Exams Hub</button></li>
              <li><button onClick={() => navigate('progress')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Progress Hub</button></li>
              <li><button onClick={() => navigate('learning_lab')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Learning Lab</button></li>
              <li><button onClick={() => setTutorOpen(true)} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">AI Mentoring</button></li>
              <li><button onClick={() => navigate('prep_hub')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Preparation Guides</button></li>
              <li><button onClick={() => navigate('blog')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Study Blog</button></li>
              <li><button onClick={() => navigate('skills_lab')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Skills Lab</button></li>
              <li><button onClick={() => navigate('english_lab')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">English Lab</button></li>
              <li><button onClick={() => navigate('parent')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Parent Hub</button></li>
              <li><button onClick={() => navigate('sitemap')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Platform Sitemap</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-8">By Class</h4>
            <ul className="space-y-4">
              {[1,2,3,4,5,6,7,8,9,10,11,12].map((c) => (
                <li key={c}><button onClick={() => navigate(`class_${c}`)} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Class {c}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-8">Company</h4>
            <ul className="space-y-4">
              <li><button onClick={() => navigate('about')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Our Mission</button></li>
              <li><button onClick={() => navigate('contact')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Contact Support</button></li>
              <li><button onClick={() => navigate('sitemap')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Sitemap</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-8">Weekly Newsletter</h4>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Get weekly study tips, new chapters and exam updates delivered to your inbox.
            </p>
            {newsletterStatus === 'success' ? (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3">
                <span className="text-emerald-400 font-black text-sm">✓</span>
                <span className="text-emerald-400 text-sm font-bold">You're subscribed!</span>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!newsletterEmail.trim()) return;
                  setNewsletterStatus('loading');
                  const result = await subscribeToNewsletter(
                    newsletterEmail.trim(),
                    userClass || undefined,
                    userRole || undefined,
                  );
                  setNewsletterStatus(result.success ? 'success' : 'error');
                }}
                className="space-y-3"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => { setNewsletterEmail(e.target.value); setNewsletterStatus('idle'); }}
                  placeholder="your@email.com"
                  required
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-primary focus:bg-white/10 transition-all"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="w-full rounded-xl bg-primary py-3 text-sm font-black text-white transition-all hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
                {newsletterStatus === 'error' && (
                  <p className="text-xs text-red-400 font-bold">Could not subscribe — please try again.</p>
                )}
              </form>
            )}
            <div className="flex gap-4 mt-6">
              <a href="https://twitter.com/syllab_in" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-300 hover:text-primary transition-all border border-white/5 italic font-black text-sm">X</a>
              <a href="https://linkedin.com/company/syllab" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-300 hover:text-primary transition-all border border-white/5 italic font-black text-sm">in</a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">© 2026 Syllab AI. Designed for Excellence.</div>
          <div className="flex gap-8">
            <button type="button" onClick={() => navigate('privacy')} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Privacy Policy</button>
            <button type="button" onClick={() => navigate('terms')} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </footer>
      ) : null}
      <InstallPrompt />
    </div>
  );
}
