import React from 'react';
import { Activity, AlertTriangle, Brain, CheckCircle2, Clock, Target, TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { User as FirebaseUser } from 'firebase/auth';
import SEO from '../components/SEO';
import { getPracticeAttempts, PracticeAttempt } from '../lib/practiceAnalytics';
import { SYLLABUS } from '../data/syllabus';

interface AnalyticsPageProps {
  currentUser: FirebaseUser | null;
  setTab: (tab: string) => void;
}

function chapterNameFor(chapterId?: string) {
  return SYLLABUS.find((chapter) => chapter.id === chapterId)?.title || chapterId || 'General';
}

export default function AnalyticsPage({ currentUser, setTab }: AnalyticsPageProps) {
  const [attempts, setAttempts] = React.useState<PracticeAttempt[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setAttempts(getPracticeAttempts(currentUser?.uid || null));
    setLoading(false);
  }, [currentUser]);

  const subjectData = React.useMemo(() => {
    const stats = attempts.reduce((acc: Record<string, { score: number; total: number; attempts: number }>, attempt) => {
      const key = attempt.subject || 'Mixed';
      acc[key] = acc[key] || { score: 0, total: 0, attempts: 0 };
      acc[key].score += attempt.score;
      acc[key].total += attempt.total;
      acc[key].attempts += 1;
      return acc;
    }, {});
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Science', 'English'];
    const observedSubjects = Object.keys(stats).filter((subject) => !subjects.includes(subject));
    return [...subjects, ...observedSubjects].map((subject) => {
      const item = stats[subject];
      return {
        subject,
        accuracy: item ? Math.round((item.score / item.total) * 100) : 0,
        attempts: item?.attempts || 0,
      };
    });
  }, [attempts]);

  const weakChapters = React.useMemo(() => {
    const stats = attempts.reduce((acc: Record<string, { title: string; subject: string; score: number; total: number }>, attempt) => {
      const chapterId = attempt.chapterIds[0] || 'mixed';
      acc[chapterId] = acc[chapterId] || {
        title: attempt.chapterTitles[0] || chapterNameFor(chapterId),
        subject: attempt.subject,
        score: 0,
        total: 0,
      };
      acc[chapterId].score += attempt.score;
      acc[chapterId].total += attempt.total;
      return acc;
    }, {});
    return Object.entries(stats)
      .map(([chapterId, item]) => ({
        chapterId,
        title: item.title,
        subject: item.subject,
        accuracy: Math.round((item.score / item.total) * 100),
        missed: item.total - item.score,
      }))
      .filter((chapter) => chapter.accuracy < 70 || chapter.missed > 0)
      .sort((a, b) => a.accuracy - b.accuracy || b.missed - a.missed)
      .slice(0, 4)
  }, [attempts]);

  const weeklyData = React.useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));
      const dateKey = date.toISOString().slice(0, 10);
      const dayAttempts = attempts.filter((attempt) => attempt.completedAt.slice(0, 10) === dateKey);
      const score = dayAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
      const total = dayAttempts.reduce((sum, attempt) => sum + attempt.total, 0);
      const speedTotal = dayAttempts.reduce((sum, attempt) => sum + attempt.avgSecondsPerQuestion, 0);
      return {
        day: date.toLocaleDateString(undefined, { weekday: 'short' }),
        accuracy: total ? Math.round((score / total) * 100) : 0,
        speed: dayAttempts.length ? Math.round(speedTotal / dayAttempts.length) : 0,
      };
    });
  }, [attempts]);

  const totalScore = attempts.reduce((sum, attempt) => sum + attempt.score, 0);
  const totalQuestions = attempts.reduce((sum, attempt) => sum + attempt.total, 0);
  const averageAccuracy = totalQuestions ? Math.round((totalScore / totalQuestions) * 100) : 0;
  const averageSpeed = attempts.length
    ? Math.round(attempts.reduce((sum, attempt) => sum + attempt.avgSecondsPerQuestion, 0) / attempts.length)
    : 0;

  const recommendation = weakChapters[0]
    ? `Your latest practice data shows ${weakChapters[0].subject} needs attention. Start with "${weakChapters[0].title}" and do 10 focused questions today.`
    : 'No weak topic is visible yet. Complete a few quizzes so Syllab can detect patterns accurately.';

  if (loading) return <div className="p-10 text-center text-slate-400">Loading analytics...</div>;

  return (
    <main className="space-y-8 pb-12">
      <SEO
        title="Student Performance Analytics and Weakness Finder"
        description="Track subject-wise accuracy, weak topics, speed versus accuracy, weekly progress, and AI-powered learning recommendations."
        keywords="student analytics, weak topic finder, subject wise accuracy, learning dashboard"
        url="https://syllab.in/analytics"
      />

      <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary">
              <Activity size={14} />
              Performance intelligence
            </div>
            <h1 className="text-3xl font-black text-slate-900 sm:text-5xl">Analytics Dashboard</h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
              Understand accuracy, weak topics, speed, and weekly progress so practice turns into measurable improvement.
            </p>
          </div>
          <button onClick={() => setTab('arena')} className="rounded-2xl bg-primary px-5 py-4 text-xs font-black uppercase tracking-widest text-white">
            Start Targeted Practice
          </button>
        </div>
      </section>

      {!currentUser ? (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4 text-sm font-bold text-amber-700">
          Login to sync analytics across devices. This view will become more accurate as you complete quizzes.
        </div>
      ) : null}

      {attempts.length === 0 ? (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4 text-sm font-bold text-amber-700">
          No Practice Arena attempts recorded yet. Complete a quiz in Practice Arena and this dashboard will update from your real score.
        </div>
      ) : null}

      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: 'Tracked Attempts', value: attempts.length, icon: Target },
          { label: 'Average Accuracy', value: `${averageAccuracy}%`, icon: CheckCircle2 },
          { label: 'Avg Speed', value: averageSpeed ? `${averageSpeed}s/q` : '0s/q', icon: Clock },
          { label: 'Weak Topics', value: weakChapters.length, icon: AlertTriangle },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-white p-5 shadow-sm">
            <item.icon className="mb-3 text-primary" size={22} />
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</div>
            <div className="mt-1 text-2xl font-black text-slate-900">{item.value}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-200/50">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-black text-slate-900">
            <BarChartIcon /> Subject-wise Accuracy
          </h2>
          <div className="h-72 min-h-[288px] min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={320} minHeight={288}>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="accuracy" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-200/50">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-black text-slate-900">
            <TrendingUp size={18} /> Speed vs Accuracy
          </h2>
          <div className="h-72 min-h-[288px] min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={320} minHeight={288}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="accuracy" stroke="#10B981" strokeWidth={3} />
                <Line type="monotone" dataKey="speed" stroke="#F97316" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50">
          <h2 className="mb-5 text-lg font-black text-slate-900">Weak vs Strong Topics</h2>
          <div className="space-y-3">
            {weakChapters.length > 0 ? weakChapters.map((chapter) => (
              <div key={chapter.chapterId} className="flex items-center justify-between rounded-2xl bg-rose-50 p-4">
                <div>
                  <div className="font-black text-slate-900">{chapter.title}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-rose-500">{chapter.subject}</div>
                </div>
                <div className="text-sm font-black text-rose-600">{chapter.accuracy}% accuracy</div>
              </div>
            )) : (
              <div className="rounded-2xl bg-emerald-50 p-5 text-sm font-bold text-emerald-700">
                No weak topics yet. Take more practice tests to unlock recommendations.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl">
          <Brain className="mb-4 text-primary" size={28} />
          <h2 className="text-xl font-black">AI Weakness Finder</h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-300">{recommendation}</p>
          <button onClick={() => setTab('syllabus')} className="mt-6 w-full rounded-2xl bg-primary px-5 py-4 text-xs font-black uppercase tracking-widest text-white">
            Review Recommended Chapters
          </button>
        </div>
      </section>
    </main>
  );
}

function BarChartIcon() {
  return <Activity size={18} className="text-primary" />;
}
