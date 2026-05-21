import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  ScanLine,
  Trophy,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import SEO from '../components/SEO';
import StructuredData from '../seo/StructuredData';

/**
 * Syllab Homepage
 *
 * Class buttons + "Start Learning Free" + "Open Syllabus" CTAs all use setTab
 * (your internal tab state) to switch to the Syllabus tab. They also write the
 * selected class number to sessionStorage so the Syllabus page can pre-filter.
 *
 * Pass setTab from App.tsx: <HomePage setTab={setTab} />
 */

interface HomePageProps {
  setTab?: (tab: string) => void;
}

const CLASSES = [5, 6, 7, 8, 9, 10, 11, 12];

const FEATURES = [
  {
    icon: Bot,
    title: 'AI Tutor',
    desc: 'Ask anything. Get clear answers in seconds.',
    color: 'from-emerald-400 to-emerald-600',
  },
  {
    icon: ScanLine,
    title: 'Scan & Solve',
    desc: 'Click a photo of any homework problem.',
    color: 'from-rose-400 to-rose-600',
  },
  {
    icon: Trophy,
    title: 'Practice Arena',
    desc: 'Unlimited NCERT-based questions, every chapter.',
    color: 'from-amber-400 to-amber-600',
  },
];

const SUBJECTS = [
  'Maths', 'Science', 'English', 'Hindi',
  'Social Science', 'Physics', 'Chemistry', 'Biology',
];

export default function HomePage({ setTab }: HomePageProps) {
  // Click a class number â†’ store class in sessionStorage and switch to Syllabus tab
  const handleClassClick = (classNum: number) => {
    sessionStorage.setItem('syllab_class_filter', String(classNum));
    if (setTab) {
      setTab('syllabus');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // "Start Learning Free" / "Open Syllabus" â†’ switch to Syllabus tab (no class pre-filter)
  const goToSyllabus = () => {
    sessionStorage.removeItem('syllab_class_filter');
    if (setTab) {
      setTab('syllabus');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToAbout = () => {
    if (setTab) {
      setTab('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO
        title="AI Learning App for Class 5 to 12 CBSE | NCERT, JEE, NEET"
        description="Syllab is India's AI-powered learning platform. NCERT-aligned content for Class 5 to 12 covering Maths, Science, English, Hindi. Plus JEE and NEET prep. Free to start."
        keywords="AI learning India, NCERT solutions, CBSE Class 5 to 12, Class 10 Maths, Class 9 Science, JEE preparation, NEET preparation, online tuition India"
        url="https://syllab.in/"
      />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Syllab',
          url: 'https://syllab.in',
          description: 'Practice JEE, EAMCET, and class-wise mock tests with daily challenges and explanations.',
        }}
      />

      {/* Pure-CSS animations â€” no library needed */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(8deg); }
          50% { transform: translateY(-16px) rotate(-4deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(15deg); }
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .anim-float-slow { animation: float-slow 5s ease-in-out infinite; }
        .anim-float-medium { animation: float-medium 4s ease-in-out infinite; }
        .anim-float-fast { animation: float-fast 3.5s ease-in-out infinite; }
        .anim-fade-up { animation: fade-up 0.7s ease-out both; }
        .anim-delay-1 { animation-delay: 0.1s; }
        .anim-delay-2 { animation-delay: 0.25s; }
        .anim-delay-3 { animation-delay: 0.4s; }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-sky-50 mx-3 sm:mx-4 mt-4 rounded-[2rem] sm:rounded-[3rem]">
        <div
          className="anim-float-slow absolute top-8 left-6 sm:left-12 w-16 h-16 sm:w-24 sm:h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #c084fc, #7c3aed)',
            boxShadow: '0 15px 30px rgba(124, 58, 237, 0.3)',
          }}
        />
        <div
          className="anim-float-medium absolute top-12 right-6 sm:right-16 w-12 h-12 sm:w-20 sm:h-20 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #fde047, #eab308)',
            boxShadow: '0 12px 24px rgba(234, 179, 8, 0.35)',
          }}
        />
        <div
          className="anim-float-fast absolute bottom-12 left-1/4 w-10 h-10 sm:w-16 sm:h-16 rounded-xl hidden sm:block"
          style={{
            background: 'linear-gradient(135deg, #34d399, #059669)',
            boxShadow: '0 12px 24px rgba(5, 150, 105, 0.35)',
          }}
        />
        <div
          className="anim-float-slow absolute bottom-8 right-10 sm:right-24 w-14 h-14 sm:w-20 sm:h-20 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, #fb7185, #e11d48)',
            boxShadow: '0 12px 24px rgba(225, 29, 72, 0.35)',
          }}
        />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-5 py-20 sm:py-28">
          <div className="anim-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-700 text-[11px] font-black uppercase tracking-widest mb-6 shadow-sm">
            <Sparkles size={14} className="text-amber-500" />
            Made for Indian Students
          </div>

          <h1 className="anim-fade-up anim-delay-1 text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tighter mb-5 leading-[1.05]">
            Learning made{' '}
            <span
              className="italic"
              style={{
                background: 'linear-gradient(135deg, #f43f5e, #8b5cf6, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              joyful.
            </span>
          </h1>

          <p className="anim-fade-up anim-delay-2 text-base sm:text-lg text-slate-600 font-medium mb-8 max-w-xl mx-auto leading-relaxed">
            NCERT-aligned learning for Class 5 to 12. Maths, Science, English, and competitive exam prep â€” all in one place.
          </p>

          <div className="anim-fade-up anim-delay-3 flex gap-3 justify-center flex-wrap">
            <button
              onClick={goToSyllabus}
              className="bg-slate-900 text-white px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg active:scale-95 transition-transform"
            >
              Start Learning Free <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={goToAbout}
              className="bg-white border-2 border-slate-200 text-slate-900 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest active:scale-95 transition-transform"
            >
              For Parents
            </button>
          </div>
        </div>
      </section>

      {/* PICK YOUR CLASS */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-20">
        <div className="text-center mb-10 max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-3">
            Pick your class.
          </h2>
          <p className="text-slate-500 font-medium">
            Personalized content for every grade â€” Class 5 to 12.
          </p>
        </div>

        {/* âœ… Each class button switches to the Syllabus tab and pre-filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-3xl mx-auto">
          {CLASSES.map((classNum) => (
            <button
              key={classNum}
              onClick={() => handleClassClick(classNum)}
              className="group p-4 sm:p-6 bg-white border-2 border-slate-100 rounded-2xl text-center hover:border-emerald-500 active:scale-95 transition-all"
            >
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                Class
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                {classNum}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-10 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-3">
              Built for how kids learn.
            </h2>
            <p className="text-slate-500 font-medium">
              Three powerful tools â€” aligned with NCERT and competitive exam patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-100"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-5 shadow-lg`}>
                  <feature.icon size={26} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
              Subjects we cover
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {SUBJECTS.map((s) => (
                <span
                  key={s}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY PARENTS */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-20">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-14 text-white">
          <div className="grid sm:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-3">
                For Parents
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 leading-tight">
                Affordable. Trusted. NCERT-aligned.
              </h2>
              <p className="text-slate-300 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                Skip expensive coaching. Syllab gives your child personalized AI learning aligned to the exact textbook they study from.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                'NCERT and CBSE curriculum aligned',
                'Olympiad and NTSE pattern questions',
                'Free forever for core features',
                'Track your child\u2019s weekly progress',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-emerald-300 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-sm sm:text-base text-slate-200 font-medium">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FaqSection />

      {/* FINAL CTA */}
      <section className="text-center px-5 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter mb-4">
          Ready to start?
        </h2>
        <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto">
          Free forever for the basics. No card. No spam.
        </p>
        <button
          onClick={goToSyllabus}
          className="bg-emerald-500 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest inline-flex items-center gap-2 shadow-xl active:scale-95 transition-transform"
        >
          Open Syllabus <ArrowRight size={16} />
        </button>
      </section>
    </>
  );
}

// ─── FAQ Section ────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: 'What is Syllab.in?',
    a: 'Syllab.in is a free AI-powered learning platform for Indian students from Class 5 to 12. It provides NCERT-aligned chapter summaries, chapter-wise MCQ practice, daily challenges, mock tests, an AI tutor, and a learning lab — all in one place.',
  },
  {
    q: 'Is Syllab.in completely free?',
    a: 'Yes. Core features including chapter practice, daily challenges, AI tutor, and mock tests are completely free. No credit card required. No hidden subscription.',
  },
  {
    q: 'Which classes does Syllab cover?',
    a: 'Syllab covers Class 5 through Class 12, including CBSE NCERT curriculum for all major subjects: Mathematics, Science, Social Science, Physics, Chemistry, Biology, and English.',
  },
  {
    q: 'Does Syllab help with JEE and NEET preparation?',
    a: 'Yes. Syllab has dedicated JEE and NEET preparation sections with chapter-wise practice, mock tests, and daily challenges covering Physics, Chemistry, Mathematics, and Biology at the Class 11-12 level.',
  },
  {
    q: 'How is Syllab different from other learning apps?',
    a: 'Syllab is AI-first — not just video lectures. It gives personalized practice, identifies your weak chapters, tracks your XP and streak, and lets you ask an AI tutor any question in real time. Plus it\'s free for core features.',
  },
  {
    q: 'Can I use Syllab for CBSE board exam preparation?',
    a: 'Absolutely. All content on Syllab is NCERT-aligned and CBSE-mapped. The Mock Tests section has full-length board-pattern exams for Class 10 and Class 12 students.',
  },
  {
    q: 'What subjects are covered on Syllab?',
    a: 'Mathematics, Science (Physics, Chemistry, Biology), Social Science (History, Geography, Civics, Economics), English, and competitive exam subjects for JEE and NEET preparation.',
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
      {/* FAQ JSON-LD for Google Featured Snippets */}
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
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-500 font-medium">Everything you need to know about Syllab.in</p>
      </div>

      <div className="space-y-3">
        {FAQS.map(({ q, a }, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full text-left p-5 flex items-center justify-between gap-4"
              >
                <span className="font-black text-slate-900 text-sm sm:text-base">{q}</span>
                {isOpen ? (
                  <ChevronUp size={18} className="text-slate-400 flex-shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-slate-400 flex-shrink-0" />
                )}
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
