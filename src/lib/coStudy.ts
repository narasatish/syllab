/**
 * Co-Study Rooms — lightweight Firestore-backed "study with me" / body-doubling.
 * One person opens a room and shares a 5-char code; others join and everyone sees
 * who's studying together in real time (live presence). Mirrors the Live-Quiz
 * realtime pattern (coStudyRooms/{code} + members subcollection).
 */
import { db } from './firebase';
import {
  doc, setDoc, updateDoc, deleteDoc, collection, query, onSnapshot, serverTimestamp,
} from 'firebase/firestore';

const COL = 'coStudyRooms';
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous O/0/I/1

export interface CoStudyRoom {
  hostUid: string;
  hostName: string;
  roomName: string;
  status: 'active' | 'ended';
}
export interface CoMember {
  id: string;
  name: string;
  goal?: string;
  /** Minutes focused this session — drives the live leaderboard. */
  minutes?: number;
  lastSeen?: { toMillis?: () => number } | null;
}

export function genRoomCode(rnd: () => number): string {
  let s = '';
  for (let i = 0; i < 5; i++) s += CODE_CHARS[Math.floor(rnd() * CODE_CHARS.length)];
  return s;
}

export async function createRoom(host: { uid: string; name: string }, roomName: string, code: string): Promise<void> {
  await setDoc(doc(db, COL, code), {
    hostUid: host.uid,
    hostName: host.name.slice(0, 40),
    roomName: (roomName || 'Study Room').slice(0, 60),
    status: 'active',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function joinRoom(code: string, memberId: string, name: string, goal = ''): Promise<void> {
  await setDoc(
    doc(db, COL, code, 'members', memberId),
    { name: (name || 'Student').slice(0, 24), goal: goal.slice(0, 80), minutes: 0, joinedAt: serverTimestamp(), lastSeen: serverTimestamp() },
    { merge: true },
  );
}

/** Presence heartbeat (+ live minutes) — call on an interval while in the room. */
export async function heartbeat(code: string, memberId: string, minutes = 0): Promise<void> {
  try { await updateDoc(doc(db, COL, code, 'members', memberId), { lastSeen: serverTimestamp(), minutes: Math.max(0, Math.round(minutes)) }); } catch { /* ignore */ }
}

export async function leaveRoom(code: string, memberId: string): Promise<void> {
  try { await deleteDoc(doc(db, COL, code, 'members', memberId)); } catch { /* ignore */ }
}

export function subscribeRoom(code: string, cb: (room: CoStudyRoom | null) => void): () => void {
  return onSnapshot(doc(db, COL, code), (snap) => cb(snap.exists() ? (snap.data() as CoStudyRoom) : null), () => cb(null));
}

export function subscribeMembers(code: string, cb: (members: CoMember[]) => void): () => void {
  return onSnapshot(query(collection(db, COL, code, 'members')), (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<CoMember, 'id'>) })));
  }, () => cb([]));
}

/** A member counts as "present" if their heartbeat is within the last 70 seconds. */
export function isPresent(m: CoMember, nowMs: number): boolean {
  const last = m.lastSeen?.toMillis?.();
  if (!last) return true; // just joined, server timestamp not yet resolved
  return nowMs - last < 70_000;
}
