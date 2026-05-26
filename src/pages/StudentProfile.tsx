import React, { useEffect, useState } from 'react';
import {
  CheckCircle2, Copy, Flame,
  Lock, LogOut, Shield, Trophy, Zap,
} from 'lucide-react';
import {
  User as FirebaseUser,
  EmailAuthProvider, reauthenticateWithCredential, updatePassword,
} from 'firebase/auth';
import SEO from '../components/SEO';
import { UserStats } from '../types';
import { cn } from '../lib/utils';
import { logout } from '../lib/firebase';
import { FIRESTORE_FEATURES_ENABLED } from '../lib/cloudFeatures';
import {
  getExtendedProfile, saveExtendedProfile, sendParentRequest,
  ExtendedUserProfile, DEFAULT_EXTENDED_PROFILE,
} from '../lib/userProfile';
import { AVATAR_REWARDS, isAvatarUnlocked } from '../data/avatarRewards';

interface StudentProfileProps {
  currentUser: FirebaseUser | null;
  stats: UserStats;
  setTab: (tab: string) => void;
  userClass?: string;
  onClassChange?: (cls: string) => void;
  onOpenLogin?: () => void;
}

type ProfileTab = 'My Profile' | 'Learning' | 'Parent' | 'Security' | 'Privacy';
const PROFILE_TABS: ProfileTab[] = ['My Profile', 'Learning', 'Parent', 'Security', 'Privacy'];

/* ─── Skills progress from localStorage ─────────────────────────────────── */
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

/* ─── Inline field ───────────────────────────────────────────────────────── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = 'w-full rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-primary focus:bg-white transition-colors';
const selectCls = inputCls;

/* ─── Main component ─────────────────────────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function StudentProfilePage({ currentUser, stats, setTab, userClass, onClassChange, onOpenLogin }: StudentProfileProps) {
  const [tab, setProfileTab] = useState<ProfileTab>('My Profile');
  const [profile, setProfile] = useState<ExtendedUserProfile>(DEFAULT_EXTENDED_PROFILE);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [pwOld, setPwOld] = useState('');
  const [pwNew, setPwNew] = useState('');
  const [pwMsg, setPwMsg] = useState<string | null>(null);
  const [parentMsg, setParentMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { total: totalSkills } = useSkillsProgress();

  const inviteUrl = `https://syllab.in/?ref=${currentUser?.uid || 'student'}`;

  // Load extended profile
  useEffect(() => {
    if (!currentUser || !FIRESTORE_FEATURES_ENABLED) return;
    getExtendedProfile(currentUser.uid).then(p => {
      setProfile(p);
      // Sync primaryClass → app-level userClass + mirror ranges to localStorage
      if (p.learning.primaryClass && !userClass) onClassChange?.(p.learning.primaryClass);
      try { localStorage.setItem('syllab_user_ranges', JSON.stringify(p.learning.selectedRanges || [])); } catch { /* ignore */ }
    });
  }, [currentUser?.uid]);

  const save = async (patch: Partial<ExtendedUserProfile>) => {
    const next = { ...profile, ...patch };
    setProfile(next);
    if (!currentUser || !FIRESTORE_FEATURES_ENABLED) { setSaveMsg('Saved locally (login to sync).'); return; }
    setSaving(true);
    try {
      await saveExtendedProfile(currentUser.uid, patch);
      setSaveMsg('Saved!');
    } catch (e: any) {
      console.error('[profile save] failed', { code: e?.code, message: e?.message, error: e });
      const code = e?.code || '';
      if (code.includes('permission-denied')) {
        setSaveMsg(`Save blocked by Firestore rules (${code}). Please reload — rules may have just been updated.`);
      } else if (code.includes('unavailable') || code.includes('network')) {
        setSaveMsg('Network unavailable — try again in a moment.');
      } else {
        setSaveMsg(`Save failed: ${e?.message || code || 'unknown error'}`);
      }
    }
    finally { setSaving(false); setTimeout(() => setSaveMsg(null), 6000); }
  };

  const handleChangePassword = async () => {
    if (!currentUser?.email || !pwOld || !pwNew) return;
    try {
      const cred = EmailAuthProvider.credential(currentUser.email, pwOld);
      await reauthenticateWithCredential(currentUser, cred);
      await updatePassword(currentUser, pwNew);
      setPwMsg('success:Password updated successfully!');
      setPwOld(''); setPwNew('');
    } catch (e) { setPwMsg(e instanceof Error ? e.message : 'Failed to change password.'); }
    setTimeout(() => setPwMsg(null), 4000);
  };

  const handleParentRequest = async () => {
    const email = profile.parent.parentEmail.trim();
    if (!email || !currentUser) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setParentMsg('Enter a valid parent email.'); return; }
    try {
      await sendParentRequest(currentUser.uid, currentUser.email || '', currentUser.displayName || '', email);
      const next = { ...profile, parent: { ...profile.parent, requestSent: true } };
      setProfile(next);
      await saveExtendedProfile(currentUser.uid, { parent: next.parent });
      setParentMsg('success:Request sent! Ask your parent to check their email.');
    } catch (e: any) {
      console.error('[sendParentRequest] failed', { code: e?.code, message: e?.message, error: e });
      const code = e?.code || '';
      if (code.includes('permission-denied')) {
        setParentMsg(`Blocked by Firestore rules (${code}). Reload the page — rules were just updated.`);
      } else {
        setParentMsg(`Could not send request: ${e?.message || code || 'unknown error'}`);
      }
    }
    setTimeout(() => setParentMsg(null), 8000);
  };

  const currentAvatar = [...AVATAR_REWARDS].reverse().find(a => isAvatarUnlocked(a, stats, totalSkills)) ?? AVATAR_REWARDS[0];

  /* ── Not signed in ─────────────────────────────────────────────────────── */
  if (!currentUser) {
    return (
      <main className="pb-12">
        <SEO title="My Profile | Syllab.in" description="Sign in to access your Syllab profile, learning settings, and more." keywords="student profile, syllab login" url="https://syllab.in/profile" />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 px-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-4xl shadow-xl shadow-emerald-500/20">🌱</div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">My Profile</h1>
            <p className="text-slate-500 font-medium max-w-sm">Sign in to access your profile, learning preferences, parent linking, badges, and more.</p>
          </div>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button type="button" onClick={onOpenLogin} className="flex items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 text-sm font-black text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-500 transition-colors">
              <span className="text-lg">🚀</span> Continue with Google
            </button>
            <button type="button" onClick={onOpenLogin} className="flex items-center justify-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 text-sm font-black text-slate-700 hover:bg-slate-50 transition-colors">
              <span className="text-lg">📧</span> Sign in with Email
            </button>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3 w-full max-w-md">
            {(['My Profile', 'Learning', 'Parent', 'Security', 'Privacy'] as const).map(t => (
              <div key={t} className="rounded-2xl bg-slate-100 px-4 py-3 text-center text-xs font-black text-slate-400 opacity-60">🔒 {t}</div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-6 pb-12">
      <SEO title="My Profile | Syllab.in" description="Manage your Syllab profile, learning preferences, parent link, and rewards." keywords="student profile, syllab" url="https://syllab.in/profile" />

      {/* Hero */}
      <section className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-2xl">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-3xl shadow-lg shadow-emerald-500/30 select-none">{currentAvatar.icon}</div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">{currentAvatar.name} · {currentAvatar.title}</div>
            <h1 className="text-2xl font-black">{profile.personal.displayName || currentUser?.displayName || currentUser?.email || 'Student'}</h1>
            <div className="mt-2 flex gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2.5 py-1 text-[10px] font-black text-primary"><Trophy size={10} /> {stats.rank}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-black text-slate-300"><Zap size={10} /> {stats.xp} XP</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-black text-slate-300"><Flame size={10} /> {stats.streak}d streak</span>
              {userClass && <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-2.5 py-1 text-[10px] font-black text-blue-300">Class {userClass}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Tab bar */}
      <div className="flex gap-1 rounded-2xl bg-slate-100 p-1.5 overflow-x-auto scrollbar-none">
        {PROFILE_TABS.map(t => (
          <button key={t} type="button" onClick={() => setProfileTab(t)} className={cn('flex-shrink-0 rounded-xl px-3 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all', tab === t ? 'bg-white text-secondary shadow-sm' : 'text-slate-500 hover:text-slate-700')}>
            {t}
          </button>
        ))}
      </div>

      {saveMsg && <div className={cn('rounded-2xl px-4 py-3 text-sm font-bold', saveMsg.startsWith('Saved') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100')}>{saveMsg}</div>}

      {/* ── MY PROFILE ─────────────────────────────────────────────────────── */}
      {tab === 'My Profile' && (
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 space-y-5">
          <h2 className="text-xl font-black text-slate-900">Personal Details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First Name">
              <input className={inputCls} value={profile.personal.firstName} onChange={e => setProfile(p => ({ ...p, personal: { ...p.personal, firstName: e.target.value } }))} placeholder="Arjun" />
            </Field>
            <Field label="Last Name">
              <input className={inputCls} value={profile.personal.lastName} onChange={e => setProfile(p => ({ ...p, personal: { ...p.personal, lastName: e.target.value } }))} placeholder="Sharma" />
            </Field>
            <Field label="Display Name">
              <input className={inputCls} value={profile.personal.displayName} onChange={e => setProfile(p => ({ ...p, personal: { ...p.personal, displayName: e.target.value } }))} placeholder="ArjunS" />
            </Field>
            <Field label="Age Group">
              <select className={selectCls} value={profile.personal.ageGroup} onChange={e => setProfile(p => ({ ...p, personal: { ...p.personal, ageGroup: e.target.value as never } }))}>
                <option value="">Select age group</option>
                <option value="under_10">Under 10</option>
                <option value="10_12">10 – 12</option>
                <option value="13_15">13 – 15</option>
                <option value="16_18">16 – 18</option>
                <option value="18_plus">18+</option>
              </select>
            </Field>
            <Field label="Gender (Optional)">
              <select className={selectCls} value={profile.personal.gender} onChange={e => setProfile(p => ({ ...p, personal: { ...p.personal, gender: e.target.value as never } }))}>
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="prefer_not_to_say">Other</option>
              </select>
            </Field>
            <Field label="State">
              <input className={inputCls} value={profile.personal.state} onChange={e => setProfile(p => ({ ...p, personal: { ...p.personal, state: e.target.value } }))} placeholder="Andhra Pradesh" />
            </Field>
            <Field label="Preferred Language">
              <select className={selectCls} value={profile.personal.language} onChange={e => setProfile(p => ({ ...p, personal: { ...p.personal, language: e.target.value } }))}>
                <option>English</option>
                <option>Telugu</option>
                <option>Hindi</option>
                <option>Tamil</option>
                <option>Kannada</option>
              </select>
            </Field>
          </div>
          <button type="button" disabled={saving} onClick={() => save({ personal: profile.personal })} className="btn-primary px-8 py-3 text-xs font-black uppercase tracking-widest disabled:opacity-50">
            {saving ? 'Saving…' : 'Save Profile'}
          </button>
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-black text-slate-700 mb-3">Invite Friends</h3>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input value={inviteUrl} readOnly className="min-w-0 flex-1 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600 border border-slate-200" />
              <button onClick={async () => { await navigator.clipboard?.writeText(inviteUrl); setCopied(true); setTimeout(() => setCopied(false), 1800); }} className="flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-xs font-black uppercase tracking-widest text-white">
                <Copy size={14} /> {copied ? '✅ Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── LEARNING PREFERENCES ────────────────────────────────────────────── */}
      {tab === 'Learning' && (
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 space-y-5">
          <h2 className="text-xl font-black text-slate-900">Learning Preferences</h2>
          <Field label="Primary Class">
            <select className={cn(selectCls, 'max-w-xs')} value={profile.learning.primaryClass}
              onChange={e => {
                const cls = e.target.value;
                setProfile(p => ({ ...p, learning: { ...p.learning, primaryClass: cls } }));
                onClassChange?.(cls);
              }}>
              <option value="">Select your class</option>
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(c => <option key={c} value={String(c)}>Class {c}</option>)}
            </select>
            {profile.learning.primaryClass && <p className="mt-1.5 text-xs font-medium text-emerald-600">✓ Content is personalised for Class {profile.learning.primaryClass}</p>}
          </Field>
          <Field label="Also show content from (optional)">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'class_1_2',   label: 'Class 1–2' },
                { id: 'class_3_4',   label: 'Class 3–4' },
                { id: 'class_5_6',   label: 'Class 5–6' },
                { id: 'class_7_8',   label: 'Class 7–8' },
                { id: 'class_9_10',  label: 'Class 9–10' },
                { id: 'class_11_12', label: 'Class 11–12' },
              ].map(r => {
                const on = profile.learning.selectedRanges.includes(r.id);
                return (
                  <button key={r.id} type="button"
                    onClick={() => {
                      const next = on
                        ? profile.learning.selectedRanges.filter(x => x !== r.id)
                        : [...profile.learning.selectedRanges, r.id];
                      setProfile(p => ({ ...p, learning: { ...p.learning, selectedRanges: next } }));
                      try { localStorage.setItem('syllab_user_ranges', JSON.stringify(next)); } catch { /* ignore */ }
                    }}
                    className={cn('rounded-xl px-3 py-1.5 text-xs font-black transition-all', on ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
                    {r.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-1.5 text-xs font-medium text-slate-500">Tick extra ranges to browse Syllabus / Practice content from those classes too.</p>
          </Field>
          <Field label="Board">
            <div className="flex flex-wrap gap-2">
              {['CBSE','ICSE','State Board','Other'].map(b => (
                <button key={b} type="button" onClick={() => setProfile(p => ({ ...p, learning: { ...p.learning, board: b } }))} className={cn('rounded-xl px-4 py-2 text-xs font-black transition-all', profile.learning.board === b ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
                  {b}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Target Exams">
            <div className="flex flex-wrap gap-2">
              {['CBSE Boards','JEE','NEET','EAMCET','Olympiad','Skills Lab','English Lab'].map(ex => {
                const on = profile.learning.targetExams.includes(ex);
                return (
                  <button key={ex} type="button" onClick={() => setProfile(p => ({ ...p, learning: { ...p.learning, targetExams: on ? p.learning.targetExams.filter(x => x !== ex) : [...p.learning.targetExams, ex] } }))} className={cn('rounded-xl px-3 py-1.5 text-xs font-black transition-all', on ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
                    {ex}
                  </button>
                );
              })}
            </div>
          </Field>
          <Field label="Subjects">
            <div className="flex flex-wrap gap-2">
              {['Maths','Science','Physics','Chemistry','Biology','English','Python','Java','SQL','AI','Data Analytics','Aptitude'].map(s => {
                const on = profile.learning.subjects.includes(s);
                return (
                  <button key={s} type="button" onClick={() => setProfile(p => ({ ...p, learning: { ...p.learning, subjects: on ? p.learning.subjects.filter(x => x !== s) : [...p.learning.subjects, s] } }))} className={cn('rounded-xl px-3 py-1.5 text-xs font-black transition-all', on ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
                    {s}
                  </button>
                );
              })}
            </div>
          </Field>
          {profile.learning.primaryClass && parseInt(profile.learning.primaryClass) >= 11 && (
            <div className="rounded-2xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm font-bold text-amber-700">Class {profile.learning.primaryClass} — JEE / NEET mock tests are highlighted for you in the Exams section.</div>
          )}
          {profile.learning.primaryClass && parseInt(profile.learning.primaryClass) >= 6 && parseInt(profile.learning.primaryClass) <= 10 && (
            <div className="rounded-2xl bg-sky-50 border border-sky-100 px-4 py-3 text-sm font-bold text-sky-700">Class {profile.learning.primaryClass} — Olympiad exams are highlighted for you in the Exams section.</div>
          )}
          <button type="button" disabled={saving} onClick={() => save({ learning: profile.learning })} className="btn-primary px-8 py-3 text-xs font-black uppercase tracking-widest disabled:opacity-50">
            {saving ? 'Saving…' : 'Save Preferences'}
          </button>
        </section>
      )}

      {/* ── PARENT LINK ─────────────────────────────────────────────────────── */}
      {tab === 'Parent' && (
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 space-y-5">
          <div>
            <h2 className="text-xl font-black text-slate-900">Connect Parent / Guardian</h2>
            <p className="mt-1 text-sm font-medium text-slate-500">Your parent can view your progress, XP, streaks, and mock scores. They cannot block or change your content.</p>
          </div>
          {profile.parent.connected ? (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5">
              <div className="text-sm font-black text-emerald-700 flex items-center gap-2"><CheckCircle2 size={16} /> Parent account connected</div>
              <p className="mt-1 text-xs font-medium text-emerald-600">{profile.parent.parentEmail}</p>
            </div>
          ) : (
            <>
              <Field label="Parent / Guardian Email">
                <input className={inputCls} type="email" value={profile.parent.parentEmail} onChange={e => setProfile(p => ({ ...p, parent: { ...p.parent, parentEmail: e.target.value } }))} placeholder="parent@example.com" disabled={profile.parent.requestSent} />
              </Field>
              {parentMsg && <div className={cn('rounded-2xl px-4 py-3 text-sm font-bold', parentMsg.startsWith('success:') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100')}>{parentMsg.replace('success:', '')}</div>}
              {profile.parent.requestSent ? (
                <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 text-sm font-bold text-amber-700">⏳ Request sent — waiting for parent to approve from their Syllab account.</div>
              ) : (
                <button type="button" onClick={() => void handleParentRequest()} className="btn-primary px-8 py-3 text-xs font-black uppercase tracking-widest">
                  Send Connection Request
                </button>
              )}
            </>
          )}
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 text-xs font-medium text-slate-500 space-y-1">
            <p>📊 Parent can view: XP, streak, mock scores, topics completed, weak areas</p>
            <p>🔒 Parent cannot: change your class, block content, or see your messages</p>
          </div>
        </section>
      )}

      {/* ── SECURITY ────────────────────────────────────────────────────────── */}
      {tab === 'Security' && (
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 space-y-6">
          <h2 className="text-xl font-black text-slate-900">Login & Security</h2>
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Signed in as</p>
            <p className="text-sm font-bold text-slate-700">{currentUser?.email || '—'}</p>
            <p className="text-[10px] font-bold text-slate-400">Provider: {currentUser?.providerData?.[0]?.providerId || 'email'}</p>
          </div>
          {currentUser?.providerData?.[0]?.providerId !== 'google.com' && (
            <div className="space-y-4 border-t border-slate-100 pt-5">
              <h3 className="text-sm font-black text-slate-700 flex items-center gap-2"><Lock size={14} /> Change Password</h3>
              {pwMsg && <div className={cn('rounded-2xl px-4 py-3 text-sm font-bold', pwMsg.startsWith('success:') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100')}>{pwMsg.replace('success:', '')}</div>}
              <Field label="Current Password">
                <input type="password" className={inputCls} value={pwOld} onChange={e => setPwOld(e.target.value)} placeholder="Current password" />
              </Field>
              <Field label="New Password">
                <input type="password" className={inputCls} value={pwNew} onChange={e => setPwNew(e.target.value)} placeholder="New password (min 6 chars)" />
              </Field>
              <button type="button" onClick={() => void handleChangePassword()} disabled={!pwOld || !pwNew} className="btn-primary px-6 py-3 text-xs font-black uppercase tracking-widest disabled:opacity-50">
                Update Password
              </button>
            </div>
          )}
          <div className="border-t border-slate-100 pt-5">
            <button type="button" onClick={() => void logout()} className="flex items-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-200 transition-colors">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </section>
      )}

      {/* ── PRIVACY ─────────────────────────────────────────────────────────── */}
      {tab === 'Privacy' && (
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 space-y-5">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2"><Shield size={18} /> Privacy & Data</h2>
          <div className="space-y-3 text-sm font-medium text-slate-600">
            <p>✅ We only collect data needed to personalize your learning experience.</p>
            <p>✅ We never sell your data to third parties.</p>
            <p>✅ Your learning progress and scores are stored securely in Firebase.</p>
            <p>✅ Parents can only view — not edit — your learning data.</p>
          </div>
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 space-y-3">
            <h3 className="text-sm font-black text-slate-700">Your Data Requests</h3>
            <button type="button" onClick={() => { window.open(`mailto:support@syllab.in?subject=Data Export Request&body=UID: ${currentUser?.uid}`, '_blank'); }} className="flex items-center gap-2 rounded-xl bg-slate-200 px-4 py-2.5 text-xs font-black text-slate-700 hover:bg-slate-300 transition-colors">
              📦 Request Data Export
            </button>
            <button type="button" onClick={() => { window.open(`mailto:support@syllab.in?subject=Account Deletion Request&body=UID: ${currentUser?.uid}`, '_blank'); }} className="flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-2.5 text-xs font-black text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors">
              🗑️ Request Account Deletion
            </button>
            <p className="text-[10px] text-slate-400 font-medium">Deletion requests are processed within 7 business days.</p>
          </div>
        </section>
      )}
    </main>
  );
}
