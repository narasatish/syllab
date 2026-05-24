import React from 'react';
import { Activity, AlertTriangle, Brain, CheckCircle2, Clock, Target, TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { User as FirebaseUser } from 'firebase/auth';
import SEO from '../components/SEO';
import { getPracticeAttempts, PracticeAttempt } from '../lib/practiceAnalytics';
import { getMockAttempts, MockAttempt } from '../lib/mockTestAnalytics';
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
  const [mockAttempts, setMockAttempts] = React.useState<MockAttempt[]>([]);
  const [reviewAttempt, setReviewAttempt] = React.useState<MockAttempt | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setAttempts(getPracticeAttempts(currentUser?.uid || null));
    setMockAttempts(getMockAttempts(currentUser?.uid || null));
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

      {reviewAttempt ? (
        <MockReviewModal attempt={reviewAttempt} onClose={() => setReviewAttempt(null)} />
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

      <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900">Mock Test Analysis</h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Submitted full mocks are saved here with answers and solutions.
            </p>
          </div>
          <button onClick={() => setTab('mock_tests')} className="rounded-2xl bg-slate-900 px-5 py-3 text-xs font-black uppercase tracking-widest text-white">
            Open Mock Tests
          </button>
        </div>
        {mockAttempts.length > 0 ? (
          <div className="space-y-3">
            {mockAttempts.slice(0, 5).map((attempt) => {
              const accuracy = Math.round((attempt.correct / Math.max(1, attempt.questions.length)) * 100);
              return (
                <div key={attempt.id} className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-black text-slate-900">{attempt.title}</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      {new Date(attempt.completedAt).toLocaleString()} Â· {attempt.exam}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="text-sm font-black text-primary">{attempt.score}/{attempt.maxScore}</div>
                    <div className="text-sm font-black text-slate-600">{accuracy}% accuracy</div>
                    <button
                      type="button"
                      onClick={() => setReviewAttempt(attempt)}
                      className="rounded-xl bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-700 shadow-sm"
                    >
                      Review
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl bg-slate-50 p-5 text-sm font-bold text-slate-500">
            No mock test attempts yet. Submit the JEE mock once and this section will show score, accuracy, and full solution review.
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-200/50">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-black text-slate-900">
            <BarChartIcon /> Subject-wise Accuracy
          </h2>
          <div className="h-72 min-h-[288px] min-w-0 overflow-hidden">
            <ResponsiveContainer width="100%" height={288}>
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
          <div className="h-72 min-h-[288px] min-w-0 overflow-hidden">
            <ResponsiveContainer width="100%" height={288}>
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

function MockReviewModal({ attempt, onClose }: { attempt: MockAttempt; onClose: () => void }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const question = attempt.questions[activeIndex];
  const selected = attempt.answers[question.id];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex max-h-[90dvh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900">{attempt.title}</h2>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Score {attempt.score}/{attempt.maxScore} Â· Correct {attempt.correct} Â· Incorrect {attempt.incorrect}
            </p>
          </div>
          <button onClick={onClose} className="rounded-2xl bg-slate-100 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600">
            Close
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_280px]">
          <div className="overflow-y-auto p-5 sm:p-7">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
                {question.subject}
              </span>
              {question.chapter ? (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {question.chapter}
                </span>
              ) : null}
            </div>
            <h3 className="text-[17px] font-semibold leading-7 text-slate-900">
              {activeIndex + 1}. {question.question}
            </h3>
            <div className="mt-5 grid gap-3">
              {question.options.map((option, optionIndex) => {
                const correct = question.correctAnswer === optionIndex;
                const wrong = selected === optionIndex && !correct;
                return (
                  <div
                    key={`${question.id}-${optionIndex}`}
                    className={[
                      'rounded-2xl border p-4 text-sm font-medium leading-6',
                      correct ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : '',
                      wrong ? 'border-rose-500 bg-rose-50 text-rose-700' : '',
                      !correct && !wrong ? 'border-slate-100 bg-slate-50 text-slate-600' : '',
                    ].join(' ')}
                  >
                    {String.fromCharCode(65 + optionIndex)}. {option}
                  </div>
                );
              })}
            </div>
            <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-sm font-medium leading-7 text-slate-600">
              <div className="mb-2 font-black text-slate-900">
                Your answer: {selected === undefined ? 'Not answered' : String.fromCharCode(65 + selected)} Â· Correct answer: {String.fromCharCode(65 + question.correctAnswer)}
              </div>
              {question.explanation}
            </div>
          </div>

          <aside className="border-t border-slate-100 p-5 lg:border-l lg:border-t-0">
            <div className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Question Review</div>
            <div className="grid max-h-[60dvh] grid-cols-5 gap-2 overflow-y-auto pr-1">
              {attempt.questions.map((item, index) => {
                const isCorrect = attempt.answers[item.id] === item.correctAnswer;
                const isAnswered = attempt.answers[item.id] !== undefined;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={[
                      'flex aspect-square items-center justify-center rounded-xl text-xs font-black',
                      !isAnswered ? 'bg-slate-100 text-slate-500' : isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white',
                      activeIndex === index ? 'ring-2 ring-slate-900 ring-offset-2' : '',
                    ].join(' ')}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
