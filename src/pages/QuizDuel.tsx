/**
 * QuizDuel — a fast, attractive 1-tap quiz battle.
 *  • vs AI (Chill / Pro bot) or Challenge a Friend (shareable link, same questions).
 *  • 8 timed questions, score = correct (10) + speed bonus (seconds left).
 *  • Result screen with win/lose, personal best (localStorage) and a WhatsApp
 *    share/challenge card. 100% client-side — reuses the GK question bank, no API.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Swords, Bot, Users, Clock, Trophy, Share2, RotateCcw, Crown } from 'lucide-react';
import type { User as FirebaseUser } from 'firebase/auth';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { GK_QUESTIONS, type GKItem } from '../data/generalKnowledge';
import { recordLearningActivity } from '../lib/progressTracker';

const SITE = 'https://syllab.in';
const N_Q = 8;
const PER_Q = 15; // seconds
const BEST_KEY = 'syllab_duel_best_v1';

type Mode = 'menu' | 'playing' | 'result';
type Opp = 'chill' | 'pro' | 'friend';

/** Seeded RNG (mulberry32) so a shared challenge link gives identical questions. */
function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'science', label: 'Science' },
  { id: 'history', label: 'History' },
  { id: 'geography', label: 'Geography' },
  { id: 'polity', label: 'Polity' },
  { id: 'static', label: 'Static GK' },
  { id: 'current-affairs', label: 'Current Affairs' },
];
function seededPick(seed: number, n: number, category: string): GKItem[] {
  const r = rng(seed);
  const base = category === 'all' ? GK_QUESTIONS : GK_QUESTIONS.filter((q) => q.category === category);
  const pool = (base.length >= n ? base : [...GK_QUESTIONS]).slice();
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  return pool.slice(0, Math.min(n, pool.length));
}

export default function QuizDuel({ currentUser }: { currentUser?: FirebaseUser | null }) {
  const [mode, setMode] = useState<Mode>('menu');
  const [opp, setOpp] = useState<Opp>('chill');
  const [seed, setSeed] = useState(1);
  const [category, setCategory] = useState('all');
  const [challengeScore, setChallengeScore] = useState<number | null>(null);

  const [qs, setQs] = useState<GKItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [left, setLeft] = useState(PER_Q);
  const [best, setBest] = useState(0);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  // Read a friend's challenge (?c=seed-score) and personal best on mount.
  useEffect(() => {
    try {
      setBest(Number(localStorage.getItem(BEST_KEY) || 0) || 0);
      const c = new URLSearchParams(window.location.search).get('c');
      if (c) {
        const [sRaw, scRaw, catRaw] = c.split('-');
        const s = Number(sRaw); const sc = Number(scRaw);
        if (Number.isFinite(s)) { setSeed(s); setOpp('friend'); setChallengeScore(Number.isFinite(sc) ? sc : null); if (catRaw && CATEGORIES.some((x) => x.id === catRaw)) setCategory(catRaw); }
      }
    } catch { /* ignore */ }
  }, []);

  const start = useCallback((o: Opp) => {
    const useSeed = o === 'friend' && challengeScore !== null ? seed : Math.floor(Math.random() * 1e9);
    setOpp(o); setSeed(useSeed); setQs(seededPick(useSeed, N_Q, category));
    setIdx(0); setScore(0); setAiScore(0); setPicked(null); setLeft(PER_Q); setMode('playing');
  }, [seed, challengeScore, category]);

  const answer = useCallback((choice: number | null) => {
    if (picked !== null) return;
    setPicked(choice ?? -1);
    const q = qs[idx];
    if (q && choice === q.correctIndex) setScore((s) => s + 10 + Math.max(0, left));
    // AI answers this question too (Chill ~55%, Pro ~85% accuracy + its own speed bonus).
    if (opp !== 'friend') {
      const acc = opp === 'pro' ? 0.85 : 0.55;
      const aiRight = rng(seed + idx * 97 + 13)() < acc;
      const aiSpeed = Math.floor(rng(seed + idx * 31 + 7)() * PER_Q);
      if (aiRight) setAiScore((s) => s + 10 + aiSpeed);
    }
    setTimeout(() => {
      if (idx + 1 >= qs.length) { finish(); }
      else { setIdx((i) => i + 1); setPicked(null); setLeft(PER_Q); }
    }, 1100);
  }, [picked, qs, idx, left, opp, seed]);

  const finish = useCallback(() => {
    if (tick.current) clearInterval(tick.current);
    setMode('result');
    setScore((finalScore) => {
      try { if (finalScore > (Number(localStorage.getItem(BEST_KEY) || 0) || 0)) { localStorage.setItem(BEST_KEY, String(finalScore)); setBest(finalScore); } } catch { /* ignore */ }
      return finalScore;
    });
    // Award progress (streak + 'practice' counter + badges locally; XP in Firestore
    // when signed in). Flat XP per completed duel so it can't be farmed.
    recordLearningActivity({ uid: currentUser?.uid || '', type: 'practice_session', title: 'Quiz Duel', xpGained: 15 });
  }, [currentUser]);

  // Countdown for the current question.
  useEffect(() => {
    if (mode !== 'playing' || picked !== null) return;
    tick.current = setInterval(() => setLeft((l) => { if (l <= 1) { clearInterval(tick.current!); answer(null); return 0; } return l - 1; }), 1000);
    return () => { if (tick.current) clearInterval(tick.current); };
  }, [mode, idx, picked, answer]);

  const shareUrl = useMemo(() => `${SITE}/quiz-duel?c=${seed}-${score}-${category}`, [seed, score, category]);
  const shareText = useMemo(() => `I scored ${score} in the Syllab Quiz Duel! 🎯 Can you beat me? ${shareUrl}`, [score, shareUrl]);
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  /* ---------- MENU ---------- */
  if (mode === 'menu') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <SEO title="Quiz Duel — Free 1v1 GK Quiz Battle for Students | Syllab.in" description="Battle the AI or challenge a friend in a fast, timed GK quiz duel. 8 questions, beat the clock, share your score on WhatsApp. Free for Indian students." keywords="quiz battle, gk quiz duel, 1v1 quiz, online quiz game students, challenge friend quiz, free quiz india" url={`${SITE}/quiz-duel`} jsonLd={[{ '@context': 'https://schema.org', '@type': 'Game', name: 'Syllab Quiz Duel', url: `${SITE}/quiz-duel`, isAccessibleForFree: true }]} />
        <PageHero emoji="⚔️" title="Quiz Duel" subtitle="8 questions. 15 seconds each. Be fast AND right to win!" className="mb-6" />
        {challengeScore !== null && (
          <div className="mb-5 rounded-2xl bg-amber-50 p-4 text-center font-bold text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
            🔥 A friend challenged you — they scored <span className="font-black">{challengeScore}</span>. Same questions. Beat them!
          </div>
        )}
        {best > 0 && <p className="mb-4 text-center text-sm font-black text-slate-500">🏆 Your best: {best}</p>}
        <div className="mb-5">
          <p className="mb-2 text-center text-[11px] font-black uppercase tracking-widest text-slate-400">Pick a topic</p>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => setCategory(c.id)} className={`rounded-full px-3.5 py-1.5 text-xs font-black transition-colors ${category === c.id ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200'}`}>{c.label}</button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <button onClick={() => start('chill')} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <Bot size={30} className="mx-auto text-emerald-500" /><p className="mt-2 font-black text-slate-900 dark:text-slate-100">vs Chill Bot</p><p className="text-xs text-slate-500">Beginner-friendly</p>
          </button>
          <button onClick={() => start('pro')} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <Swords size={30} className="mx-auto text-rose-500" /><p className="mt-2 font-black text-slate-900 dark:text-slate-100">vs Pro Bot</p><p className="text-xs text-slate-500">Tough — be quick!</p>
          </button>
          <button onClick={() => start('friend')} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <Users size={30} className="mx-auto text-violet-500" /><p className="mt-2 font-black text-slate-900 dark:text-slate-100">Challenge a Friend</p><p className="text-xs text-slate-500">Share & compare</p>
          </button>
        </div>
      </div>
    );
  }

  /* ---------- RESULT ---------- */
  if (mode === 'result') {
    const won = opp === 'friend' ? (challengeScore === null ? null : score > challengeScore) : score > aiScore;
    const oppName = opp === 'friend' ? 'your friend' : opp === 'pro' ? 'Pro Bot' : 'Chill Bot';
    return (
      <div className="mx-auto max-w-xl px-4 py-8 text-center">
        <SEO title="Quiz Duel Result | Syllab.in" description="Your Syllab Quiz Duel result." url={`${SITE}/quiz-duel`} />
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          {won === true && <Crown size={48} className="mx-auto text-amber-500" />}
          {won === false && <Trophy size={48} className="mx-auto text-slate-400" />}
          {won === null && <Trophy size={48} className="mx-auto text-primary" />}
          <h1 className="mt-3 text-3xl font-black text-slate-900 dark:text-slate-100">{won === true ? 'You Win! 🎉' : won === false ? 'So close!' : 'Challenge sent!'}</h1>
          <p className="mt-2 text-5xl font-black text-primary">{score}</p>
          <p className="text-sm font-bold text-slate-500">your score{score === best && score > 0 ? ' · new best! 🏆' : ''}</p>
          {opp !== 'friend' && <p className="mt-3 font-bold text-slate-600 dark:text-slate-300">{oppName}: {aiScore}</p>}
          {opp === 'friend' && challengeScore !== null && <p className="mt-3 font-bold text-slate-600 dark:text-slate-300">{oppName}: {challengeScore}</p>}

          <div className="mt-6 flex flex-col items-center gap-3">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-black text-white hover:opacity-90"><Share2 size={16} /> {opp === 'friend' ? 'Challenge more friends' : 'Share & challenge a friend'}</a>
            <button onClick={() => setMode('menu')} className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-black text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200"><RotateCcw size={15} /> Play again</button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- PLAYING ---------- */
  const q = qs[idx];
  if (!q) return null;
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-black text-white dark:bg-slate-100 dark:text-slate-900">Q {idx + 1}/{qs.length}</span>
        <span className="font-black text-primary">You: {score}{opp !== 'friend' ? `  ·  ${opp === 'pro' ? 'Pro' : 'Chill'}: ${aiScore}` : ''}</span>
        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black ${left <= 5 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}><Clock size={13} /> {left}s</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
        <div className="h-full bg-primary transition-all" style={{ width: `${(left / PER_Q) * 100}%` }} />
      </div>
      <h2 className="mb-5 mt-5 text-lg font-black leading-relaxed text-slate-900 dark:text-slate-100">{q.question}</h2>
      <div className="grid gap-3">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correctIndex;
          const show = picked !== null;
          return (
            <button key={i} disabled={picked !== null} onClick={() => answer(i)}
              className={`rounded-2xl border-2 px-4 py-3 text-left font-bold transition-all ${
                show && isCorrect ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40'
                : show && picked === i ? 'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/40'
                : 'border-slate-200 bg-white text-slate-700 hover:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
