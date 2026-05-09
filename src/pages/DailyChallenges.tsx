import React from 'react';
import { Award, BadgeCheck, BookOpenCheck, Brain, CalendarDays, CheckCircle2, Clock, Flame, Medal, RotateCcw, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { User as FirebaseUser } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
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
  date: string;
  points: number;
};

interface DailyChallengesPageProps {
  currentUser: FirebaseUser | null;
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
  return date.toISOString().slice(0, 10);
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

function streakFromAttempts(attempts: Record<string, Attempt>) {
  const completedDates = new Set(Object.values(attempts).map((attempt) => attempt.date));
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
  if (user && FIRESTORE_FEATURES_ENABLED) {
    const snap = await getDoc(doc(db, 'dailyChallengeProfiles', user.uid));
    return snap.exists() ? ({ ...emptyProfile(), ...snap.data() } as ChallengeProfile) : emptyProfile();
  }
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '') || emptyProfile();
  } catch {
    return emptyProfile();
  }
}

async function saveProfile(user: FirebaseUser | null, profile: ChallengeProfile) {
  if (user && FIRESTORE_FEATURES_ENABLED) {
    await setDoc(doc(db, 'dailyChallengeProfiles', user.uid), {
      ...profile,
      userId: user.uid,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

async function loadOverallLeaderboard(): Promise<LeaderboardEntry[]> {
  if (!FIRESTORE_FEATURES_ENABLED) return [];
  const snap = await getDocs(
    query(
      collection(db, 'dailyChallengeLeaderboard'),
      orderBy('points', 'desc'),
      orderBy('secondsLeft', 'desc'),
      limit(25),
    ),
  );
  return snap.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<LeaderboardEntry, 'id'>) }));
}

async function publishLeaderboardEntry(user: FirebaseUser | null, attempt: Attempt) {
  if (!user || !FIRESTORE_FEATURES_ENABLED) return;
  const entryId = `${user.uid}_${attempt.date}_${attempt.category}_${attempt.classLevel || 'exam'}`.replace(/\s+/g, '-');
  const points = attempt.score * 100 + attempt.secondsLeft;
  await setDoc(doc(db, 'dailyChallengeLeaderboard', entryId), {
    userId: user.uid,
    displayName: user.displayName || user.email || 'Syllab Learner',
    category: attempt.category,
    classLevel: attempt.classLevel || '',
    score: attempt.score,
    total: attempt.total,
    secondsLeft: attempt.secondsLeft,
    date: attempt.date,
    points,
    updatedAt: serverTimestamp(),
  });
}

export default function DailyChallengesPage({ currentUser }: DailyChallengesPageProps) {
  const [category, setCategory] = React.useState<ChallengeCategory>('EAMCET');
  const [classLevel, setClassLevel] = React.useState('5');
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = React.useState(180);
  const [finished, setFinished] = React.useState(false);
  const [profile, setProfile] = React.useState<ChallengeProfile>(emptyProfile());
  const [overallLeaderboard, setOverallLeaderboard] = React.useState<LeaderboardEntry[]>([]);
  const [saveError, setSaveError] = React.useState<string | null>(null);

  const dateKey = todayKey();
  const questions = React.useMemo(() => questionsFor(category, classLevel, dateKey), [category, classLevel, dateKey]);
  const current = questions[index];
  const key = attemptKey(dateKey, category, category === 'Classes 5-10' ? classLevel : undefined);
  const completedToday = Boolean(profile.attempts[key]);
  const score = questions.reduce((total, question) => total + (answers[question.id] === question.correct ? 1 : 0), 0);
  const completionProgress = Math.round((Object.keys(answers).length / Math.max(1, questions.length)) * 100);
  const streak = streakFromAttempts(profile.attempts);
  const completedDates = React.useMemo(
    () => new Set(Object.values(profile.attempts).map((attempt) => attempt.date)),
    [profile.attempts],
  );
  React.useEffect(() => {
    loadProfile(currentUser)
      .then(setProfile)
      .catch(() => setSaveError('Could not load your streak. Using this device for now.'));
    loadOverallLeaderboard()
      .then(setOverallLeaderboard)
      .catch(() => setSaveError('Overall leaderboard is unavailable right now.'));
  }, [currentUser]);

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
      classLevel: category === 'Classes 5-10' ? classLevel : undefined,
      score,
      total: questions.length,
      secondsLeft: timeLeft,
      answers,
    };
    const nextProfile: ChallengeProfile = {
      attempts: { ...profile.attempts, [key]: attempt },
      bestScore: Math.max(profile.bestScore, score),
      totalScore: profile.totalScore + score,
      participation: profile.participation + (profile.attempts[key] ? 0 : 1),
    };
    setProfile(nextProfile);
    setFinished(true);
    try {
      await saveProfile(currentUser, nextProfile);
      await publishLeaderboardEntry(currentUser, attempt);
      setOverallLeaderboard(await loadOverallLeaderboard());
      setSaveError(null);
    } catch {
      setSaveError('Score saved on this screen, but cloud sync or overall ranking failed.');
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <main className="space-y-8 pb-12">
      <SEO
        title="Daily Challenges for EAMCET, IIT JEE, NEET and Classes 5-10"
        description="Solve daily timed quizzes for EAMCET, IIT JEE, NEET, and Classes 5th to 10th with streaks, scores, explanations, and rankings."
        keywords="daily quiz, EAMCET practice, IIT JEE questions, NEET quiz, aptitude questions class 5 to 10"
        url="https://syllab.in/daily-challenges"
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

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: 'Daily Completion', value: `${completionProgress}%`, icon: CheckCircle2 },
          { label: 'Badges Earned', value: Math.max(0, Number(streak >= 1) + Number(streak >= 3) + Number(profile.participation >= 5)), icon: BadgeCheck },
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
              <h2 className="text-lg font-black text-slate-900">Rankings</h2>
              <Medal size={20} className="text-amber-500" />
            </div>
            <div className="space-y-3">
              {overallLeaderboard.length > 0 ? overallLeaderboard.slice(0, 8).map((entry, rank) => (
                <div key={entry.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                  <div>
                    <div className="text-sm font-black text-slate-900">#{rank + 1} {entry.displayName}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {entry.category}{entry.classLevel ? ` - Class ${entry.classLevel}` : ''} - {entry.date}
                    </div>
                  </div>
                  <div className="text-sm font-black text-primary">{entry.score}/{entry.total}</div>
                </div>
              )) : (
                <p className="text-sm font-medium leading-relaxed text-slate-500">
                  Sign in and finish a challenge to enter the overall rankings.
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

