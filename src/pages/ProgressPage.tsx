import React, { useEffect, useRef, useState } from 'react';
import { Activity, ArrowRight, ClipboardList, Flame, Gift, PlayCircle, Trophy, Zap } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { getPracticeAttempts, type PracticeAttempt } from '../lib/practiceAnalytics';
import SEO from '../components/SEO';
import { UserStats } from '../types';
import { cn } from '../lib/utils';
import { AVATAR_REWARDS, isAvatarUnlocked } from '../data/avatarRewards';
import { getExtendedProfile, saveExtendedProfile } from '../lib/userProfile';
import { FIRESTORE_FEATURES_ENABLED } from '../lib/cloudFeatures';
import { db } from '../lib/firebase';

/** XP awarded per completed exam based on score percentage */
function examXp(score: number, total: number): number {
  if (total === 0) return 0;
  const pct = (score / total) * 100;
  if (pct >= 90) return 120;
  if (pct >= 75) return 80;
  if (pct >= 60) return 50;
  if (pct >= 40) return 30;
  return 15;
}

interface ExamResult {
  id: string;
  title: string;
  score: number;
  total: number;
  percentage: number;
  classLevel?: string;
  subjects?: string[];
  level?: string;
  examCode?: string | null;
  type?: string;
  completedAt?: { toDate?: () => Date } | null;
}

interface DailyChallengeEntry {
  id: string;
  displayName?: string;
  totalXP?: number;
  score?: number;
  total?: number;
  completedAt?: { toDate?: () => Date } | null;
}

interface UserActivity {
  id: string;
  type: 'skill' | 'english' | 'olympiad' | 'live_exam';
  title: string;
  subject?: string;
  level?: string;
  completedAt?: { toDate?: () => Date } | null;
}

const AnalyticsPage = React.lazy(() => import('./Analytics'));

/* ─── Skills progress ─────────────────────────────────────────────────────── */
const LS_SKILLS = 'syllab_skills_completed';
function useSkillsProgress() {
  const [completed, setCompleted] = useState<Record<string, string[]>>(() => {
    try { return JSON.parse(localStorage.getItem(LS_SKILLS) || '{}'); } catch { return {}; }
  });
  useEffect(() => {
    const h = () => {
      try { setCompleted(JSON.parse(localStorage.getItem(LS_SKILLS) || '{}')); } catch { /* ignore */ }
    };
    window.addEventListener('syllab:skills-updated', h);
    return () => window.removeEventListener('syllab:skills-updated', h);
  }, []);
  const total = Object.values(completed).reduce((s, ids) => s + ids.length, 0);
  return { completed, total };
}

/* ─── Spin Wheel ─────────────────────────────────────────────────────────── */
const SPIN_REWARDS = [
  { label: '+25 XP',  xp: 25,  pts: 0,  color: '#6ee7b7', bg: 'bg-emerald-100 text-emerald-700' },
  { label: '+50 Pts', xp: 0,   pts: 50, color: '#a78bfa', bg: 'bg-violet-100 text-violet-700' },
  { label: '+100 XP', xp: 100, pts: 0,  color: '#fbbf24', bg: 'bg-amber-100 text-amber-700' },
  { label: '+10 Pts', xp: 0,   pts: 10, color: '#60a5fa', bg: 'bg-blue-100 text-blue-700' },
  { label: '+200 XP', xp: 200, pts: 0,  color: '#f87171', bg: 'bg-rose-100 text-rose-700' },
  { label: '+75 Pts', xp: 0,   pts: 75, color: '#34d399', bg: 'bg-teal-100 text-teal-700' },
  { label: '+50 XP',  xp: 50,  pts: 0,  color: '#fb923c', bg: 'bg-orange-100 text-orange-700' },
  { label: '+25 Pts', xp: 0,   pts: 25, color: '#e879f9', bg: 'bg-pink-100 text-pink-700' },
];
const SPIN_LS = 'syllab_last_spin';
const SEG = SPIN_REWARDS.length;
const SEG_DEG = 360 / SEG;

function SpinWheel() {
  const [totalRot, setTotalRot] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<(typeof SPIN_REWARDS)[0] | null>(null);
  const [spunToday, setSpunToday] = useState(() => localStorage.getItem(SPIN_LS) === new Date().toDateString());
  const rotRef = useRef(0);
  const spin = () => {
    if (spinning || spunToday) return;
    setSpinning(true); setResult(null);
    const win = Math.floor(Math.random() * SEG);
    const within = 5 + Math.random() * (SEG_DEG - 10);
    const next = rotRef.current + 1440 + win * SEG_DEG + within;
    rotRef.current = next; setTotalRot(next);
    setTimeout(() => {
      setResult(SPIN_REWARDS[win]); setSpinning(false); setSpunToday(true);
      localStorage.setItem(SPIN_LS, new Date().toDateString());
    }, 3600);
  };
  const stops = SPIN_REWARDS.map((r, i) => `${r.color} ${i * SEG_DEG}deg ${(i + 1) * SEG_DEG}deg`).join(', ');
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="absolute left-1/2 top-[-14px] z-10 -translate-x-1/2 text-2xl">▼</div>
        <div style={{ width: 180, height: 180, borderRadius: '50%', background: `conic-gradient(${stops})`, transform: `rotate(${totalRot}deg)`, transition: spinning ? 'transform 3.6s cubic-bezier(0.15,0.65,0.1,1)' : 'none', boxShadow: '0 8px 40px rgba(0,0,0,0.15)', border: '4px solid white' }} />
        <div className="absolute inset-0 flex items-center justify-center"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow-xl">🎯</div></div>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {SPIN_REWARDS.map((r, i) => <div key={i} className={cn('rounded-xl px-2 py-1 text-center text-[10px] font-black', r.bg)}>{r.label}</div>)}
      </div>
      {result && <div className="w-full rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-center"><div className="text-2xl mb-1">🎉</div><div className="text-lg font-black text-emerald-700">{result.label}</div><div className="text-xs font-bold text-emerald-600">Come back tomorrow!</div></div>}
      <button type="button" onClick={spin} disabled={spinning || spunToday} className={cn('w-full rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-all', spunToday ? 'cursor-not-allowed bg-slate-300' : 'bg-primary hover:bg-emerald-600')}>
        {spunToday ? '✅ Come Back Tomorrow!' : spinning ? '⏳ Spinning…' : '🎡 Spin — Daily Reward'}
      </button>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
interface ProgressPageProps {
  currentUser: FirebaseUser | null;
  stats: UserStats;
  setTab: (tab: string) => void;
}

interface PausedSession {
  mockId?: string;
  title?: string;
  currentIndex?: number;
  questions?: unknown[];
  active?: boolean;
}

export default function ProgressPage({ currentUser, stats, setTab }: ProgressPageProps) {
  const { total: totalSkills } = useSkillsProgress();
  const [selectedAvatarId, setSelectedAvatarId] = useState('starter');
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [examsLoading, setExamsLoading] = useState(false);
  const [pausedSession, setPausedSession] = useState<PausedSession | null>(null);
  const [practiceAttempts, setPracticeAttempts] = useState<PracticeAttempt[]>([]);
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallengeEntry[]>([]);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    if (!currentUser || !FIRESTORE_FEATURES_ENABLED) return;
    getExtendedProfile(currentUser.uid).then(p => setSelectedAvatarId(p.selectedAvatarId));
  }, [currentUser?.uid]);

  useEffect(() => {
    if (!currentUser || !FIRESTORE_FEATURES_ENABLED) return;
    setExamsLoading(true);

    // Load practice attempts from localStorage
    setPracticeAttempts(getPracticeAttempts(currentUser.uid));

    // Load completed exams, paused mock test, daily challenges, and user activities in parallel
    Promise.all([
      getDocs(query(collection(db, 'examResults'), where('userId', '==', currentUser.uid))),
      getDoc(doc(db, 'quizSessions', currentUser.uid)),
      getDocs(query(collection(db, 'dailyChallengeLeaderboard'), where('userId', '==', currentUser.uid))),
      getDocs(query(collection(db, 'userActivities'), where('userId', '==', currentUser.uid))),
    ])
      .then(([snap, sessionSnap, dcSnap, activitiesSnap]) => {
        const results = snap.docs
          .map((d) => ({ id: d.id, ...(d.data() as any) } as ExamResult))
          .sort((a, b) => {
            const ta = a.completedAt?.toDate?.()?.getTime() ?? 0;
            const tb = b.completedAt?.toDate?.()?.getTime() ?? 0;
            return tb - ta;
          });
        setExamResults(results);
        if (sessionSnap.exists()) {
          const s = sessionSnap.data() as PausedSession;
          if (s.active !== false && Array.isArray(s.questions) && s.questions.length > 0) {
            setPausedSession(s);
          }
        }
        const dcResults: DailyChallengeEntry[] = dcSnap.docs
          .map((d) => ({ id: d.id, ...(d.data() as any) } as DailyChallengeEntry))
          .sort((a, b) => {
            const ta = a.completedAt?.toDate?.()?.getTime() ?? 0;
            const tb = b.completedAt?.toDate?.()?.getTime() ?? 0;
            return tb - ta;
          });
        setDailyChallenges(dcResults);
        const activities: UserActivity[] = activitiesSnap.docs
          .map((d) => ({ id: d.id, ...(d.data() as any) } as UserActivity))
          .sort((a, b) => {
            const ta = a.completedAt?.toDate?.()?.getTime() ?? 0;
            const tb = b.completedAt?.toDate?.()?.getTime() ?? 0;
            return tb - ta;
          });
        setUserActivities(activities);
      })
      .catch(() => {})
      .finally(() => setExamsLoading(false));
  }, [currentUser?.uid, refreshTick]);

  // Re-fetch when any activity completes (practice, mock, olympiad, etc.)
  useEffect(() => {
    const handler = () => setRefreshTick((t) => t + 1);
    window.addEventListener('syllab:progress-updated', handler);
    return () => window.removeEventListener('syllab:progress-updated', handler);
  }, []);

  const highestAvatar = [...AVATAR_REWARDS].reverse().find(a => isAvatarUnlocked(a, stats, totalSkills)) ?? AVATAR_REWARDS[0];

  const handleSelectAvatar = async (id: string) => {
    setSelectedAvatarId(id);
    if (currentUser && FIRESTORE_FEATURES_ENABLED) {
      await saveExtendedProfile(currentUser.uid, { selectedAvatarId: id });
    }
  };

  const BADGES = [
    { earned: stats.xp >= 100,   label: '100 XP Earned',      icon: '⚡' },
    { earned: stats.xp >= 500,   label: '500 XP Club',         icon: '🔥' },
    { earned: stats.xp >= 1000,  label: '1000 XP Legend',      icon: '👑' },
    { earned: stats.streak >= 3, label: '3-Day Streak',        icon: '📅' },
    { earned: stats.streak >= 7, label: '7-Day Streak',        icon: '🌟' },
    { earned: stats.streak >= 30,label: '30-Day Streak',       icon: '💎' },
    { earned: totalSkills >= 1,  label: 'First Skill Done',    icon: '🎯' },
    { earned: totalSkills >= 10, label: '10 Skills Mastered',  icon: '🧑‍💻' },
    { earned: stats.xp >= 250,   label: 'Apprentice Rank',     icon: '📖' },
    { earned: stats.xp >= 750,   label: 'Explorer Rank',       icon: '🔭' },
    { earned: stats.xp >= 1500,  label: 'Scholar Rank',        icon: '🏅' },
    { earned: totalSkills >= 25, label: '25 Skills Mastered',  icon: '🥷' },
  ];

  return (
    <main className="space-y-6 pb-12">
      <SEO
        title="Progress & Rewards | Syllab.in"
        description="Track your XP, streaks, badges, and spin the daily wheel for bonus rewards on Syllab.in."
        keywords="student progress tracker, exam results, XP rewards, daily challenge, mock test history, practice arena, learning streak, Syllab"
        url="https://syllab.in/progress"
      />

      {/* Hero */}
      <section className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-2xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-3xl shadow-lg shadow-emerald-500/30 select-none">
              {highestAvatar.icon}
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">{highestAvatar.name} · {highestAvatar.title}</div>
              <h1 className="text-2xl font-black">Progress & Rewards</h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1.5 text-xs font-black text-primary"><Zap size={10} /> {stats.xp.toLocaleString()} XP</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-black text-slate-300"><Flame size={10} /> {stats.streak}d streak</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-black text-slate-300"><Trophy size={10} /> {stats.rank}</span>
          </div>
        </div>
      </section>

      {/* Spin wheel + Badges */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50">
          <div className="mb-5 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-black text-amber-600"><Gift size={12} /> Daily Reward</div>
              <h2 className="text-xl font-black text-slate-900">Spin the Wheel</h2>
              <p className="text-sm font-medium text-slate-500">One free spin per day. Win XP or bonus points!</p>
            </div>
            <div className="rounded-2xl bg-amber-50 border border-amber-100 px-4 py-3 text-center">
              <div className="text-[10px] font-black uppercase text-amber-600">Streak</div>
              <div className="flex items-center gap-1 text-xl font-black text-amber-700"><Flame size={18} /> {stats.streak}</div>
            </div>
          </div>
          <SpinWheel />
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50">
          <h2 className="text-xl font-black text-slate-900 mb-1">Badges</h2>
          <p className="text-sm font-medium text-slate-500 mb-5">Earn XP, maintain streaks, and complete skills to unlock badges.</p>
          <div className="grid grid-cols-2 gap-2.5">
            {BADGES.map(b => (
              <div key={b.label} className={cn('rounded-2xl p-3 text-center text-xs font-black', b.earned ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-slate-50 text-slate-400')}>
                <div className="text-xl mb-1">{b.earned ? b.icon : '🔒'}</div>
                {b.label}
              </div>
            ))}
          </div>
          <button onClick={() => setTab('daily')} className="mt-4 w-full rounded-2xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-emerald-500 transition-colors">
            Earn More XP — Daily Challenges
          </button>
        </section>
      </div>

      {/* Avatar Journey */}
      <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50">
        <h2 className="text-xl font-black text-slate-900 mb-1">Avatar Journey</h2>
        <p className="text-sm font-medium text-slate-500 mb-5">Unlock characters by earning XP, maintaining streaks, and completing Skills Lab topics.</p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {AVATAR_REWARDS.map(av => {
            const unlocked = isAvatarUnlocked(av, stats, totalSkills);
            const selected = selectedAvatarId === av.id;
            return (
              <button key={av.id} type="button" disabled={!unlocked}
                onClick={() => void handleSelectAvatar(av.id)}
                className={cn('rounded-2xl p-3 text-center transition-all border-2', selected ? 'border-primary bg-primary/10' : unlocked ? 'border-transparent bg-slate-50 hover:bg-slate-100' : 'border-transparent bg-slate-50 opacity-40 cursor-not-allowed')}>
                <div className="text-3xl mb-1">{av.icon}</div>
                <div className="text-[10px] font-black text-slate-700 leading-tight">{av.name}</div>
                <div className="text-[9px] text-slate-400 mt-0.5">{unlocked ? av.title : `${av.requiredXP} XP`}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* All Activity */}
      <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50">
        <div className="flex items-center gap-2 mb-5">
          <ClipboardList className="text-primary" size={20} />
          <h2 className="text-xl font-black text-slate-900">All Activity</h2>
          {(examResults.length + practiceAttempts.length + dailyChallenges.length) > 0 && (
            <span className="ml-auto rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black text-primary">
              {examResults.length + practiceAttempts.length + dailyChallenges.length} activities
            </span>
          )}
        </div>

        {!currentUser ? (
          <p className="text-sm text-slate-400 text-center py-6">Sign in to see your activity.</p>
        ) : examsLoading ? (
          <p className="text-sm text-slate-400 text-center py-6">Loading activity…</p>
        ) : (
          <div className="space-y-3">
            {/* In-Progress / Paused mock test */}
            {pausedSession && (
              <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] font-black text-amber-800 uppercase tracking-widest">In Progress</span>
                    </div>
                    <p className="font-black text-sm text-amber-800 truncate">
                      {pausedSession.title ?? 'Mock Test'}
                    </p>
                    <p className="text-[11px] font-medium text-amber-600 mt-1">
                      Question {(pausedSession.currentIndex ?? 0) + 1} of {pausedSession.questions?.length ?? '?'} — paused
                    </p>
                  </div>
                  <button
                    onClick={() => setTab('mock_tests')}
                    className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white hover:bg-amber-600 transition-colors"
                  >
                    <PlayCircle size={13} /> Continue
                  </button>
                </div>
              </div>
            )}

            {/* Completed exam results */}
            {examResults.length === 0 && practiceAttempts.length === 0 && dailyChallenges.length === 0 && !pausedSession ? (
              <div className="text-center py-8">
                <ClipboardList className="mx-auto mb-3 text-slate-200" size={36} />
                <p className="font-bold text-slate-500">No activity yet</p>
                <p className="text-sm text-slate-400 mt-1">Complete a mock test, practice session, or daily challenge to see results here.</p>
                <button
                  onClick={() => setTab('mock_tests')}
                  className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white hover:bg-emerald-500 transition-colors"
                >
                  Go to Exams <ArrowRight size={13} />
                </button>
              </div>
            ) : (
              <>
                {examResults.map((r) => {
                  const pct = r.percentage ?? (r.total > 0 ? Math.round((r.score / r.total) * 100) : 0);
                  const xpEarned = examXp(r.score, r.total);
                  const date = r.completedAt?.toDate?.();
                  const colorBg = pct >= 80 ? 'bg-emerald-50 border-emerald-200' : pct >= 50 ? 'bg-amber-50 border-amber-200' : 'bg-rose-50 border-rose-200';
                  const colorText = pct >= 80 ? 'text-emerald-700' : pct >= 50 ? 'text-amber-700' : 'text-rose-700';
                  const colorBar = pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-400' : 'bg-rose-400';
                  return (
                    <div key={r.id} className={`rounded-2xl border p-4 ${colorBg}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`rounded-full bg-white/70 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${colorText}`}>
                              ✓ Completed
                            </span>
                            <span className="rounded-full bg-white/70 px-2 py-0.5 text-[9px] font-black text-slate-600">
                              +{xpEarned} XP
                            </span>
                          </div>
                          <p className={`font-black text-sm ${colorText} truncate`}>{r.title}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            {r.examCode && (
                              <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-black text-slate-600">
                                Code: {r.examCode}
                              </span>
                            )}
                            {r.classLevel && (
                              <span className={`text-[10px] font-bold opacity-70 ${colorText}`}>Class {r.classLevel}</span>
                            )}
                            {r.level && (
                              <span className={`text-[10px] font-bold opacity-60 ${colorText}`}>{r.level}</span>
                            )}
                            {date && (
                              <span className="text-[10px] font-bold text-slate-400">
                                {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            )}
                          </div>
                          <div className="mt-2 h-1.5 w-full rounded-full bg-white/50">
                            <div className={`h-1.5 rounded-full ${colorBar}`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                        <div className={`text-right shrink-0 ${colorText}`}>
                          <div className="text-2xl font-black">{pct}%</div>
                          <div className="text-[10px] font-bold opacity-70">{r.score}/{r.total}</div>
                          <button
                            onClick={() => setTab('mock_tests')}
                            className="mt-1 text-[9px] font-black opacity-60 hover:opacity-100 transition-opacity underline"
                          >
                            Practice Again
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {practiceAttempts.length > 0 && (
                  <>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 pt-3 pb-1">🏟️ Practice Arena</p>
                    {practiceAttempts.slice(0, 20).map((a) => {
                      const pct = a.accuracy;
                      const colorBg = pct >= 80 ? 'bg-emerald-50 border-emerald-200' : pct >= 50 ? 'bg-amber-50 border-amber-200' : 'bg-rose-50 border-rose-200';
                      const colorText = pct >= 80 ? 'text-emerald-700' : pct >= 50 ? 'text-amber-700' : 'text-rose-700';
                      const colorBar = pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-400' : 'bg-rose-400';
                      const date = new Date(a.completedAt);
                      return (
                        <div key={a.id} className={`rounded-2xl border p-4 ${colorBg}`}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`rounded-full bg-white/70 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${colorText}`}>
                                  ✓ Practice
                                </span>
                                <span className="rounded-full bg-white/70 px-2 py-0.5 text-[9px] font-black text-slate-600">
                                  {Math.round(a.elapsedSeconds / 60)}m {a.elapsedSeconds % 60}s
                                </span>
                              </div>
                              <p className={`font-black text-sm ${colorText} truncate`}>
                                {a.subject} — {a.chapterTitles.slice(0, 2).join(', ') || 'Mixed practice'}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 mt-1">
                                <span className={`text-[10px] font-bold opacity-70 ${colorText}`}>{a.total} questions</span>
                                <span className="text-[10px] font-bold text-slate-400">
                                  {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                              </div>
                              <div className="mt-2 h-1.5 w-full rounded-full bg-white/50">
                                <div className={`h-1.5 rounded-full ${colorBar}`} style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                            <div className={`text-right shrink-0 ${colorText}`}>
                              <div className="text-2xl font-black">{pct}%</div>
                              <div className="text-[10px] font-bold opacity-70">{a.score}/{a.total}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}

                {dailyChallenges.length > 0 && (
                  <>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 pt-3 pb-1">🔥 Daily Challenges</p>
                    {dailyChallenges.slice(0, 20).map((dc) => {
                      const date = dc.completedAt?.toDate?.();
                      return (
                        <div key={dc.id} className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="rounded-full bg-white/70 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-violet-700">
                                  ✓ Daily Challenge
                                </span>
                              </div>
                              <p className="font-black text-sm text-violet-700">
                                {dc.displayName || 'Daily Challenge Completed'}
                              </p>
                              {date && (
                                <p className="text-[10px] font-bold text-violet-500 mt-1">
                                  {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                              )}
                            </div>
                            {dc.totalXP !== undefined && (
                              <div className="text-right shrink-0 text-violet-700">
                                <div className="text-2xl font-black">+{dc.totalXP}</div>
                                <div className="text-[10px] font-bold opacity-70">XP</div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}

                {userActivities.length > 0 && (
                  <>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 pt-3 pb-1">✨ Skills & English Practice</p>
                    {userActivities.slice(0, 20).map((activity) => {
                      const date = activity.completedAt?.toDate?.();
                      const typeLabel = activity.type === 'skill' ? 'Skill Completed'
                        : activity.type === 'english' ? 'English Challenge'
                        : activity.type === 'olympiad' ? 'Olympiad'
                        : 'Exam';
                      const bgColor = activity.type === 'skill' ? 'bg-indigo-50 border-indigo-200'
                        : activity.type === 'english' ? 'bg-sky-50 border-sky-200'
                        : 'bg-purple-50 border-purple-200';
                      const badgeColor = activity.type === 'skill' ? 'bg-white/70 text-indigo-700'
                        : activity.type === 'english' ? 'bg-white/70 text-sky-700'
                        : 'bg-white/70 text-purple-700';
                      const textColor = activity.type === 'skill' ? 'text-indigo-700'
                        : activity.type === 'english' ? 'text-sky-700'
                        : 'text-purple-700';
                      return (
                        <div key={activity.id} className={`rounded-2xl border ${bgColor} p-4`}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${badgeColor}`}>
                                  {activity.type === 'english' ? '✓' : '★'} {typeLabel}
                                </span>
                              </div>
                              <p className={`font-black text-sm ${textColor}`}>
                                {activity.title}
                              </p>
                              {(activity.subject || activity.level) && (
                                <p className={`text-[10px] font-bold opacity-70 mt-1 ${textColor}`}>
                                  {activity.subject ? `${activity.subject}` : ''}{activity.level ? ` • ${activity.level}` : ''}
                                </p>
                              )}
                              {date && (
                                <p className={`text-[10px] font-bold opacity-70 mt-1`}>
                                  {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </section>

      {/* Analytics */}
      <section>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary mb-5">
          <Activity size={14} /> Learning Analytics
        </div>
        <React.Suspense fallback={<div className="rounded-2xl bg-white p-8 text-center text-sm font-bold text-slate-400">Loading analytics…</div>}>
          <AnalyticsPage currentUser={currentUser} setTab={setTab} />
        </React.Suspense>
      </section>
    </main>
  );
}
