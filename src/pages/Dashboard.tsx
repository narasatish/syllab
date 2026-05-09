"use client";

import React, { useEffect, useState } from 'react';
import { BarChart3, Clock3, Trophy, AlertCircle, Sparkles, Zap, Star } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { User as FirebaseUser } from 'firebase/auth';
import { getMistakes, getPausedSession, MistakeRecord, QuizSession } from '../lib/firebase';
import { SYLLABUS } from '../data/syllabus';
import { motion, AnimatePresence } from 'motion/react';
import { getUserStats } from '../lib/api';

interface DashboardPageProps {
  currentUser: FirebaseUser | null;
  setTab: (tab: string) => void;
}

function chapterNameFor(chapterId: string | undefined): string {
  if (!chapterId) return 'General';
  const chapter = SYLLABUS.find((c) => c.id === chapterId);
  return chapter?.title || chapterId;
}

export default function DashboardPage({ currentUser, setTab }: DashboardPageProps) {
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([]);
  const [pausedSession, setPausedSession] = useState<QuizSession | null>(null);
  const [leaderboardTab] = useState<'stats' | 'leaderboard'>('stats');

  const defaultStats = {
    xp: 0,
    level: 1,
    accuracy: 0,
    streak: 0,
    rank: "Beginner",
  };

  const [stats, setStats] = useState<any>(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        if (!currentUser) {
          setStats(defaultStats);
          setLoading(false);
          return;
        }

        // ✅ Use central API (was: fetch("http://localhost:5000/..."))
        try {
          const statsData = await getUserStats(currentUser.uid);
          setStats(statsData);
        } catch (err) {
          console.warn("Stats fetch failed, using defaults:", err);
          setStats(defaultStats);
        }

        const [mistakesData, sessionData] = await Promise.all([
          getMistakes(currentUser.uid),
          getPausedSession(currentUser.uid),
        ]);

        setMistakes(mistakesData);

        if (sessionData && sessionData.active !== false) {
          setPausedSession(sessionData);
        }

      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-400">
        Loading stats...
      </div>
    );
  }

  const sortedWeakAreas = Object.entries(
    mistakes.reduce((acc: Record<string, number>, curr) => {
      const key = curr.chapterId || 'general';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {}),
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([chapterId, count]) => [chapterNameFor(chapterId), count] as const);

  const entries: LeaderboardEntry[] = [
    { id: '1', displayName: 'Aarav Sharma', score: 12540, rank: 1, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav' },
    { id: '2', displayName: 'Ishita Gupta', score: 11200, rank: 2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ishita' },
    { id: '3', displayName: 'Vihaan Reddy', score: 10850, rank: 3, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vihaan' },
    { id: '8', displayName: 'You', score: stats.xp, rank: 8, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You' },
  ];

  return (
    <div className="space-y-8 pb-12">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900">
            Academic <span className="text-primary">Standing</span>
          </h2>
          <p className="text-sm text-slate-500">
            Track your performance and compare with the global elite.
          </p>
        </div>
      </div>

      {!currentUser && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-xl text-sm">
          ⚠️ Login to track your performance, XP, accuracy, and streak over time.
        </div>
      )}

      <AnimatePresence mode="wait">
        {leaderboardTab === 'stats' ? (
          <motion.div key="stats" className="space-y-8">

            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              {[
                { label: 'Global Rank', value: stats.rank, icon: Trophy },
                { label: 'XP Score', value: stats.xp, icon: Clock3 },
                { label: 'Lvl', value: stats.level, icon: Star },
                { label: 'Streak', value: `${stats.streak}d`, icon: Zap },
                { label: 'Accuracy', value: `${stats.accuracy}%`, icon: BarChart3 },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border text-center">
                  <stat.icon className="mx-auto mb-2 text-primary" size={20} />
                  <div className="text-xs text-gray-400">{stat.label}</div>
                  <div className="text-xl font-bold">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              <div className="lg:col-span-2 space-y-6">

                {pausedSession && (
                  <div className="bg-black text-white p-6 rounded-2xl flex justify-between items-center">
                    <div>
                      Resume from question {pausedSession.currentIndex + 1}
                    </div>
                    <button
                      onClick={() => setTab('arena')}
                      className="bg-green-500 px-4 py-2 rounded"
                    >
                      Resume
                    </button>
                  </div>
                )}

                <div className="bg-white p-6 rounded-2xl">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <AlertCircle size={18} /> Focus Areas
                  </h3>

                  {sortedWeakAreas.length > 0 ? (
                    sortedWeakAreas.map(([chapter, count], i) => (
                      <div key={i} className="flex justify-between py-2">
                        <span>{chapter}</span>
                        <span>{count} mistakes</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 text-center">
                      No weaknesses detected. Keep studying!
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Sparkles size={18} /> AI Recommendation
                  </h3>
                  <p className="text-sm text-gray-600">
                    Improve your weakest topic to boost your performance.
                  </p>
                </div>

                <button
                  onClick={() => setTab('arena')}
                  className="mt-4 w-full py-2 bg-black text-white rounded"
                >
                  Start Practice
                </button>
              </div>

            </div>
          </motion.div>
        ) : (
          <motion.div key="leaderboard" className="bg-white p-6 rounded-2xl">
            <h3 className="text-center font-bold mb-4">Leaderboard</h3>
            {entries.map((entry, i) => (
              <div key={i} className="flex justify-between py-2">
                <span>{entry.displayName}</span>
                <span>{entry.score}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
