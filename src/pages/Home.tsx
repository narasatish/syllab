import React, { useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { FULL_ARTICLES } from '../data/updateArticles';
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Code2,
  Brain,
  BarChart3,
  Target,
  Star,
  Users,
  Shield,
  Play,
  GraduationCap,
} from 'lucide-react';
import SEO from '../components/SEO';
import StructuredData from '../seo/StructuredData';
import StudyNudge from '../components/StudyNudge';
import { getStreak } from '../lib/gamification';
// Below-the-fold — lazy so they don't sit on the homepage's critical render path
// (the hero/LCP element paints without waiting for this JS to parse/execute).
const HomeFeatureGrid = React.lazy(() => import('../components/HomeFeatureGrid'));
const HomeInteractiveDemo = React.lazy(() => import('../components/HomeInteractiveDemo'));
import WhatsNew from '../components/WhatsNew';

interface HomePageProps {
  setTab?: (tab: string) => void;
  currentUser?: FirebaseUser | null;
  stats?: { xp: number; streak: number; rank: string | number };
  userClass?: string;
}

const CLASSES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const HOME_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Syllab.in',
    url: 'https://syllab.in',
    logo: 'https://syllab.in/icon.svg',
    image: 'https://syllab.in/og-image.svg',
    description: 'Free AI-powered learning platform for CBSE Class 1–12 students. JEE, NEET & EAMCET preparation with daily practice, mock tests, formula bank, diagram lab, and AI tutoring.',
    sameAs: ['https://syllab.in'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Free Learning Features',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'AI Tutor', description: 'Ask any CBSE or NCERT question and get instant AI explanations.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'Mock Tests', description: 'JEE, NEET, EAMCET, and custom exam mock tests.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'Daily Challenges', description: 'Timed daily quizzes for JEE, NEET, EAMCET and school aptitude.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'Skills Lab', description: 'Hands-on Python, SQL, AI, and coding tutorials with AI feedback.' } },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Syllab.in',
    url: 'https://syllab.in',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Android, iOS, Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    description: 'Free AI learning app for Indian students. CBSE NCERT chapters, mock tests, daily challenges, formula bank, diagram lab, skills lab and AI tutor.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Syllab.in',
    url: 'https://syllab.in',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://syllab.in/syllabus?q={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  },
  // NOTE: FAQPage schema intentionally lives ONCE in index.html (static, crawlable
  // without JS). It was removed from here to avoid duplicate FAQPage blocks on the
  // home page (GSC flagged conflicting FAQ structured data).
];

export default function HomePage({ setTab, currentUser, stats, userClass }: HomePageProps) {
  // "Pick up where you left off" — reads the client-side breadcrumb App writes on
  // every learning-area visit. Shown only when recent (≤14 days) so it never feels stale.
  const [resume, setResume] = useState<{ tab: string; label: string; ts: number } | null>(null);
  const [streakAtRisk, setStreakAtRisk] = useState(0);
  useEffect(() => {
    try {
      const raw = localStorage.getItem('syllab_last_visit');
      if (raw) {
        const v = JSON.parse(raw);
        if (v && v.tab && v.label && Date.now() - (v.ts || 0) < 14 * 86400000) setResume(v);
      }
    } catch { /* ignore */ }
    // Streak nudge: active streak but nothing done today → remind them to keep it alive.
    try {
      const s = getStreak();
      const d = new Date();
      const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (s.count >= 1 && s.last !== today) setStreakAtRisk(s.count);
    } catch { /* ignore */ }
  }, []);

  const handleClassClick = (classNum: number) => {
    if (setTab) {
      setTab(`class_${classNum}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToSyllabus = () => {
    sessionStorage.removeItem('syllab_class_filter');
    if (setTab) {
      setTab('syllabus');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToSkills = () => {
    if (setTab) {
      setTab('skills_lab');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToParent = () => {
    if (setTab) {
      setTab('parent');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToArticle = (articleId: string) => {
    // Store article ID so Updates page auto-opens it
    try { sessionStorage.setItem('syllab_open_article', articleId); } catch { /* ignore */ }
    if (setTab) {
      setTab('updates');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO
        title="Free AI Learning App for Class 1–12 | CBSE NCERT JEE NEET"
        description="Syllab is India's free AI learning platform for Class 1 to 12. NCERT chapter practice, JEE & NEET mock tests, daily challenges, formula bank, diagram lab, skills lab and AI tutor — all free."
        keywords="free AI learning India, CBSE Class 10 preparation, JEE preparation free, NEET preparation, EAMCET practice, AI tutor India, Class 12 Science, NCERT solutions, daily challenge students, diagram lab science, formula bank physics chemistry, free mock test JEE NEET, online learning Class 6 7 8 9 10"
        url="https://syllab.in/"
        image="https://syllab.in/og-image.svg"
        jsonLd={HOME_SCHEMA}
      />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Syllab',
          url: 'https://syllab.in',
          description: 'AI-powered learning platform for Indian students, Class 1–12. NCERT-aligned, free.',
        }}
      />

      {/* Retention: keep-your-streak nudge when nothing's been done today */}
      {streakAtRisk > 0 && (
        <div className="px-4 pt-4">
          <button
            onClick={() => setTab?.('daily')}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-4 text-left shadow-sm transition-all hover:shadow-md dark:border-amber-900/40 dark:from-amber-950/30 dark:to-orange-950/20"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">🔥 Keep your streak alive</p>
              <p className="mt-0.5 text-base font-black text-slate-800 dark:text-slate-100">You're on a {streakAtRisk}-day streak — do one quick thing today!</p>
            </div>
            <span className="shrink-0 rounded-full bg-amber-500 px-4 py-2 text-xs font-black text-white shadow-sm">Today's quiz →</span>
          </button>
        </div>
      )}

      {/* Retention: one-tap return to the last learning area visited */}
      {resume && (
        <div className="px-4 pt-4">
          <button
            onClick={() => setTab?.(resume.tab)}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-4 text-left shadow-sm transition-all hover:shadow-md"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">↩ Pick up where you left off</p>
              <p className="mt-0.5 text-base font-black text-slate-800">{resume.label}</p>
            </div>
            <span className="shrink-0 rounded-full bg-emerald-500 px-4 py-2 text-xs font-black text-white shadow-sm">Continue →</span>
          </button>
        </div>
      )}

      {/* Personal "revise your weak chapters" nudge from Study Room memory */}
      <div className="px-4 pt-4">
        <StudyNudge onOpenStudyRoom={() => setTab?.('study_room')} />
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-14px) rotate(3deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(8deg); }
          50% { transform: translateY(-18px) rotate(-4deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(15deg); }
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .anim-float-slow { animation: float-slow 5s ease-in-out infinite; }
        .anim-float-medium { animation: float-medium 4s ease-in-out infinite; }
        .anim-float-fast { animation: float-fast 3.5s ease-in-out infinite; }
        .anim-fade-up { animation: fade-up 0.7s ease-out both; }
        .anim-delay-1 { animation-delay: 0.1s; }
        .anim-delay-2 { animation-delay: 0.25s; }
        .anim-delay-3 { animation-delay: 0.4s; }
        .anim-delay-4 { animation-delay: 0.55s; }
        .hero-gradient-text {
          background: linear-gradient(135deg, #f43f5e 0%, #8b5cf6 50%, #3b82f6 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shine 4s linear infinite;
        }
        .card-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .subject-card:hover .subject-bar {
          width: 100% !important;
        }
      `}</style>

      {/* ── PERSONALIZED WELCOME (logged-in only) ────────────────────────────── */}
      {currentUser && (
        <div className="mb-8 rounded-[2rem] bg-gradient-to-r from-emerald-900 to-slate-900 p-5 text-white shadow-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">
                Welcome Back{userClass ? ` · Class ${userClass}` : ''}
              </p>
              <h2 className="text-xl font-black">
                {currentUser.displayName || currentUser.email?.split('@')[0] || 'Student'} 👋
              </h2>
            </div>
            {stats && (
              <div className="flex gap-2 flex-wrap">
                <div className="rounded-2xl bg-white/10 px-4 py-2 text-center min-w-[60px]">
                  <div className="text-[9px] font-black uppercase text-emerald-300">XP</div>
                  <div className="text-base font-black">{stats.xp.toLocaleString()}</div>
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-2 text-center min-w-[60px]">
                  <div className="text-[9px] font-black uppercase text-orange-300">Streak</div>
                  <div className="text-base font-black">🔥 {stats.streak}d</div>
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-2 text-center min-w-[60px]">
                  <div className="text-[9px] font-black uppercase text-violet-300">Rank</div>
                  <div className="text-base font-black">{stats.rank}</div>
                </div>
              </div>
            )}
          </div>
          {userClass && (
            <div className="mt-4 flex gap-2 flex-wrap">
              <button onClick={() => setTab?.('syllabus')} className="rounded-xl bg-white/10 px-3 py-1.5 text-xs font-black text-white hover:bg-white/20 transition-colors">
                📚 Class {userClass} Syllabus
              </button>
              <button onClick={() => setTab?.('arena')} className="rounded-xl bg-white/10 px-3 py-1.5 text-xs font-black text-white hover:bg-white/20 transition-colors">
                🎯 Practice Arena
              </button>
              <button onClick={() => setTab?.('mock_tests')} className="rounded-xl bg-white/10 px-3 py-1.5 text-xs font-black text-white hover:bg-white/20 transition-colors">
                {parseInt(userClass) >= 11 ? '📋 JEE / NEET Mocks' : '🏆 Olympiads'}
              </button>
              <button onClick={() => setTab?.('profile')} className="rounded-xl bg-white/10 px-3 py-1.5 text-xs font-black text-white hover:bg-white/20 transition-colors">
                ⚙️ Change Class
              </button>
            </div>
          )}
          {!userClass && (
            <div className="mt-3">
              <button onClick={() => setTab?.('profile')} className="rounded-xl bg-emerald-700/50 border border-emerald-600/30 px-3 py-1.5 text-xs font-black text-emerald-200 hover:bg-emerald-700/80 transition-colors">
                Set your class for personalised content →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 mx-3 sm:mx-4 mt-4 rounded-[2rem] sm:rounded-[3rem]">
        {/* Decorative orbs */}
        <div className="anim-float-slow absolute top-10 left-8 sm:left-20 w-20 h-20 sm:w-32 sm:h-32 rounded-full opacity-60"
          style={{ background: 'radial-gradient(circle, #a78bfa, #7c3aed)', filter: 'blur(2px)' }} />
        <div className="anim-float-medium absolute top-16 right-8 sm:right-20 w-14 h-14 sm:w-24 sm:h-24 rounded-2xl opacity-70"
          style={{ background: 'linear-gradient(135deg, #fde047, #eab308)', filter: 'blur(1px)' }} />
        <div className="anim-float-fast absolute bottom-16 left-1/3 w-12 h-12 sm:w-20 sm:h-20 rounded-xl hidden sm:block opacity-50"
          style={{ background: 'linear-gradient(135deg, #34d399, #059669)' }} />
        <div className="anim-float-slow absolute bottom-10 right-12 sm:right-28 w-16 h-16 sm:w-24 sm:h-24 rounded-3xl opacity-60"
          style={{ background: 'linear-gradient(135deg, #fb7185, #e11d48)', filter: 'blur(1px)' }} />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-5 py-20 sm:py-32">
          {/* Badge */}
          <div className="anim-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-black uppercase tracking-widest mb-6 backdrop-blur-sm">
            <Sparkles size={13} className="text-amber-400" />
            India's AI Learning Platform
            <Sparkles size={13} className="text-amber-400" />
          </div>

          {/* Headline */}
          <h1 className="anim-fade-up anim-delay-1 text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter mb-4 leading-[1.05]">
            Learn smarter with{' '}
            <span className="hero-gradient-text">AI by your side</span>
          </h1>

          <p className="anim-fade-up anim-delay-2 text-base sm:text-xl text-slate-300 font-medium mb-3 max-w-2xl mx-auto leading-relaxed">
            NCERT-aligned for Class 1–12 · Python, AI, Data Science, Web Dev · 400+ deep-dive topics
          </p>
          <p className="anim-fade-up anim-delay-2 text-sm text-slate-400 font-medium mb-10">
            Beginner → Intermediate → Advanced — all in one place, all free.
          </p>

          {/* CTAs */}
          <div className="anim-fade-up anim-delay-3 flex gap-3 justify-center flex-wrap">
            <button onClick={goToSkills}
              className="group bg-gradient-to-r from-violet-500 to-purple-600 text-white px-7 py-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-purple-900/40 hover:shadow-purple-900/60 active:scale-95 transition-all">
              <Play size={15} />
              Start Coding Now
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={goToSyllabus}
              className="hidden sm:flex bg-white/10 border border-white/20 text-white px-7 py-4 rounded-2xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all hover:bg-white/15 backdrop-blur-sm items-center gap-2">
              📚 Browse Syllabus
            </button>
            <button onClick={goToParent}
              className="hidden md:inline-block text-slate-400 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all hover:text-white">
              For Parents →
            </button>
          </div>

          {/* Trust strip */}
          <div className="anim-fade-up anim-delay-4 mt-12 flex items-center justify-center gap-6 flex-wrap">
            {['🇮🇳 Made for India', '✅ Free forever', '🎓 CBSE aligned', '🤖 AI-powered'].map(item => (
              <span key={item} className="text-[11px] font-bold text-slate-400">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL-NUMBERS TRUST BAND + SNAP & SOLVE (conversion) ──────────────── */}
      <section className="reveal max-w-6xl mx-auto px-5 pt-10">
        <h2 className="sr-only">Why students choose Syllab</h2>
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          {/* Verifiable free-content stats — real counts, no inflated claims */}
          <div className="rounded-[1.5rem] border border-slate-100 bg-white p-5 sm:p-7" style={{ boxShadow: 'var(--shadow-soft)' }}>
            <span className="eyebrow mb-4">Everything free · no login needed</span>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { n: '3,900+', l: 'free study pages' },
                { n: '890+', l: 'previous-year Qs' },
                { n: '470+', l: 'full-form guides' },
                { n: '1–12', l: 'classes covered' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-extrabold text-secondary sm:text-3xl">{s.n}</div>
                  <div className="mt-1 text-xs font-semibold text-slate-600">{s.l}</div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm font-medium text-slate-600">
              CBSE · NCERT · JEE · NEET — notes, mock tests, formula sheets &amp; a free AI tutor. No paywall, ever.
            </p>
          </div>
          {/* Snap & Solve — surface the existing AI doubt solver prominently */}
          <button
            onClick={() => { setTab?.('doubt_solver'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="hover-lift group relative overflow-hidden rounded-[1.5rem] p-6 text-left text-white"
            style={{ backgroundImage: 'var(--grad-vivid)', boxShadow: '0 16px 40px -10px rgba(139,92,246,.45)' }}
          >
            <span className="absolute right-4 top-4 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-black tracking-wider">FREE</span>
            <div className="text-4xl">📸</div>
            <h3 className="mt-3 text-xl font-extrabold">Snap &amp; Solve a doubt</h3>
            <p className="mt-1.5 text-sm font-medium text-white/90">Stuck on a question? Photograph it and get a clear, step-by-step AI solution in seconds.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-black">Open the doubt solver →</span>
          </button>
        </div>
      </section>

      {/* ── USP HIGHLIGHTS — what makes Syllab different (keep it to 3) ───────── */}
      <section className="reveal max-w-6xl mx-auto px-5 pt-10">
        <h2 className="sr-only">What makes Syllab different</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {([
            { tab: 'learning_lab', emoji: '🎓', title: 'AI Tuition Teacher', desc: 'Daily homework by class & chapter — type or upload your answers, get marked instantly with XP. Like a private tutor, free.', badge: 'NEW', grad: 'from-emerald-500 to-teal-600' },
            { tab: 'important_questions', emoji: '🎯', title: 'Important Questions', desc: 'Chapter-wise board-exam questions for Class 6–12, each with a full AI answer.', badge: 'NEW', grad: 'from-violet-500 to-indigo-600' },
            { tab: 'syllabus', emoji: '👶', title: 'Kids Zone + Worksheets', desc: 'Free preschool learning, stories, games & 200+ printable worksheets.', badge: 'FREE', grad: 'from-pink-500 to-rose-600' },
          ]).map((c) => (
            <button key={c.tab} onClick={() => { setTab?.(c.tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${c.grad} p-5 text-left text-white shadow-lg transition-transform hover:-translate-y-1`}>
              {c.badge ? <span className="absolute right-3 top-3 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-black tracking-wider">{c.badge}</span> : null}
              <div className="text-4xl">{c.emoji}</div>
              <h3 className="mt-3 text-lg font-black">{c.title}</h3>
              <p className="mt-1 text-sm font-medium text-white/85">{c.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-black text-white/90">Explore →</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── PICK YOUR CLASS ──────────────────────────────────────────────────── */}
      <section className="reveal max-w-6xl mx-auto px-5 py-12 sm:py-16 pb-16 sm:pb-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-widest mb-4">
            <GraduationCap size={13} />
            NCERT & CBSE aligned
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-3">
            Pick your class.
          </h2>
          <p className="text-slate-600 font-medium">
            Personalized content for every grade — Class 1 to 12.
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 sm:gap-3 max-w-5xl mx-auto">
          {CLASSES.map((classNum) => (
            <button key={classNum} onClick={() => handleClassClick(classNum)}
              className="group card-hover p-3 sm:p-5 bg-white border-2 border-slate-100 rounded-2xl text-center hover:border-violet-500 hover:bg-violet-50 active:scale-95 transition-all">
              <div className="text-[8px] font-black uppercase tracking-widest text-slate-600 group-hover:text-violet-500 transition-colors">Cls</div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-violet-700 transition-colors">{classNum}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ── WHAT YOU CAN DO — 6 animated feature tiles ──────────────────────── */}
      <React.Suspense fallback={<div className="min-h-[40vh]" aria-hidden="true" />}>
        <HomeFeatureGrid onNavigate={(tab) => { setTab?.(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />

        {/* ── SEE IT IN ACTION — interactive demo carousel ─────────────────── */}
        <HomeInteractiveDemo onNavigate={(tab) => { setTab?.(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
      </React.Suspense>

      {/* ── WHAT'S NEW — Latest blog posts & new features ─────────────────── */}
      <WhatsNew
        onNavigate={(tab) => { setTab?.(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onOpenArticle={(articleId) => goToArticle(articleId)}
      />

      {/* ── FOR PARENTS ──────────────────────────────────────────────────────── */}
      <section className="reveal max-w-6xl mx-auto px-5 py-12 sm:py-16">
        <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-14 text-white overflow-hidden relative">
          {/* decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translate(-30%, 30%)' }} />

          <div className="relative grid sm:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-4">
                <Users size={11} />
                For Parents & Teachers
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 leading-tight">
                Replace expensive coaching.<br />Keep the results.
              </h2>
              <p className="text-purple-100 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                Syllab gives your child personalized AI learning aligned to the exact textbook they study from. Track progress, see weak areas, and watch confidence grow — all for free.
              </p>
              <button onClick={goToParent}
                className="bg-white text-purple-700 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest inline-flex items-center gap-2 active:scale-95 transition-transform hover:bg-purple-50">
                Open Parent Hub <ArrowRight size={14} />
              </button>
            </div>
            <ul className="space-y-4">
              {[
                { icon: Shield, text: 'NCERT and CBSE curriculum aligned' },
                { icon: Target, text: 'Olympiad and NTSE pattern questions' },
                { icon: Star, text: 'Free forever for core features — no hidden charges' },
                { icon: BarChart3, text: 'Visual progress tracking per subject and chapter' },
                { icon: Brain, text: 'AI identifies weak areas and suggests what to study next' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={14} className="text-white" />
                  </div>
                  <span className="text-sm sm:text-base text-purple-100 font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── LATEST UPDATES ───────────────────────────────────────────────────── */}
      <section className="px-0 py-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest mb-2">📢 Latest Updates</div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {currentUser && userClass ? `Updates for Class ${userClass}` : 'Student Updates'}
            </h2>
          </div>
          <button onClick={() => setTab?.('updates')} className="text-xs font-black text-primary hover:underline uppercase tracking-widest">
            View All →
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {(() => {
            // Show a DIVERSE mix on the home page — one article per category — so
            // it never shows three of the same topic (e.g. all finance) together.
            const seen = new Set<string>();
            const picks = FULL_ARTICLES.filter(a => {
              if (seen.has(a.category)) return false;
              seen.add(a.category); return true;
            }).slice(0, 3);
            return picks;
          })().map(article => (
            <button key={article.id} onClick={() => goToArticle(article.id)}
              className={`text-left rounded-2xl bg-gradient-to-br ${article.coverColor} p-5 text-white shadow-lg hover:-translate-y-0.5 transition-transform`}>
              <div className="text-3xl mb-3">{article.emoji}</div>
              <div className="text-[9px] font-black uppercase tracking-widest opacity-70 mb-1">{article.category.replace(/-/g, ' ')}</div>
              <h3 className="text-sm font-black leading-snug line-clamp-2">{article.title}</h3>
              <p className="mt-2 text-[11px] opacity-80 font-medium line-clamp-2">{article.summary}</p>
              <div className="mt-3 text-[9px] font-black uppercase tracking-widest opacity-60">{article.readingTime} min read · {article.updatedAt}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <FaqSection />

      {/* ── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section className="reveal text-center px-5 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-5">🚀</div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter mb-4">
            Your learning journey starts now.
          </h2>
          <p className="text-slate-600 font-medium mb-8 max-w-md mx-auto leading-relaxed">
            Join thousands of students learning Python, AI, and more — completely free. No card, no spam.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={goToSkills}
              className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest inline-flex items-center gap-2 shadow-xl active:scale-95 transition-transform">
              <Code2 size={15} />
              Start Coding — Free
            </button>
            <button onClick={goToSyllabus}
              className="bg-slate-100 text-slate-900 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest inline-flex items-center gap-2 active:scale-95 transition-transform hover:bg-slate-200">
              Browse Syllabus <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: 'What is Syllab.in?',
    a: 'Syllab.in is a free AI-powered learning platform for Indian students from Class 5 to 12. It provides NCERT-aligned chapter summaries, chapter-wise MCQ practice, AI tutoring, skills lab with live coding, PPT lessons, and more — all in one place.',
  },
  {
    q: 'Is Syllab.in completely free?',
    a: 'Yes. Core features including the AI Tuition Teacher (personalized daily homework with instant marking), Skills Lab (Python, AI, SQL, Java, HTML, CSS, JS), AI Tutor, chapter practice, and daily challenges are completely free. No credit card required. No hidden subscription.',
  },
  {
    q: 'Which classes does Syllab cover?',
    a: 'Syllab covers Class 5 through Class 12, including CBSE NCERT curriculum for all major subjects: Mathematics, Science, Social Science, Physics, Chemistry, Biology, and English. The Skills Lab covers programming and AI for all ages.',
  },
  {
    q: 'Does Syllab help with JEE and NEET preparation?',
    a: 'Yes. Syllab has dedicated JEE and NEET preparation sections with chapter-wise practice, mock tests, and daily challenges covering Physics, Chemistry, Mathematics, and Biology at the Class 11-12 level.',
  },
  {
    q: 'What is the Skills Lab?',
    a: 'The Skills Lab is Syllab\'s interactive coding environment. It covers Python, JavaScript, Java, SQL, HTML, CSS, AI Learning, and Data Analytics — with theory, live code examples, practice challenges, and AI feedback. Perfect for students from Class 8 onwards wanting to learn programming.',
  },
  {
    q: 'How is Syllab different from other learning apps?',
    a: 'Syllab is AI-first — not just video lectures. It gives personalized practice, tracks your progress, has live code execution in the browser, AI-generated PPT lessons for any topic, and an AI tutor that answers questions in real time. Plus it\'s free for core features.',
  },
  {
    q: 'Can I learn programming on Syllab?',
    a: 'Absolutely! Syllab\'s Skills Lab teaches Python, JavaScript, Java, SQL, HTML, CSS, AI/ML concepts, and Data Analytics from basic to advanced. Each topic has theory, code examples with live preview, and AI-checked practice challenges.',
  },
  {
    q: 'Do I need to create an account to use Syllab?',
    a: 'You can browse content without an account. Creating a free account lets you save your progress, track XP and streaks, save your mistakes, and resume paused quizzes across devices.',
  },
];

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="reveal max-w-3xl mx-auto px-5 py-16 sm:py-20">
      {/* FAQ JSON-LD intentionally lives once in index.html (crawlable without JS).
          Removed the duplicate here to avoid multiple FAQPage blocks on the page. */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-widest mb-4">
          Frequently asked
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-3">
          Got questions?
        </h2>
        <p className="text-slate-600 font-medium">Everything you need to know about Syllab.in</p>
      </div>

      <div className="space-y-3">
        {FAQS.map(({ q, a }, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className={`border rounded-2xl overflow-hidden transition-colors ${isOpen ? 'border-violet-200 bg-violet-50/50' : 'border-slate-100 bg-white'}`}>
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full text-left p-5 flex items-center justify-between gap-4"
              >
                <span className={`font-black text-sm sm:text-base transition-colors ${isOpen ? 'text-violet-900' : 'text-slate-900'}`}>{q}</span>
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? 'bg-violet-200' : 'bg-slate-100'}`}>
                  {isOpen ? (
                    <ChevronUp size={15} className="text-violet-600" />
                  ) : (
                    <ChevronDown size={15} className="text-slate-500" />
                  )}
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
