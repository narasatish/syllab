import React from 'react';
import { Award, BookOpenCheck, Brain, CalendarDays, CheckCircle2, Clock, Flame, Medal, RotateCcw, Trophy, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { User as FirebaseUser } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, limit, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import SEO from '../components/SEO';
import { cn } from '../lib/utils';
import { db } from '../lib/firebase';
import { FIRESTORE_FEATURES_ENABLED } from '../lib/cloudFeatures';
import {
  CLASS_BANK as QUESTION_CLASS_BANK,
  EXAM_BANK as QUESTION_EXAM_BANK,
  DailyCategory,
  ExamCategory,
  Question as DailyQuestion,
  QuestionSubject,
} from '../data/questions/index';

type ChallengeCategory = DailyCategory;

type Attempt = {
  date: string;
  category: ChallengeCategory;
  classLevel?: string;
  score: number;
  total: number;
  secondsLeft: number;
  durationSeconds: number;
  answers: Record<string, number>;
};

type ChallengeProfile = {
  attempts: Record<string, Attempt>;
  bestScore: number;
  totalScore: number;
  participation: number;
};

type LeaderboardEntry = {
  id: string;
  userId: string;
  displayName: string;
  category: ChallengeCategory;
  classLevel?: string;
  score: number;
  total: number;
  secondsLeft: number;
  durationSeconds: number;
  date: string;
  points: number;
};

interface DailyChallengesPageProps {
  currentUser: FirebaseUser | null;
  onReward: (summary: { scoreGained: number; xpGained: number }) => Promise<void>;
}

const CATEGORIES: { id: ChallengeCategory; title: string; desc: string; icon: React.ElementType }[] = [
  { id: 'EAMCET', title: 'EAMCET', desc: '3 daily questions: maths, physics, chemistry.', icon: Flame },
  { id: 'IIT JEE', title: 'IIT JEE', desc: '3 daily questions: maths, physics, chemistry.', icon: Brain },
  { id: 'NEET', title: 'NEET', desc: '3 daily questions: biology, chemistry, physics.', icon: BookOpenCheck },
  { id: 'Classes 5-10', title: 'Classes 5th to 10th', desc: 'Choose class, then get aptitude and foundation questions.', icon: Award },
];

const CLASS_LEVELS = ['5', '6', '7', '8', '9', '10'];
const STORAGE_KEY = 'syllab_daily_challenge_profile';

function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function attemptKey(date: string, category: ChallengeCategory, classLevel?: string) {
  return `${date}:${category}:${classLevel || 'exam'}`;
}

function dayOffset(dateKey: string) {
  return Math.floor(new Date(`${dateKey}T00:00:00`).getTime() / 86400000);
}

function rotateQuestions(bank: DailyQuestion[], dateKey: string) {
  if (bank.length <= 3) return bank;
  const offset = dayOffset(dateKey) % bank.length;
  return [...bank.slice(offset), ...bank.slice(0, offset)].slice(0, 3);
}

function questionsFor(category: ChallengeCategory, classLevel: string, dateKey: string) {
  if (category === 'Classes 5-10') {
    return rotateQuestions(QUESTION_CLASS_BANK[classLevel] || QUESTION_CLASS_BANK['6'], dateKey);
  }
  const subjectOrder: Record<ExamCategory, QuestionSubject[]> = {
    'IIT JEE': ['Mathematics', 'Physics', 'Chemistry'],
    EAMCET: ['Mathematics', 'Physics', 'Chemistry'],
    NEET: ['Biology', 'Chemistry', 'Physics'],
  };
  const offset = dayOffset(dateKey);
  return subjectOrder[category].flatMap((subject) => {
    const pool = QUESTION_EXAM_BANK[category][subject] || [];
    if (!pool.length) return [];
    return pool[offset % pool.length];
  });
}

function emptyProfile(): ChallengeProfile {
  return { attempts: {}, bestScore: 0, totalScore: 0, participation: 0 };
}

function profileStorageKey(user: FirebaseUser | null) {
  return user ? `${STORAGE_KEY}:${user.uid}` : STORAGE_KEY;
}

function readLocalProfile(user: FirebaseUser | null): ChallengeProfile {
  try {
    const stored = window.localStorage.getItem(profileStorageKey(user));
    return stored ? ({ ...emptyProfile(), ...JSON.parse(stored) } as ChallengeProfile) : emptyProfile();
  } catch {
    return emptyProfile();
  }
}

function writeLocalProfile(user: FirebaseUser | null, profile: ChallengeProfile) {
  window.localStorage.setItem(profileStorageKey(user), JSON.stringify(profile));
}

function richerProfile(localProfile: ChallengeProfile, cloudProfile: ChallengeProfile) {
  const localAttempts = Object.keys(localProfile.attempts).length;
  const cloudAttempts = Object.keys(cloudProfile.attempts).length;
  if (localAttempts !== cloudAttempts) {
    return localAttempts > cloudAttempts ? localProfile : cloudProfile;
  }
  return localProfile.participation > cloudProfile.participation ? localProfile : cloudProfile;
}

function streakFromDates(completedDates: Set<string>) {
  let streak = 0;
  const cursor = new Date(`${todayKey()}T00:00:00`);
  while (completedDates.has(todayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function monthDays() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(year, month, index + 1);
    return { label: index + 1, key: todayKey(date), weekday: date.getDay() };
  });
}

async function loadProfile(user: FirebaseUser | null): Promise<ChallengeProfile> {
  const localProfile = readLocalProfile(user);
  if (user && FIRESTORE_FEATURES_ENABLED) {
    try {
      const snap = await getDoc(doc(db, 'dailyChallengeProfiles', user.uid));
      if (!snap.exists()) {
        return localProfile;
      }
      return richerProfile(localProfile, { ...emptyProfile(), ...snap.data() } as ChallengeProfile);
    } catch (error) {
      console.warn('Daily challenge profile load failed. Using local profile cache.', error);
    }
  }
  return localProfile;
}

async function saveProfile(user: FirebaseUser | null, profile: ChallengeProfile) {
  writeLocalProfile(user, profile);
  if (user && FIRESTORE_FEATURES_ENABLED) {
    await setDoc(doc(db, 'dailyChallengeProfiles', user.uid), {
      ...profile,
      userId: user.uid,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }
}

function sortLeaderboard(entries: LeaderboardEntry[]) {
  return entries.sort((a, b) => b.points - a.points || (a.durationSeconds ?? 180 - a.secondsLeft) - (b.durationSeconds ?? 180 - b.secondsLeft));
}

async function loadOverallLeaderboard(date: string): Promise<LeaderboardEntry[]> {
  if (!FIRESTORE_FEATURES_ENABLED) return [];
  const snap = await getDocs(
    query(
      collection(db, 'dailyChallengeLeaderboard'),
      where('date', '==', date),
      limit(100),
    ),
  );
  return sortLeaderboard(
    snap.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<LeaderboardEntry, 'id'>) })),
  ).slice(0, 25);
}

async function loadUserLeaderboardEntries(user: FirebaseUser | null): Promise<LeaderboardEntry[]> {
  if (!user || !FIRESTORE_FEATURES_ENABLED) return [];
  const snap = await getDocs(
    query(
      collection(db, 'dailyChallengeLeaderboard'),
      where('userId', '==', user.uid),
      limit(100),
    ),
  );
  return snap.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<LeaderboardEntry, 'id'>) }));
}

async function publishLeaderboardEntry(user: FirebaseUser | null, attempt: Attempt) {
  if (!user || !FIRESTORE_FEATURES_ENABLED) return;
  const entryId = `${user.uid}_${attempt.date}_${attempt.category}_${attempt.classLevel || 'exam'}`.replace(/\s+/g, '-');
  const points = attempt.score * 1000 + attempt.secondsLeft;
  await setDoc(doc(db, 'dailyChallengeLeaderboard', entryId), {
    userId: user.uid,
    displayName: user.displayName || user.email || 'Syllab Learner',
    category: attempt.category,
    classLevel: attempt.classLevel || '',
    score: attempt.score,
    total: attempt.total,
    secondsLeft: attempt.secondsLeft,
    durationSeconds: attempt.durationSeconds,
    date: attempt.date,
    points,
    completedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

function dailyXpFor(score: number, total: number) {
  const accuracy = total ? score / total : 0;
  const base = 25;
  const correctXp = score * 10;
  const bonus = accuracy >= 1 ? 30 : accuracy >= 0.9 ? 20 : accuracy >= 0.8 ? 10 : 0;
  return base + correctXp + bonus;
}

export default function DailyChallengesPage({ currentUser, onReward }: DailyChallengesPageProps) {
  const [category, setCategory] = React.useState<ChallengeCategory>('EAMCET');
  const [classLevel, setClassLevel] = React.useState('5');
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = React.useState(180);
  const [finished, setFinished] = React.useState(false);
  const [profile, setProfile] = React.useState<ChallengeProfile>(emptyProfile());
  const [overallLeaderboard, setOverallLeaderboard] = React.useState<LeaderboardEntry[]>([]);
  const [userLeaderboardEntries, setUserLeaderboardEntries] = React.useState<LeaderboardEntry[]>([]);
  const [saveError, setSaveError] = React.useState<string | null>(null);
  const [leaderboardLoading, setLeaderboardLoading] = React.useState(true);
  const [xpNotice, setXpNotice] = React.useState<string | null>(null);

  const dateKey = todayKey();
  const questions = React.useMemo(() => questionsFor(category, classLevel, dateKey), [category, classLevel, dateKey]);
  const current = questions[index];
  const key = attemptKey(dateKey, category, category === 'Classes 5-10' ? classLevel : undefined);
  const completedToday = Boolean(profile.attempts[key]);
  const score = questions.reduce((total, question) => total + (answers[question.id] === question.correct ? 1 : 0), 0);
  const answerProgress = Math.round((Object.keys(answers).length / Math.max(1, questions.length)) * 100);
  const ownLeaderboardEntries = React.useMemo(
    () => {
      const entries = [
        ...userLeaderboardEntries,
        ...overallLeaderboard.filter((entry) => currentUser && entry.userId === currentUser.uid),
      ];
      return Array.from(new Map(entries.map((entry) => [entry.id, entry])).values());
    },
    [currentUser, overallLeaderboard, userLeaderboardEntries],
  );
  const completedDates = React.useMemo(
    () => new Set([
      ...Object.values(profile.attempts).map((attempt) => attempt.date),
      ...ownLeaderboardEntries.map((entry) => entry.date),
    ]),
    [ownLeaderboardEntries, profile.attempts],
  );
  const completedAnyToday = completedDates.has(dateKey);
  const streak = streakFromDates(completedDates);
  const completionProgress = completedAnyToday ? 100 : answerProgress;
  const dailyDoseXp = React.useMemo(() => {
    const attempts = Object.values(profile.attempts);
    const attemptKeys = new Set(attempts.map((attempt) => attemptKey(attempt.date, attempt.category, attempt.classLevel)));
    const profileXp = attempts.reduce((total, attempt) => total + dailyXpFor(attempt.score, attempt.total), 0);
    const leaderboardXp = ownLeaderboardEntries.reduce((total, entry) => {
      const entryKey = attemptKey(entry.date, entry.category, entry.classLevel || undefined);
      return attemptKeys.has(entryKey) ? total : total + dailyXpFor(entry.score, entry.total);
    }, 0);
    return profileXp + leaderboardXp;
  }, [ownLeaderboardEntries, profile.attempts]);
  React.useEffect(() => {
    loadProfile(currentUser)
      .then(setProfile)
      .catch(() => setSaveError('Could not load your streak. Using this device for now.'));
    setLeaderboardLoading(true);
    loadOverallLeaderboard(dateKey)
      .then(setOverallLeaderboard)
      .catch(() => setSaveError('Overall leaderboard is unavailable right now.'))
      .finally(() => setLeaderboardLoading(false));
    loadUserLeaderboardEntries(currentUser)
      .then(setUserLeaderboardEntries)
      .catch((error) => console.warn('Daily challenge user leaderboard load failed.', error));
  }, [currentUser, dateKey]);

  React.useEffect(() => {
    const attempt = profile.attempts[key];
    if (attempt) {
      setAnswers(attempt.answers);
      setFinished(true);
      setTimeLeft(attempt.secondsLeft);
    } else {
      setAnswers({});
      setFinished(false);
      setTimeLeft(180);
      setIndex(0);
    }
  }, [key, profile.attempts]);

  React.useEffect(() => {
    if (finished) return;
    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          setFinished(true);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [finished, key]);

  const resetChallenge = (nextCategory = category) => {
    setCategory(nextCategory);
    setIndex(0);
    setAnswers({});
    setTimeLeft(180);
    setFinished(false);
  };

  const finishChallenge = async () => {
    const attempt: Attempt = {
      date: dateKey,
      category,
      score,
      total: questions.length,
      secondsLeft: timeLeft,
      durationSeconds: 180 - timeLeft,
      answers,
    };
    if (category === 'Classes 5-10') {
      attempt.classLevel = classLevel;
    }
    const nextProfile: ChallengeProfile = {
      attempts: { ...profile.attempts, [key]: attempt },
      bestScore: Math.max(profile.bestScore, score),
      totalScore: profile.totalScore + score,
      participation: profile.participation + (profile.attempts[key] ? 0 : 1),
    };
    setProfile(nextProfile);
    setFinished(true);
    const shouldGrantDailyXp = !completedAnyToday;
    const xpGained = shouldGrantDailyXp ? dailyXpFor(score, questions.length) : 0;
    if (shouldGrantDailyXp) {
      await onReward({ scoreGained: score * 10, xpGained });
      setXpNotice(`Daily Dose complete: +${xpGained} XP`);
    } else {
      setXpNotice('Daily Dose already rewarded today. Score and ranking updated.');
    }
    let leaderboardSyncFailed = false;

    try {
      await saveProfile(currentUser, nextProfile);
    } catch (error) {
      console.warn('Daily challenge profile cloud sync failed. Local progress is saved.', error);
    }

    try {
      await publishLeaderboardEntry(currentUser, attempt);
      setOverallLeaderboard(await loadOverallLeaderboard(dateKey));
      setUserLeaderboardEntries(await loadUserLeaderboardEntries(currentUser));
    } catch (error) {
      leaderboardSyncFailed = true;
      console.error('Daily challenge leaderboard sync failed.', error);
    }

    if (leaderboardSyncFailed) {
      setSaveError('Score saved on this screen, but ranking publish failed. Check Firestore rules/env for Daily Dose.');
    } else {
      setSaveError(null);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, '0');
  const leaderboardEmptyMessage = !FIRESTORE_FEATURES_ENABLED
    ? 'Cloud rankings are disabled. Set VITE_FIRESTORE_FEATURES=true and redeploy to use common rankings.'
    : !currentUser
      ? 'Sign in and finish today\'s challenge to enter the rankings.'
      : 'No ranking entries for today yet. Finish a daily challenge after signing in to publish your score.';

  return (
    <main className="space-y-8 pb-12">
      <SEO
        title="Daily Challenges for EAMCET, IIT JEE, NEET and Classes 5-10"
        description="Solve daily timed quizzes for EAMCET, IIT JEE, NEET, and Classes 5th to 10th with streaks, scores, explanations, and rankings."
        keywords="daily quiz, EAMCET practice, IIT JEE questions, NEET quiz, aptitude questions class 5 to 10"
        url="https://YOUR_DOMAIN_HERE/daily-challenges"
      />

      <section className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-2xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-emerald-200">
              <CalendarDays size={14} />
              Daily streak challenge
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Daily Challenges</h1>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
              One daily set per track. Finish it to protect your streak and build exam rhythm.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/10 px-4 py-4">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Timer</div>
              <div className="mt-1 flex items-center gap-2 text-xl font-black"><Clock size={18} /> {minutes}:{seconds}</div>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-4">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Score</div>
              <div className="mt-1 text-xl font-black">{score}/{questions.length}</div>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-4">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Streak</div>
              <div className="mt-1 flex items-center gap-2 text-xl font-black"><Flame size={18} /> {streak}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {CATEGORIES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => resetChallenge(item.id)}
            className={cn(
              'rounded-2xl border p-5 text-left transition-all',
              category === item.id ? 'border-primary bg-white shadow-xl shadow-emerald-500/10' : 'border-slate-100 bg-white hover:border-primary/40',
            )}
          >
            <item.icon className="mb-4 text-primary" size={26} />
            <h2 className="text-lg font-black text-slate-900">{item.title}</h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">{item.desc}</p>
          </button>
        ))}
      </section>

      {category === 'Classes 5-10' ? (
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Choose class</div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {CLASS_LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setClassLevel(level)}
                className={cn(
                  'rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest transition-all',
                  classLevel === level ? 'bg-primary text-white' : 'bg-slate-50 text-slate-500 hover:text-primary',
                )}
              >
                Class {level}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {saveError ? (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4 text-sm font-bold text-amber-700">
          {saveError}
        </div>
      ) : null}

      {xpNotice ? (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-700">
          {xpNotice}
        </div>
      ) : null}

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: 'Daily Completion', value: `${completionProgress}%`, icon: CheckCircle2 },
          { label: 'Daily Dose XP', value: dailyDoseXp, icon: Zap },
          { label: 'Participation', value: profile.participation, icon: Trophy },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-white p-5 shadow-sm">
            <item.icon className="mb-3 text-primary" size={22} />
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</div>
            <div className="mt-1 text-2xl font-black text-slate-900">{item.value}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <motion.article
          key={`${key}-${index}-${finished}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-8"
        >
          {completedToday ? (
            <div className="mb-5 flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">
              <CheckCircle2 size={18} />
              Today&apos;s {category} challenge is completed.
            </div>
          ) : null}
          {current ? (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
                  {current.subject}
                </span>
                <span className="text-xs font-black text-slate-400">Question {index + 1} of {questions.length}</span>
              </div>
              <h2 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl">{current.question}</h2>
              <div className="grid gap-3">
                {current.options.map((option, optionIndex) => {
                  const selected = answers[current.id] === optionIndex;
                  const correct = finished && optionIndex === current.correct;
                  const wrong = finished && selected && optionIndex !== current.correct;
                  return (
                    <button
                      key={`${current.id}-${optionIndex}`}
                      type="button"
                      disabled={finished}
                      onClick={() => setAnswers((prev) => ({ ...prev, [current.id]: optionIndex }))}
                      className={cn(
                        'rounded-2xl border p-4 text-left text-sm font-bold transition-all',
                        selected ? 'border-primary bg-emerald-50 text-slate-900' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-primary/40',
                        correct && 'border-emerald-500 bg-emerald-50 text-emerald-700',
                        wrong && 'border-rose-500 bg-rose-50 text-rose-700',
                      )}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {finished ? (
                <div className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-relaxed text-slate-600">
                  {current.explanation}
                </div>
              ) : null}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={() => setIndex((value) => Math.max(0, value - 1))}
                  disabled={index === 0}
                  className="rounded-2xl bg-slate-100 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-600 disabled:opacity-40"
                >
                  Previous
                </button>
                {index < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setIndex((value) => Math.min(questions.length - 1, value + 1))}
                    className="rounded-2xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-widest text-white"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => void finishChallenge()}
                    disabled={finished}
                    className="rounded-2xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-widest text-white disabled:opacity-50"
                  >
                    Finish Challenge
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </motion.article>

        <aside className="space-y-4">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900">Streak Calendar</h2>
              <Trophy size={20} className="text-amber-500" />
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, dayIndex) => (
                <div key={`${day}-${dayIndex}`} className="text-[10px] font-black text-slate-400">{day}</div>
              ))}
              {Array.from({ length: monthDays()[0].weekday }).map((_, index) => <div key={`blank-${index}`} />)}
              {monthDays().map((day) => {
                const done = completedDates.has(day.key);
                const isToday = day.key === dateKey;
                return (
                  <div
                    key={day.key}
                    className={cn(
                      'relative flex aspect-square items-center justify-center rounded-xl text-xs font-black',
                      done ? 'bg-primary text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-50 text-slate-500',
                      isToday && !done && 'ring-2 ring-primary',
                    )}
                    title={done ? 'At least one challenge completed' : 'No challenge completed'}
                  >
                    {done ? <Flame size={15} fill="currentColor" /> : day.label}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900">Fastest Rankings</h2>
              <Medal size={20} className="text-amber-500" />
            </div>
            <div className="space-y-3">
              {leaderboardLoading ? (
                <p className="text-sm font-medium leading-relaxed text-slate-500">
                  Loading rankings...
                </p>
              ) : overallLeaderboard.length > 0 ? overallLeaderboard.slice(0, 8).map((entry, rank) => (
                <div key={entry.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                  <div>
                    <div className="text-sm font-black text-slate-900">#{rank + 1} {entry.displayName}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {entry.category}{entry.classLevel ? ` - Class ${entry.classLevel}` : ''} - {entry.date}
                    </div>
                  </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-primary">{entry.score}/{entry.total}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {entry.durationSeconds ?? (180 - entry.secondsLeft)}s
                      </div>
                    </div>
                </div>
              )) : (
                <p className="text-sm font-medium leading-relaxed text-slate-500">
                  {leaderboardEmptyMessage}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => resetChallenge()}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 text-xs font-black uppercase tracking-widest text-white"
          >
            <RotateCcw size={16} />
            Restart Attempt
          </button>
        </aside>
      </section>
    </main>
  );
}

