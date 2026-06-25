import React, { useState, useEffect } from 'react';
import { Medal, Crown, Star, TrendingUp, ChevronRight, MapPin, Target, Trophy, BarChart3, Clock, Zap, Activity, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { LeaderboardEntry, UserStats } from '../types';
import { cn } from '../lib/utils';
import { auth } from '../lib/firebase';

interface LeaderboardPageProps {
  currentUserStats: UserStats;
  onLoginClick?: () => void; // optional — parent can wire up to its login flow/modal
}

export default function LeaderboardPage({ currentUserStats, onLoginClick }: LeaderboardPageProps) {
  // ===== AUTH GATE =====
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  const [entries] = useState<LeaderboardEntry[]>([
    { id: '1', displayName: 'Aarav Sharma', score: 12540, rank: 1, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav' },
    { id: '2', displayName: 'Ishita Gupta', score: 11200, rank: 2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ishita' },
    { id: '3', displayName: 'Vihaan Reddy', score: 10850, rank: 3, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vihaan' },
    { id: '4', displayName: 'Ananya Iyer', score: 9940, rank: 4, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya' },
    { id: '5', displayName: 'Sahil Kapoor', score: 9200, rank: 5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sahil' },
    { id: '6', displayName: 'Meera Das', score: 8750, rank: 6, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera' },
    { id: '7', displayName: 'Arjun Verma', score: 8100, rank: 7, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun' },
    { id: '8', displayName: 'Syllab Learner', score: 7950, rank: 8, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Syllab' },
  ]);

  const [filter, setFilter] = useState<'All' | 'Weekly' | 'Monthly'>('Monthly');
  const [locationFilter, setLocationFilter] = useState<'India' | 'State' | 'City'>('India');

  // ===== LOADING STATE (auth still checking) =====
  if (!authChecked) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-emerald-100 border-t-primary animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Standing</p>
        </div>
      </div>
    );
  }

  // ===== LOGGED-OUT STATE =====
  if (!user) {
    return (
      <div className="space-y-12 pb-24">
        <section className="relative pt-8">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
              <Lock size={12} />
              Sign in required
            </div>
            <h2 className="text-6xl font-heading font-black text-secondary tracking-tight">
              Performance <span className="italic-serif text-primary">Intelligence</span>
            </h2>
          </div>

          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/30 p-12 md:p-16 text-center space-y-8">
              {/* Icon */}
              <div className="mx-auto w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center">
                <Trophy className="text-primary" size={36} />
              </div>

              {/* Heading */}
              <div className="space-y-3">
                <h3 className="text-3xl md:text-4xl font-heading font-black text-secondary tracking-tight">
                  Your stats are waiting.
                </h3>
                <p className="text-base text-slate-500 max-w-md mx-auto leading-relaxed">
                  Sign in to track your accuracy, level up, climb the leaderboard, and compare with the global elite.
                </p>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 text-slate-600 font-bold text-xs">
                  <Target size={14} className="text-primary" /> Personal accuracy
                </div>
                <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 text-slate-600 font-bold text-xs">
                  <Zap size={14} className="text-accent" /> XP & levels
                </div>
                <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 text-slate-600 font-bold text-xs">
                  <TrendingUp size={14} className="text-primary" /> Daily streak
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <button
                  onClick={() => {
                    if (onLoginClick) onLoginClick();
                    else window.location.href = '/login';
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
                >
                  Sign in to continue
                  <ChevronRight size={16} />
                </button>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-4">
                  New here? Signing up takes 30 seconds.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ===== LOGGED-IN STATE (existing UI, untouched) =====
  return (
    <div className="space-y-12 pb-24">
      {/* SECTION 1: PERFORMANCE DASHBOARD OVERLAY */}
      <section className="relative pt-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
            <Activity size={12} className="animate-pulse" />
            Live Neural Standings
          </div>
          <h2 className="text-6xl font-heading font-black text-secondary tracking-tight">Performance <span className="italic-serif text-primary">Intelligence</span></h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">
          {/* Main Standing Card */}
          <div className="lg:col-span-8 bg-secondary rounded-[3rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 group-hover:scale-110 transition-transform duration-700">
               <Trophy size={300} />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Global Standing</p>
                  <div className="flex items-end gap-4">
                    <h3 className="text-8xl font-heading font-black leading-none tracking-tighter">#254</h3>
                    <div className="mb-2 space-y-1">
                      <p className="text-xs font-bold text-slate-400">Total Scholars</p>
                      <p className="text-lg font-black text-white">12,504</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                   <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
                     <TrendingUp size={16} /> +12 Spots
                   </div>
                   <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 text-slate-300 font-black text-xs uppercase tracking-widest">
                     <Clock size={16} /> 1.2h / Day
                   </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 space-y-6">
                 <div className="flex items-center justify-between">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Score Velocity</p>
                   <BarChart3 size={16} className="text-primary" />
                 </div>
                 {/* Trend Graph Placeholder (SVG) */}
                 <div className="h-24 w-full flex items-end gap-1 px-2">
                    {[40, 25, 60, 45, 80, 55, 90, 70, 100].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className={cn(
                          "flex-1 rounded-t-sm transition-all duration-500",
                          i === 8 ? "bg-primary shadow-[0_-5px_15px_rgba(16,185,129,0.5)]" : "bg-white/20"
                        )}
                      />
                    ))}
                 </div>
                 <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">
                    <span>Mon</span>
                    <span>Today</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Column */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl flex items-center gap-6 group hover:translate-x-2 transition-all">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Target size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Overall Accuracy</p>
                  <p className="text-3xl font-black text-secondary tracking-tighter">88.4%</p>
                </div>
             </div>
             
             <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl flex items-center gap-6 group hover:translate-x-2 transition-all">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <Zap size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Level Progress</p>
                  <p className="text-3xl font-black text-secondary tracking-tighter">Lvl 24 <span className="text-sm font-bold text-slate-300 ml-2">PRO</span></p>
                </div>
             </div>

             <div className="bg-primary rounded-[2.5rem] p-8 text-white shadow-2xl shadow-emerald-500/20 group cursor-pointer overflow-hidden relative">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                  <Star size={100} />
                </div>
                <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2">Daily Streak</p>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-black tracking-tighter">{currentUserStats.streak || 14} Days</span>
                    <div className="h-6 w-px bg-white/20" />
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all">Claim Bonus</button>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DYNAMIC LEADERBOARD */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
           <h3 className="text-3xl font-heading font-black text-secondary">Global <span className="italic text-primary">Arena</span></h3>
           <div className="flex flex-wrap gap-4 items-center">
              <div className="p-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex">
                {(['Weekly', 'Monthly', 'All'] as const).map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                      filter === f ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:text-primary"
                    )}
                  >{f}</button>
                ))}
              </div>
              <div className="p-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex">
                {(['India', 'State', 'City'] as const).map(l => (
                  <button 
                    key={l}
                    onClick={() => setLocationFilter(l)}
                    className={cn(
                      "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                      locationFilter === l ? "bg-secondary text-white shadow-lg" : "text-slate-400 hover:text-secondary"
                    )}
                  >
                    <MapPin size={10} /> {l}
                  </button>
                ))}
              </div>
           </div>
        </div>

        {/* Podium Displays */}
        <div className="flex items-end justify-center gap-4 py-12">
            {/* Index 1 - Silver */}
            <div className="flex flex-col items-center">
               <motion.div 
                 whileHover={{ y: -10 }}
                 className="relative mb-6"
               >
                  <div className="w-20 h-20 rounded-3xl ring-4 ring-slate-100 overflow-hidden shadow-2xl bg-white">
                    <img loading="lazy" decoding="async" src={entries[1].avatar} alt="" />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-400 border-4 border-white rounded-full flex items-center justify-center text-white font-black text-xs">2</div>
               </motion.div>
               <div className="w-28 h-28 bg-white/50 rounded-t-[2.5rem] border-x border-t border-slate-100 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-black text-slate-400 tracking-widest mb-1">XP</span>
                  <span className="text-lg font-black text-slate-800">11.2k</span>
               </div>
            </div>

            {/* Index 0 - Gold */}
            <div className="flex flex-col items-center">
               <motion.div 
                 whileHover={{ y: -10 }}
                 className="relative mb-6"
               >
                  <Crown className="absolute -top-12 left-1/2 -translate-x-1/2 text-primary w-12 h-12" />
                  <div className="w-28 h-28 rounded-[3rem] ring-8 ring-emerald-50 overflow-hidden shadow-2xl bg-white">
                    <img loading="lazy" decoding="async" src={entries[0].avatar} alt="" />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary border-4 border-white rounded-full flex items-center justify-center text-white font-black">1</div>
               </motion.div>
               <div className="w-36 h-48 bg-emerald-500 shadow-[inset_0_4px_20px_rgba(16,185,129,0.1)] rounded-t-[3.5rem] border-x border-t border-emerald-100 flex flex-col items-center justify-center">
                  <Medal className="text-white mb-2" size={40} />
                  <span className="text-[10px] font-black text-white/70 tracking-widest leading-none mb-1">CHAMPION</span>
                  <span className="text-2xl font-black text-white italic-serif leading-none">12.5k</span>
               </div>
            </div>

            {/* Index 2 - Bronze */}
            <div className="flex flex-col items-center">
               <motion.div 
                 whileHover={{ y: -10 }}
                 className="relative mb-6"
               >
                  <div className="w-20 h-20 rounded-3xl ring-4 ring-orange-50 overflow-hidden shadow-2xl bg-white">
                    <img loading="lazy" decoding="async" src={entries[2].avatar} alt="" />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-accent border-4 border-white rounded-full flex items-center justify-center text-white font-black text-xs">3</div>
               </motion.div>
               <div className="w-28 h-24 bg-orange-50/50 rounded-t-[2.5rem] border-x border-t border-orange-100 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-black text-accent tracking-widest mb-1">XP</span>
                  <span className="text-lg font-black text-orange-600">10.8k</span>
               </div>
            </div>
        </div>

        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/20 overflow-hidden">
           <div className="divide-y divide-slate-50">
             {entries.map((entry, idx) => (
                <div key={entry.id} className={cn(
                  "p-8 flex items-center gap-8 group hover:bg-slate-50/50 transition-all cursor-default",
                  entry.displayName === 'Syllab Learner' && "bg-emerald-50 hover:bg-emerald-50"
                )}>
                   <div className="w-12 shrink-0 text-center">
                      <span className={cn(
                        "text-xl font-black",
                        idx < 3 ? "text-primary" : "text-slate-300"
                      )}>#{entry.rank}</span>
                   </div>
                   <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                      <img loading="lazy" decoding="async" src={entry.avatar} alt="" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-black text-secondary flex items-center gap-3 truncate">
                        {entry.displayName}
                        {entry.displayName === 'Syllab Learner' && (
                          <span className="px-2 py-0.5 bg-secondary text-white text-[8px] font-black rounded uppercase tracking-[0.2em] shadow-sm">You</span>
                        )}
                        {idx < 3 && <Star size={14} className="text-amber-400 fill-amber-400" />}
                      </h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-2">
                        {idx === 0 ? "Academic Grandmaster" : idx < 5 ? "Elite Scholar" : "Rising Star"}
                        <span className="text-slate-200">•</span>
                        <span className="flex items-center gap-1"><MapPin size={10} /> Delhi, IN</span>
                      </p>
                   </div>
                   <div className="hidden sm:flex flex-col items-end shrink-0 gap-1 min-w-[80px]">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accuracy</p>
                      <div className="flex items-center gap-2">
                         <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-primary" />
                         </div>
                         <span className="text-xs font-black text-slate-700">85%</span>
                      </div>
                   </div>
                   <div className="text-right shrink-0 min-w-[100px]">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">XP Score</p>
                      <p className="text-xl font-black text-secondary tabular-nums italic-serif">{entry.score.toLocaleString()}</p>
                   </div>
                </div>
             ))}
           </div>
           
           <div className="p-10 bg-slate-50/50 text-center border-t border-slate-50">
               <button className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary hover:border-primary/30 hover:-translate-y-0.5 transition-all shadow-sm group">
                  Load Entire Global Taxonomy
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </button>
           </div>
        </div>
      </section>
    </div>
  );
}