/**
 * ToolsHub.tsx — the /tools landing page: a single grid showcasing every free
 * student tool. Strong SEO hub ("free student tools") + a friendlier way to
 * discover the tools than the Explore dropdown. Cards are real crawlable links
 * that navigate within the SPA.
 */
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';

const SITE = 'https://syllab.in';

interface Tool { path: string; emoji: string; title: string; desc: string }
const TOOLS: Tool[] = [
  { path: '/calculators', emoji: '🧮', title: 'Student Calculators', desc: 'Percentage, CGPA↔%, attendance "can I bunk?", SGPA, CBSE grade, CUET score & education-loan EMI — 10 in one.' },
  { path: '/unit-converter', emoji: '📐', title: 'Unit Converter', desc: 'Length, mass, temperature, speed, energy, pressure, volume, area, time & digital storage.' },
  { path: '/periodic-table', emoji: '⚛️', title: 'Periodic Table', desc: 'All 118 elements — tap any for atomic mass, group, period, state & electron configuration.' },
  { path: '/pomodoro', emoji: '⏳', title: 'Pomodoro Timer', desc: 'Study in focused 25-minute sprints with breaks, a session counter and a gentle chime.' },
  { path: '/marks-tracker', emoji: '📊', title: 'Marks Tracker', desc: 'Overall percentage, CBSE grade, strongest & weakest subject, and marks needed to hit a target.' },
  { path: '/study-planner', emoji: '🗓️', title: 'Study Planner', desc: 'A day-by-day revision timetable from your exam date, subjects and hours — save or print it.' },
  { path: '/flashcards', emoji: '🃏', title: 'Flashcards', desc: 'Make your own decks and revise with spaced repetition (SM-2) — the smart way to memorise.' },
  { path: '/answer-evaluator', emoji: '✍️', title: 'AI Answer Evaluator', desc: 'Paste a question & your answer for an examiner-style score, gaps and full-marks points.' },
  { path: '/cutoffs', emoji: '🎯', title: 'College Cutoffs', desc: 'Browse indicative closing cutoffs for top engineering colleges, filtered by exam.' },
  { path: '/career-predictor', emoji: '🔮', title: 'Career & College Predictor', desc: 'JEE/NEET rank & college predictor with category support, plus a career interest quiz.' },
];

export default function ToolsHub({ navigate }: { navigate?: (path: string) => void }) {
  const go = (path: string) => {
    if (navigate) { navigate(path); return; }
    if (typeof window === 'undefined') return;
    if (window.location.pathname !== path) window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title="Free Student Tools — Calculators, Timers, Flashcards & More | Syllab.in"
        description="10 free tools for students in one place: percentage & CGPA calculators, unit converter, interactive periodic table, Pomodoro timer, marks tracker, study planner, spaced-repetition flashcards, AI answer evaluator and college predictors. No signup."
        keywords="free student tools, study tools online, student calculators, pomodoro timer, flashcards, study planner, periodic table, unit converter, marks tracker, college predictor, tools for CBSE JEE NEET students"
        url={`${SITE}/tools`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Free Student Tools', url: `${SITE}/tools`, inLanguage: 'en-IN', isAccessibleForFree: true }}
      />
      <PageHero emoji="🧰" title="Free Student Tools" subtitle="Every Syllab study tool in one place — calculators, timers, flashcards, converters and predictors. 100% free, no signup." className="mb-8" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <a key={t.path} href={t.path} onClick={(e) => { e.preventDefault(); go(t.path); }}
            className="group rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm hover:shadow-md hover:border-primary/40 transition">
            <div className="text-3xl">{t.emoji}</div>
            <h2 className="mt-2 text-base font-black text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">{t.title}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.desc}</p>
            <span className="mt-3 inline-block text-xs font-black text-primary">Open →</span>
          </a>
        ))}
      </div>

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">Free tools for every Indian student</h2>
        <p>Syllab's free student tools cover the whole study workflow — crunch your marks and percentage, convert units for physics and chemistry, explore the periodic table, focus with a Pomodoro timer, build a revision timetable, memorise with spaced-repetition flashcards, and plan your college and career. Everything runs in your browser, works on mobile, is saved on your device where it matters, and needs no sign-up.</p>
        <p>Built for CBSE, NCERT, state boards, JEE and NEET students. Prefer guided learning? Explore free <a href="/syllabus" className="font-bold text-primary hover:underline">chapter lessons</a>, <a href="/mock-tests" className="font-bold text-primary hover:underline">mock tests</a> and <a href="/coding" className="font-bold text-primary hover:underline">coding courses</a> too.</p>
      </section>
    </div>
  );
}
