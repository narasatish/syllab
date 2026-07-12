/**
 * HomeFeatureGrid — 6 big animated tiles showing what Syllab does.
 * Replaces 3 redundant home-page sections (Skill Levels, Subjects Showcase,
 * Features Grid) with a single clear interactive grid.
 */
import React from 'react';
// NOTE: framer-motion removed here on purpose — this grid sits in the home-page
// critical path, and dropping the lib lets the ~124 kB vendor-motion chunk fall
// off first paint. The entrance / float / hover animations are now pure CSS
// (see .hfg-tile / .hfg-emoji in index.css), which the GPU compositor handles
// without any main-thread JS.

interface Feature {
  id: string;
  emoji: string;
  title: string;
  tagline: string;
  badge: string;
  tab: string;
  gradient: string;
  ringColor: string;
}

const FEATURES: Feature[] = [
  {
    id: 'ai-tutor',
    emoji: '🤖',
    title: 'AI Tutor',
    tagline: 'Ask any doubt. Free. 24/7.',
    badge: 'Always-on',
    tab: 'learning_lab',
    gradient: 'from-violet-500 to-purple-600',
    ringColor: 'ring-violet-300',
  },
  {
    id: 'practice',
    emoji: '🎯',
    title: 'Practice',
    tagline: 'Chapter MCQs with instant explanations.',
    badge: '1000+ MCQs',
    tab: 'arena',
    gradient: 'from-emerald-500 to-teal-600',
    ringColor: 'ring-emerald-300',
  },
  {
    id: 'mock-tests',
    emoji: '🏆',
    title: 'Mock Tests',
    tagline: 'JEE, NEET, EAMCET, WBJEE, MHT-CET & more.',
    badge: '200+ mocks',
    tab: 'mock_tests',
    gradient: 'from-amber-500 to-orange-600',
    ringColor: 'ring-amber-300',
  },
  {
    id: 'coding',
    emoji: '💻',
    title: 'Coding',
    tagline: 'Python, JS, SQL, Java — with live editor.',
    badge: '15 languages',
    tab: 'skills_lab',
    gradient: 'from-blue-500 to-indigo-600',
    ringColor: 'ring-blue-300',
  },
  {
    id: 'english',
    emoji: '🗣️',
    title: 'English',
    tagline: 'AI speaking coach + grammar drills.',
    badge: 'Daily practice',
    tab: 'english_lab',
    gradient: 'from-rose-500 to-pink-600',
    ringColor: 'ring-rose-300',
  },
  {
    id: 'gk',
    emoji: '🧠',
    title: 'GK Quiz',
    tagline: '180+ questions + daily fun facts.',
    badge: '40 fun facts',
    tab: 'general_knowledge',
    gradient: 'from-cyan-500 to-sky-600',
    ringColor: 'ring-cyan-300',
  },
  {
    id: 'visual-learning',
    emoji: '🎬',
    title: 'Visual Learning',
    tagline: 'Watch concepts come alive — step by step.',
    badge: 'New · Animated',
    tab: 'visual_learning',
    gradient: 'from-teal-500 to-cyan-600',
    ringColor: 'ring-teal-300',
  },
  {
    id: 'quiz-duel',
    emoji: '⚔️',
    title: 'Quiz Duel',
    tagline: 'Battle the AI or a friend in a timed quiz.',
    badge: 'New · 1v1',
    tab: 'quiz_duel',
    gradient: 'from-fuchsia-500 to-rose-600',
    ringColor: 'ring-fuchsia-300',
  },
  {
    id: 'what-to-study',
    emoji: '📊',
    title: 'What to Study',
    tagline: 'Focus where the marks are — chapter weightage.',
    badge: 'New · Smart',
    tab: 'what_to_study',
    gradient: 'from-indigo-500 to-blue-600',
    ringColor: 'ring-indigo-300',
  },
  {
    id: 'finance',
    emoji: '💰',
    title: 'Life Skills',
    tagline: 'Money, saving, stocks & markets — Class 5 to 12.',
    badge: 'Beyond school',
    tab: 'syllabus',
    gradient: 'from-amber-500 to-emerald-600',
    ringColor: 'ring-emerald-300',
  },
];

interface Props {
  onNavigate: (tab: string) => void;
}

export default function HomeFeatureGrid({ onNavigate }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-5 py-12 sm:py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-widest mb-4">
          <span>⚡</span> What you can do
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-3">
          Everything you need to ace school + entrance exams.
        </h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">
          Ten free tools designed together — animated lessons, quiz battles, money &amp; markets school doesn't teach. No app-switching. All free.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((f, i) => {
          const tabToPath: Record<string, string> = {
            learning_lab: '/ai-tutor',
            arena: '/practice',
            mock_tests: '/mock-tests',
            skills_lab: '/coding',
            english_lab: '/english',
            general_knowledge: '/gk-quiz',
            visual_learning: '/visual-learning',
            quiz_duel: '/quiz-duel',
            what_to_study: '/what-to-study',
            syllabus: '/syllabus',
          };
          const path = tabToPath[f.tab] || '/';
          return (
          <a
            key={f.id}
            href={path}
            onClick={(e) => { e.preventDefault(); onNavigate(f.tab); }}
            style={{ animationDelay: `${i * 0.08}s` }}
            className={`hfg-tile group relative overflow-hidden rounded-3xl bg-gradient-to-br ${f.gradient} p-6 sm:p-7 text-left text-white shadow-xl hover:ring-4 transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] active:scale-95 ${f.ringColor} cursor-pointer`}
          >
            {/* Decorative floating blobs */}
            <div className="pointer-events-none absolute -top-4 -right-4 w-32 h-32 rounded-full bg-white/10 blur-xl" />
            <div className="pointer-events-none absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10 blur-lg" />

            <div className="relative">
              <div
                className="hfg-emoji text-6xl mb-4 drop-shadow-lg"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {f.emoji}
              </div>

              <h3 className="text-2xl font-black mb-2 drop-shadow">{f.title}</h3>
              <p className="text-sm font-medium text-white/90 mb-4 leading-relaxed">{f.tagline}</p>

              <div className="flex items-center justify-between">
                <span className="inline-block rounded-full bg-white/20 backdrop-blur px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                  {f.badge}
                </span>
                <span className="text-xs font-black uppercase tracking-widest opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all inline-flex items-center gap-1">
                  Try it →
                </span>
              </div>
            </div>
          </a>
          );
        })}
      </div>
    </section>
  );
}
