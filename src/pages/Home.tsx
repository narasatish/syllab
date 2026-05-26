import React, { useState, useEffect, useRef } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { FULL_ARTICLES } from '../data/updateArticles';
import {
  Sparkles,
  Bot,
  ScanLine,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Code2,
  Brain,
  BarChart3,
  Zap,
  Target,
  Star,
  Users,
  TrendingUp,
  Shield,
  Play,
  GraduationCap,
} from 'lucide-react';
import SEO from '../components/SEO';
import StructuredData from '../seo/StructuredData';

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
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '1200' },
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
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is Syllab useful for JEE, NEET and EAMCET preparation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Syllab combines NCERT-aligned chapter practice, AI tutoring, daily challenges, and dedicated exam prep tracks for JEE Mains, NEET, and EAMCET students.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which classes can use Syllab?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Syllab supports Class 1 to 12 students. Every class has NCERT chapter summaries, practice MCQs, daily challenges, formula bank, and AI tutor support.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Syllab completely free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Syllab is 100% free. No subscription required for daily challenges, mock tests, AI doubt solving, skills lab, formula bank, diagram lab, or English speaking practice.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Syllab have an AI tutor?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Syllab\'s AI Tutor is powered by Google Gemini and can answer any CBSE or NCERT question with step-by-step explanations in seconds.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can parents track their child\'s progress on Syllab?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Syllab has a dedicated Parent Dashboard where parents can monitor XP, streaks, completed topics, exam scores, and weekly activity reports for multiple children.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Syllab work offline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Syllab is a Progressive Web App (PWA) that can be installed on Android and iOS. Certain features like syllabus browsing and previously loaded content work without an internet connection.',
        },
      },
    ],
  },
];

const SUBJECTS = [
  { name: 'Python', emoji: '🐍', count: 31, color: 'bg-blue-50 border-blue-200 text-blue-700', accent: 'bg-blue-500', tab: 'skills' },
  { name: 'JavaScript', emoji: '⚡', count: 11, color: 'bg-yellow-50 border-yellow-200 text-yellow-700', accent: 'bg-yellow-500', tab: 'skills' },
  { name: 'Java', emoji: '☕', count: 15, color: 'bg-orange-50 border-orange-200 text-orange-700', accent: 'bg-orange-500', tab: 'skills' },
  { name: 'SQL', emoji: '🗄️', count: 18, color: 'bg-violet-50 border-violet-200 text-violet-700', accent: 'bg-violet-500', tab: 'skills' },
  { name: 'HTML', emoji: '🌐', count: 13, color: 'bg-rose-50 border-rose-200 text-rose-700', accent: 'bg-rose-500', tab: 'skills' },
  { name: 'CSS', emoji: '🎨', count: 10, color: 'bg-pink-50 border-pink-200 text-pink-700', accent: 'bg-pink-500', tab: 'skills' },
  { name: 'AI Learning', emoji: '🤖', count: 23, color: 'bg-emerald-50 border-emerald-200 text-emerald-700', accent: 'bg-emerald-500', tab: 'skills' },
  { name: 'Data Analytics', emoji: '📊', count: 21, color: 'bg-cyan-50 border-cyan-200 text-cyan-700', accent: 'bg-cyan-500', tab: 'skills' },
];

const FEATURES = [
  {
    icon: Bot,
    title: 'AI Tutor',
    desc: 'Ask anything — get crystal-clear explanations in seconds. Powered by Google Gemini.',
    color: 'from-emerald-400 to-teal-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Code2,
    title: 'Skills Lab',
    desc: 'Hands-on coding practice with live preview, AI feedback, and step-by-step challenges.',
    color: 'from-violet-400 to-purple-600',
    bg: 'bg-violet-50',
  },
  {
    icon: BookOpen,
    title: 'PPT Lessons',
    desc: 'AI-generated visual slide lessons for any topic — perfect for quick revision.',
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
  },
  {
    icon: Target,
    title: 'Practice Arena',
    desc: 'NCERT-based questions for every chapter. Track your progress and beat your streak.',
    color: 'from-rose-400 to-pink-600',
    bg: 'bg-rose-50',
  },
  {
    icon: Brain,
    title: 'Syllabus Mentor',
    desc: 'Your personalized AI study guide — coverage tracker, chapter insights, study plans.',
    color: 'from-sky-400 to-blue-600',
    bg: 'bg-sky-50',
  },
  {
    icon: ScanLine,
    title: 'Scan & Solve',
    desc: 'Stuck on homework? Photograph any problem and get an instant AI explanation.',
    color: 'from-slate-400 to-slate-600',
    bg: 'bg-slate-50',
  },
];

const STATS = [
  { number: '116+', label: 'Topics', icon: BookOpen },
  { number: '8', label: 'Subjects', icon: GraduationCap },
  { number: '3', label: 'Skill Levels', icon: TrendingUp },
  { number: 'Free', label: 'Forever', icon: Star },
];

const LEVELS = [
  {
    tag: '🟢 Basic',
    title: 'Start from zero',
    desc: 'Perfect for Class 5–8 and absolute beginners. Simple concepts, lots of examples.',
    color: 'border-emerald-200 bg-emerald-50',
    textColor: 'text-emerald-700',
    tagBg: 'bg-emerald-100 text-emerald-800',
  },
  {
    tag: '🟡 Intermediate',
    title: 'Level up',
    desc: 'For Class 9–11 students ready to tackle real programming and data concepts.',
    color: 'border-amber-200 bg-amber-50',
    textColor: 'text-amber-700',
    tagBg: 'bg-amber-100 text-amber-800',
  },
  {
    tag: '🔴 Advanced',
    title: 'Go pro',
    desc: 'Class 12 and beyond — algorithms, AI architecture, databases, career-ready skills.',
    color: 'border-rose-200 bg-rose-50',
    textColor: 'text-rose-700',
    tagBg: 'bg-rose-100 text-rose-800',
  },
];

// ─── Animated counter ──────────────────────────────────────────────────────────
function AnimatedStat({ number, label, icon: Icon }: { number: string; label: string; icon: React.ElementType }) {
  const [displayed, setDisplayed] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const target = parseInt(number.replace(/\D/g, '')) || 0;
    const isText = isNaN(parseInt(number));

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        if (isText) { setDisplayed(number); return; }
        let start = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
          start += step;
          if (start >= target) {
            setDisplayed(number);
            clearInterval(interval);
          } else {
            setDisplayed(String(start) + (number.includes('+') ? '+' : ''));
          }
        }, 30);
      }
    }, { threshold: 0.3 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [number]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
        <Icon size={22} className="text-slate-600" />
      </div>
      <div className="text-3xl sm:text-4xl font-black text-slate-900">{displayed || number}</div>
      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</div>
    </div>
  );
}

export default function HomePage({ setTab, currentUser, stats, userClass }: HomePageProps) {
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
              className="bg-white/10 border border-white/20 text-white px-7 py-4 rounded-2xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all hover:bg-white/15 backdrop-blur-sm">
              Browse Syllabus
            </button>
            <button onClick={goToParent}
              className="text-slate-400 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all hover:text-white">
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

      {/* ── STATS BAR ────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 py-12 sm:py-16">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map(s => (
              <AnimatedStat key={s.label} number={s.number} label={s.label} icon={s.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PICK YOUR CLASS ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-widest mb-4">
            <GraduationCap size={13} />
            NCERT & CBSE aligned
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-3">
            Pick your class.
          </h2>
          <p className="text-slate-500 font-medium">
            Personalized content for every grade — Class 1 to 12.
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 sm:gap-3 max-w-5xl mx-auto">
          {CLASSES.map((classNum) => (
            <button key={classNum} onClick={() => handleClassClick(classNum)}
              className="group card-hover p-3 sm:p-5 bg-white border-2 border-slate-100 rounded-2xl text-center hover:border-violet-500 hover:bg-violet-50 active:scale-95 transition-all">
              <div className="text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover:text-violet-500 transition-colors">Cls</div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-violet-700 transition-colors">{classNum}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ── SKILL LEVELS ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-50 to-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-widest mb-4">
              <TrendingUp size={13} />
              Skill progression
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-3">
              Learn at your level.
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              Every subject has three tiers. Start basic, grow to advanced — at your own pace.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {LEVELS.map((level) => (
              <div key={level.tag} className={`card-hover p-6 sm:p-8 border-2 ${level.color} rounded-3xl`}>
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 ${level.tagBg}`}>
                  {level.tag}
                </span>
                <h3 className={`text-xl font-black mb-2 ${level.textColor}`}>{level.title}</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">{level.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBJECTS SHOWCASE ─────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-widest mb-4">
            <Code2 size={13} />
            Skills Lab
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-3">
            8 subjects. Hundreds of topics.
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">
            From scratch to career-ready. Every topic has theory, code examples, live preview, and AI-checked practice.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SUBJECTS.map((sub) => (
            <button key={sub.name} onClick={goToSkills}
              className={`subject-card card-hover p-5 border-2 ${sub.color} rounded-2xl text-left transition-all active:scale-95 overflow-hidden relative group`}>
              <div className="text-2xl mb-2">{sub.emoji}</div>
              <div className="font-black text-slate-900 text-sm mb-1">{sub.name}</div>
              <div className="text-[10px] font-bold text-slate-500 mb-3">{sub.count} topics</div>
              {/* Only show progress bar for signed-in users (it reflects their activity) */}
              {currentUser ? (
                <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className={`h-full ${sub.accent} subject-bar rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(100, (sub.count / 50) * 100)}%` }} />
                </div>
              ) : (
                <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${sub.color}`}>
                  Free
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="text-center mt-8">
          <button onClick={goToSkills}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform hover:bg-slate-800">
            Explore All Topics <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* ── FEATURES GRID ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-black uppercase tracking-widest mb-4">
              <Zap size={13} className="text-amber-400" />
              Everything in one app
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter mb-3">
              Built for how students learn.
            </h2>
            <p className="text-slate-300 font-medium max-w-xl mx-auto">
              Six powerful tools — designed together so you never have to switch apps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className={`card-hover p-6 sm:p-7 ${f.bg} rounded-3xl border border-white/5`}>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  <f.icon size={22} />
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO USE SYLLAB ───────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-black uppercase tracking-widest mb-4">
            <GraduationCap size={13} />
            Quick Start Guide
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-3">
            Everything you need, in one place.
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">
            Here's how to get the most out of Syllab — for students and parents alike.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* For Students */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-lg">🎓</div>
              <h3 className="text-lg font-black text-slate-900">For Students</h3>
            </div>
            <ol className="space-y-4">
              {[
                { step: '1', icon: '📚', title: 'Pick your class & subject', desc: 'Go to Syllabus Explorer → select your class → browse chapters and start learning.' },
                { step: '2', icon: '🖥️', title: 'Watch PPT lessons', desc: 'Click "PPT Lesson" on any chapter to get an AI-generated visual slide show — great for quick revision.' },
                { step: '3', icon: '🎯', title: 'Practice MCQs', desc: 'Use Practice Arena for chapter-wise MCQs. Try Daily Challenges every day to build streaks and earn XP.' },
                { step: '4', icon: '🤖', title: 'Ask the AI Tutor', desc: 'Stuck? Hit the AI Tutor button anywhere, type your doubt, and get a step-by-step explanation instantly.' },
                { step: '5', icon: '🏆', title: 'Take Mock Tests', desc: 'Attempt full-length JEE / NEET / EAMCET / Olympiad mock tests to benchmark your exam readiness.' },
              ].map(({ step, icon, title, desc }) => (
                <li key={step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">{step}</div>
                  <div>
                    <p className="font-black text-slate-900 text-sm">{icon} {title}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <button onClick={goToSyllabus}
              className="mt-6 w-full bg-emerald-500 text-white rounded-2xl py-3 text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
              Start Exploring <ArrowRight size={14} />
            </button>
          </div>

          {/* For Parents */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-violet-500 text-white flex items-center justify-center text-lg">👨‍👩‍👧</div>
              <h3 className="text-lg font-black text-slate-900">For Parents</h3>
            </div>
            <ol className="space-y-4">
              {[
                { step: '1', icon: '📱', title: 'Create a free account', desc: 'Sign up free — your child\'s progress, XP, streaks, and quiz history are all saved securely.' },
                { step: '2', icon: '⚙️', title: 'Set your child\'s class', desc: 'After signing in, go to Profile → set the class. Syllab will personalise content for their grade automatically.' },
                { step: '3', icon: '📊', title: 'Monitor progress', desc: 'Open Parent Hub to see subject-wise performance, daily activity, weak chapters, and comparison with class average.' },
                { step: '4', icon: '📋', title: 'Explore the syllabus', desc: 'Syllabus Explorer shows the complete NCERT curriculum for every class — see what\'s coming next for your child.' },
                { step: '5', icon: '💬', title: 'Share feedback', desc: 'Found something off? Use Contact Support to send us feedback — we read every message and act on it within 48 hours.' },
              ].map(({ step, icon, title, desc }) => (
                <li key={step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-xl bg-violet-500 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">{step}</div>
                  <div>
                    <p className="font-black text-slate-900 text-sm">{icon} {title}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <button onClick={goToParent}
              className="mt-6 w-full bg-violet-500 text-white rounded-2xl py-3 text-xs font-black uppercase tracking-widest hover:bg-violet-600 transition-colors flex items-center justify-center gap-2">
              Open Parent Hub <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── FEEDBACK STRIP ───────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 pb-6">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <p className="font-black text-slate-900 text-sm">Got feedback? We'd love to hear from you.</p>
              <p className="text-xs text-slate-500 font-medium">Your suggestions make Syllab better for every student in India.</p>
            </div>
          </div>
          <button onClick={() => setTab?.('contact')}
            className="shrink-0 bg-amber-500 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition-colors whitespace-nowrap">
            Share Feedback →
          </button>
        </div>
      </section>

      {/* ── FOR PARENTS ──────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-20">
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

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-3">
              Get started in 3 steps.
            </h2>
            <p className="text-slate-500 font-medium">No downloads. No credit card. No waiting.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Pick a subject', desc: 'Choose from Python, AI, SQL, Java, HTML, CSS, JS, or Data Analytics — at any level.', color: 'text-violet-600 bg-violet-50 border-violet-200' },
              { step: '02', title: 'Read & Try', desc: 'Each topic has theory, live code examples, and an interactive editor. See it run instantly.', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
              { step: '03', title: 'Practice & Level up', desc: 'Solve challenges, get AI feedback, view your solution only when you\'re ready. Track your progress.', color: 'text-amber-600 bg-amber-50 border-amber-200' },
            ].map(({ step, title, desc, color }) => (
              <div key={step} className="card-hover bg-white p-6 rounded-3xl border border-slate-100">
                <div className={`text-[11px] font-black uppercase tracking-widest border rounded-xl px-3 py-1.5 inline-block mb-4 ${color}`}>{step}</div>
                <h3 className="font-black text-slate-900 text-base mb-2">{title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
              </div>
            ))}
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
          {FULL_ARTICLES.slice(0, 3).map(article => (
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
      <section className="text-center px-5 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-5">🚀</div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter mb-4">
            Your learning journey starts now.
          </h2>
          <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto leading-relaxed">
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
    a: 'Yes. Core features including Skills Lab (Python, AI, SQL, Java, HTML, CSS, JS), AI Tutor, chapter practice, and daily challenges are completely free. No credit card required. No hidden subscription.',
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
    <section className="max-w-3xl mx-auto px-5 py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }),
        }}
      />

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-widest mb-4">
          Frequently asked
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-3">
          Got questions?
        </h2>
        <p className="text-slate-500 font-medium">Everything you need to know about Syllab.in</p>
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
