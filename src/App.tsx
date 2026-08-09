/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { trackPageview } from './lib/analytics';
import { usePathname } from './lib/isomorphic';
import {
  BookOpen,
  Building2,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronDown,
  ClipboardList,
  Eye,
  EyeOff,
  Home,
  LogIn,
  Atom,
  Wrench,
  FileText,
  Image,
  GitCompare,
  NotebookPen,
  SlidersHorizontal,
  Hash,
  Contrast,
  Clock,
  Braces,
  ScanText,
  Type,
  Volume2,
  Layers,
  LogOut,
  Menu,
  Calculator,
  Ruler,
  Sparkles,
  Target,
  Timer,
  User,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { AVATAR_REWARDS, isAvatarUnlocked } from './data/avatarRewards';
import type { User as FirebaseUser } from 'firebase/auth';
import { cn } from './lib/utils';
import SEO from './components/SEO';
import InstallPrompt from './components/InstallPrompt';
import OfflineBanner from './components/OfflineBanner';
import BottomTabBar from './components/BottomTabBar';
import ColdStartBanner from './components/ColdStartBanner';
import DraggableFab from './components/DraggableFab';
// Lazy — PomodoroTimer is an opt-in focus widget that uses framer-motion. Loading
// it lazily keeps the vendor-motion chunk out of the entry/critical path (it loads
// in the background after first paint instead of blocking mobile LCP).
const PomodoroTimer = React.lazy(() => import('./components/PomodoroTimer'));
import DarkModeToggle from './components/DarkModeToggle';
import { FIREBASE_AUTH_ENABLED, FIRESTORE_FEATURES_ENABLED } from './lib/cloudFeatures';
// The Firebase SDK (app + app-check + auth + firestore) is ~519 KB — over a
// third of what the browser had to download before it could paint anything, for
// every visitor including the ~97% who arrive from search and never sign in.
// It is now loaded on demand: `fb()` / `profile()` resolve to the real modules
// the first time auth starts or a signed-in action runs. Both are cached by the
// module system, so repeat calls are free.
const fb = () => import('./lib/firebase');
const profile = () => import('./lib/userProfile');
import {
  DEFAULT_USER_PROGRESS,
  DEFAULT_USER_STATS,
  getStoredRole,
  setStoredRole,
  hasSignedInBefore,
  setSignedInHint,
} from './lib/userDefaults';
import { AuthFormState, UserProgress, UserStats } from './types';
import { initGamification, syncXpMirror } from './lib/gamification';
import RewardToast from './components/RewardToast';
import ErrorBoundary from './components/ErrorBoundary';
import { MotionConfig } from 'motion/react';

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
const CodingChallengesPage = React.lazy(() => import('./pages/CodingChallengesPage'));
const MiniProjectsPage = React.lazy(() => import('./pages/MiniProjectsPage'));
const CodingForKidsPage = React.lazy(() => import('./pages/CodingForKidsPage'));
const PythonForKidsPage = React.lazy(() => import('./pages/PythonForKidsPage'));
const ComputerBasicsPage = React.lazy(() => import('./pages/ComputerBasicsPage'));
const CyberSafetyPage = React.lazy(() => import('./pages/CyberSafetyPage'));
const AiForStudentsPage = React.lazy(() => import('./pages/AiForStudentsPage'));
const WebDevPage = React.lazy(() => import('./pages/WebDevPage'));
const GeneralKnowledgePage = React.lazy(() => import('./pages/GeneralKnowledge'));
const CareerPredictorPage = React.lazy(() => import('./pages/CareerPredictor'));
const CollegesPage = React.lazy(() => import('./pages/Colleges'));
const NcertSolutionsPage = React.lazy(() => import('./pages/NcertSolutions'));
const LiveQuizPage = React.lazy(() => import('./pages/LiveQuiz'));
const AlternativesPage = React.lazy(() => import('./pages/Alternatives'));
const KidsPage = React.lazy(() => import('./pages/Kids'));
const GkQuestionsPage = React.lazy(() => import('./pages/GkQuestions'));
const ImportantQuestionsPage = React.lazy(() => import('./pages/ImportantQuestions'));
const PromptLabPage = React.lazy(() => import('./pages/PromptLab'));
const MockExamLandingPage = React.lazy(() => import('./pages/MockExamLanding'));
const CollegePredictorLandingPage = React.lazy(() => import('./pages/CollegePredictorLanding'));
const EnglishTopicsPage = React.lazy(() => import('./pages/EnglishTopics'));
const CareerGuidesPage = React.lazy(() => import('./pages/CareerGuides'));
const PreviousYearPapersPage = React.lazy(() => import('./pages/PreviousYearPapers'));
const FormulaSheetsPage = React.lazy(() => import('./pages/FormulaSheets'));
const StateBoardSolutionsPage = React.lazy(() => import('./pages/StateBoardSolutions'));
const AiHubPage = React.lazy(() => import('./pages/AiHub'));
const EmbedPage = React.lazy(() => import('./pages/EmbedPage'));
const MedicalCollegesPage = React.lazy(() => import('./pages/MedicalColleges'));
const CollegeFinderPage = React.lazy(() => import('./pages/CollegeFinder'));
const ScholarshipsPage = React.lazy(() => import('./pages/Scholarships'));
const DifferencesPage = React.lazy(() => import('./pages/Differences'));
const FullFormsPage = React.lazy(() => import('./pages/FullForms'));
const GlossaryPage = React.lazy(() => import('./pages/Glossary'));
const RevisionNotesPage = React.lazy(() => import('./pages/RevisionNotes'));
const SamplePapersPage = React.lazy(() => import('./pages/SamplePapers'));
const MathsTablesPage = React.lazy(() => import('./pages/MathsTables'));
const EnglishWritingPage = React.lazy(() => import('./pages/EnglishWriting'));
const ChapterMcqsPage = React.lazy(() => import('./pages/ChapterMcqs'));
const StaticGkPage = React.lazy(() => import('./pages/StaticGk'));
const VisualLearningPage = React.lazy(() => import('./pages/VisualLearning'));
const TimelinesPage = React.lazy(() => import('./pages/Timelines'));
const WhatToStudyPage = React.lazy(() => import('./pages/WhatToStudy'));
const QuizDuelPage = React.lazy(() => import('./pages/QuizDuel'));
const PyqsPage = React.lazy(() => import('./pages/Pyqs'));
const KidsSubjectLandingPage = React.lazy(() => import('./pages/KidsSubjectLanding'));
const EnglishVocabPage = React.lazy(() => import('./pages/EnglishVocab'));
const EnglishLiteraturePage = React.lazy(() => import('./pages/EnglishLiterature'));
const ConceptExplainersPage = React.lazy(() => import('./pages/ConceptExplainers'));
const SolvedExamplesPage = React.lazy(() => import('./pages/SolvedExamples'));
const LabPracticalsPage = React.lazy(() => import('./pages/LabPracticals'));
const DoubtSolverPage = React.lazy(() => import('./pages/Scan'));
const MicrolearningPage = React.lazy(() => import('./pages/Microlearning'));
const StudyRoomPage = React.lazy(() => import('./pages/StudyRoom'));
const CalculatorsPage = React.lazy(() => import('./pages/Calculators'));
const StudyPlannerPage = React.lazy(() => import('./pages/StudyPlanner'));
const CutoffsPage = React.lazy(() => import('./pages/Cutoffs'));
const FlashcardsPage = React.lazy(() => import('./pages/Flashcards'));
const AnswerEvaluatorPage = React.lazy(() => import('./pages/AnswerEvaluator'));
const UnitConverterPage = React.lazy(() => import('./pages/UnitConverter'));
const PeriodicTablePage = React.lazy(() => import('./pages/PeriodicTable'));
const PomodoroPage = React.lazy(() => import('./pages/Pomodoro'));
const MarksTrackerPage = React.lazy(() => import('./pages/MarksTracker'));
const ToolsHubPage = React.lazy(() => import('./pages/ToolsHub'));
const PdfToolkitPage = React.lazy(() => import('./pages/PdfToolkit'));
const ImageToolkitPage = React.lazy(() => import('./pages/ImageToolkit'));
const ComparePage = React.lazy(() => import('./pages/ComparePage'));
const QuestionPaperGeneratorPage = React.lazy(() => import('./pages/QuestionPaperGenerator'));
const NotesPage = React.lazy(() => import('./pages/NotesPage'));
const EverydayToolsPage = React.lazy(() => import('./pages/EverydayToolsPage'));
const RomanNumeralsPage = React.lazy(() => import('./pages/RomanNumeralsPage'));
const ContrastCheckerPage = React.lazy(() => import('./pages/ContrastCheckerPage'));
const TimestampPage = React.lazy(() => import('./pages/TimestampPage'));
const CsvToJsonPage = React.lazy(() => import('./pages/CsvToJsonPage'));
const ImageToTextPage = React.lazy(() => import('./pages/ImageToTextPage'));
const WordCounterPage = React.lazy(() => import('./pages/WordCounterPage'));
const TextToSpeechPage = React.lazy(() => import('./pages/TextToSpeechPage'));
const WorksheetsPage = React.lazy(() => import('./pages/Worksheets'));
const StoryLessonsLandingPage = React.lazy(() => import('./pages/StoryLessonsLanding'));

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

// URL paths — these are the CANONICAL URLs (May 2026 rename).
// Old URLs are 301-redirected via firebase.json (see hosting config) AND
// listed in LEGACY_PATH_TO_TAB below as a client-side fallback.
const TAB_TO_PATH: Record<string, string> = {
  home: '/',
  syllabus: '/syllabus',
  arena: '/practice',
  daily: '/daily-challenges',
  mock_tests: '/mock-tests',          // was /exams
  progress: '/dashboard',              // was /progress
  learning_lab: '/ai-tutor',           // was /learning-lab
  prep_hub: '/preparation',
  about: '/about',
  contact: '/contact',
  sitemap: '/sitemap',
  profile: '/profile',
  parent: '/parent',
  admin_pipeline: '/admin',
  blog: '/blog',
  updates: '/updates',
  skills_lab: '/coding',               // was /skills-lab
  english_lab: '/english',             // was /english-lab
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
  coding_challenges: '/coding-challenges',
  mini_projects: '/mini-projects',
  coding_for_kids: '/coding-for-kids',
  python_for_kids: '/python-for-kids',
  computer_basics: '/computer-basics',
  cyber_safety: '/cyber-safety',
  ai_for_students: '/ai-for-students',
  web_development: '/web-development',
  general_knowledge: '/gk-quiz',       // was /general-knowledge
  career: '/career-predictor',
  colleges: '/colleges',
  ncert_solutions: '/ncert-solutions',
  live_quiz: '/live-quiz',
  alternatives: '/free-alternatives',
  kids: '/kids',
  doubt_solver: '/doubt-solver',
  microlearning: '/micro',
  study_room: '/study-room',
  calculators: '/calculators',
  study_planner: '/study-planner',
  cutoffs: '/cutoffs',
  flashcards: '/flashcards',
  answer_evaluator: '/answer-evaluator',
  unit_converter: '/unit-converter',
  periodic_table: '/periodic-table',
  pomodoro: '/pomodoro',
  marks_tracker: '/marks-tracker',
  tools_hub: '/tools',
  pdf_tools: '/pdf-tools',
  image_tools: '/image-tools',
  compare_tool: '/compare',
  question_paper: '/question-paper-generator',
  notes_tool: '/notes',
  everyday_tools: '/everyday',
  roman_numerals: '/roman-numerals',
  contrast_checker: '/contrast-checker',
  timestamp_tool: '/timestamp',
  csv_to_json: '/csv-to-json',
  image_to_text: '/image-to-text',
  word_counter: '/word-counter',
  text_to_speech: '/text-to-speech',
  worksheets: '/worksheets',
  important_questions: '/important-questions',
  english_grammar: '/english-grammar',
  career_guides: '/career',
  college_predictor: '/college-predictor',
  previous_year_papers: '/previous-year-papers',
  formula_sheets: '/formula-sheets',
  state_board_solutions: '/state-board-solutions',
  ai_hub: '/ai-hub',
  prompt_lab: '/prompt-lab',
  embed: '/embed',
  medical_colleges: '/medical-colleges',
  college_finder: '/best-colleges',
  scholarships: '/scholarships',
  differences: '/difference-between',
  full_forms: '/full-forms',
  glossary: '/glossary',
  revision_notes: '/revision-notes',
  sample_papers: '/sample-papers',
  maths_tables: '/maths-tables',
  english_writing: '/english-writing',
  chapter_mcqs: '/mcqs',
  static_gk: '/gk-facts',
  visual_learning: '/visual-learning',
  timelines: '/timelines',
  what_to_study: '/what-to-study',
  quiz_duel: '/quiz-duel',
  pyqs: '/pyqs',
  kids_subject: '/maths-for-kids',
  english_vocab: '/vocabulary',
  english_literature: '/english-literature',
  concepts: '/concepts',
  solved_examples: '/solved-examples',
  lab_practicals: '/lab-practicals',
  story_lessons: '/story-lessons',
};

// Legacy URL aliases so users with old bookmarks still land on the right page
// even before Firebase's 301 redirect activates (safety net).
const LEGACY_PATH_TO_TAB: Record<string, string> = {
  '/exams': 'mock_tests',
  '/progress': 'progress',
  '/learning-lab': 'learning_lab',
  '/skills-lab': 'skills_lab',
  '/english-lab': 'english_lab',
  '/general-knowledge': 'general_knowledge',
};

// Secondary nav items grouped under an "Explore ▾" dropdown to keep the top bar clean.
// Organised into clear categories so the menu reads cleanly (and maps 1:1 to the
// sections a mobile app would use). english_vocab + static_gk are intentionally
// absent — they live inside the English page and the GK hub respectively.
const MORE_NAV_GROUPS: { heading: string; ids: string[] }[] = [
  { heading: 'Study Material', ids: ['important_questions', 'pyqs', 'what_to_study', 'revision_notes', 'concepts', 'visual_learning', 'timelines', 'solved_examples', 'sample_papers', 'chapter_mcqs', 'lab_practicals'] },
  { heading: 'Quick Reference', ids: ['differences', 'glossary', 'full_forms', 'maths_tables'] },
  { heading: 'English', ids: ['english_writing', 'english_literature'] },
  { heading: 'General Knowledge', ids: ['general_knowledge'] },
  { heading: 'Free Tools', ids: ['tools_hub', 'question_paper', 'pdf_tools', 'image_tools', 'compare_tool', 'notes_tool', 'everyday_tools', 'roman_numerals', 'contrast_checker', 'timestamp_tool', 'csv_to_json', 'image_to_text', 'word_counter', 'text_to_speech', 'calculators', 'unit_converter', 'periodic_table', 'pomodoro', 'marks_tracker', 'study_planner', 'flashcards', 'answer_evaluator', 'cutoffs', 'career'] },
  { heading: 'More', ids: ['quiz_duel', 'ai_hub', 'updates'] },
];
const MORE_NAV_IDS = MORE_NAV_GROUPS.flatMap((g) => g.ids);

// Learning areas worth offering as "pick up where you left off" on Home.
// (Excludes home/profile/dashboard/login/parent — those aren't study activities.)
const RESUMABLE_TABS: Record<string, string> = {
  syllabus: '📚 Syllabus',
  arena: '🎯 Practice',
  mock_tests: '📝 Mock Tests',
  learning_lab: '🤖 AI Tutor',
  skills_lab: '⚡ Coding',
  english_lab: '🔤 English',
  daily: '📅 Daily Challenge',
  general_knowledge: '🧠 General Knowledge',
  study_room: '⏱️ Study Room',
};

const PATH_TO_TAB: Record<string, string> = Object.fromEntries(
  Object.entries(TAB_TO_PATH).map(([tab, path]) => [path, tab])
);
// Merge legacy entries so old URLs resolve client-side too
for (const [legacyPath, tab] of Object.entries(LEGACY_PATH_TO_TAB)) {
  if (!PATH_TO_TAB[legacyPath]) PATH_TO_TAB[legacyPath] = tab;
}

/** Sentinel returned by resolveTab for paths that match no known route. */
export const NOT_FOUND_TAB = '__not_found__';

/**
 * Pages that exist ONLY as prerendered HTML (state-board guides written by the
 * prerender script) — there is no React component for them. Listed so the
 * not-found handling never noindexes them. Guarded by routeCoverage.test.ts,
 * which fails the build if any sitemap URL is treated as unknown.
 */
const PRERENDER_ONLY_PATHS = new Set(['/up-board', '/bihar-board']);

/**
 * Hindi routes (/hi/concepts/…) are prerendered but were never taught to the
 * router, so after hydration they fell through to the home page — a content
 * mismatch for anyone arriving from Google. Resolve them via their English
 * counterpart (/hi/concepts/x → /concepts/x) so the right section renders and,
 * importantly, they are never mistaken for unknown URLs and noindexed.
 */
function stripLocale(pathname: string): string {
  return pathname === '/hi' ? '/' : pathname.startsWith('/hi/') ? pathname.slice(3) : pathname;
}

// Resolve a pathname → tab. Exact match first, then prefix match for sections
// that have deep sub-routes (e.g. /colleges/karnataka/rvce-bengaluru → colleges).
function resolveTab(rawPathname: string): string {
  const pathname = stripLocale(rawPathname);
  if (PATH_TO_TAB[pathname]) return PATH_TO_TAB[pathname];
  // Prerender-only pages: real indexed content is baked into the static HTML but
  // the SPA has no component for them. They must NEVER be treated as unknown
  // (that would noindex live pages); they fall back to the home shell, which is
  // exactly what they did before the not-found handling existed.
  if (PRERENDER_ONLY_PATHS.has(pathname)) return 'home';
  if (pathname === '/colleges' || pathname.startsWith('/colleges/')) return 'colleges';
  // Per-article blog pages: /updates/<slug> → the Updates (blog) tab.
  if (pathname === '/updates' || pathname.startsWith('/updates/')) return 'updates';
  // NCERT solution pages: /ncert-solutions/<...> → the NCERT tab.
  if (pathname === '/ncert-solutions' || pathname.startsWith('/ncert-solutions/')) return 'ncert_solutions';
  if (pathname === '/live-quiz' || pathname.startsWith('/live-quiz/')) return 'live_quiz';
  if (pathname === '/free-alternatives' || pathname.endsWith('-alternative')) return 'alternatives';
  if (pathname === '/kids' || pathname.startsWith('/kids/')) return 'kids';
  if (pathname === '/gk-questions' || pathname.startsWith('/gk-questions/')) return 'gk_questions';
  if (pathname === '/important-questions' || pathname.startsWith('/important-questions/')) return 'important_questions';
  if (pathname === '/prompt-lab') return 'prompt_lab';
  // SEO landing clusters (deep routes → their own pages; bare /mock-tests stays the main page).
  if (pathname.startsWith('/mock-tests/')) return 'mock_exam';
  if (pathname === '/english-grammar' || pathname.startsWith('/english-grammar/')) return 'english_grammar';
  if (pathname === '/career' || pathname.startsWith('/career/')) return 'career_guides';
  if (pathname === '/college-predictor' || pathname.startsWith('/college-predictor/')) return 'college_predictor';
  if (pathname === '/previous-year-papers' || pathname.startsWith('/previous-year-papers/')) return 'previous_year_papers';
  if (pathname === '/formula-sheets' || pathname.startsWith('/formula-sheets/')) return 'formula_sheets';
  if (pathname === '/state-board-solutions' || pathname.startsWith('/state-board-solutions/')) return 'state_board_solutions';
  if (pathname === '/ai-hub' || pathname.startsWith('/ai-hub/')) return 'ai_hub';
  if (pathname === '/embed') return 'embed';
  if (pathname === '/medical-colleges' || pathname.startsWith('/medical-colleges/')) return 'medical_colleges';
  if (pathname === '/best-colleges' || pathname.startsWith('/best-colleges/') || pathname === '/colleges-accepting' || pathname.startsWith('/colleges-accepting/')) return 'college_finder';
  if (pathname === '/scholarships') return 'scholarships';
  if (pathname === '/difference-between' || pathname.startsWith('/difference-between/')) return 'differences';
  if (pathname === '/full-forms' || pathname.startsWith('/full-forms/')) return 'full_forms';
  if (pathname === '/glossary' || pathname.startsWith('/glossary/')) return 'glossary';
  if (pathname === '/revision-notes' || pathname.startsWith('/revision-notes/')) return 'revision_notes';
  if (pathname === '/sample-papers' || pathname.startsWith('/sample-papers/')) return 'sample_papers';
  if (pathname === '/maths-tables' || pathname.startsWith('/maths-tables/')) return 'maths_tables';
  if (pathname === '/english-writing' || pathname.startsWith('/english-writing/')) return 'english_writing';
  if (pathname === '/mcqs' || pathname.startsWith('/mcqs/')) return 'chapter_mcqs';
  if (pathname === '/gk-facts' || pathname.startsWith('/gk-facts/')) return 'static_gk';
  if (pathname === '/visual-learning' || pathname.startsWith('/visual-learning/')) return 'visual_learning';
  if (pathname === '/timelines' || pathname.startsWith('/timelines/')) return 'timelines';
  if (pathname === '/what-to-study' || pathname.startsWith('/what-to-study/')) return 'what_to_study';
  if (pathname === '/quiz-duel') return 'quiz_duel';
  if (pathname === '/pyqs' || pathname.startsWith('/pyqs/')) return 'pyqs';
  if (['/maths-for-kids', '/science-for-kids', '/english-for-kids'].includes(pathname)) return 'kids_subject';
  if (pathname === '/vocabulary' || pathname.startsWith('/vocabulary/')) return 'english_vocab';
  if (pathname === '/english-literature' || pathname.startsWith('/english-literature/')) return 'english_literature';
  if (pathname === '/concepts' || pathname.startsWith('/concepts/')) return 'concepts';
  if (pathname === '/solved-examples' || pathname.startsWith('/solved-examples/')) return 'solved_examples';
  if (pathname === '/lab-practicals' || pathname.startsWith('/lab-practicals/')) return 'lab_practicals';
  if (pathname === '/story-lessons' || pathname.startsWith('/story-lessons/')) return 'story_lessons';
  if (pathname === '/doubt-solver') return 'doubt_solver';
  if (pathname === '/micro' || pathname.startsWith('/micro/')) return 'microlearning';
  // Coding deep links (/coding/<lang>, /coding/<lang>/<topic>) — without this,
  // a visitor landing from Google on a prerendered coding URL fell through to
  // the home page (content mismatch + bad UX). NOTE: /coding-challenges and
  // /coding-for-kids are exact keys matched above, so '/coding/' won't catch them.
  if (pathname === '/coding' || pathname.startsWith('/coding/')) return 'skills_lab';
  // Unknown path. Previously this returned 'home', which silently served the
  // full homepage at any junk URL with `index,follow` — a soft 404: the server
  // says 200, so crawlers treat every typo/spam URL as a real page. We now flag
  // it so the app can render a "not found" view and emit `noindex`.
  // (Firebase Hosting rewrites always return 200, so noindex is the correct
  // available signal — see NOT_FOUND_TAB usage below.)
  return NOT_FOUND_TAB;
}

/** True when a pathname matches no known route (used to emit noindex). */
export function isUnknownPath(pathname: string): boolean {
  return resolveTab(pathname) === NOT_FOUND_TAB;
}

const PAGE_SEO: Record<string, { title: string; description: string; keywords: string; url: string; jsonLd?: Record<string, unknown> | Record<string, unknown>[] }> = {
  worksheets: {
    title: 'Free Printable Worksheets — Letters, Phonics, Maths, Reading & More (PDF) | Syllab.in',
    description: 'Download 100+ free printable worksheets for Pre-KG to Class 2: letters & tracing, phonics, sight words, reading, maths, shapes and more — print or save as PDF. Free, no signup.',
    keywords: 'free printable worksheets, alphabet tracing worksheets pdf, phonics worksheets, sight words worksheet, reading comprehension worksheets kids, addition subtraction worksheets, number tracing worksheet, counting worksheets preschool, shapes worksheet kids, colors worksheet, science worksheets kindergarten, social emotional worksheets, kindergarten worksheets free download India, pre-kg worksheets pdf',
    url: 'https://syllab.in/worksheets',
  },
  pdf_tools: {
    title: 'Free PDF Tools — Merge, Split, Watermark, PDF to Text | Syllab.in',
    description: 'Free private PDF tools that work 100% in your browser — your files never leave your device. Merge, split, rotate, delete pages, images to PDF, add a watermark, add page numbers, flatten forms and extract text. No upload, no signup.',
    keywords: 'free pdf tools, merge pdf, split pdf, watermark pdf, add page numbers pdf, pdf to text, flatten pdf, images to pdf, rotate pdf, delete pdf pages, ilovepdf free alternative, private pdf editor',
    url: 'https://syllab.in/pdf-tools',
  },
  image_tools: {
    title: 'Free Image Tools — Compress, Resize, Convert, HEIC to JPG | Syllab.in',
    description: 'Free private image tools that work 100% in your browser — your files never leave your device. Compress, resize, convert (JPG/PNG/WebP), rotate, flip, crop and convert HEIC to JPG. No upload, no signup, no watermark.',
    keywords: 'compress image, resize image, convert image, jpg to png, png to webp, heic to jpg, rotate image, flip image, crop image, free image tools, image compressor online free, private image tools',
    url: 'https://syllab.in/image-tools',
  },
  question_paper: {
    title: 'Free Question Paper Generator — Printable MCQ Practice Papers | Syllab.in',
    description: 'Make a printable MCQ practice paper in seconds. Pick a class, subject and chapters, choose how many questions, and print or save as PDF with an answer key. Free, no signup.',
    keywords: 'question paper generator, mcq paper generator, practice paper maker, printable question paper, cbse mcq practice paper, test paper generator for teachers, worksheet generator',
    url: 'https://syllab.in/question-paper-generator',
  },
  compare_tool: {
    title: 'Compare Text & Documents Online — Free Diff Checker | Syllab.in',
    description: 'Free online tool to compare two texts or documents and highlight the differences. Paste text or load a PDF, Word (DOCX) or TXT file — everything runs privately in your browser, nothing is uploaded.',
    keywords: 'compare text online, text diff, diff checker, compare two documents, compare pdf free, compare word documents, find differences between two texts, online diff tool',
    url: 'https://syllab.in/compare',
  },
  notes_tool: {
    title: 'Free Online Notepad That Saves — Private Notes App | Syllab.in',
    description: 'A free online notepad that saves automatically in your browser. Write rich-text notes with bold, headings and lists, keep multiple notes, and they stay after you reload — no signup, nothing uploaded, works offline.',
    keywords: 'free online notepad, notepad that saves, notes app browser, save notes online, online notepad, rich text notepad, private notes, notepad no login',
    url: 'https://syllab.in/notes',
  },
  everyday_tools: {
    title: 'Everyday Calculators — Unit Converter, Percentage, Age, BMI | Syllab.in',
    description: 'Free everyday calculators in one place: unit converter (length, weight, temperature, data, speed, area), percentage calculator, age calculator, date difference, BMI and a lorem ipsum generator. No signup.',
    keywords: 'unit converter, percentage calculator, age calculator, date difference calculator, bmi calculator, lorem ipsum generator, everyday calculators, online calculator free',
    url: 'https://syllab.in/everyday',
  },
  roman_numerals: {
    title: 'Roman Numeral Converter — Number ⇄ Roman (1–3999) Free | Syllab.in',
    description: 'Free two-way Roman numeral converter. Convert any number from 1 to 3999 into Roman numerals and Roman numerals back into numbers, live as you type, with validation.',
    keywords: 'roman numeral converter, number to roman numerals, roman numerals to number, roman numeral translator, convert roman numerals, 1 to 3999 roman numerals',
    url: 'https://syllab.in/roman-numerals',
  },
  contrast_checker: {
    title: 'Colour Contrast Checker (WCAG) — Free AA / AAA Test | Syllab.in',
    description: 'Free WCAG colour contrast checker. Pick a text and background colour to see the contrast ratio and whether it passes WCAG AA and AAA for normal and large text, with a live preview.',
    keywords: 'color contrast checker, wcag contrast checker, contrast ratio calculator, aa aaa contrast, accessibility contrast, text background contrast, colour contrast checker',
    url: 'https://syllab.in/contrast-checker',
  },
  timestamp_tool: {
    title: 'Unix Timestamp Converter — Epoch to Date & Back (Free) | Syllab.in',
    description: 'Free Unix timestamp / epoch converter. Convert an epoch (seconds or milliseconds, auto-detected) to a human-readable UTC and ISO 8601 date, or a date back to epoch. Includes a Now button.',
    keywords: 'unix timestamp converter, epoch converter, epoch to date, timestamp to date, unix time, epoch time, iso 8601 converter, current unix timestamp',
    url: 'https://syllab.in/timestamp',
  },
  csv_to_json: {
    title: 'CSV to JSON Converter — Free & Private (In Your Browser) | Syllab.in',
    description: 'Free CSV to JSON converter that runs entirely in your browser — nothing uploaded. Paste CSV and get pretty-printed JSON, with quote-aware parsing that handles commas inside quoted fields.',
    keywords: 'csv to json, csv to json converter, convert csv to json, csv json online, csv parser, csv to json free, spreadsheet to json',
    url: 'https://syllab.in/csv-to-json',
  },
  image_to_text: {
    title: 'Image to Text (OCR) — Free & Private, In Your Browser | Syllab.in',
    description: 'Free image to text converter (OCR). Extract text from a photo, screenshot or scanned page instantly — everything runs in your browser with Tesseract, so your image is never uploaded. Copy or download the text.',
    keywords: 'image to text, photo to text, jpg to text, ocr online free, extract text from image, picture to text, screenshot to text, scanned document to text, handwriting to text',
    url: 'https://syllab.in/image-to-text',
  },
  word_counter: {
    title: 'Word Counter — Free Words & Character Count Online | Syllab.in',
    description: 'Free online word counter and character counter. Paste your essay or assignment to instantly see word count, characters (with and without spaces), sentences, paragraphs and reading time.',
    keywords: 'word counter, character counter, word count online, count words, essay word count, character count, reading time calculator, free word counter',
    url: 'https://syllab.in/word-counter',
  },
  text_to_speech: {
    title: 'Text to Speech — Free Online Voice Reader | Syllab.in',
    description: 'Free text-to-speech reader. Paste any text or your notes and have them read aloud in a natural voice — choose the voice, speed and pitch. Runs in your browser, nothing uploaded.',
    keywords: 'text to speech, tts, read text aloud, text to speech online free, voice reader, read notes aloud, text to voice',
    url: 'https://syllab.in/text-to-speech',
  },
  tools_hub: {
    title: 'Free Student Tools — Calculators, Timers, Flashcards & More | Syllab.in',
    description: '10 free tools for students in one place: percentage & CGPA calculators, unit converter, interactive periodic table, Pomodoro timer, marks tracker, study planner, spaced-repetition flashcards, AI answer evaluator and college predictors. No signup.',
    keywords: 'free student tools, study tools online, student calculators, pomodoro timer, flashcards, study planner, periodic table, unit converter, marks tracker, college predictor, tools for CBSE JEE NEET students',
    url: 'https://syllab.in/tools',
  },
  marks_tracker: {
    title: 'Free Marks & Percentage Tracker for Students | Syllab.in',
    description: 'Track your marks across subjects and see your overall percentage, CBSE grade, strongest and weakest subject instantly — plus the marks you still need in upcoming exams to hit your target. Free, saved on your device.',
    keywords: 'marks tracker, percentage tracker, GPA tracker, overall percentage calculator, marks needed for target, subject-wise marks, exam marks calculator, CBSE percentage tracker',
    url: 'https://syllab.in/marks-tracker',
  },
  pomodoro: {
    title: 'Free Pomodoro Timer for Studying — Focus Timer | Syllab.in',
    description: 'Free online Pomodoro timer to study with focus. 25-minute focus sessions with short and long breaks, session counter and a gentle chime. Customisable, saved on your device, no signup. Beat procrastination.',
    keywords: 'pomodoro timer, study timer, focus timer, pomodoro technique, 25 minute timer, online timer for studying, productivity timer free, beat procrastination',
    url: 'https://syllab.in/pomodoro',
  },
  periodic_table: {
    title: 'Interactive Periodic Table of Elements (2026) — Free | Syllab.in',
    description: 'Free interactive periodic table with all 118 elements — tap any element for its atomic number, symbol, atomic mass, category, group, period, electron configuration and state. For CBSE, NCERT chemistry, JEE & NEET.',
    keywords: 'periodic table, interactive periodic table, periodic table of elements, 118 elements, atomic mass, electron configuration, periodic table for JEE NEET, chemistry periodic table free',
    url: 'https://syllab.in/periodic-table',
  },
  unit_converter: {
    title: 'Free Unit Converter — Length, Mass, Temperature, Speed & More | Syllab.in',
    description: 'Free online unit converter for students: length, mass, time, area, volume, speed, energy, pressure, temperature (°C/°F/K) and digital storage. Instant, accurate, no signup — for physics, chemistry & maths.',
    keywords: 'unit converter, unit conversion, cm to inches, kg to pounds, celsius to fahrenheit, km/h to m/s, litre to ml, unit converter for physics, metric conversion India',
    url: 'https://syllab.in/unit-converter',
  },
  answer_evaluator: {
    title: 'Free AI Answer Checker & Evaluator | Syllab.in',
    description: 'Paste any exam question and your answer — our free AI examiner scores it out of your chosen marks and shows what you did well, what\'s missing, and the key points a full-marks answer needs. For CBSE boards, JEE & NEET.',
    keywords: 'AI answer checker, answer evaluator free, AI exam answer grader, check my answer, board exam answer feedback, model answer checker, AI marking, evaluate my answer online',
    url: 'https://syllab.in/answer-evaluator',
  },
  flashcards: {
    title: 'Free Flashcards with Spaced Repetition | Syllab.in',
    description: 'Make free flashcards and study smarter with spaced repetition (SM-2). Create your own decks, flip cards, and let the app schedule each card for the perfect time to review. Saved on your device. For CBSE, JEE & NEET.',
    keywords: 'flashcards free, spaced repetition app, flashcard maker, study flashcards online, Anki alternative free, active recall, revision flashcards CBSE JEE NEET',
    url: 'https://syllab.in/flashcards',
  },
  cutoffs: {
    title: 'Engineering College Cutoffs 2026 — JEE Main, NEET & State Exams | Syllab.in',
    description: 'Browse indicative closing cutoffs for top engineering colleges by exam — JEE Main, JEE Advanced, BITSAT, MHT-CET, KCET, WBJEE, EAPCET and more. Compare cutoff, NIRF rank and average package in one table. Free.',
    keywords: 'engineering college cutoff 2026, JEE Main cutoff colleges, JEE Advanced cutoff, NIT cutoff, MHT-CET cutoff, KCET cutoff, WBJEE cutoff, closing rank engineering colleges, college cutoff list India',
    url: 'https://syllab.in/cutoffs',
  },
  study_planner: {
    title: 'Free Study Planner & Revision Timetable Generator | Syllab.in',
    description: 'Make a free, personalized study timetable in seconds. Enter your exam date, subjects and study hours — get a day-by-day revision plan (learn → revise → mock test) you can save or print. For CBSE, JEE & NEET students.',
    keywords: 'study planner, revision timetable generator, study timetable maker free, exam study plan, board exam timetable, JEE NEET study plan, how to make a study schedule, daily study routine',
    url: 'https://syllab.in/study-planner',
  },
  calculators: {
    title: 'Free Percentage, CGPA & Attendance Calculators for CBSE Students | Syllab.in',
    description: 'Free online calculators for Indian students: marks-to-percentage, CGPA to percentage (CBSE 9.5 rule) and back, attendance "can I bunk?", SGPA, CBSE grade, CUET score and education-loan EMI. Instant, no signup.',
    keywords: 'percentage calculator, CGPA to percentage calculator, CBSE CGPA calculator, attendance calculator, can I bunk calculator, marks percentage calculator India, student calculators free, education loan EMI calculator, CUET score calculator, CBSE grade calculator',
    url: 'https://syllab.in/calculators',
  },
  study_room: {
    title: 'AI Study Room — Focus Timer, Study Music & AI Tutor (Free) | Syllab.in',
    description: 'Free AI study room for Indian students: Pomodoro focus timer, calming study ambience, exam countdowns, voice AI tutor for instant doubts, break reminders & study-streak tracking. Study like you have a tuition teacher beside you.',
    keywords: 'study room online free, pomodoro timer study, AI tutor voice India, study with me focus timer, study music free, exam countdown CBSE JEE NEET, distraction blocker study, online study room India students',
    url: 'https://syllab.in/study-room',
  },
  story_lessons: {
    title: 'Story-Based Learning for CBSE Classes 1–12 — NCERT Chapters as Stories | Syllab.in',
    description: 'Free story-based learning for CBSE NCERT chapters Class 1-12. Every chapter becomes an engaging story. 569 lessons, 534 chapters, voice narration, 100% free for Indian students.',
    keywords: 'story based learning CBSE, NCERT chapters as stories, engaging learning for kids, memory techniques CBSE, narrative learning, free learning stories India, CBSE Class 1-12 stories',
    url: 'https://syllab.in/story-lessons',
  },
  home: {
    title: 'Syllab.in — Free AI Learning for CBSE, NCERT, JEE & NEET | Class 1–12',
    description: 'Syllab.in is India\'s free AI learning platform for Class 1 to 12. Study NCERT chapters, practice MCQs, take mock tests for JEE/NEET/EAMCET/WBJEE/MHT-CET/KCET, learn coding, daily GK quiz, dark-mode for night study. Free for every Indian student.',
    keywords: 'free learning app India, AI tutor free India, NCERT solutions free, CBSE notes free Class 1-12, JEE preparation free 2026, NEET preparation free, EAMCET mock test, online learning app India, free mock test India, doubt solver free, free education India, study app India, best learning app Class 10 India, NCERT app free, CBSE app free India, JEE preparation app 2026, NEET preparation app 2026, free education app India Class 12, Unacademy alternative free, BYJU\'s alternative free, Khan Academy India, free AI study app, online tuition free India, school learning app India, practice test app free India, MHT CET free, KCET preparation free, WBJEE preparation free, BITSAT mock test free, TNEA mock free, UPSEE 2026 free, COMEDK UGET, GUJCET practice, OJEE mock test free, GK quiz India free, daily GK Class 5-12, general knowledge MCQ India, current affairs 2026, dark mode study app, night study app India, weekly newsletter free, student progress tracker India, parent dashboard India free',
    url: 'https://syllab.in/',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Syllab.in',
        operatingSystem: 'Web',
        applicationCategory: 'EducationApplication',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Free AI-powered learning platform for Class 1–12 CBSE Indian students',
        // NOTE: no aggregateRating here. Fabricated review counts violate Google's
        // structured-data policy and risk a manual penalty. Add a real one only
        // once genuine, verifiable ratings exist.
      },
      {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'Syllab.in',
        url: 'https://syllab.in',
        description: 'Free AI education platform for Indian students Class 1-12',
        logo: {
          '@type': 'ImageObject',
          url: 'https://syllab.in/og-image.png',
          width: 1200,
          height: 630,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'support@syllab.in',
          contactType: 'customer support',
          areaServed: 'IN',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Is Syllab.in free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, Syllab.in is completely free for all Indian students from Class 1 to Class 12.' } },
          { '@type': 'Question', name: 'Which exams does Syllab.in help with?', acceptedAnswer: { '@type': 'Answer', text: 'Syllab.in helps with JEE Mains, NEET, EAMCET, CBSE boards, BITSAT, VITEEE, WBJEE, TNEA, UPSEE, MHT-CET, KCET, COMEDK, GUJCET, OJEE, and Math/Science Olympiads. All state engineering and medical entrance exams covered free.' } },
          { '@type': 'Question', name: 'Does Syllab.in cover NCERT syllabus?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, Syllab.in covers the complete NCERT syllabus for Class 1 to 12 with AI-powered notes, MCQs, and practice tests.' } },
          { '@type': 'Question', name: 'Can I practice coding on Syllab.in?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Syllab.in Skills Lab offers Python, JavaScript, SQL, Java coding challenges with instant AI feedback — completely free.' } },
          { '@type': 'Question', name: 'Does Syllab.in have a daily GK quiz?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — the General Knowledge section has 150+ MCQs across Indian history, geography, polity, science, and current affairs 2025-26 with a daily 10-question quiz for Class 5-12 students.' } },
          { '@type': 'Question', name: 'Does Syllab.in have a dark mode?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, Syllab.in has a dark mode toggle in the top navigation. Tap the moon icon to switch — useful for night study sessions.' } },
          { '@type': 'Question', name: 'Will I receive a weekly study newsletter?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — signed-in students get a weekly performance email with their XP, streak, completed topics, and class-appropriate study blogs. Parents get a separate child-progress newsletter.' } },
          { '@type': 'Question', name: 'Are state engineering exam mock tests available?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — 10 mock papers each for WBJEE, TNEA, UPSEE, MHT-CET, KCET, COMEDK, GUJCET, OJEE plus 15 each for JEE Main, NEET, EAMCET, AP EAMCET, BITSAT, VITEEE. Over 200 mocks free.' } },
        ],
      },
    ],
  },
  syllabus: {
    title: 'Class 1–12 NCERT Syllabus + Free Financial Literacy | CBSE Chapters | Syllab.in',
    description: 'Browse NCERT chapters for every class and subject with AI lessons, natural-voice narration, and practice. Plus a free Financial Literacy track — stocks, saving, money & markets for Class 5 to 12.',
    keywords: 'NCERT syllabus free, CBSE syllabus Class 1-12, NCERT notes free download, CBSE chapter notes, important chapters CBSE, NCERT book chapters, free NCERT chapters, NCERT chapter summary, CBSE syllabus 2025-26, subject wise chapters CBSE, financial literacy for students India, free stock market course for students, money and savings lessons for kids, financial education Class 5-12, stock market basics for students free, learn investing students India, commodities gold oil lessons, currency exchange lessons students, life skills curriculum India free',
    url: 'https://syllab.in/syllabus',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Financial Literacy for Students (Class 5–12)',
      description: 'Free Financial Literacy course for Indian students: money, saving, banking, stocks, currencies, gold, oil, commodities and trade — basics to advanced with real-life examples.',
      provider: { '@type': 'EducationalOrganization', name: 'Syllab', url: 'https://syllab.in' },
      isAccessibleForFree: true,
      inLanguage: 'en-IN',
      educationalLevel: 'Class 5 to Class 12',
      about: ['Financial Literacy', 'Stock Market', 'Saving', 'Investing', 'Currencies', 'Commodities'],
    },
  },
  arena: {
    title: 'Practice — Free Chapter-wise MCQs for CBSE NCERT | Syllab.in',
    description: 'Practice timed chapter-wise MCQs for NCERT CBSE with instant scoring, explanations, and AI mistake tracking. Free for all Class 1–12 students.',
    keywords: 'free MCQ practice CBSE, NCERT chapter wise quiz, online mock test free, CBSE practice questions, board exam prep Class 10, competitive exam practice, timed quiz online, NCERT MCQ practice free, chapter quiz CBSE, MCQ questions Class 9 10 11 12, objective questions free, short answer questions CBSE, practice arena India free',
    url: 'https://syllab.in/practice',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'CBSE NCERT Chapter-wise MCQ Practice',
      description: 'Chapter-wise MCQ practice for all CBSE NCERT subjects Class 1 to 12',
      provider: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
      isAccessibleForFree: true,
      inLanguage: 'en-IN',
    },
  },
  daily: {
    title: 'Daily Challenge — JEE NEET EAMCET & School Daily Quiz | Syllab.in',
    description: 'Take a daily quiz challenge for JEE, NEET, EAMCET, and school aptitude with live rankings and streak tracking. Practice every day, improve your rank. Same daily quiz for all users — compete with friends.',
    keywords: 'daily challenge free India, daily quiz free India, JEE daily practice 2026, NEET daily questions, EAMCET practice daily, quiz competition free, aptitude questions daily, morning quiz challenge, daily dose CBSE, streak challenge India',
    url: 'https://syllab.in/daily-challenges',
  },
  progress: {
    title: 'Dashboard — XP, Streaks, Analytics & Exam History | Syllab.in',
    description: 'View your XP, streaks, weak topics, exam results, completed chapters, and full learning analytics in your personalised student dashboard.',
    keywords: 'student dashboard India, learning analytics free, XP tracker India, study streak app, weak topics AI, exam history dashboard, performance dashboard, CBSE student progress tracker, my dashboard syllab, student progress dashboard',
    url: 'https://syllab.in/dashboard',
  },
  mock_tests: {
    title: 'Mock Tests — Free JEE, NEET, EAMCET & State Exam Papers | Syllab.in',
    description: 'Free mock tests for JEE Main, NEET, EAMCET, VIT, BITSAT, and all state engineering entrance exams (WBJEE, TNEA, UPSEE, MHT-CET, KCET, COMEDK, GUJCET, OJEE). 10+ mocks per exam. Math & Science Olympiads included.',
    keywords: 'mock tests free India, JEE Main mock test 2026 free, NEET mock test 2026 free, EAMCET mock test free, VIT mock test, BITSAT mock test free, WBJEE mock test free, TNEA mock test, UPSEE 2026 free, MHT-CET mock test free, KCET 2026 mock test, COMEDK UGET practice, GUJCET practice free, OJEE mock test free, state engineering entrance exams, full length mock test free India, board exam practice test Class 10, Math Olympiad free, sample paper CBSE 2026, previous year question paper, engineering entrance exam preparation free, test series free India',
    url: 'https://syllab.in/mock-tests',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Free Mock Tests for JEE, NEET, EAMCET & State Exams',
      description: 'Practice with full mock tests for JEE Mains, NEET, EAMCET, BITSAT, WBJEE, TNEA, UPSEE, MHT-CET, KCET, COMEDK, GUJCET, OJEE and Olympiads',
      provider: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
      isAccessibleForFree: true,
      inLanguage: 'en-IN',
    },
  },
  live_quiz: {
    title: 'Free Live Multiplayer Quiz for Class 6–12 — GK, Science & Maths (Kahoot Alternative) | Syllab.in',
    description: 'Play free live multiplayer quizzes with Indian students across GK, Science, Maths, and more. Real-time rankings, instant feedback, and daily leaderboards. Like Kahoot but free, no login needed.',
    keywords: 'live quiz free India, multiplayer quiz online, Kahoot alternative free India, GK quiz live, science quiz multiplayer, maths quiz live, quiz game online free students, competitive quiz app free',
    url: 'https://syllab.in/live-quiz',
  },
  prep_hub: {
    title: 'Free JEE Main, NEET & EAMCET Preparation Guides 2026 — Chapter Weightage & Study Plans | Syllab.in',
    description: 'Comprehensive preparation guides for JEE Mains, NEET, EAMCET, and CBSE boards — chapter weightage, study plans, important formulas, and tips from top scorers.',
    keywords: 'JEE Mains preparation 2026, NEET preparation guide, EAMCET strategy, CBSE board exam tips, high weightage chapters JEE, NEET important topics, study plan competitive exam',
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
    title: 'AI Tutor — Free AI Homework Helper, Notes & Doubt Solver | Syllab.in',
    description: 'Free AI Tutor for Indian students. Generate AI concept notes, flashcards, practice MCQs. Scan & solve homework problems step-by-step. 24/7 doubt solving — no subscription, free for Class 1-12.',
    keywords: 'AI tutor free India, AI homework helper India free, free AI study helper India, AI notes generator free, homework solver India free, flashcard maker free, question paper generator AI, AI tutor homework, concept notes generator AI, AI doubt solver free, scan and solve homework, photo question solver India, free AI study buddy, ChatGPT alternative for students free, Gemini tutor free, AI math solver India',
    url: 'https://syllab.in/ai-tutor',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Free AI Tutor for Indian Students',
      description: 'AI-powered tutoring with notes generation, flashcards, scan-and-solve, and 24/7 doubt clearing for CBSE NCERT students',
      provider: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
      isAccessibleForFree: true,
      inLanguage: 'en-IN',
      educationalLevel: 'Class 1 to Class 12',
    },
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
    title: 'Coding — Free Python, JavaScript, SQL & AI for Students | Syllab.in',
    description: 'Free coding courses for Indian students Class 5-12. Learn Python, JavaScript, SQL, Java, AI basics, Data Analytics, App Dev, Robotics, Game Dev, Git, Cloud, and Prompt Engineering. Build Mini Projects with instant AI feedback.',
    keywords: 'free coding India students, learn coding free India, Python for students India free, Python course Class 10, learn Python free, JavaScript basics free India, SQL basics free, SQL tutorial students, AI basics for students, data science course free India, coding skills students, competitive programming free India, HackerRank alternative free, LeetCode alternative free India, Python tutorial Class 10 11 India, Java basics free, coding course India free, programming languages for students, learn SQL free India, HTML CSS basics students, free coding bootcamp India, code for kids India, learn programming free India, app development free students, game development course free, robotics for students India',
    url: 'https://syllab.in/coding',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Skills Lab — Free Coding & AI Courses for Indian Students',
      description: 'Learn Python, JavaScript, SQL, Java, AI, Data Analytics and more with guided projects and coding challenges',
      provider: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
      hasCourseInstance: [
        { '@type': 'CourseInstance', name: 'Python Programming', courseMode: 'online', isAccessibleForFree: true },
        { '@type': 'CourseInstance', name: 'JavaScript Basics', courseMode: 'online', isAccessibleForFree: true },
        { '@type': 'CourseInstance', name: 'SQL Databases', courseMode: 'online', isAccessibleForFree: true },
        { '@type': 'CourseInstance', name: 'AI & Machine Learning Basics', courseMode: 'online', isAccessibleForFree: true },
      ],
      isAccessibleForFree: true,
      inLanguage: 'en-IN',
    },
  },
  english_lab: {
    title: 'Free English Grammar, Speaking & Vocabulary Practice for CBSE Class 1–12 | Syllab.in',
    description: 'Practice English daily with AI speaking coach, grammar challenges, reading passages, NCERT story guides, vocabulary builder, and IELTS prep — all free for Indian students.',
    keywords: 'English speaking practice free India, IELTS preparation free, English grammar CBSE Class 10, English vocabulary app free, spoken English practice app, NCERT English Class 9 10, English reading comprehension free, AI English teacher free India, free English coach India, English fluency app free, spoken English course free, learn English online free India, English speaking practice for students, English vocabulary builder Class 6 7 8 9 10',
    url: 'https://syllab.in/english',
  },
  blog: {
    title: 'Study Tips & Guides for CBSE JEE NEET Students | Syllab.in Blog',
    description: 'Free study tips, chapter guides, exam strategies, and preparation advice for CBSE Class 5–12, JEE Mains, NEET, and EAMCET students. Auto-updated weekly with trending topics.',
    keywords: 'study tips CBSE students, JEE preparation strategy 2026, NEET exam guide, board exam tips Class 10, how to score high, important chapters high weightage, exam strategy blog, free NCERT notes Class 10, JEE NEET EAMCET 2026 preparation, best free coding platforms India students, CBSE Class 10 board exam tips 2026',
    url: 'https://syllab.in/blog',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Syllab.in Blog',
      description: 'Free study tips, exam guides, and preparation strategies for Indian students Class 1-12',
      url: 'https://syllab.in/blog',
      publisher: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
      inLanguage: 'en-IN',
    },
  },
  updates: {
    title: 'Blog — Latest CBSE, JEE, NEET, AI & Study Tips for Indian Students | Syllab.in',
    description: 'Syllab Blog: daily updates for Indian students. CBSE notifications 2026, JEE Mains dates, NEET 2026 syllabus, EAMCET schedule, AI tool reviews, study tips, coding trends, plus Money & Markets — stock market basics, saving & financial literacy for students. 38+ articles, refreshed weekly.',
    keywords: 'Syllab blog, education blog India, student blog India, CBSE updates 2025 2026, CBSE notification 2026, JEE Mains 2026 news, NEET latest news 2026, EAMCET 2026 notification, AI tools for students 2026, ChatGPT for students, Claude AI tutor, coding skills India trending, student news updates India, edtech news India, NCERT updates 2026, board exam news 2026, free education news India, study tips blog, exam preparation blog India, stock market basics for students, financial literacy blog India, money saving tips for kids, why petrol prices change, gold price explained students, commodities for students',
    url: 'https://syllab.in/updates',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Syllab.in Blog',
      description: 'Daily-updated education blog for Indian students Class 1-12 covering CBSE, JEE, NEET, EAMCET, AI tools, study tips, and coding trends',
      url: 'https://syllab.in/updates',
      publisher: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
      inLanguage: 'en-IN',
    },
  },
  class_1: { title: 'Class 1 NCERT Syllabus, Subjects & Study Tips | Syllab.in', description: 'Complete Class 1 CBSE NCERT guide with important chapters in Maths, EVS, English and Hindi. Free practice and study tips for Class 1 students.', keywords: 'Class 1 NCERT, Class 1 CBSE, Class 1 Maths, Class 1 EVS, Class 1 English, Class 1 syllabus', url: 'https://syllab.in/class-1' },
  class_2: { title: 'Class 2 NCERT Syllabus, Subjects & Study Tips | Syllab.in', description: 'Class 2 CBSE NCERT guide with important chapters in Maths, EVS, English and Hindi. Build a strong foundation with free study tips.', keywords: 'Class 2 NCERT, Class 2 CBSE, Class 2 Maths, Class 2 EVS, Class 2 English, Class 2 syllabus', url: 'https://syllab.in/class-2' },
  class_3: { title: 'Class 3 NCERT Syllabus, Subjects & Study Tips | Syllab.in', description: 'Class 3 CBSE NCERT complete guide with Maths tables, EVS, English and Hindi chapters. Free study tips and important chapters.', keywords: 'Class 3 NCERT, Class 3 CBSE, Class 3 Maths, Class 3 EVS, Class 3 English, multiplication tables Class 3', url: 'https://syllab.in/class-3' },
  class_4: { title: 'Class 4 NCERT Syllabus, Subjects & Study Tips | Syllab.in', description: 'Class 4 CBSE NCERT guide with important Maths, EVS, English and Hindi chapters. Practice division, fractions, and more — free.', keywords: 'Class 4 NCERT, Class 4 CBSE, Class 4 Maths, Class 4 EVS, Class 4 English, Class 4 syllabus', url: 'https://syllab.in/class-4' },
  class_5: { title: 'Class 5 NCERT Syllabus, Important Chapters & Study Tips | Syllab.in', description: 'Class 5 CBSE NCERT guide with important chapters in Maths, EVS, English and Hindi. Free practice questions and study tips.', keywords: 'Class 5 NCERT, Class 5 CBSE, Class 5 Maths, Class 5 EVS, Class 5 English, Class 5 chapters', url: 'https://syllab.in/class-5' },
  class_6: { title: 'Class 6 NCERT Syllabus, Important Chapters & Study Tips | Syllab.in', description: 'Class 6 CBSE NCERT guide with important Maths, Science, Social Science, English and Hindi chapters and study tips.', keywords: 'Class 6 NCERT, Class 6 CBSE, Class 6 Maths, Class 6 Science, Class 6 Social Science', url: 'https://syllab.in/class-6' },
  class_7: { title: 'Class 7 NCERT Syllabus, Important Chapters & Study Tips | Syllab.in', description: 'Class 7 CBSE NCERT guide with Algebra, Science, Social Science and Language important chapters and free study tips.', keywords: 'Class 7 NCERT, Class 7 CBSE, Class 7 Maths, Class 7 Science, Class 7 algebra', url: 'https://syllab.in/class-7' },
  class_8: { title: 'Class 8 NCERT Syllabus, Important Chapters & Study Tips | Syllab.in', description: 'Class 8 CBSE NCERT complete guide with Rational Numbers, Microorganisms, History and Language chapters for boards.', keywords: 'Class 8 NCERT, Class 8 CBSE, Class 8 Maths, Class 8 Science, Class 8 rational numbers', url: 'https://syllab.in/class-8' },
  class_9: { title: 'Class 9 NCERT Syllabus, Important Chapters & Study Guide | Syllab.in', description: 'Class 9 CBSE NCERT guide: Number Systems, Motion, Atoms, Democratic Politics — important chapters, study tips and free practice.', keywords: 'Class 9 NCERT free, Class 9 CBSE Maths, Class 9 Science chapters, Class 9 board prep, free NCERT notes Class 9, JEE NEET foundation Class 9', url: 'https://syllab.in/class-9' },
  class_10: { title: 'Class 10 NCERT Syllabus, Board Exam Preparation | Syllab.in', description: 'Class 10 CBSE board exam guide with important NCERT chapters, study plan, subject weightage and free practice for all subjects.', keywords: 'Class 10 CBSE board exam 2025 2026, NCERT solutions Class 10, Class 10 Maths board exam, Class 10 Science board prep, board exam tips CBSE', url: 'https://syllab.in/class-10' },
  class_11: { title: 'Class 11 NCERT Syllabus, JEE NEET Foundation | Syllab.in', description: 'Class 11 CBSE NCERT guide with Physics, Chemistry, Maths and Biology for boards and JEE/NEET foundation. Free study tips.', keywords: 'Class 11 NCERT solutions, JEE preparation Class 11, NEET foundation Class 11, Class 11 Physics Chemistry Maths, CBSE Class 11 notes free', url: 'https://syllab.in/class-11' },
  class_12: { title: 'Class 12 NCERT Syllabus, Board Exam & JEE NEET Guide | Syllab.in', description: 'Class 12 CBSE board exam and JEE/NEET preparation guide with Physics, Chemistry, Maths and Biology important chapters, study plan and tips.', keywords: 'Class 12 board exam 2025 2026, JEE Mains Class 12, NEET preparation Class 12, Class 12 NCERT solutions, CBSE Class 12 Maths Chemistry Physics', url: 'https://syllab.in/class-12' },
  coding_challenges: {
    title: 'Free Coding Challenges for Students | JavaScript Python | Syllab.in',
    description: 'Practice coding with free interactive challenges for Indian students. Run JavaScript code in your browser, earn XP, and level up your programming skills.',
    keywords: 'competitive programming India free, coding challenges free, LeetCode alternative free India, programming practice students, Python coding challenges free',
    url: 'https://syllab.in/coding-challenges',
  },
  mini_projects: {
    title: 'Mini Coding Projects for Students | Python JavaScript HTML | Syllab.in',
    description: 'Build 24 free mini coding projects in Python, JavaScript, HTML and SQL. Step-by-step guided projects for Indian students, Class 6 to 12.',
    keywords: 'mini coding projects students India, Python projects beginners, JavaScript mini projects, HTML CSS projects Class 10 11',
    url: 'https://syllab.in/mini-projects',
  },
  coding_for_kids: {
    title: 'Free Coding for Kids India | Class 3–8 Programming | Syllab.in',
    description: 'Learn coding for free with fun games and challenges designed for Indian kids Class 3 to 8. Start with Scratch basics, Python, and JavaScript — no prior experience needed.',
    keywords: 'coding for kids India, free coding Class 3 4 5 6 7 8, kids programming India, learn coding children, coding games for kids free',
    url: 'https://syllab.in/coding-for-kids',
  },
  python_for_kids: {
    title: 'Free Python for Kids India | Class 6–10 Python Basics | Syllab.in',
    description: 'Learn Python programming free for Indian students Class 6 to 10. Easy Python tutorials, projects, and practice — the most popular coding language for careers in AI and data science.',
    keywords: 'Python for kids India, free Python Class 6 7 8 9 10, Python beginners students, learn Python free India, Python projects students',
    url: 'https://syllab.in/python-for-kids',
  },
  computer_basics: {
    title: 'Free Computer Basics for Class 3–8 | CBSE ICT Notes | Syllab.in',
    description: 'Learn computer basics free — hardware, software, internet, cyber safety for CBSE Class 3 to 8 students. Aligned with NCERT ICT syllabus with fun quizzes.',
    keywords: 'computer basics Class 3 4 5 6 7 8, CBSE computer science, free ICT notes students India, hardware software basics, computer parts kids',
    url: 'https://syllab.in/computer-basics',
  },
  cyber_safety: {
    title: 'Free Cyber Safety for Students India | Class 5–10 | Syllab.in',
    description: 'Learn internet safety, cyberbullying awareness, and online privacy for free. Essential cyber safety course for Indian students Class 5 to 10 by Syllab.in.',
    keywords: 'cyber safety for students India, internet safety kids, cyberbullying awareness Class 8 9 10, online safety free course India, digital literacy students',
    url: 'https://syllab.in/cyber-safety',
  },
  ai_for_students: {
    title: 'Free AI for Students India | Class 8–12 Artificial Intelligence | Syllab.in',
    description: 'Learn Artificial Intelligence free for Indian students Class 8 to 12. AI basics, machine learning, ChatGPT, and career paths — free course at Syllab.in.',
    keywords: 'AI course free India, machine learning for students, ChatGPT tutorial students, AI ML course students free, artificial intelligence Class 8-12 free',
    url: 'https://syllab.in/ai-for-students',
  },
  web_development: {
    title: 'Free Web Development for Students India | HTML CSS JavaScript | Syllab.in',
    description: 'Learn web development free — HTML, CSS, JavaScript projects for Indian students Class 8 to 12. Build real websites and launch your tech career.',
    keywords: 'web development for students India, free HTML CSS JavaScript Class 10 11 12, website building beginners India, front-end development students free',
    url: 'https://syllab.in/web-development',
  },
  general_knowledge: {
    title: 'Free GK Quiz for Class 5–12 Students India 2026 — Daily General Knowledge MCQs | Syllab.in',
    description: 'Practice 150+ GK quiz questions on Indian history, geography, polity, static GK, current affairs 2025-26, and science. Free daily GK quiz for Class 5-12 students. Same daily quiz for all users — compete with friends.',
    keywords: 'GK quiz free India, GK questions India free, general knowledge MCQ free India, Indian history MCQ Class 8 9 10, geography questions India, current affairs 2026 India, GK quiz Class 5 6 7 8 9 10, CBSE GK questions free, competitive exam GK preparation, polity questions UPSC SSC, daily GK quiz India, static GK MCQ, Indian constitution MCQ, GK for SSC banking exams, GK Olympiad questions, NTSE GK preparation, Indian states capitals quiz, ISRO missions GK, awards 2026 India, GK questions India daily',
    url: 'https://syllab.in/gk-quiz',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Free General Knowledge Quiz for Indian Students',
        description: '150+ GK MCQs on Indian history, geography, polity, current affairs and science — free daily quiz for Class 5-12',
        provider: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
        isAccessibleForFree: true,
        inLanguage: 'en-IN',
        educationalLevel: 'Class 5 to Class 12',
        teaches: 'Indian History, Geography, Polity, Static GK, Current Affairs, Science GK',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://syllab.in/' },
          { '@type': 'ListItem', position: 2, name: 'GK Quiz', item: 'https://syllab.in/gk-quiz' },
        ],
      },
    ],
  },
  career: {
    title: 'Free Career Predictor: JEE/NEET Rank & College Predictor, Career Quiz & Exam Dates | Syllab.in',
    description: 'Free career predictor for Indian students — JEE Main & state (EAMCET/KCET/MHT-CET/WBJEE) rank & college predictor, NEET marks-to-rank & MBBS college predictor (all categories), career explorer with salaries, an interest quiz to find your stream, the 2026 exam calendar and scholarships.',
    keywords: 'career predictor free India, JEE rank predictor free, JEE Main percentile to rank, JEE college predictor free, NEET rank predictor free, NEET college predictor, MBBS college predictor India, EAMCET rank predictor, KCET college predictor, MHT-CET predictor, WBJEE predictor, career quiz after 10th, which stream after 10th, career options after 12th India, career salary India, 2026 exam dates JEE NEET CUET, scholarships for students India, JoSAA cutoff predictor',
    url: 'https://syllab.in/career-predictor',
  },
  colleges: {
    title: 'Top Engineering Colleges in India 2026 — Fees, NIRF Rank, Cutoffs & Admission | Syllab.in',
    description: 'Browse top engineering colleges across India by state — IITs, NITs and the best government & private colleges in Tamil Nadu, Karnataka, Maharashtra, Telangana, Andhra Pradesh, Delhi-NCR & West Bengal. Compare fees, NIRF rank, cutoffs, placements and the full admission process. Free.',
    keywords: 'top engineering colleges India 2026, best engineering colleges by state, engineering college fees, NIRF ranking engineering, college cutoff 2026, engineering admission process, IIT NIT cutoff, college predictor India, engineering colleges Tamil Nadu Karnataka Maharashtra Telangana Andhra Delhi West Bengal',
    url: 'https://syllab.in/colleges',
  },
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
  onExistingLogin,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAuthComplete?: (role: 'student' | 'parent') => void;
  /** Fires when an existing user signs in (not new signup). Lets App route them away from /profile. */
  onExistingLogin?: (role?: 'student' | 'parent') => void;
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
      void profile().then((m) => m.saveUserRole(pendingUid, role)).catch(() => {/* non-critical */});
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
        const user = await (await fb()).signUpWithEmail(form.email, form.password);
        // Send welcome email (fire-and-forget, non-fatal)
        void fb().then((m) => m.sendWelcomeEmail(user.email || form.email, user.displayName || form.email.split('@')[0]));
        // New user — ask them their role before closing
        setPendingUid(user.uid);
        setAuthStep('role');
      } else {
        await (await fb()).signInWithEmail(form.email, form.password);
        // Existing user — bounce them away from /profile to the home page
        onExistingLogin?.();
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
      const user = await (await fb()).signInWithGoogle();
      // Check Firestore first (cloud-first) — localStorage is only a fast-path cache
      const cloudRole = await (await profile()).getCloudRole(user.uid);
      if (cloudRole) {
        // Sync to localStorage so next check is fast
        setStoredRole(cloudRole);
        // Existing user — bounce them away from /profile to home (or parent hub if parent role)
        onExistingLogin?.(cloudRole);
        onClose();
      } else {
        // New Google user — send welcome email + show role picker
        void fb().then((m) => m.sendWelcomeEmail(user.email || '', user.displayName || ''));
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
      await (await fb()).resetPassword(form.email);
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
        <div className="app-overlay-in absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
        <div className="app-card-in relative w-full max-w-md rounded-[1.75rem] bg-white p-6 shadow-2xl sm:rounded-[2.5rem] sm:p-10">
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
                <div className="mt-1 text-[11px] font-medium text-slate-500">I'm here to learn</div>
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
                <div className="mt-1 text-[11px] font-medium text-slate-500">I'm tracking my child</div>
              </div>
            </button>
          </div>
          <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-widest text-slate-300">
            You can change this later in your profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto p-3 sm:items-center sm:p-4">
      <div
        className="app-overlay-in absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={loading ? undefined : onClose}
      />
      <div className="app-card-in relative max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto rounded-[1.75rem] bg-white p-5 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:rounded-[2.5rem] sm:p-8 md:p-10">
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
      </div>
    </div>
  );
}

export default function App() {
  // SSR-safe: usePathname() returns the request URL on the server and
  // window.location.pathname on the client — same value per route, so the
  // initial activeTab (and thus rendered page) matches across hydration.
  const initialPath = usePathname();
  const [activeTab, setActiveTab] = useState(() => resolveTab(initialPath));
  const [parentBannerHidden, setParentBannerHidden] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [stats, setStats] = useState<UserStats>(DEFAULT_USER_STATS);
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_USER_PROGRESS);
  const [appError, setAppError] = useState<string | null>(null);
  const [practiceConfig, setPracticeConfig] = useState<Record<string, unknown> | null>(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTutorOpen, setTutorOpen] = useState(false);
  const [isMockExamMode, setMockExamMode] = useState(false);
  const [userClass, setUserClass] = useState(getStoredClass);
  const [userRole, setUserRole] = useState<'student' | 'parent' | null>(getStoredRole);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [moreNavOpen, setMoreNavOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const moreNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (moreNavRef.current && !moreNavRef.current.contains(e.target as Node)) {
        setMoreNavOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Start the gamification engine (streaks, badges, level tracking) once.
  useEffect(() => { initGamification(); }, []);
  // Analytics: send a virtual pageview on every client-side route change (SPA).
  useEffect(() => { trackPageview(window.location.pathname); }, [activeTab]);

  const handleClassChange = (cls: string) => {
    setUserClass(cls);
    try { if (cls) localStorage.setItem('syllab_user_class', cls); else localStorage.removeItem('syllab_user_class'); } catch { /* ignore */ }
  };

  useEffect(() => {
    // Deferred to idle so the SDK download never competes with first paint.
    // A logged-out visitor is the correct starting state, and a returning user
    // sees the signed-in UI a beat later instead of everyone waiting on 519 KB.
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    const startAuth = async () => {
      const [{ onAuthStateChanged }, firebase, userProfile] = await Promise.all([
        import('firebase/auth'), fb(), profile(),
      ]);
      if (cancelled) return;
      const { auth, syncUserEmail, tryEnsureUserDocuments, getUserStats, getUserProgress } = firebase;
      const { getExtendedProfile } = userProfile;

      unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Record which path the NEXT page load should take. Signed in -> load the
      // SDK promptly; signed out -> skip it until the visitor interacts.
      setSignedInHint(!!user);
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
          // Seed the gamification XP mirror from the authoritative Firestore value
          syncXpMirror((resolvedStats ?? DEFAULT_USER_STATS).xp || 0);

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
    };

    // WHEN to start auth. This used to be a flat requestIdleCallback with a
    // 2000ms timeout for everyone. On a throttled mobile thread the idle slot
    // never comes, so it always fired at the timeout — landing mid-LCP and then
    // pulling ~519 KB. PageSpeed showed exactly that as the critical request
    // chain (index -> vendor-motion -> firebase -> vendor-firebase-2, 794 ms).
    //
    // Split by whether this browser has ever signed in:
    //
    //   never signed in  -> it CANNOT be signed in now, so the download buys
    //                       nothing during load. Wait for a real interaction
    //                       (or a late idle slot well clear of LCP). Per this
    //                       module's own note that is ~97% of arrivals.
    //   signed in before -> load promptly, as before; those users need their
    //                       stats and the header avatar, and delaying it just
    //                       swaps the header late (the CLS culprit PageSpeed
    //                       named on the LOGIN / SIGN UP button).
    let started = false;
    // Deliberately NO 'scroll'. Scroll is not a reliable intent signal here:
    // navigate() calls window.scrollTo and the scroll-reveal setup runs on
    // mount, so a scroll event fires with no user involved and would start the
    // SDK download immediately — defeating the whole deferral. pointerdown /
    // keydown / touchstart are unambiguous.
    const EVENTS = ['pointerdown', 'keydown', 'touchstart'] as const;
    const kick = () => {
      if (started || cancelled) return;
      started = true;
      for (const e of EVENTS) window.removeEventListener(e, kick);
      window.removeEventListener('syllab:need-auth', kick);
      void startAuth();
    };

    const ric = (window as unknown as {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    }).requestIdleCallback;

    // Anything that needs a real user (opening the login modal) fires this.
    window.addEventListener('syllab:need-auth', kick);

    const returning = hasSignedInBefore();
    let handle: number | undefined;
    let idleHandle: number | undefined;
    if (returning) {
      // Returning user: get their session as soon as the thread is free.
      // requestIdleCallback is CORRECT here — earliest idle is what we want.
      idleHandle = ric ? ric(kick, { timeout: 2000 }) : undefined;
      if (idleHandle === undefined) handle = window.setTimeout(kick, 200);
    } else {
      for (const e of EVENTS) window.addEventListener(e, kick, { once: true, passive: true });
      // Guest fallback. Deliberately setTimeout and NOT requestIdleCallback:
      // ric(cb, { timeout: N }) fires at the FIRST IDLE MOMENT **or** N,
      // whichever comes first — the timeout is a ceiling, not a floor. An
      // earlier attempt here used ric with a 10s timeout expecting a delay and
      // it fired at 463ms, because the page goes idle almost immediately. Only
      // a real timer defers. This just backstops a visitor who never
      // interacts, so they still settle into a known signed-out state.
      handle = window.setTimeout(kick, 10000);
    }

    return () => {
      cancelled = true;
      for (const e of EVENTS) window.removeEventListener(e, kick);
      window.removeEventListener('syllab:need-auth', kick);
      const cic = (window as unknown as { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback;
      if (idleHandle !== undefined && cic) cic(idleHandle);
      if (handle !== undefined) clearTimeout(handle);
      unsubscribe?.();
    };
  }, []);


  const handleAuthComplete = (role: 'student' | 'parent') => {
    setUserRole(role);
    // After role pick: parents → parent hub; students → home (NOT /profile).
    const targetTab = role === 'parent' ? 'parent' : 'home';
    setActiveTab(targetTab);
    const path = TAB_TO_PATH[targetTab] || '/';
    if (window.location.pathname !== path) {
      window.history.pushState({ tab: targetTab }, '', path);
    }
    setLoginModalOpen(false);
  };

  const navigate = useCallback((tab: string) => {
    setActiveTab(tab);
    const path = TAB_TO_PATH[tab] || '/';
    if (window.location.pathname !== path) {
      window.history.pushState({ tab }, '', path);
    }
    // Retention: remember the last learning area so Home can offer a one-tap
    // "pick up where you left off". Purely client-side (localStorage) — no cost.
    try {
      const label = RESUMABLE_TABS[tab];
      if (label) localStorage.setItem('syllab_last_visit', JSON.stringify({ tab, label, ts: Date.now() }));
    } catch { /* ignore quota/private-mode */ }
    // Tell any open modal (PPT viewer, concept viewer, tutor, etc.) to close.
    // Modals subscribe to this event so navbar clicks always escape.
    window.dispatchEvent(new CustomEvent('syllab:navigate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handlePop = () => {
      setActiveTab(resolveTab(window.location.pathname));
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  // Any page can request the login modal by dispatching `syllab:require-login`.
  // Used by Mock Tests, Daily Challenges etc. to gate actions that need an account.
  useEffect(() => {
    const handler = () => {
      // Make sure the auth listener is actually running before the modal opens.
      // For a guest the SDK load is deferred until interaction, and this event
      // can be dispatched programmatically — without this, a sign-in could
      // complete with nothing subscribed to onAuthStateChanged.
      window.dispatchEvent(new Event('syllab:need-auth'));
      setLoginModalOpen(true);
    };
    window.addEventListener('syllab:require-login', handler);
    return () => window.removeEventListener('syllab:require-login', handler);
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
      const { saveUserStats, saveUserProgress } = await fb();
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
      await (await fb()).saveUserStats(currentUser.uid, nextStats);
    } catch (error) {
      console.error('Failed to save XP reward.', error);
      setAppError('XP could not be saved. Please try again.');
    }
  };

  // Nav order (May 2026 rename): single concrete verbs/nouns, AI Tutor flagged
  // as featured. Order matches usage frequency for Class 1-12 students.
  // Old labels: Practice Arena / Exams / Learning Lab / Skills Lab / English Lab /
  //             Daily Dose / GK / Interactive Lab / Updates / Progress.
  const navItems: Array<{ id: string; label: string; icon: any; featured?: boolean }> = [
    { id: 'home',              label: 'Home',             icon: Home },
    { id: 'syllabus',          label: 'Syllabus',         icon: BookOpen },
    { id: 'arena',             label: 'Practice',         icon: Target },
    { id: 'mock_tests',        label: 'Mock Tests',       icon: ClipboardList },
    { id: 'learning_lab',      label: 'AI Tutor',         icon: Sparkles, featured: true },
    { id: 'skills_lab',        label: 'Coding',           icon: Zap },
    { id: 'english_lab',       label: 'English',          icon: BookOpen },
    { id: 'study_room',        label: 'Study Room',       icon: Timer },
    // Junior + Worksheets are reached from inside the Syllabus page (a section),
    // not the top bar, to keep the nav uncluttered. Routes still exist for SEO.
    { id: 'daily',             label: 'Daily Challenge',  icon: CalendarDays },
    { id: 'general_knowledge', label: 'General Knowledge', icon: BookOpen },
    { id: 'important_questions', label: 'Important Questions', icon: Target },
    { id: 'differences',       label: 'Difference Between',  icon: BookOpen },
    { id: 'concepts',          label: 'Concepts Explained',  icon: BookOpen },
    { id: 'visual_learning',   label: 'Visual Learning',     icon: Sparkles },
    { id: 'timelines',         label: 'History Timelines',   icon: BookOpen },
    { id: 'what_to_study',     label: 'What to Study',       icon: Target },
    { id: 'pyqs',              label: 'Previous Year Qs',    icon: BookOpen },
    { id: 'quiz_duel',         label: 'Quiz Duel',           icon: Zap },
    { id: 'solved_examples',   label: 'Solved Examples',     icon: BookOpen },
    { id: 'lab_practicals',    label: 'Lab Practicals',      icon: BookOpen },
    { id: 'revision_notes',    label: 'Revision Notes',      icon: BookOpen },
    { id: 'sample_papers',     label: 'Sample Papers',       icon: BookOpen },
    { id: 'chapter_mcqs',      label: 'Chapter MCQs',        icon: BookOpen },
    { id: 'maths_tables',      label: 'Maths Tables',        icon: BookOpen },
    { id: 'english_writing',   label: 'English Writing',     icon: BookOpen },
    { id: 'english_literature', label: 'English Literature',  icon: BookOpen },
    // Vocabulary (/vocabulary cluster) now lives inside the English page's
    // Vocabulary tab; GK Facts + Biographies (/gk-facts) now live inside the
    // General Knowledge hub. Routes + pages stay live for SEO — just removed
    // from the top nav to keep one clean entry point each.
    { id: 'glossary',          label: 'Glossary',            icon: BookOpen },
    { id: 'full_forms',        label: 'Full Forms',          icon: BookOpen },
    { id: 'ai_hub',            label: 'AI for Students',  icon: Sparkles },
    { id: 'career',            label: 'Career & Colleges', icon: Building2 },
    { id: 'tools_hub',         label: 'All Free Tools',   icon: Wrench },
    { id: 'calculators',       label: 'Calculators',      icon: Calculator },
    { id: 'study_planner',     label: 'Study Planner',    icon: CalendarDays },
    { id: 'cutoffs',           label: 'College Cutoffs',  icon: Target },
    { id: 'flashcards',        label: 'Flashcards',       icon: Layers },
    { id: 'answer_evaluator',  label: 'AI Answer Checker', icon: Sparkles },
    { id: 'unit_converter',    label: 'Unit Converter',   icon: Ruler },
    { id: 'periodic_table',    label: 'Periodic Table',   icon: Atom },
    { id: 'pomodoro',          label: 'Pomodoro Timer',   icon: Timer },
    { id: 'marks_tracker',     label: 'Marks Tracker',    icon: ChartNoAxesCombined },
    { id: 'pdf_tools',         label: 'PDF Tools',        icon: FileText },
    { id: 'image_tools',       label: 'Image Tools',      icon: Image },
    { id: 'question_paper',    label: 'Question Paper',   icon: FileText },
    { id: 'compare_tool',      label: 'Compare',          icon: GitCompare },
    { id: 'notes_tool',        label: 'Notepad',          icon: NotebookPen },
    { id: 'everyday_tools',    label: 'Everyday Tools',   icon: SlidersHorizontal },
    { id: 'roman_numerals',    label: 'Roman Numerals',   icon: Hash },
    { id: 'contrast_checker',  label: 'Contrast Checker', icon: Contrast },
    { id: 'timestamp_tool',    label: 'Timestamp',        icon: Clock },
    { id: 'csv_to_json',       label: 'CSV → JSON',       icon: Braces },
    { id: 'image_to_text',     label: 'Image to Text',    icon: ScanText },
    { id: 'word_counter',      label: 'Word Counter',     icon: Type },
    { id: 'text_to_speech',    label: 'Text to Speech',   icon: Volume2 },
    // Updates page is now the canonical "Blog" — old /blog page still exists
    // but hidden from nav (kept at /blog for any indexed inbound links).
    { id: 'updates',           label: 'Blog',             icon: Sparkles },
    // Dashboard: show for students and guests; parents use parent hub instead
    ...(userRole !== 'parent' ? [{ id: 'progress', label: 'Dashboard', icon: ChartNoAxesCombined }] : []),
    // Parent Hub: show for parents and guests (not for students)
    ...(userRole !== 'student' ? [{ id: 'parent', label: 'Parent Hub', icon: Users }] : []),
  ];

  const seo = PAGE_SEO[activeTab] || PAGE_SEO.home;

  return (
    // reducedMotion="user": every motion/react animation respects the OS
    // prefers-reduced-motion setting (the CSS-only rule can't reach JS animations).
    <MotionConfig reducedMotion="user">
    <div className="flex min-h-screen flex-col bg-bg-beige text-secondary">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[100] focus:bg-primary focus:text-white focus:p-4 focus:rounded-b-lg">
        Skip to main content
      </a>
      <SEO title={seo.title} description={seo.description} keywords={seo.keywords} url={seo.url} jsonLd={seo.jsonLd} />
      <RewardToast />
      {!isMockExamMode ? (
      <header className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between border-b border-slate-200/50 bg-white/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div
            className="flex h-10 w-10 items-center justify-center rounded-2xl text-xl font-black text-white"
            style={{ backgroundImage: 'var(--grad-brand)', boxShadow: '0 8px 24px -6px rgba(16,185,129,.5)' }}
          >
            S
          </div>
          <span className="font-heading text-2xl font-extrabold tracking-tight text-secondary">Syllab</span>
        </button>

        <nav className="hidden items-center gap-1 rounded-2xl border border-slate-200/50 bg-white shadow-sm p-1.5 lg:flex">
          {navItems.filter((item) => !MORE_NAV_IDS.includes(item.id)).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.id)}
              className={cn(
                'relative rounded-xl px-4 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all',
                activeTab === item.id
                  ? 'bg-secondary text-white shadow-xl shadow-slate-900/20'
                  : item.featured
                    ? 'bg-gradient-to-r from-emerald-50 to-blue-50 text-emerald-700 hover:from-emerald-100 hover:to-blue-100'
                    : 'text-slate-500 hover:text-secondary',
              )}
            >
              {item.featured && <span className="mr-1">🤖</span>}
              {item.label}
              {item.featured && activeTab !== item.id && (
                <span className="absolute -top-1 -right-1 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-white shadow-md">
                  AI
                </span>
              )}
            </button>
          ))}
          {/* More ▾ — secondary items grouped to keep the bar uncluttered */}
          {(() => {
            const moreItems = navItems.filter((item) => MORE_NAV_IDS.includes(item.id));
            if (!moreItems.length) return null;
            const activeInMore = moreItems.some((m) => m.id === activeTab);
            return (
              <div className="relative" ref={moreNavRef}>
                <button
                  type="button"
                  onClick={() => setMoreNavOpen((o) => !o)}
                  className={cn(
                    'relative flex items-center gap-1 rounded-xl px-4 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all',
                    activeInMore ? 'bg-secondary text-white shadow-xl shadow-slate-900/20' : 'text-slate-500 hover:text-secondary',
                  )}
                >
                  Explore <ChevronDown size={12} className={cn('transition-transform', moreNavOpen && 'rotate-180')} />
                </button>
                {moreNavOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 max-h-[70vh] w-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                    {MORE_NAV_GROUPS.map((group) => {
                      const groupItems = group.ids
                        .map((id) => navItems.find((n) => n.id === id))
                        .filter((n): n is { id: string; label: string; icon: any; featured?: boolean } => Boolean(n));
                      if (!groupItems.length) return null;
                      return (
                        <div key={group.heading} className="mb-1 last:mb-0">
                          <p className="px-3 pb-1 pt-2 text-[11px] font-black uppercase tracking-widest text-slate-500">{group.heading}</p>
                          {groupItems.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => { navigate(item.id); setMoreNavOpen(false); }}
                              className={cn(
                                'flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-black transition-colors',
                                activeTab === item.id ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50',
                              )}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}
        </nav>

        <div className="flex items-center gap-4">
          <DarkModeToggle size={20} />
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
                              <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-black uppercase tracking-wider', userRole === 'parent' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600')}>
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
                          <button type="button" onClick={() => void fb().then((m) => m.logout())} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-black text-rose-600 hover:bg-rose-50 transition-colors">
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
                onClick={() => setLoginModalOpen(true)}
                className="btn-primary px-6 py-2.5 text-xs font-black uppercase tracking-widest"
              >
                Login / Sign Up
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="p-2 text-slate-600 lg:hidden"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      ) : null}

      {isMobileMenuOpen ? (
          <div
            className="app-menu-in fixed inset-0 z-40 overflow-y-auto bg-white px-6 pt-24 pb-10 lg:hidden"
          >
            {/* Profile strip */}
            {currentUser ? (
              <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-slate-800">{currentUser.displayName || currentUser.email?.split('@')[0] || 'Student'}</p>
                  <p className="truncate text-[11px] font-medium text-slate-500">{currentUser.email}</p>
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
                    onClick={() => { void fb().then((m) => m.logout()); setMobileMenuOpen(false); }}
                    className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-[11px] font-black text-rose-600"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => { setLoginModalOpen(true); setMobileMenuOpen(false); }}
                className="mb-4 w-full rounded-2xl bg-primary py-4 text-sm font-black text-white shadow-lg shadow-emerald-500/20"
              >
                Login / Sign Up
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
          </div>
        ) : null}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onAuthComplete={handleAuthComplete}
        onExistingLogin={(role) => {
          // Sign-in finished. Bounce the user OFF /profile (where the Login button
          // had navigated them) so they land on home (students) or parent hub (parents).
          if (role === 'parent') navigate('parent');
          else navigate('home');
        }}
      />

      <main id="main" className={cn(
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
          {userRole === 'parent' && currentUser && !parentBannerHidden && !['parent', 'profile'].includes(activeTab) ? (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700">
              <Users size={16} className="shrink-0" />
              <span className="flex-1">You're browsing as a <strong>Parent</strong>. This is what your child sees.</span>
              <button
                type="button"
                onClick={() => navigate('parent')}
                className="shrink-0 rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-black text-white hover:bg-blue-700 transition-colors"
              >
                Go to Parent Hub →
              </button>
              <button
                type="button"
                onClick={() => setParentBannerHidden(true)}
                aria-label="Dismiss parent banner"
                className="shrink-0 rounded-lg px-2 py-1 text-blue-400 hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                ✕
              </button>
            </div>
          ) : null}

          {/* Content-first: page renders immediately on the server and on first
              client paint (no full-page auth spinner — it blocked SSR page bodies
              and hurt LCP). Auth-dependent UI handles a null user and updates in
              place once onAuthStateChanged resolves. */}
          {(
            <Suspense fallback={<PageFallback />}>
              {/* Route-level safety net: a crash in ONE page shows a recovery
                  card in the content area while the nav bar stays usable. Keyed
                  by activeTab so navigating away resets the boundary. */}
              <ErrorBoundary key={activeTab}>
                <div key={activeTab} className="app-route-in">
                  {/* NOT_FOUND_TAB renders the home shell, exactly as unknown paths
                      always have. The sentinel exists so isUnknownPath() can identify
                      junk URLs (see routeCoverage.test.ts); wiring it to a real 404
                      view + noindex is a separate change — a first attempt hung the
                      Suspense boundary, so it was reverted rather than shipped. */}
                  {activeTab === 'home' || activeTab === NOT_FOUND_TAB ? <HomePage setTab={navigate} currentUser={currentUser} stats={stats} userClass={userClass} /> : null}
                  {activeTab === 'syllabus' ? (
                    <SyllabusPage
                      setTab={navigate}
                      openTutor={() => setTutorOpen(true)}
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
                  {['progress', 'analytics'].includes(activeTab) ? <ProgressPage currentUser={currentUser} stats={stats} setTab={navigate} progress={progress} userClass={userClass} /> : null}
                  {activeTab === 'parent' ? <ParentDashboardPage currentUser={currentUser} setTab={navigate} /> : null}
                  {activeTab === 'about' ? <AboutPage /> : null}
                  {activeTab === 'contact' ? <ContactPage /> : null}
                  {activeTab === 'sitemap' ? <SitemapPage setTab={navigate} /> : null}
                  {activeTab === 'admin_pipeline' ? <AdminPipelinePage /> : null}
                  {activeTab === 'blog' ? <BlogPage setTab={navigate} /> : null}
                  {activeTab === 'updates' ? <UpdatesPage setTab={navigate} /> : null}
                  {activeTab === 'skills_lab' ? <SkillsLabPage currentUser={currentUser} setTab={navigate} openTutor={() => setTutorOpen(true)} /> : null}
                  {activeTab === 'english_lab' ? <EnglishLabPage currentUser={currentUser} setTab={navigate} /> : null}
                  {activeTab === 'coding_challenges' ? <CodingChallengesPage currentUser={currentUser} /> : null}
                  {activeTab === 'mini_projects' ? <MiniProjectsPage /> : null}
                  {activeTab === 'coding_for_kids' ? <CodingForKidsPage /> : null}
                  {activeTab === 'python_for_kids' ? <PythonForKidsPage /> : null}
                  {activeTab === 'computer_basics' ? <ComputerBasicsPage /> : null}
                  {activeTab === 'cyber_safety' ? <CyberSafetyPage /> : null}
                  {activeTab === 'ai_for_students' ? <AiForStudentsPage /> : null}
                  {activeTab === 'web_development' ? <WebDevPage /> : null}
                  {activeTab === 'general_knowledge' ? <GeneralKnowledgePage setTab={navigate} /> : null}
                  {activeTab === 'career' ? <CareerPredictorPage /> : null}
                  {activeTab === 'colleges' ? <CollegesPage /> : null}
                  {activeTab === 'ncert_solutions' ? <NcertSolutionsPage /> : null}
                  {activeTab === 'live_quiz' ? <LiveQuizPage /> : null}
                  {activeTab === 'alternatives' ? <AlternativesPage /> : null}
                  {activeTab === 'kids' ? <KidsPage /> : null}
                  {activeTab === 'doubt_solver' ? <DoubtSolverPage /> : null}
                  {activeTab === 'microlearning' ? <MicrolearningPage /> : null}
                  {activeTab === 'study_room' ? <StudyRoomPage onExit={() => navigate('home')} userUid={currentUser?.uid} userName={currentUser?.displayName || currentUser?.email?.split('@')[0] || null} /> : null}
                  {activeTab === 'calculators' ? <CalculatorsPage /> : null}
                  {activeTab === 'study_planner' ? <StudyPlannerPage /> : null}
                  {activeTab === 'cutoffs' ? <CutoffsPage /> : null}
                  {activeTab === 'flashcards' ? <FlashcardsPage /> : null}
                  {activeTab === 'answer_evaluator' ? <AnswerEvaluatorPage /> : null}
                  {activeTab === 'unit_converter' ? <UnitConverterPage /> : null}
                  {activeTab === 'periodic_table' ? <PeriodicTablePage /> : null}
                  {activeTab === 'pomodoro' ? <PomodoroPage /> : null}
                  {activeTab === 'marks_tracker' ? <MarksTrackerPage /> : null}
                  {activeTab === 'tools_hub' ? <ToolsHubPage /> : null}
                  {activeTab === 'pdf_tools' ? <PdfToolkitPage /> : null}
                  {activeTab === 'image_tools' ? <ImageToolkitPage /> : null}
                  {activeTab === 'question_paper' ? <QuestionPaperGeneratorPage /> : null}
                  {activeTab === 'compare_tool' ? <ComparePage /> : null}
                  {activeTab === 'notes_tool' ? <NotesPage /> : null}
                  {activeTab === 'everyday_tools' ? <EverydayToolsPage /> : null}
                  {activeTab === 'roman_numerals' ? <RomanNumeralsPage /> : null}
                  {activeTab === 'contrast_checker' ? <ContrastCheckerPage /> : null}
                  {activeTab === 'timestamp_tool' ? <TimestampPage /> : null}
                  {activeTab === 'csv_to_json' ? <CsvToJsonPage /> : null}
                  {activeTab === 'image_to_text' ? <ImageToTextPage /> : null}
                  {activeTab === 'word_counter' ? <WordCounterPage /> : null}
                  {activeTab === 'text_to_speech' ? <TextToSpeechPage /> : null}
                  {activeTab === 'worksheets' ? <WorksheetsPage /> : null}
                  {activeTab === 'story_lessons' ? <StoryLessonsLandingPage setTab={navigate} /> : null}
                  {activeTab === 'gk_questions' ? <GkQuestionsPage setTab={navigate} /> : null}
                  {activeTab === 'important_questions' ? <ImportantQuestionsPage setTab={navigate} /> : null}
                  {activeTab === 'prompt_lab' ? <PromptLabPage setTab={navigate} /> : null}
                  {activeTab === 'mock_exam' ? <MockExamLandingPage setTab={navigate} /> : null}
                  {activeTab === 'college_predictor' ? <CollegePredictorLandingPage setTab={navigate} /> : null}
                  {activeTab === 'english_grammar' ? <EnglishTopicsPage setTab={navigate} /> : null}
                  {activeTab === 'career_guides' ? <CareerGuidesPage setTab={navigate} /> : null}
                  {activeTab === 'previous_year_papers' ? <PreviousYearPapersPage setTab={navigate} /> : null}
                  {activeTab === 'formula_sheets' ? <FormulaSheetsPage setTab={navigate} /> : null}
                  {activeTab === 'state_board_solutions' ? <StateBoardSolutionsPage /> : null}
                  {activeTab === 'ai_hub' ? <AiHubPage setTab={navigate} /> : null}
                  {activeTab === 'embed' ? <EmbedPage /> : null}
                  {activeTab === 'medical_colleges' ? <MedicalCollegesPage /> : null}
                  {activeTab === 'college_finder' ? <CollegeFinderPage /> : null}
                  {activeTab === 'scholarships' ? <ScholarshipsPage /> : null}
                  {activeTab === 'differences' ? <DifferencesPage setTab={navigate} /> : null}
                  {activeTab === 'full_forms' ? <FullFormsPage setTab={navigate} /> : null}
                  {activeTab === 'glossary' ? <GlossaryPage setTab={navigate} /> : null}
                  {activeTab === 'revision_notes' ? <RevisionNotesPage setTab={navigate} /> : null}
                  {activeTab === 'sample_papers' ? <SamplePapersPage setTab={navigate} /> : null}
                  {activeTab === 'maths_tables' ? <MathsTablesPage setTab={navigate} /> : null}
                  {activeTab === 'english_writing' ? <EnglishWritingPage setTab={navigate} /> : null}
                  {activeTab === 'chapter_mcqs' ? <ChapterMcqsPage setTab={navigate} /> : null}
                  {activeTab === 'static_gk' ? <StaticGkPage setTab={navigate} /> : null}
                  {activeTab === 'visual_learning' ? <VisualLearningPage setTab={navigate} currentUser={currentUser} /> : null}
                  {activeTab === 'timelines' ? <TimelinesPage /> : null}
                  {activeTab === 'what_to_study' ? <WhatToStudyPage setTab={navigate} /> : null}
                  {activeTab === 'quiz_duel' ? <QuizDuelPage currentUser={currentUser} /> : null}
                  {activeTab === 'pyqs' ? <PyqsPage /> : null}
                  {activeTab === 'kids_subject' ? <KidsSubjectLandingPage setTab={navigate} /> : null}
                  {activeTab === 'english_vocab' ? <EnglishVocabPage setTab={navigate} /> : null}
                  {activeTab === 'english_literature' ? <EnglishLiteraturePage setTab={navigate} /> : null}
                  {activeTab === 'concepts' ? <ConceptExplainersPage setTab={navigate} /> : null}
                  {activeTab === 'solved_examples' ? <SolvedExamplesPage setTab={navigate} /> : null}
                  {activeTab === 'lab_practicals' ? <LabPracticalsPage setTab={navigate} /> : null}
                  {activeTab === 'privacy' ? (
                    <section className="prose-syllab rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 max-w-3xl mx-auto dark:bg-slate-900 dark:shadow-black/30">
                      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 mb-2">Privacy Policy</h1>
                      <p className="text-xs font-bold text-slate-400 mb-6">Last updated: 11 June 2026</p>
                      <div className="space-y-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        <p>Syllab.in ("Syllab", "we", "us") is a free learning platform for students in India. We respect your privacy and keep data collection to the minimum needed to run the service. This policy explains what we collect, why, and your choices.</p>

                        <div>
                          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1.5">1. Information we collect</h2>
                          <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Account details</strong> (optional): if you sign in, your name, email and class/board — to save your progress.</li>
                            <li><strong>Learning activity</strong>: quizzes, practice, study sessions and progress, so we can show your dashboard.</li>
                            <li><strong>On‑device storage</strong>: we use your browser's local storage (e.g. cached answers, preferences) — this stays on your device.</li>
                            <li><strong>Basic analytics</strong>: anonymised usage data to improve the product. We do not sell your data.</li>
                          </ul>
                        </div>

                        <div>
                          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1.5">2. How we use it</h2>
                          <p>To provide and improve learning features, save your progress, personalise content to your class/board, and keep the service secure. We do <strong>not</strong> sell or rent personal data, and we do not show third‑party behavioural ads to children.</p>
                        </div>

                        <div>
                          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1.5">3. Children's privacy</h2>
                          <p>Syllab is used by school students, including those under 18. We collect only what is necessary for learning. In line with India's Digital Personal Data Protection (DPDP) Act, 2023, we expect a parent or guardian to provide consent for a child's account. Parents can request access to or deletion of a child's data by contacting us.</p>
                        </div>

                        <div>
                          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1.5">4. Service providers</h2>
                          <p>We use trusted providers to run Syllab — Google Firebase (authentication, database, hosting) and AI APIs that generate explanations. They process data only to provide their service, under their own security and privacy terms.</p>
                        </div>

                        <div>
                          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1.5">5. Data security &amp; retention</h2>
                          <p>We use reasonable technical safeguards (encrypted connections, access rules) to protect data. We keep account and progress data only while your account is active, or as required by law.</p>
                        </div>

                        <div>
                          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1.5">6. Your rights</h2>
                          <p>You can access, correct or delete your personal data, and withdraw consent, at any time. To do so, email us and we'll act on your request promptly.</p>
                        </div>

                        <div>
                          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1.5">7. Changes &amp; contact</h2>
                          <p>We may update this policy and will revise the date above. Questions or requests? Email <a href="mailto:narasatish966@gmail.com" className="font-bold text-primary hover:underline">narasatish966@gmail.com</a>.</p>
                        </div>
                      </div>
                    </section>
                  ) : null}
                  {activeTab === 'terms' ? (
                    <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 max-w-3xl mx-auto dark:bg-slate-900 dark:shadow-black/30">
                      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 mb-2">Terms of Service</h1>
                      <p className="text-xs font-bold text-slate-400 mb-6">Last updated: 11 June 2026</p>
                      <div className="space-y-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        <p>By using Syllab.in you agree to these terms. Please read them. If you do not agree, please do not use the service.</p>

                        <div>
                          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1.5">1. The service</h2>
                          <p>Syllab provides free educational content and tools (syllabus notes, practice, mock tests, an AI tutor, a career &amp; college predictor, worksheets and more) for students in India. Features may change or improve over time.</p>
                        </div>

                        <div>
                          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1.5">2. Eligibility</h2>
                          <p>Syllab is intended for school students. If you are under 18, you should use Syllab with the involvement and consent of a parent or guardian.</p>
                        </div>

                        <div>
                          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1.5">3. Acceptable use</h2>
                          <p>Use Syllab for learning. Do not misuse it — no attempts to break, overload or reverse‑engineer the service, no scraping at scale, no uploading unlawful or harmful content, and no using the AI features to generate abusive or unsafe content.</p>
                        </div>

                        <div>
                          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1.5">4. Educational guidance only</h2>
                          <p>All content — including AI answers, rank/college predictions, cut‑offs, fees and placement figures — is <strong>indicative and for guidance only</strong>, and may contain errors. Always verify important decisions against official sources (NCERT/CBSE, the exam board, JoSAA/MCC/NTA, and college websites). Syllab does not provide professional, legal, medical or financial advice.</p>
                        </div>

                        <div>
                          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1.5">5. Intellectual property</h2>
                          <p>Syllab's name, design and original content belong to Syllab. You may use the content for personal, non‑commercial learning. Third‑party names and trademarks belong to their owners.</p>
                        </div>

                        <div>
                          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1.5">6. Disclaimers &amp; liability</h2>
                          <p>The service is provided "as is", without warranties. To the extent permitted by law, Syllab is not liable for any loss arising from reliance on the content or from interruptions to the free service.</p>
                        </div>

                        <div>
                          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1.5">7. Changes, termination &amp; law</h2>
                          <p>We may update these terms (we'll revise the date above) and may suspend accounts that misuse the service. These terms are governed by the laws of India. Questions? Email <a href="mailto:narasatish966@gmail.com" className="font-bold text-primary hover:underline">narasatish966@gmail.com</a>.</p>
                        </div>
                      </div>
                    </section>
                  ) : null}
                  {activeTab.startsWith('class_') ? (
                    <ClassPage classNum={parseInt(activeTab.replace('class_', ''), 10)} setTab={navigate} />
                  ) : null}
                </div>
              </ErrorBoundary>
            </Suspense>
          )}
        </div>
      </main>

      {!isMockExamMode ? (
        <DraggableFab
          isOpen={isTutorOpen}
          onToggle={() => setTutorOpen((open) => !open)}
          panel={
            <Suspense fallback={<div className="h-full rounded-3xl bg-white p-8 text-center text-sm font-bold text-slate-400 shadow-2xl">Loading tutor...</div>}>
              <TutorPage currentUser={currentUser} userClass={userClass} floating onClose={() => setTutorOpen(false)} />
            </Suspense>
          }
        />
      ) : null}

      {!isMockExamMode ? (
      <ColdStartBanner />
      ) : null}

      {/* Show Pomodoro Timer on practice/syllabus pages */}
      {!isMockExamMode && (activeTab === 'arena' || activeTab === 'syllabus') && (
        <Suspense fallback={null}><PomodoroTimer /></Suspense>
      )}

      {!isMockExamMode ? (
      <footer className="bg-secondary text-white border-t border-slate-800 py-16 px-4 sm:px-6 sm:py-20 md:py-24 mt-24">
        <div className="mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <div className="space-y-6 sm:space-y-8">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-80"
            >
              <div
                className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl text-base sm:text-xl font-black text-white shadow-lg shadow-emerald-500/30 shrink-0"
                style={{ backgroundImage: 'var(--grad-brand)' }}
              >
                S
              </div>
              <span className="font-heading text-lg sm:text-2xl font-extrabold tracking-tight">Syllab</span>
            </button>
            <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
              India's AI-powered learning platform for CBSE NCERT practice, concepts, and exam readiness from Class 1 to 12.
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-[11px] font-black uppercase tracking-widest text-primary mb-4 sm:mb-8">Learning Hub</h2>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2 sm:gap-y-3 content-start">
              <li><a href="/story-lessons" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Story Lessons</a></li>
              <li><a href="/web-stories" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Web Stories</a></li>
              <li><button onClick={() => navigate('syllabus')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Syllabus</button></li>
              <li><button onClick={() => navigate('arena')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Practice</button></li>
              <li><button onClick={() => navigate('daily')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Daily Challenge</button></li>
              <li><button onClick={() => navigate('mock_tests')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Mock Tests</button></li>
              <li><button onClick={() => navigate('tools_hub')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">All Free Tools</button></li>
              <li><button onClick={() => navigate('pdf_tools')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">PDF Tools</button></li>
              <li><button onClick={() => navigate('image_tools')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Image Tools</button></li>
              <li><button onClick={() => navigate('compare_tool')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Compare</button></li>
              <li><button onClick={() => navigate('notes_tool')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Notepad</button></li>
              <li><button onClick={() => navigate('everyday_tools')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Everyday Tools</button></li>
              <li><button onClick={() => navigate('roman_numerals')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Roman Numerals</button></li>
              <li><button onClick={() => navigate('contrast_checker')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Contrast Checker</button></li>
              <li><button onClick={() => navigate('timestamp_tool')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Timestamp Converter</button></li>
              <li><button onClick={() => navigate('csv_to_json')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">CSV → JSON</button></li>
              <li><button onClick={() => navigate('image_to_text')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Image to Text (OCR)</button></li>
              <li><button onClick={() => navigate('word_counter')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Word Counter</button></li>
              <li><button onClick={() => navigate('text_to_speech')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Text to Speech</button></li>
              <li><button onClick={() => navigate('calculators')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Free Calculators</button></li>
              <li><button onClick={() => navigate('study_planner')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Study Planner</button></li>
              <li><button onClick={() => navigate('cutoffs')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">College Cutoffs</button></li>
              <li><button onClick={() => navigate('flashcards')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Flashcards</button></li>
              <li><button onClick={() => navigate('answer_evaluator')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">AI Answer Checker</button></li>
              <li><button onClick={() => navigate('unit_converter')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Unit Converter</button></li>
              <li><button onClick={() => navigate('periodic_table')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Periodic Table</button></li>
              <li><button onClick={() => navigate('pomodoro')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Pomodoro Timer</button></li>
              <li><button onClick={() => navigate('marks_tracker')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Marks Tracker</button></li>
              <li><button onClick={() => navigate('progress')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Dashboard</button></li>
              <li><button onClick={() => navigate('learning_lab')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">AI Tutor</button></li>
              <li><button onClick={() => setTutorOpen(true)} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">AI Mentoring</button></li>
              <li><button onClick={() => navigate('prep_hub')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Preparation Guides</button></li>
              <li><button onClick={() => navigate('blog')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Study Blog</button></li>
              <li><button onClick={() => navigate('skills_lab')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Coding</button></li>
              <li><button onClick={() => navigate('english_lab')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">English</button></li>
              <li><button onClick={() => navigate('general_knowledge')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">General Knowledge</button></li>
              {/* Real <a href> so search engines pass link equity to these SEO pages */}
              <li><a href="/career-predictor" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Career & College Predictor</a></li>
              <li><a href="/colleges" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Top Engineering Colleges</a></li>
              <li><a href="/medical-colleges" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Top Medical Colleges (MBBS)</a></li>
              <li><a href="/best-colleges/cse" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Best CSE Colleges</a></li>
              <li><a href="/colleges-accepting/jee-main" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Colleges Accepting JEE</a></li>
              <li><a href="/scholarships" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Scholarships</a></li>
              <li><a href="/difference-between" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Difference Between</a></li>
              <li><a href="/concepts" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Concepts Explained</a></li>
              <li><a href="/solved-examples" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Solved Examples</a></li>
              <li><a href="/lab-practicals" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Lab Practicals</a></li>
              <li><a href="/revision-notes" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Revision Notes</a></li>
              <li><a href="/sample-papers" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Sample Papers</a></li>
              <li><a href="/mcqs" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Chapter MCQs</a></li>
              <li><a href="/maths-tables" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Maths Tables</a></li>
              <li><a href="/english-writing" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">English Writing</a></li>
              <li><a href="/english-literature" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">English Literature</a></li>
              <li><a href="/vocabulary" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Vocabulary</a></li>
              <li><a href="/gk-facts" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">GK Facts</a></li>
              <li><a href="/glossary" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Glossary</a></li>
              <li><a href="/full-forms" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Full Forms</a></li>
              <li><a href="/ncert-solutions" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">NCERT Solutions</a></li>
              <li><a href="/live-quiz" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Live Quiz Game</a></li>
              <li><a href="/free-alternatives" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Free Alternatives</a></li>
              <li><a href="/kids" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Kids Zone (Pre-KG–Class 3)</a></li>
              <li><a href="/doubt-solver" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">📸 Photo Doubt Solver</a></li>
              <li><a href="/micro" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">⚡ 5-Min Microlearning</a></li>
              <li><a href="/important-questions" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Important Questions</a></li>
              <li><a href="/english-grammar" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">English Grammar</a></li>
              <li><a href="/career" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Career Guides</a></li>
              <li><a href="/previous-year-papers" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Previous Year Papers</a></li>
              <li><a href="/formula-sheets" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Formula Sheets (PDF)</a></li>
              <li><a href="/state-board-solutions" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">State Board Solutions</a></li>
              <li><a href="/ai-hub" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">AI for Students</a></li>
              <li><a href="/embed" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Link to Us / Embed</a></li>
              <li><a href="/mock-tests/jee-main" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">JEE Main Mock Test</a></li>
              <li><a href="/mock-tests/neet" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">NEET Mock Test</a></li>
              <li><a href="/college-predictor" className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">College Predictor</a></li>
              <li><button onClick={() => navigate('parent')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Parent Hub</button></li>
              <li><button onClick={() => navigate('sitemap')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Platform Sitemap</button></li>
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-black uppercase tracking-widest text-primary mb-4 sm:mb-8">By Class</h2>
            <ul className="space-y-2 sm:space-y-4">
              {[1,2,3,4,5,6,7,8,9,10,11,12].map((c) => (
                <li key={c}><button onClick={() => navigate(`class_${c}`)} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Class {c}</button></li>
              ))}
            </ul>
            <h2 className="text-[11px] font-black uppercase tracking-widest text-primary mb-3 sm:mb-5 mt-6 sm:mt-10">Colleges by State</h2>
            <ul className="space-y-2 sm:space-y-4">
              {[
                ['national', 'IITs & NITs'], ['tamil-nadu', 'Tamil Nadu'], ['karnataka', 'Karnataka'],
                ['maharashtra', 'Maharashtra'], ['telangana', 'Telangana'], ['andhra-pradesh', 'Andhra Pradesh'],
                ['delhi-ncr', 'Delhi-NCR'], ['west-bengal', 'West Bengal'],
              ].map(([slug, label]) => (
                <li key={slug}><a href={`/colleges/${slug}`} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">{label} Colleges</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-black uppercase tracking-widest text-primary mb-4 sm:mb-8">Company</h2>
            <ul className="space-y-2 sm:space-y-4">
              <li><button onClick={() => navigate('about')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Our Mission</button></li>
              <li><button onClick={() => navigate('contact')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Contact Support</button></li>
              <li><button onClick={() => navigate('sitemap')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">Sitemap</button></li>
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-black uppercase tracking-widest text-primary mb-4 sm:mb-8">Weekly Newsletter</h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6 leading-relaxed">
              Get weekly study tips, new chapters and exam updates delivered to your inbox.
            </p>
            {newsletterStatus === 'success' ? (
              <div className="flex items-center gap-2 rounded-lg sm:rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3 sm:px-4 py-2 sm:py-3">
                <span className="text-emerald-400 font-black text-xs sm:text-sm">✓</span>
                <span className="text-emerald-400 text-xs sm:text-sm font-bold">You're subscribed!</span>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!newsletterEmail.trim()) return;
                  setNewsletterStatus('loading');
                  const result = await (await fb()).subscribeToNewsletter(
                    newsletterEmail.trim(),
                    userClass || undefined,
                    userRole || undefined,
                  );
                  setNewsletterStatus(result.success ? 'success' : 'error');
                }}
                className="space-y-2 sm:space-y-3"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => { setNewsletterEmail(e.target.value); setNewsletterStatus('idle'); }}
                  placeholder="your@email.com"
                  required
                  className="w-full rounded-lg sm:rounded-xl bg-white/5 border border-white/10 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-primary focus:bg-white/10 transition-all"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="w-full rounded-lg sm:rounded-xl bg-primary py-2 sm:py-3 text-xs sm:text-sm font-black text-white transition-all hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
                {newsletterStatus === 'error' && (
                  <p className="text-[10px] sm:text-xs text-red-400 font-bold">Could not subscribe — please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
        <div className="mx-auto max-w-7xl mt-16 sm:mt-20 md:mt-24 pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 text-center md:text-left">© 2026 Syllab AI. Designed for Excellence.</div>
          <div className="flex gap-4 sm:gap-8 flex-wrap justify-center">
            <button type="button" onClick={() => navigate('privacy')} className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Privacy Policy</button>
            <button type="button" onClick={() => navigate('terms')} className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </footer>
      ) : null}
      <InstallPrompt />
      <OfflineBanner />
      {/* Phone-only. Fixed, so it adds nothing to document flow or CLS. The
          spacer below keeps it from covering the last few lines of content. */}
      <BottomTabBar activeTab={activeTab} onNavigate={navigate} />
      <div aria-hidden="true" className="h-[3.75rem] md:hidden" />
    </div>
    </MotionConfig>
  );
}
