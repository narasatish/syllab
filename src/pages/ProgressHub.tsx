import React from 'react';
import { Activity } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import SEO from '../components/SEO';

const AnalyticsPage = React.lazy(() => import('./Analytics'));

interface ProgressHubPageProps {
  currentUser: FirebaseUser | null;
  setTab: (tab: string) => void;
}

export default function ProgressHubPage({ currentUser, setTab }: ProgressHubPageProps) {
  return (
    <main className="space-y-8 pb-12">
      <SEO
        title="Progress Hub with Analytics and Rankings"
        description="Track student analytics, weak topics, XP, paused quizzes, and learning progress in one dashboard."
        keywords="student progress dashboard, learning analytics, weak topic finder"
        url="https://YOUR_DOMAIN_HERE/progress"
      />

      <section className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary">
              <Activity size={14} />
              Progress analytics
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">Progress Hub</h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
              Review accuracy, weak topics, speed, and study recommendations in one place.
            </p>
          </div>
        </div>
      </section>

      <React.Suspense fallback={<div className="rounded-2xl bg-white p-8 text-center text-sm font-bold text-slate-400">Loading progress...</div>}>
        <AnalyticsPage currentUser={currentUser} setTab={setTab} />
      </React.Suspense>
    </main>
  );
}
