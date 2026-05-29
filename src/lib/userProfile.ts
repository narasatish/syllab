import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface UserPersonal {
  firstName: string;
  lastName: string;
  displayName: string;
  ageGroup: 'under_10' | '10_12' | '13_15' | '16_18' | '18_plus' | '';
  gender: 'male' | 'female' | 'prefer_not_to_say' | '';
  state: string;
  language: string;
}

export interface UserLearning {
  primaryClass: string;
  board: string;
  targetExams: string[];
  subjects: string[];
  selectedFeatures: string[];
  /** Extra class ranges this student also wants to see, e.g. ['class_11_12']. */
  selectedRanges: string[];
}

export interface UserParent {
  parentEmail: string;
  parentUid: string | null;
  connected: boolean;
  requestSent: boolean;
}

export interface ExtendedUserProfile {
  personal: UserPersonal;
  learning: UserLearning;
  parent: UserParent;
  selectedAvatarId: string;
  role?: 'student' | 'parent';
}

export const DEFAULT_PERSONAL: UserPersonal = {
  firstName: '', lastName: '', displayName: '',
  ageGroup: '', gender: '', state: '', language: 'English',
};

export const DEFAULT_LEARNING: UserLearning = {
  primaryClass: '', board: 'CBSE',
  targetExams: [], subjects: [], selectedFeatures: [],
  selectedRanges: [],
};

export const DEFAULT_PARENT: UserParent = {
  parentEmail: '', parentUid: null, connected: false, requestSent: false,
};

export const DEFAULT_EXTENDED_PROFILE: ExtendedUserProfile = {
  personal: DEFAULT_PERSONAL,
  learning: DEFAULT_LEARNING,
  parent: DEFAULT_PARENT,
  selectedAvatarId: 'starter',
};

export async function getExtendedProfile(uid: string): Promise<ExtendedUserProfile> {
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (!snap.exists()) return DEFAULT_EXTENDED_PROFILE;
    const d = snap.data();
    const parent = { ...DEFAULT_PARENT, ...(d.parent ?? {}) };
    // The authoritative link signal is `parentId` written by the parent when they
    // accept the connection (Firestore rules only let a parent touch parentId on a
    // child doc — they cannot write the nested `parent.connected` flag). So derive
    // the connected state from parentId here.
    if (typeof d.parentId === 'string' && d.parentId.length > 0) {
      parent.connected = true;
      parent.parentUid = d.parentId;
    }
    return {
      personal: { ...DEFAULT_PERSONAL, ...(d.personal ?? {}) },
      learning: { ...DEFAULT_LEARNING, ...(d.learning ?? {}) },
      parent,
      selectedAvatarId: d.selectedAvatarId ?? 'starter',
      role: d.role === 'student' || d.role === 'parent' ? d.role : undefined,
    };
  } catch {
    return DEFAULT_EXTENDED_PROFILE;
  }
}

export async function saveExtendedProfile(uid: string, patch: Partial<ExtendedUserProfile>): Promise<void> {
  await setDoc(doc(db, 'users', uid), { ...patch, updatedAt: serverTimestamp() }, { merge: true });
}

/** Save the user's account role (student or parent) to Firestore. */
export async function saveUserRole(uid: string, role: 'student' | 'parent'): Promise<void> {
  await setDoc(doc(db, 'users', uid), { role, updatedAt: serverTimestamp() }, { merge: true });
}

/**
 * Check whether a user already has a role set in Firestore.
 * Returns the role string or null if not set.
 */
export async function getCloudRole(uid: string): Promise<'student' | 'parent' | null> {
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (!snap.exists()) return null;
    const r = snap.data().role;
    return r === 'student' || r === 'parent' ? r : null;
  } catch {
    return null;
  }
}

/** Read cached role from localStorage (fallback only). */
export function getStoredRole(): 'student' | 'parent' | null {
  try { return localStorage.getItem('syllab_user_role') as 'student' | 'parent' | null; } catch { return null; }
}

/** Write role to localStorage. */
export function setStoredRole(role: 'student' | 'parent'): void {
  try { localStorage.setItem('syllab_user_role', role); } catch { /* ignore */ }
}

export async function sendParentRequest(
  childUid: string,
  childEmail: string,
  childName: string,
  parentEmail: string,
): Promise<void> {
  await addDoc(collection(db, 'parentRequests'), {
    childUid,
    childEmail,
    childName: childName || childEmail,
    parentEmailLower: parentEmail.toLowerCase().trim(),
    status: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
