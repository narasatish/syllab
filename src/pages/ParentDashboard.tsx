import React, { useState, useEffect, useCallback, useRef } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  collection, query, where, getDocs, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, serverTimestamp, onSnapshot,
} from 'firebase/firestore';
import {
  UserPlus, Users, Trophy, Flame, BookOpen, Trash2, Mail, ChevronRight, AlertCircle, CheckCircle2, ClipboardList, Share2, ChevronDown, ChevronUp, Calendar,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { db } from '../lib/firebase';
import { subscribeWeeklyStudyMinutes } from '../lib/studyStats';
import { encodeExamConfig } from '../lib/examCode';
import SEO from '../components/SEO';

interface ParentDashboardProps {
  currentUser: FirebaseUser | null;
  setTab: (tab: string) => void;
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

interface ActivityEvent {
  id: string;
  type: string;
  title: string;
  subject?: string | null;
  classLevel?: string | null;
  score?: number | null;
  total?: number | null;
  percentage?: number | null;
  xpGained?: number;
  createdAt?: { toDate?: () => Date } | null;
}

interface LinkedChild {
  uid: string;
  email: string;
  displayName: string;
  xp?: number;
  streak?: number;
  rank?: string;
  completedTopics?: number;
  examResults?: ExamResult[];
  activityEvents?: ActivityEvent[];
  totalActivities?: number;
  studyMinutesThisWeek?: number;
}

/* ─── Helpers — look up a user by email and write/read parent links ─────── */
async function findUserByEmail(email: string) {
  const q = query(collection(db, 'users'), where('email', '==', email.toLowerCase().trim()));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { uid: d.id, ...d.data() } as any;
}

async function loadParentDoc(parentUid: string): Promise<string[]> {
  const ref = doc(db, 'parents', parentUid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return [];
  return (snap.data().childUids as string[]) || [];
}

async function linkChild(parentUid: string, parentEmail: string, childUid: string) {
  const parentRef = doc(db, 'parents', parentUid);
  const snap = await getDoc(parentRef);
  if (snap.exists()) {
    await updateDoc(parentRef, { childUids: arrayUnion(childUid) });
  } else {
    await setDoc(parentRef, { email: parentEmail, childUids: [childUid], createdAt: Date.now() });
  }
  // Write parentId on child's user doc — allowed by Firestore rules for the parent field only
  try {
    await updateDoc(doc(db, 'users', childUid), { parentId: parentUid, updatedAt: serverTimestamp() });
  } catch {
    // Non-fatal: child profile will still show; parentId sync is best-effort
  }
}

async function unlinkChild(parentUid: string, childUid: string) {
  await updateDoc(doc(db, 'parents', parentUid), { childUids: arrayRemove(childUid) });
  try {
    await updateDoc(doc(db, 'users', childUid), { parentId: null, updatedAt: serverTimestamp() });
  } catch {/* non-fatal: parent.children was already updated */}
}

function buildWeeklyReportText(children: LinkedChild[]): string {
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  const dateStr = weekStart.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const lines: string[] = [`📊 Syllab Weekly Report — Week of ${dateStr}\n`];
  children.forEach((child) => {
    lines.push(`👤 ${child.displayName} (${child.email})`);
    lines.push(`  • XP Earned: ${child.xp || 0}`);
    lines.push(`  • Learning Streak: ${child.streak || 0} days`);
    lines.push(`  • Topics Completed: ${child.completedTopics || 0}`);
    const recent = (child.examResults || []).slice(0, 3);
    if (recent.length > 0) {
      lines.push(`  • Recent Exams:`);
      recent.forEach((r) => {
        const pct = r.percentage ?? (r.total > 0 ? Math.round((r.score / r.total) * 100) : 0);
        lines.push(`    - ${r.title}: ${pct}% (${r.score}/${r.total})`);
      });
    }
    lines.push('');
  });
  lines.push('View full progress at https://syllab.in');
  return lines.join('\n');
}

export default function ParentDashboardPage({ currentUser, setTab }: ParentDashboardProps) {
  const [children, setChildren] = useState<LinkedChild[]>([]);
  const [loading, setLoading] = useState(true);
  const [childEmail, setChildEmail] = useState('');
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [expandedChild, setExpandedChild] = useState<string | null>(null);
  // Create Exam for Child
  const [examClass, setExamClass] = useState('10');
  const [examSubjects, setExamSubjects] = useState<string[]>(['Mathematics']);
  const [examLevel, setExamLevel] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [examCount, setExamCount] = useState(20);
  const [examCode, setExamCode] = useState<string | null>(null);

  const subjectsByClass: Record<string, string[]> = {
    '5': ['Mathematics', 'Science', 'English', 'Social Science'],
    '6': ['Mathematics', 'Science', 'English', 'Social Science'],
    '7': ['Mathematics', 'Science', 'English', 'Social Science'],
    '8': ['Mathematics', 'Science', 'English', 'Social Science'],
    '9': ['Mathematics', 'Science', 'English', 'Social Science', 'Hindi'],
    '10': ['Mathematics', 'Science', 'English', 'Social Science', 'Hindi'],
    '11': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'],
    '12': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'],
  };

  const generateExamCode = async () => {
    const config = { class: examClass, subjects: examSubjects, level: examLevel, count: examCount };
    const code = encodeExamConfig(config);
    setExamCode(code);
    const url = `${window.location.origin}/exams?code=${code}`;
    navigator.clipboard?.writeText(url).catch(() => undefined);
    // Save code to Firestore so students can join without the full URL
    try {
      await setDoc(doc(db, 'examCodes', code), {
        ...config,
        createdBy: currentUser?.email || 'parent',
        createdAt: serverTimestamp(),
      });
    } catch { /* non-fatal */ }
  };

  // Holds per-child onSnapshot unsubscribers so we can clean them up
  const examUnsubsRef = useRef<(() => void)[]>([]);
  const profileUnsubsRef = useRef<(() => void)[]>([]);
  const activityUnsubsRef = useRef<(() => void)[]>([]);
  const progressUnsubsRef = useRef<(() => void)[]>([]);
  const studyMinutesUnsubsRef = useRef<(() => void)[]>([]);

  /** Re-usable: load basic profile for a child uid (one-time fetch — used for initial render) */
  const loadChildProfile = async (uid: string): Promise<Omit<LinkedChild, 'examResults'> | null> => {
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (!snap.exists()) return null;
      const d = snap.data() as any;
      return {
        uid,
        email: d.email || '',
        displayName: d.displayName || d.email?.split('@')[0] || 'Student',
        xp: d.xp || 0,
        streak: d.streak || 0,
        rank: d.rank || 'Rookie',
        completedTopics: Array.isArray(d.completedTopics) ? d.completedTopics.length : (d.completedTopicsCount || 0),
      };
    } catch { return null; }
  };

  /** Wire up real-time onSnapshot listeners for each child's PROFILE (xp/streak/topics) */
  const subscribeChildProfiles = useCallback((uids: string[]) => {
    // Tear down previous listeners
    profileUnsubsRef.current.forEach(u => u());
    profileUnsubsRef.current = [];

    for (const uid of uids) {
      const unsub = onSnapshot(doc(db, 'users', uid), (snap) => {
        if (!snap.exists()) return;
        const d = snap.data() as any;
        setChildren((prev) =>
          prev.map((c) =>
            c.uid === uid
              ? {
                  ...c,
                  email: d.email || c.email,
                  displayName: d.displayName || d.email?.split('@')[0] || c.displayName,
                  xp: d.xp || 0,
                  streak: d.streak || 0,
                  rank: d.rank || 'Rookie',
                  completedTopics: Array.isArray(d.completedTopics)
                    ? d.completedTopics.length
                    : (d.completedTopicsCount || 0),
                }
              : c,
          ),
        );
      }, () => {/* listener error — non-fatal */});
      profileUnsubsRef.current.push(unsub);
    }
  }, []);

  /** Wire up real-time onSnapshot listeners for each child's exam results */
  const subscribeExamResults = useCallback((uids: string[]) => {
    // Tear down previous listeners
    examUnsubsRef.current.forEach(u => u());
    examUnsubsRef.current = [];

    for (const uid of uids) {
      const q = query(collection(db, 'examResults'), where('userId', '==', uid));
      const unsub = onSnapshot(q, (snap) => {
        const results: ExamResult[] = snap.docs
          .map((r) => ({ id: r.id, ...(r.data() as any) } as ExamResult))
          .sort((a, b) => {
            const ta = a.completedAt?.toDate?.()?.getTime() ?? 0;
            const tb = b.completedAt?.toDate?.()?.getTime() ?? 0;
            return tb - ta;
          })
          .slice(0, 10);
        // Merge into children state — updates this child only, doesn't re-fetch others
        setChildren((prev) =>
          prev.map((c) => (c.uid === uid ? { ...c, examResults: results } : c)),
        );
      }, () => {/* listener error — non-fatal */});
      examUnsubsRef.current.push(unsub);
    }
  }, []);

  /** Wire up real-time onSnapshot for each child's activityEvents (live feed) */
  const subscribeActivityEvents = useCallback((uids: string[]) => {
    activityUnsubsRef.current.forEach(u => u());
    activityUnsubsRef.current = [];

    for (const uid of uids) {
      const q = query(collection(db, 'activityEvents'), where('uid', '==', uid));
      const unsub = onSnapshot(q, (snap) => {
        const events: ActivityEvent[] = snap.docs
          .map((d) => ({ id: d.id, ...(d.data() as any) } as ActivityEvent))
          .sort((a, b) => {
            const ta = a.createdAt?.toDate?.()?.getTime() ?? 0;
            const tb = b.createdAt?.toDate?.()?.getTime() ?? 0;
            return tb - ta;
          })
          .slice(0, 20);
        setChildren((prev) => prev.map((c) => (c.uid === uid ? { ...c, activityEvents: events } : c)));
      }, () => {/* listener error — non-fatal */});
      activityUnsubsRef.current.push(unsub);
    }
  }, []);

  /** Subscribe to progress/{uid} aggregate counters */
  const subscribeProgressSummaries = useCallback((uids: string[]) => {
    progressUnsubsRef.current.forEach(u => u());
    progressUnsubsRef.current = [];

    for (const uid of uids) {
      const unsub = onSnapshot(doc(db, 'progress', uid), (snap) => {
        if (!snap.exists()) return;
        const d = snap.data() as any;
        setChildren((prev) =>
          prev.map((c) =>
            c.uid === uid ? { ...c, totalActivities: d.totalActivities ?? 0 } : c,
          ),
        );
      }, () => {/* non-fatal */});
      progressUnsubsRef.current.push(unsub);
    }
  }, []);

  /** Subscribe to each child's current-week study minutes (from the Study Room). */
  const subscribeStudyMinutes = useCallback((uids: string[]) => {
    studyMinutesUnsubsRef.current.forEach(u => u());
    studyMinutesUnsubsRef.current = [];
    for (const uid of uids) {
      const unsub = subscribeWeeklyStudyMinutes(uid, (minutes) => {
        setChildren((prev) => prev.map((c) => (c.uid === uid ? { ...c, studyMinutesThisWeek: minutes } : c)));
      });
      studyMinutesUnsubsRef.current.push(unsub);
    }
  }, []);

  const refresh = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const uids = await loadParentDoc(currentUser.uid);
      if (uids.length === 0) {
        setChildren([]);
        examUnsubsRef.current.forEach(u => u());
        examUnsubsRef.current = [];
        profileUnsubsRef.current.forEach(u => u());
        profileUnsubsRef.current = [];
        activityUnsubsRef.current.forEach(u => u());
        activityUnsubsRef.current = [];
        progressUnsubsRef.current.forEach(u => u());
        progressUnsubsRef.current = [];
        studyMinutesUnsubsRef.current.forEach(u => u());
        studyMinutesUnsubsRef.current = [];
        return;
      }

      // Load basic profiles for all children
      const profiles = await Promise.all(uids.map(loadChildProfile));
      const loaded: LinkedChild[] = profiles
        .filter(Boolean)
        .map((p) => ({ ...(p as Omit<LinkedChild, 'examResults'>), examResults: [], activityEvents: [] }));
      setChildren(loaded);

      // Start real-time listeners — profile + exams + activityEvents + progress
      subscribeChildProfiles(uids);
      subscribeExamResults(uids);
      subscribeActivityEvents(uids);
      subscribeProgressSummaries(uids);
      subscribeStudyMinutes(uids);
    } finally {
      setLoading(false);
    }
  }, [currentUser, subscribeChildProfiles, subscribeExamResults, subscribeActivityEvents, subscribeProgressSummaries, subscribeStudyMinutes]);

  useEffect(() => { void refresh(); }, [refresh]);

  // Clean up all listeners when component unmounts
  useEffect(() => {
    return () => {
      examUnsubsRef.current.forEach(u => u());
      profileUnsubsRef.current.forEach(u => u());
      activityUnsubsRef.current.forEach(u => u());
      progressUnsubsRef.current.forEach(u => u());
      studyMinutesUnsubsRef.current.forEach(u => u());
    };
  }, []);

  const handleAddChild = async () => {
    if (!currentUser || !childEmail.trim()) return;
    setAdding(true);
    setMessage(null);
    setInviteLink(null);
    const email = childEmail.trim().toLowerCase();
    try {
      const childUser = await findUserByEmail(email);
      if (!childUser) {
        // Child doesn't have an account yet — show an invitation link
        const invite = `${window.location.origin}/?invite=${encodeURIComponent(btoa(JSON.stringify({ parentUid: currentUser.uid, parentEmail: currentUser.email, childEmail: email })))}`;
        setInviteLink(invite);
        setMessage({ type: 'error', text: `No Syllab account found for ${email}. Share the invitation link below — once they sign up, run this again to link accounts.` });
        return;
      }
      if (childUser.uid === currentUser.uid) {
        setMessage({ type: 'error', text: 'You cannot link your own account as a child.' });
        return;
      }
      await linkChild(currentUser.uid, currentUser.email || '', childUser.uid);
      setMessage({ type: 'success', text: `Successfully linked ${childUser.displayName || email}!` });
      setChildEmail('');
      await refresh();
    } catch (err: any) {
      const msg = err?.message || '';
      if (msg.includes('permission') || msg.includes('PERMISSION_DENIED')) {
        setMessage({ type: 'error', text: 'Permission denied — please deploy the updated Firestore rules first (firestore.rules in the project root).' });
      } else {
        setMessage({ type: 'error', text: msg || 'Could not link child. Try again.' });
      }
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveChild = async (uid: string) => {
    if (!currentUser) return;
    if (!confirm('Unlink this child from your dashboard?')) return;
    try {
      await unlinkChild(currentUser.uid, uid);
      await refresh();
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Could not unlink: ' + (err?.message || '') });
    }
  };

  if (!currentUser) {
    return (
      <main className="space-y-10 pb-12">
        <SEO
          title="Parent Hub — Track Your Child's Learning | Syllab.in"
          description="Free parent portal: link your child's account and see XP, streaks, completed topics, and weak areas. Built for CBSE Classes 5–12."
          keywords="parent dashboard syllab, track child learning, cbse parent portal, student progress tracker, parental controls"
          url="https://syllab.in/parent"
        />

        {/* Hero */}
        <section className="rounded-[2rem] bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-10 text-white shadow-2xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-black uppercase tracking-widest mb-4">
              <Users size={12} /> Parent Hub
            </div>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight">
              See what your child is actually learning.
            </h1>
            <p className="mt-4 text-lg leading-7 text-white/90">
              Link your child's Syllab account and track XP, learning streaks, completed
              topics, and weak chapters — all in one place. 100% free.
            </p>
            <button
              onClick={() => setTab('home')}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-black text-violet-700 hover:-translate-y-0.5 transition-all"
            >
              Sign in to link your child <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* What you get */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Trophy, color: 'text-amber-500', title: 'XP & Rank', desc: 'See total XP and current rank — Beginner → Master.' },
            { icon: Flame, color: 'text-orange-500', title: 'Daily Streak', desc: 'Track consecutive days of learning. Reward consistency.' },
            { icon: BookOpen, color: 'text-emerald-500', title: 'Topics Done', desc: 'Per-subject breakdown of completed Skills Lab topics.' },
            { icon: Mail, color: 'text-violet-500', title: 'Weekly Email', desc: 'Coming soon — auto-summary of your child\'s week.' },
          ].map(item => (
            <div key={item.title} className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
              <item.icon className={item.color + ' mb-3'} size={24} />
              <h3 className="font-black text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-500 leading-6">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* How linking works */}
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/50">
          <h2 className="text-2xl font-black text-slate-900">How linking works</h2>
          <p className="mt-2 text-sm text-slate-500">Three steps. Takes 30 seconds.</p>
          <ol className="mt-6 grid sm:grid-cols-3 gap-6">
            {[
              { n: 1, title: 'Sign in as a parent', body: 'Use your own email — kids keep their own Syllab login.' },
              { n: 2, title: 'Enter your child\'s email', body: 'They sign up first using their own email on Syllab.' },
              { n: 3, title: 'See live progress', body: 'XP, streaks, completed topics, weak chapters — auto-refreshed.' },
            ].map(s => (
              <li key={s.n} className="rounded-2xl bg-slate-50 p-5">
                <div className="w-9 h-9 rounded-xl bg-violet-600 text-white font-black flex items-center justify-center mb-3">{s.n}</div>
                <h3 className="font-black text-slate-900">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600 leading-6">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Privacy */}
        <section className="rounded-[2rem] bg-emerald-50 border border-emerald-200 p-8">
          <div className="flex gap-4">
            <CheckCircle2 className="text-emerald-600 shrink-0" size={28} />
            <div>
              <h2 className="font-black text-emerald-900 text-xl">Privacy-first by design</h2>
              <ul className="mt-2 space-y-1.5 text-sm text-emerald-900/90 leading-6">
                <li>• You only see data for children whose accounts <strong>you've linked</strong>.</li>
                <li>• Your child must already have a Syllab account with their own login.</li>
                <li>• Linking is reversible — unlink at any time, no data is shared after.</li>
                <li>• Firestore security rules enforce all of this on the database level, not just UI.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-[2rem] bg-slate-900 p-8 text-center text-white">
          <h2 className="text-2xl font-black">Ready to start tracking?</h2>
          <p className="mt-2 text-sm text-slate-300">Sign in (or create a free account) using the Login button at the top right.</p>
          <button
            onClick={() => setTab('home')}
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-emerald-500 transition-colors"
          >
            Back to Home <ChevronRight size={14} />
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="space-y-8 pb-12">
      <SEO
        title="Parent Dashboard | Track Your Child's Learning | Syllab.in"
        description="Track XP, streaks, and topic completion for all your children in one place. Free parent portal from Syllab."
        keywords="parent dashboard, student tracking, child progress, learning analytics"
        url="https://syllab.in/parent"
      />

      {/* Hero */}
      <section className="rounded-[2rem] bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-8 text-white shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/15 p-3"><Users size={32} /></div>
          <div className="flex-1">
            <h1 className="text-3xl font-black">Parent Dashboard</h1>
            <p className="mt-1 text-sm font-medium text-violet-100">
              Exam results update live — no refresh needed.
            </p>
          </div>
          <button
            onClick={() => void refresh()}
            disabled={loading}
            className="shrink-0 rounded-2xl bg-white/15 border border-white/20 px-4 py-2 text-xs font-black uppercase tracking-widest text-white hover:bg-white/25 disabled:opacity-50 transition-all"
          >
            {loading ? '↻ Loading…' : '↻ Refresh'}
          </button>
        </div>
      </section>

      {/* Add child */}
      <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <UserPlus className="text-violet-600" size={20} />
          <h2 className="text-xl font-black text-slate-900">Link a Child</h2>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          Enter the email your child uses on Syllab. If they don't have an account yet, an invitation link will be generated for them.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={childEmail}
            onChange={(e) => { setChildEmail(e.target.value); setInviteLink(null); setMessage(null); }}
            onKeyDown={(e) => e.key === 'Enter' && void handleAddChild()}
            placeholder="child@example.com"
            className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-violet-400"
          />
          <button
            onClick={() => void handleAddChild()}
            disabled={adding || !childEmail.trim()}
            className="flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-violet-700 transition-colors disabled:opacity-40">
            <UserPlus size={14} /> {adding ? 'Linking...' : 'Add Child'}
          </button>
        </div>
        {message && (
          <div className={`mt-4 flex items-start gap-2 rounded-xl p-3 text-sm ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
          }`}>
            {message.type === 'success' ? <CheckCircle2 size={16} className="shrink-0 mt-0.5" /> : <AlertCircle size={16} className="shrink-0 mt-0.5" />}
            <span>{message.text}</span>
          </div>
        )}
        {inviteLink && (
          <div className="mt-3 rounded-2xl border border-violet-100 bg-violet-50 p-4 space-y-2">
            <p className="text-xs font-black text-violet-700 uppercase tracking-widest">Invitation Link</p>
            <p className="text-xs text-violet-600 font-medium">Share this link with your child. Once they sign up on Syllab using their email, click "Add Child" again to complete the link.</p>
            <div className="flex gap-2 mt-2">
              <input readOnly value={inviteLink} className="flex-1 min-w-0 rounded-xl bg-white border border-violet-200 px-3 py-2 text-xs font-mono text-slate-600 focus:outline-none" />
              <button
                onClick={() => navigator.clipboard?.writeText(inviteLink).then(() => setMessage({ type: 'success', text: 'Invitation link copied!' }))}
                className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-3 py-2 text-xs font-black text-white hover:bg-violet-700 transition-colors shrink-0"
              >
                <Mail size={12} /> Copy Link
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Children list */}
      <section className="space-y-4">
        <h2 className="text-xl font-black text-slate-900">
          Your Children <span className="text-sm font-bold text-slate-400 ml-2">({children.length})</span>
        </h2>
        {loading ? (
          <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/50 text-center">
            <p className="text-sm text-slate-400">Loading children's data...</p>
          </div>
        ) : children.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-10 shadow-xl shadow-slate-200/50 text-center">
            <Users className="mx-auto mb-3 text-slate-200" size={40} />
            <p className="font-bold text-slate-500">No children linked yet</p>
            <p className="text-sm text-slate-400 mt-1">Use the form above to link your child's account.</p>
          </div>
        ) : (
          children.map((child) => {
            const isExpanded = expandedChild === child.uid;
            const hasExams = child.examResults && child.examResults.length > 0;
            return (
              <div key={child.uid} className="rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
                {/* Child header */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-black text-slate-900">{child.displayName}</h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-0.5 text-[11px] font-black uppercase text-violet-700">
                          <Trophy size={10} /> {child.rank || 'Rookie'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <Mail size={11} /> {child.email}
                      </p>
                    </div>
                    <button
                      onClick={() => void handleRemoveChild(child.uid)}
                      className="rounded-xl p-2 text-rose-400 hover:bg-rose-50 transition-colors shrink-0"
                      title="Unlink child">
                      <Trash2 size={15} />
                    </button>
                  </div>

                  {/* Stats row */}
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3 text-center">
                      <Trophy className="mx-auto mb-1 text-amber-500" size={15} />
                      <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">XP</div>
                      <div className="text-lg font-black text-slate-900">{child.xp || 0}</div>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3 text-center">
                      <Flame className="mx-auto mb-1 text-orange-500" size={15} />
                      <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">Streak</div>
                      <div className="text-lg font-black text-slate-900">{child.streak || 0}d</div>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3 text-center">
                      <BookOpen className="mx-auto mb-1 text-violet-500" size={15} />
                      <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">Topics</div>
                      <div className="text-lg font-black text-slate-900">{child.completedTopics || 0}</div>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3 text-center">
                      <div className="mb-1 text-[15px] leading-none">⏱️</div>
                      <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">Study (wk)</div>
                      <div className="text-lg font-black text-slate-900">{child.studyMinutesThisWeek || 0}m</div>
                    </div>
                  </div>

                  {/* Recent activity (last 5) — live via onSnapshot */}
                  {child.activityEvents && child.activityEvents.length > 0 && (
                    <div className="mt-4 space-y-1.5">
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">Recent Activity (live)</p>
                      {child.activityEvents.slice(0, 5).map((evt) => {
                        const TYPE_LABEL: Record<string, string> = {
                          daily_challenge: 'Daily Challenge',
                          practice_session: 'Practice',
                          olympiad: 'Olympiad',
                          mock_test: 'Mock Test',
                          exam: 'Exam',
                          ppt_lesson: 'Lesson',
                          skill_lab: 'Skill',
                          english_lab: 'English',
                        };
                        const date = evt.createdAt?.toDate?.();
                        return (
                          <div key={evt.id} className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs">
                            <div className="min-w-0 flex-1">
                              <p className="font-black text-slate-700 truncate">
                                {TYPE_LABEL[evt.type] || 'Activity'} — {evt.title}
                              </p>
                              {date && (
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                  {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                  {evt.subject ? ` · ${evt.subject}` : ''}
                                </p>
                              )}
                            </div>
                            {evt.score != null && evt.total != null && (
                              <span className="font-black text-violet-600 shrink-0">
                                {evt.score}/{evt.total}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Exam results toggle */}
                  <button
                    onClick={() => setExpandedChild(isExpanded ? null : child.uid)}
                    className="mt-4 flex items-center gap-2 text-sm font-black text-violet-600 hover:text-violet-800 transition-colors"
                  >
                    <ClipboardList size={14} />
                    Exam Results {hasExams ? `(${child.examResults!.length})` : '— None yet'}
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>

                {/* Expanded exam results */}
                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50 p-6">
                    {!hasExams ? (
                      <div className="text-center py-6">
                        <ClipboardList className="mx-auto mb-2 text-slate-300" size={28} />
                        <p className="text-sm font-bold text-slate-500">No exams attempted yet</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Generate an exam code from the section below and share it with {child.displayName}.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-3">Recent Exam Attempts</p>
                        {child.examResults!.map((r) => {
                          const date = r.completedAt?.toDate?.();
                          const pct = r.percentage ?? (r.total > 0 ? Math.round((r.score / r.total) * 100) : 0);
                          const color = pct >= 80 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
                                        pct >= 50 ? 'text-amber-700 bg-amber-50 border-amber-200' :
                                        'text-rose-700 bg-rose-50 border-rose-200';
                          return (
                            <div key={r.id} className={`rounded-xl border p-4 ${color}`}>
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="font-black text-sm truncate">{r.title}</p>
                                  <div className="flex flex-wrap items-center gap-2 mt-1">
                                    {r.examCode && (
                                      <span className="inline-flex items-center gap-1 rounded-full bg-white/60 px-2 py-0.5 text-[11px] font-black">
                                        Code: {r.examCode}
                                      </span>
                                    )}
                                    {r.classLevel && (
                                      <span className="text-[11px] font-bold opacity-70">Class {r.classLevel}</span>
                                    )}
                                    {date && (
                                      <span className="text-[11px] font-bold opacity-60">
                                        {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right shrink-0">
                                  <div className="text-xl font-black">{pct}%</div>
                                  <div className="text-[11px] font-bold opacity-70">{r.score}/{r.total}</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* Create Exam for Child */}
      <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
        <div className="mb-5 flex items-center gap-2">
          <ClipboardList className="text-violet-600" size={20} />
          <h2 className="text-xl font-black text-slate-900">Create Exam for Your Child</h2>
        </div>
        <p className="mb-5 text-sm text-slate-500">
          Configure a custom exam and share the code with your child. They open it in the Exams section.
        </p>
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="space-y-4">
            {/* Class */}
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-500">Class</label>
              <div className="flex flex-wrap gap-2">
                {['5','6','7','8','9','10','11','12'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => { setExamClass(c); setExamSubjects([]); setExamCode(null); }}
                    className={cn(
                      'rounded-xl px-4 py-2 text-xs font-black transition-all',
                      examClass === c ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                    )}
                  >
                    Class {c}
                  </button>
                ))}
              </div>
            </div>
            {/* Subjects */}
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-500">Subjects</label>
              <div className="flex flex-wrap gap-2">
                {(subjectsByClass[examClass] || []).map((subj) => (
                  <button
                    key={subj}
                    type="button"
                    onClick={() =>
                      setExamSubjects((prev) =>
                        prev.includes(subj) ? prev.filter((s) => s !== subj) : [...prev, subj],
                      )
                    }
                    className={cn(
                      'rounded-xl px-4 py-2 text-xs font-black transition-all',
                      examSubjects.includes(subj) ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                    )}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>
            {/* Level + Count row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-500">Difficulty</label>
                <div className="flex gap-2">
                  {(['Easy', 'Medium', 'Hard'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setExamLevel(lvl)}
                      className={cn(
                        'flex-1 rounded-xl py-2.5 text-xs font-black transition-all',
                        examLevel === lvl ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600',
                      )}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-500">Questions</label>
                <div className="flex gap-2">
                  {[10, 20, 30].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setExamCount(n)}
                      className={cn(
                        'flex-1 rounded-xl py-2.5 text-xs font-black transition-all',
                        examCount === n ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600',
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="button"
              disabled={examSubjects.length === 0}
              onClick={generateExamCode}
              className="flex items-center gap-2 rounded-2xl bg-violet-600 px-6 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg hover:bg-violet-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Share2 size={14} /> Generate & Copy Link
            </button>
          </div>

          {/* Code preview */}
          <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
            <h3 className="mb-3 text-sm font-black text-slate-600">Exam Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-400 font-bold">Class</span><span className="font-black">{examClass}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 font-bold">Subjects</span><span className="font-black text-right text-xs">{examSubjects.join(', ') || '—'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 font-bold">Level</span><span className="font-black">{examLevel}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 font-bold">Questions</span><span className="font-black">{examCount}</span></div>
            </div>
            {examCode ? (
              <div className="mt-4 rounded-2xl border border-violet-200 bg-violet-50 p-4 text-center">
                <p className="text-[11px] font-black uppercase tracking-widest text-violet-600">Exam Code</p>
                <p className="mt-1 text-3xl font-black tracking-widest text-violet-700">{examCode}</p>
                <p className="mt-2 text-[11px] font-bold text-violet-500">Link copied! Share with your child.</p>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-slate-200 p-4 text-center text-xs font-bold text-slate-400">
                Code will appear here.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Weekly Report */}
      {children.length > 0 && (
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-violet-600" size={20} />
            <h2 className="text-xl font-black text-slate-900">Weekly Report</h2>
            <span className="ml-auto rounded-full bg-amber-100 px-3 py-1 text-[11px] font-black text-amber-700">
              Auto-email every Sunday coming soon
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-5">
            A summary of your children's performance this week. Click below to email it to yourself.
          </p>

          {/* Per-child summary */}
          <div className="space-y-3 mb-6">
            {children.map((child) => {
              const recentExams = (child.examResults || []).slice(0, 3);
              const avgPct = recentExams.length > 0
                ? Math.round(recentExams.reduce((s, r) => s + (r.percentage ?? 0), 0) / recentExams.length)
                : null;
              return (
                <div key={child.uid} className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div>
                      <p className="font-black text-sm text-slate-900">{child.displayName}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{child.email}</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="text-center">
                        <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">XP</div>
                        <div className="text-base font-black text-amber-600">{child.xp || 0}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">Streak</div>
                        <div className="text-base font-black text-orange-600">{child.streak || 0}d</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">Topics</div>
                        <div className="text-base font-black text-violet-600">{child.completedTopics || 0}</div>
                      </div>
                      {avgPct !== null && (
                        <div className="text-center">
                          <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">Avg Score</div>
                          <div className={`text-base font-black ${avgPct >= 80 ? 'text-emerald-600' : avgPct >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>{avgPct}%</div>
                        </div>
                      )}
                    </div>
                  </div>
                  {recentExams.length > 0 && (
                    <div className="mt-3 space-y-1">
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">Recent Exams</p>
                      {recentExams.map((r) => {
                        const pct = r.percentage ?? (r.total > 0 ? Math.round((r.score / r.total) * 100) : 0);
                        return (
                          <div key={r.id} className="flex items-center justify-between text-xs">
                            <span className="text-slate-600 font-medium truncate flex-1">{r.title}</span>
                            <span className={`shrink-0 font-black ml-2 ${pct >= 80 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Email button */}
          <a
            href={`mailto:${currentUser?.email || ''}?subject=${encodeURIComponent('Syllab Weekly Report — ' + new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long' }))}&body=${encodeURIComponent(buildWeeklyReportText(children))}`}
            className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-violet-700 transition-colors"
          >
            <Mail size={14} /> Email This Report to Myself
          </a>
        </section>
      )}

      {/* Footer note */}
      <section className="rounded-[2rem] bg-amber-50 border border-amber-200 p-6 text-sm text-amber-800">
        <p className="font-bold mb-1">💡 How linking works</p>
        <p>
          When you link a child, we add a small reference to their account so you can read their public progress
          (XP, streak, topic count). Your child keeps full ownership of their account and can ask to unlink anytime.
          Sensitive data like answers and personal notes are never shared.
        </p>
      </section>
    </main>
  );
}
