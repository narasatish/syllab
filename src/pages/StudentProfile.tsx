import React from 'react';
import { Copy, Flame, Share2, Star, Trophy, UserRound } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import SEO from '../components/SEO';
import { UserStats } from '../types';

interface StudentProfileProps {
  currentUser: FirebaseUser | null;
  stats: UserStats;
  setTab: (tab: string) => void;
}

export default function StudentProfilePage({ currentUser, stats, setTab }: StudentProfileProps) {
  const inviteUrl = `https://YOUR_DOMAIN_HERE/?ref=${currentUser?.uid || 'student'}`;
  const shareText = `I am learning on Syllab with ${stats.xp} XP and a ${stats.streak}-day streak. Join me: ${inviteUrl}`;
  const [copied, setCopied] = React.useState(false);

  const copyInvite = async () => {
    await navigator.clipboard?.writeText(inviteUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const shareProfile = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'My Syllab Progress', text: shareText, url: inviteUrl });
      return;
    }
    await copyInvite();
  };

  return (
    <main className="space-y-8 pb-12">
      <SEO
        title="Student Profile, Referrals and Learning Stats"
        description="View student profile stats, XP, streaks, badges, referrals, and share learning achievements from Syllab."
        keywords="student profile, learning stats, referral system, streak achievements"
        url="https://YOUR_DOMAIN_HERE/profile"
      />

      <section className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-2xl sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-white">
              <UserRound size={34} />
            </div>
            <div>
              <h1 className="text-3xl font-black">{currentUser?.displayName || currentUser?.email || 'Student Profile'}</h1>
              <p className="mt-2 text-sm font-medium text-slate-300">Share progress, invite friends, and keep your learning streak alive.</p>
            </div>
          </div>
          <button onClick={() => void shareProfile()} className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-xs font-black uppercase tracking-widest text-white">
            <Share2 size={16} /> Share Profile
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: 'XP', value: stats.xp, icon: Trophy },
          { label: 'Level', value: stats.level, icon: Star },
          { label: 'Streak', value: `${stats.streak}d`, icon: Flame },
          { label: 'Rank', value: stats.rank, icon: UserRound },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <item.icon className="mx-auto mb-3 text-primary" size={24} />
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</div>
            <div className="mt-1 text-2xl font-black text-slate-900">{item.value}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50">
          <h2 className="text-2xl font-black text-slate-900">Referral Invite</h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
            Invite friends to practice daily challenges and compare scores on the public leaderboard.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input value={inviteUrl} readOnly className="min-w-0 flex-1 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600" />
            <button onClick={() => void copyInvite()} className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-xs font-black uppercase tracking-widest text-white">
              <Copy size={16} /> {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50">
          <h2 className="text-2xl font-black text-slate-900">Badges</h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              stats.streak >= 3 ? 'Streak Starter' : 'Start a 3-day streak',
              stats.xp >= 250 ? 'Apprentice' : 'Reach 250 XP',
              stats.xp >= 750 ? 'Explorer' : 'Reach 750 XP',
              'Daily Dose Finisher',
            ].map((badge) => (
              <div key={badge} className="rounded-2xl bg-emerald-50 p-4 text-sm font-black text-emerald-700">
                {badge}
              </div>
            ))}
          </div>
          <button onClick={() => setTab('daily')} className="mt-5 w-full rounded-2xl bg-primary px-5 py-4 text-xs font-black uppercase tracking-widest text-white">
            Earn More Badges
          </button>
        </div>
      </section>
    </main>
  );
}
