/**
 * CoStudyPanel — "study with me" body-doubling inside the Study Room.
 * Host a room (get a 5-char code) or join one; everyone sees a live presence
 * list of who's studying together. Realtime via Firestore (see lib/coStudy).
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Users, LogOut, Copy, Check } from 'lucide-react';
import {
  genRoomCode, createRoom, joinRoom, leaveRoom, heartbeat,
  subscribeRoom, subscribeMembers, isPresent, type CoStudyRoom, type CoMember,
} from '../lib/coStudy';

interface Props { userUid?: string | null; userName?: string | null; goal?: string; minutes?: number; }

export default function CoStudyPanel({ userUid, userName, goal, minutes = 0 }: Props) {
  const [code, setCode] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [room, setRoom] = useState<CoStudyRoom | null>(null);
  const [members, setMembers] = useState<CoMember[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const guestId = useRef<string>('guest_' + Math.random().toString(36).slice(2, 10));
  const memberId = userUid || guestId.current;
  const name = (userName || 'Student').slice(0, 24);

  // Keep the latest minutes in a ref so the heartbeat interval always sends the current value.
  const minutesRef = useRef(minutes);
  minutesRef.current = minutes;

  // Subscribe + heartbeat (with live minutes) while in a room.
  useEffect(() => {
    if (!code) return;
    const unsubRoom = subscribeRoom(code, setRoom);
    const unsubMembers = subscribeMembers(code, setMembers);
    void heartbeat(code, memberId, minutesRef.current);
    const hb = window.setInterval(() => { void heartbeat(code, memberId, minutesRef.current); }, 25_000);
    return () => { unsubRoom(); unsubMembers(); window.clearInterval(hb); };
  }, [code, memberId]);

  // Leave the room when the panel unmounts.
  useEffect(() => () => { if (code) void leaveRoom(code, memberId); }, [code, memberId]);

  const host = useCallback(async () => {
    if (!userUid) { setErr('Please log in to host a room.'); return; }
    setBusy(true); setErr(null);
    try {
      const c = genRoomCode(Math.random);
      await createRoom({ uid: userUid, name }, goal ? `Studying: ${goal}` : 'Study Room', c);
      await joinRoom(c, memberId, name, goal);
      setCode(c);
    } catch { setErr('Could not create the room. Try again.'); }
    finally { setBusy(false); }
  }, [userUid, name, goal, memberId]);

  const join = useCallback(async () => {
    const c = input.trim().toUpperCase();
    if (c.length < 4) { setErr('Enter the room code your friend shared.'); return; }
    setBusy(true); setErr(null);
    try { await joinRoom(c, memberId, name, goal); setCode(c); }
    catch { setErr('Could not join — check the code.'); }
    finally { setBusy(false); }
  }, [input, memberId, name, goal]);

  const leave = useCallback(async () => {
    if (code) await leaveRoom(code, memberId);
    setCode(null); setRoom(null); setMembers([]); setInput('');
  }, [code, memberId]);

  const copyCode = () => { if (code) { void navigator.clipboard?.writeText(code).catch(() => {}); setCopied(true); window.setTimeout(() => setCopied(false), 1500); } };

  const now = Date.now();
  // Leaderboard: present members ranked by minutes studied this session.
  const present = members
    .filter((m) => isPresent(m, now))
    .sort((a, b) => (b.minutes || 0) - (a.minutes || 0));
  const medal = (i: number) => (i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '');

  if (!code) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-white/50"><Users size={13} /> Study with friends</p>
        <p className="mb-3 text-xs text-white/60">Study together in real time — you&apos;ll see who&apos;s in the room and stay accountable.</p>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => { if (e.key === 'Enter') void join(); }}
            placeholder="Room code"
            maxLength={5}
            className="w-28 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-center text-sm font-black uppercase tracking-widest text-white placeholder-white/40 outline-none focus:border-emerald-400"
          />
          <button onClick={() => void join()} disabled={busy} className="rounded-xl bg-white/10 px-3 py-2 text-sm font-black text-white hover:bg-white/20 disabled:opacity-40">Join</button>
          <button onClick={() => void host()} disabled={busy} className="ml-auto rounded-xl bg-emerald-500 px-3 py-2 text-sm font-black text-white hover:bg-emerald-400 disabled:opacity-40">Host</button>
        </div>
        {err ? <p className="mt-2 text-xs font-bold text-red-300">{err}</p> : null}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4 backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-emerald-300">Co-Study room</p>
          <button onClick={copyCode} className="mt-0.5 inline-flex items-center gap-1.5 text-lg font-black tracking-widest text-white">
            {code} {copied ? <Check size={14} className="text-emerald-300" /> : <Copy size={13} className="text-white/40" />}
          </button>
        </div>
        <button onClick={() => void leave()} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 hover:bg-white/20"><LogOut size={13} /> Leave</button>
      </div>
      <p className="mb-2 text-xs font-bold text-white/60">{present.length} studying together · ranked by minutes</p>
      <ul className="space-y-1.5">
        {present.map((m, i) => (
          <li key={m.id} className="flex items-center gap-2 text-sm text-white/90">
            <span className="w-5 shrink-0 text-center text-xs">{medal(i) || <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 align-middle" />}</span>
            <span className="flex-1 truncate font-bold">{m.name}{m.id === memberId ? ' (you)' : ''}
              {m.goal ? <span className="ml-1 font-normal text-xs text-white/40">· {m.goal}</span> : null}
            </span>
            <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-black text-emerald-300">{m.minutes || 0}m</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-white/40">Share the code <strong className="text-white/70">{code}</strong> so friends can join and study with you.</p>
    </div>
  );
}
