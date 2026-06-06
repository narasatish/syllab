// "Free alternative to X" landing pages — high-intent SEO for people searching
// competitor brands looking to switch to something free.
//
// TONE RULES (legal + trust): factual, nominative comparison only. We state
// that these are popular *paid* platforms (verifiable) and position Syllab's
// *free* features as the alternative. We never make false/disparaging claims
// about a competitor's features — the comparison contrasts "free forever" vs
// "subscription for full access", which is accurate and defensible.

export interface AltFaq { q: string; a: string; }

export interface Alternative {
  slug: string;          // route: /{slug}
  brand: string;         // display name
  emoji: string;
  gradient: string;      // PageHero gradient
  knownFor: string;      // what the brand is popularly known for (neutral)
  // honest, conservative pricing note for the comparison row
  pricingNote: string;
  // the Syllab feature that most directly replaces what they're known for
  heroFeature: { name: string; path: string; blurb: string };
  // extra Syllab free features to highlight
  alsoFree: string[];
  faqs: AltFaq[];
}

export const ALTERNATIVES: Alternative[] = [
  {
    slug: 'kahoot-alternative',
    brand: 'Kahoot!',
    emoji: '🎮',
    gradient: 'from-violet-500 via-purple-600 to-fuchsia-700',
    knownFor: 'live, game-based multiplayer quizzes for classrooms',
    pricingNote: 'Free basic plan; advanced features need a paid plan',
    heroFeature: {
      name: 'Syllab Live Quiz',
      path: '/live-quiz',
      blurb: 'Host a live multiplayer quiz, share a 6-digit PIN, and watch a real-time leaderboard — completely free, unlimited players, no app to install.',
    },
    alsoFree: ['Curated GK, Science, Maths & English quiz packs', 'Works on any phone browser', 'No per-player or per-game limits'],
    faqs: [
      { q: 'Is there a free alternative to Kahoot for Indian schools?', a: 'Yes. Syllab Live Quiz is a free, Kahoot-style multiplayer quiz built for Indian students — host a game, students join with a PIN, and a live leaderboard ranks everyone. No account needed to join and no limit on players.' },
      { q: 'Is Syllab Live Quiz really free?', a: 'Yes, it is 100% free with no player limits and no paid tiers — Syllab is free for all Indian students.' },
      { q: 'Do students need to download an app?', a: 'No. Students just open syllab.in/live-quiz in any browser and enter the PIN — nothing to install.' },
    ],
  },
  {
    slug: 'byjus-alternative',
    brand: "BYJU'S",
    emoji: '📚',
    gradient: 'from-blue-500 via-indigo-600 to-violet-700',
    knownFor: 'app-based video lessons and full CBSE/ICSE courses',
    pricingNote: 'Paid subscription for full course access',
    heroFeature: {
      name: 'Syllab AI Tutor + NCERT Solutions',
      path: '/ai-tutor',
      blurb: 'Ask any doubt and get a clear, step-by-step explanation 24/7 from the free AI tutor — plus chapter-wise NCERT solutions for every class.',
    },
    alsoFree: ['Free NCERT solutions (Class 6–12)', 'Free mock tests & practice for CBSE & boards', 'Interactive lessons and diagrams'],
    faqs: [
      { q: "Is there a free alternative to BYJU'S?", a: "Yes. Syllab gives Indian students free NCERT solutions, an AI tutor for 24/7 doubt-solving, mock tests and interactive lessons for Class 1–12 — without a paid subscription." },
      { q: 'Does Syllab follow the CBSE / NCERT syllabus?', a: 'Yes, Syllab is built around the NCERT/CBSE syllabus (and major state boards) for Class 1 to 12.' },
      { q: 'How can Syllab be free?', a: 'Syllab is a free learning platform for Indian students — core learning, solutions, practice and tutoring are free to use.' },
    ],
  },
  {
    slug: 'unacademy-alternative',
    brand: 'Unacademy',
    emoji: '🎯',
    gradient: 'from-emerald-500 via-green-600 to-teal-700',
    knownFor: 'exam-prep courses and test series for competitive exams',
    pricingNote: 'Paid subscription / plus plans for full access',
    heroFeature: {
      name: 'Syllab Mock Tests',
      path: '/mock-tests',
      blurb: 'Free mock tests and chapter practice for boards and entrance exams — attempt unlimited tests and review your answers, at no cost.',
    },
    alsoFree: ['Free practice question banks', 'AI tutor for instant doubt-solving', 'Daily challenges to build a streak'],
    faqs: [
      { q: 'Is there a free alternative to Unacademy?', a: 'Yes. Syllab offers free mock tests, practice question banks and an AI tutor for Indian students preparing for boards and entrance exams — without a paid subscription.' },
      { q: 'Are the mock tests free on Syllab?', a: 'Yes, mock tests and practice on Syllab are free and unlimited.' },
      { q: 'Which exams does Syllab help with?', a: 'Syllab covers CBSE & state-board exams for Class 1–12 and entrance-exam practice, all aligned to the Indian syllabus.' },
    ],
  },
  {
    slug: 'vedantu-alternative',
    brand: 'Vedantu',
    emoji: '🧑‍🏫',
    gradient: 'from-rose-500 via-pink-600 to-fuchsia-700',
    knownFor: 'live online tutoring and doubt-solving classes',
    pricingNote: 'Paid plans for live classes / full access',
    heroFeature: {
      name: 'Syllab AI Tutor',
      path: '/ai-tutor',
      blurb: 'Get instant, patient explanations for any topic 24/7 from the free AI tutor — ask follow-up questions until it clicks, no scheduling or fees.',
    },
    alsoFree: ['Free NCERT solutions & notes', 'Free mock tests and practice', 'Available any time — no booking'],
    faqs: [
      { q: 'Is there a free alternative to Vedantu?', a: 'Yes. Syllab’s AI tutor gives Indian students free, instant doubt-solving 24/7, plus free NCERT solutions, notes and mock tests — no paid live-class subscription needed.' },
      { q: 'Can I ask doubts any time?', a: 'Yes — the Syllab AI tutor is available 24/7, so you can ask doubts whenever you study, with no booking.' },
      { q: 'Is Syllab aligned to my board?', a: 'Yes, Syllab follows the NCERT/CBSE syllabus and major state boards for Class 1–12.' },
    ],
  },
  {
    slug: 'toppr-alternative',
    brand: 'Toppr',
    emoji: '✏️',
    gradient: 'from-amber-500 via-orange-600 to-rose-600',
    knownFor: 'adaptive practice and doubt-solving for school students',
    pricingNote: 'Paid subscription for full access',
    heroFeature: {
      name: 'Syllab Practice',
      path: '/practice',
      blurb: 'Sharpen every chapter with free practice question banks and instant step-by-step solutions — practice as much as you want, free.',
    },
    alsoFree: ['Free AI tutor for doubts', 'Free NCERT solutions (Class 6–12)', 'Free mock tests & daily challenges'],
    faqs: [
      { q: 'Is there a free alternative to Toppr?', a: 'Yes. Syllab offers free chapter-wise practice, NCERT solutions and an AI tutor for Indian students from Class 1 to 12 — without a paid plan.' },
      { q: 'Is the practice unlimited and free?', a: 'Yes, practice on Syllab is free and unlimited, with step-by-step solutions.' },
      { q: 'Does Syllab cover my class and subjects?', a: 'Syllab covers Class 1–12 across major subjects, aligned to the NCERT/CBSE and state-board syllabus.' },
    ],
  },
];

export function getAlternative(slug: string): Alternative | undefined {
  return ALTERNATIVES.find((a) => a.slug === slug);
}
