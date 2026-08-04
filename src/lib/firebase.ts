import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { Question, UserProgress, UserStats } from '../types';
import { FIRESTORE_FEATURES_ENABLED } from './cloudFeatures';
import { isBrowser } from './isomorphic';

// All Firebase config comes from env vars. These are PUBLIC identifiers —
// safe in the client bundle. No JSON-file fallback: the old
// firebase-applet-config.json had a baked-in API key and should be deleted.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
};
const firebaseDatabaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID;

// Backend API base URL — used for the branded password reset email
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://syllab-backend.onrender.com';

// SSR-safe init: Firebase (initializeApp/getAuth/getFirestore + browser persistence)
// must NOT run in Node during server render — it touches browser-only APIs and would
// crash renderToString. We only construct it in the browser. On the server `auth`/`db`
// are left undefined; nothing dereferences them during render (all Firestore/auth calls
// happen inside effects/handlers, which only run on the client).
let app: FirebaseApp | undefined;
let googleProvider: GoogleAuthProvider | undefined;
let authPersistenceReady: Promise<unknown> = Promise.resolve();
export let auth: Auth = undefined as unknown as Auth;
export let db: Firestore = undefined as unknown as Firestore;

if (isBrowser) {
  for (const [k, v] of Object.entries(firebaseConfig)) {
    if (!v) console.error(`Missing Firebase env var for: ${k} (set VITE_FIREBASE_*)`);
  }
  app = initializeApp(firebaseConfig);
  // App Check — bot/abuse protection. Completely inert until
  // VITE_FIREBASE_APPCHECK_KEY (a reCAPTCHA v3 site key) is set AND the site is
  // registered in Firebase console → App Check. Safe rollout: ship this code,
  // add the key, verify tokens arrive in the console (monitor mode), THEN turn
  // on enforcement per API. Enforcing before tokens flow would block all access.
  const appCheckKey = import.meta.env.VITE_FIREBASE_APPCHECK_KEY;
  if (appCheckKey) {
    try {
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(appCheckKey),
        isTokenAutoRefreshEnabled: true,
      });
    } catch (e) {
      console.error('App Check init failed', e);
    }
  }
  auth = getAuth(app);
  db = firebaseDatabaseId ? getFirestore(app, firebaseDatabaseId) : getFirestore(app);
  googleProvider = new GoogleAuthProvider();
  authPersistenceReady = setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error('Unable to configure Firebase auth persistence.', error);
  });
}

// NOTE: `rank: 'Beginner'` remains the initial default for back-compat with
// existing production users. The firestore.rules allow both 'Beginner' and
// the progression names ('Initiate' → 'Grandmaster').
// Moved to lib/userDefaults so App.tsx can seed state without pulling the SDK.
// Re-exported here so existing importers keep working.
import { DEFAULT_USER_STATS, DEFAULT_USER_PROGRESS } from './userDefaults';
export { DEFAULT_USER_STATS, DEFAULT_USER_PROGRESS };

export const mapError = (code?: string) => {
  switch (code) {
    case 'auth/email-already-in-use': return 'This email is already registered. Switch to Login instead of Sign Up.';
    case 'auth/wrong-password':
    case 'auth/invalid-login-credentials':
    case 'auth/invalid-credential':   return 'Could not sign in. Check the password, or use Sign Up if this is a new account.';
    case 'auth/user-not-found':       return 'No account exists for this email. Use Sign Up to create one.';
    case 'auth/invalid-email':        return 'Enter a valid email address';
    case 'auth/invalid-api-key':      return 'Firebase API key is invalid. Check VITE_FIREBASE_API_KEY.';
    case 'auth/api-key-not-valid':    return 'Firebase API key is invalid. Check VITE_FIREBASE_API_KEY.';
    case 'auth/app-not-authorized':   return 'This app domain is not authorized in Firebase Console';
    case 'auth/popup-closed-by-user': return 'Google sign-in was cancelled';
    case 'auth/network-request-failed': return 'Network error. Check your connection';
    case 'auth/unauthorized-domain':  return 'This domain is not authorized in Firebase Console';
    case 'auth/operation-not-allowed': return 'Auth provider not enabled in Firebase Console';
    default: return 'Authentication failed. Please check your credentials';
  }
};

const mapGoogleError = (code?: string) => {
  switch (code) {
    case 'auth/account-exists-with-different-credential':
      return 'This email is already registered with another sign-in method. Use Email login or reset your password.';
    case 'auth/invalid-credential':
    case 'auth/invalid-login-credentials':
      return 'Google sign-in could not be completed. Try again or check that Google sign-in is enabled for this Firebase project.';
    default:
      return mapError(code);
  }
};

const validateEmail = (email: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error('Enter a valid email address');
  }
  return normalizedEmail;
};

const validatePassword = (password: string) => {
  if (password.length < 6) throw new Error('Password must be at least 6 characters');
  return password;
};

const normalizeAuthError = (error: unknown, mapper: (code?: string) => string = mapError) => {
  if (error instanceof Error && !('code' in (error as unknown as Record<string, unknown>))) {
    return error;
  }
  const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : undefined;
  if (import.meta.env.DEV && code) {
    console.warn('[firebase-auth]', code, error);
  }
  return new Error(mapper(code));
};

// ========== USER PROFILE INIT ==========
export const initializeUser = async (user: Pick<User, 'uid' | 'email' | 'displayName'>) => {
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  // Normalise email to lowercase for consistent queries
  const emailLower = (user.email || '').toLowerCase().trim();

  if (!snap.exists()) {
    // New user — create doc with email so parent-child lookup works
    await setDoc(ref, {
      ...DEFAULT_USER_STATS,
      email: emailLower,
      displayName: user.displayName || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else if (emailLower && !snap.data().email) {
    // Backfill email for existing users who were created without it
    await setDoc(ref, { email: emailLower, updatedAt: serverTimestamp() }, { merge: true });
  }
};

export const initializeProgress = async (userId: string) => {
  const ref = doc(db, 'progress', userId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      ...DEFAULT_USER_PROGRESS,
      updatedAt: serverTimestamp(),
    });
  }
};

export const ensureUserDocuments = async (user: Pick<User, 'uid' | 'email' | 'displayName'>) => {
  await Promise.all([initializeUser(user), initializeProgress(user.uid)]);
};

export const tryEnsureUserDocuments = async (user: Pick<User, 'uid' | 'email' | 'displayName'>) => {
  if (!FIRESTORE_FEATURES_ENABLED) return false;
  try {
    await ensureUserDocuments(user);
    return true;
  } catch (error) {
    console.warn('Signed in, but Firestore profile initialization failed.', error);
    return false;
  }
};

// ========== AUTH FLOWS ==========
export const signInWithGoogle = async () => {
  await authPersistenceReady;
  try {
    if (!googleProvider) throw new Error('Auth is only available in the browser');
    const result = await signInWithPopup(auth, googleProvider);
    // Pass full user so email + displayName are stored in Firestore doc
    await tryEnsureUserDocuments(result.user);
    return result.user;
  } catch (error) {
    throw normalizeAuthError(error, mapGoogleError);
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  await authPersistenceReady;
  try {
    const normalizedEmail = validateEmail(email);
    validatePassword(password);
    const result = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
    await tryEnsureUserDocuments(result.user);
    return result.user;
  } catch (error) {
    throw normalizeAuthError(error);
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  await authPersistenceReady;
  try {
    const normalizedEmail = validateEmail(email);
    validatePassword(password);
    const result = await signInWithEmailAndPassword(auth, normalizedEmail, password);
    await tryEnsureUserDocuments(result.user);
    return result.user;
  } catch (error) {
    throw normalizeAuthError(error);
  }
};

export const logout = async () => {
  await auth.signOut();

  // Clear all syllab_* localStorage keys for privacy
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith('syllab_'))
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    // localStorage may be unavailable in some environments
  }
};

/**
 * Send a branded welcome email via the Syllab backend (Resend).
 * Fire-and-forget — failure is non-fatal.
 */
export const sendWelcomeEmail = async (email: string, displayName: string) => {
  try {
    await fetch(`${API_BASE_URL}/api/auth/send-welcome-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, displayName, from: 'support@syllab.in' }),
    });
  } catch {
    // Non-fatal: welcome email is best-effort
  }
};

/**
 * Ensure email is written to the user's Firestore doc.
 * Called on every auth state change so existing users get backfilled
 * without needing to sign out and back in.
 */
export const syncUserEmail = async (uid: string, email: string | null) => {
  if (!FIRESTORE_FEATURES_ENABLED || !email) return;
  try {
    const emailLower = email.toLowerCase().trim();
    const ref = doc(db, 'users', uid);
    const snap = await getDoc(ref);
    if (snap.exists() && !snap.data().email) {
      await setDoc(ref, { email: emailLower, updatedAt: serverTimestamp() }, { merge: true });
      console.info('[Syllab] Email backfilled to Firestore for parent-child lookup.');
    }
  } catch (err) {
    console.warn('[Syllab] syncUserEmail failed (non-fatal):', err);
  }
};

// Calls the backend, which generates the reset link via Firebase Admin SDK
// and sends a branded email via Resend. Frontend never sees whether the
// Always uses Firebase's own sendPasswordResetEmail (instant, reliable, no backend needed).
// Simultaneously fires the branded backend email as best-effort so the user gets whichever arrives first.
export const resetPassword = async (email: string) => {
  const normalizedEmail = validateEmail(email);

  // 1. Firebase native reset — guaranteed delivery, works even if backend is down
  await sendPasswordResetEmail(auth, normalizedEmail, {
    url: 'https://syllab.in',
    handleCodeInApp: false,
  });

  // 2. Branded Resend email — fire-and-forget, non-fatal
  fetch(`${API_BASE_URL}/api/auth/send-reset-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: normalizedEmail }),
  }).catch(() => {/* non-fatal */});
};

/**
 * Subscribe an email address to the Syllab weekly newsletter.
 * Writes directly to Firestore (no backend round-trip → no Render cold-start 503).
 * Falls back to the backend API when Firestore is disabled.
 */
export const subscribeToNewsletter = async (
  email: string,
  classLevel?: string,
  role?: 'student' | 'parent',
): Promise<{ success: boolean; error?: string }> => {
  const normalizedEmail = email.toLowerCase().trim();
  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { success: false, error: 'Enter a valid email address' };
  }

  // Direct Firestore write — instant, no sleeping backend. This is the source of
  // truth for the subscriber list (used by the weekly send).
  if (FIRESTORE_FEATURES_ENABLED) {
    try {
      await addDoc(collection(db, 'newsletters'), {
        email: normalizedEmail,
        classLevel: classLevel || '',
        role: role || '',
        active: true,
        subscribedAt: serverTimestamp(),
      });
      // Best-effort: ping the backend so it sends a "you're subscribed" confirmation
      // email via Resend. Fire-and-forget — the subscription is already saved above,
      // so a sleeping/errored backend never blocks the success state.
      void fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, classLevel, role, confirmOnly: true }),
      }).catch(() => {/* non-fatal: confirmation email is best-effort */});
      return { success: true };
    } catch {
      // Fall through to backend
    }
  }

  // Backend fallback
  try {
    const res = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: normalizedEmail, classLevel, role }),
    });
    const data = await res.json().catch(() => ({}));
    return { success: data.success === true };
  } catch {
    return { success: false, error: 'Network error' };
  }
};

/**
 * Send a parent invitation email via the backend.
 * Called when a child sends a parent request.
 */
export const sendParentInvitationEmail = async (
  parentEmail: string,
  childName: string,
  childUid: string,
): Promise<void> => {
  try {
    await fetch(`${API_BASE_URL}/api/auth/send-parent-invitation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ parentEmail, childName, childUid }),
    });
  } catch {
    // Non-fatal
  }
};

// ========== USER STATS & PROGRESS ==========
export const getUserStats = async (userId: string) => {
  const snap = await getDoc(doc(db, 'users', userId));
  return snap.exists() ? (snap.data() as UserStats) : null;
};

/**
 * Saves user stats with schema-safe merging.
 *
 * Because rules enforce monotonic score/xp, don't call this with values
 * lower than what's in Firestore — it will throw PERMISSION_DENIED.
 */
export const saveUserStats = async (userId: string, stats: UserStats) => {
  const ref = doc(db, 'users', userId);
  const snap = await getDoc(ref);
  const prev = snap.exists() ? (snap.data() as UserStats) : null;

  // Rules forbid client-settable createdAt changes; preserve the existing one
  // on updates, and server-timestamp it on create.
  const createdAt = prev?.createdAt ?? serverTimestamp();

  // Monotonic guard at the client level too (fail fast before hitting rules).
  const score = Math.max(stats.score ?? 0, prev?.score ?? 0);
  const xp = Math.max(stats.xp ?? 0, prev?.xp ?? 0);

  await setDoc(
    ref,
    {
      ...stats,
      score,
      xp,
      createdAt,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
};

export const getUserProgress = async (userId: string) => {
  const snap = await getDoc(doc(db, 'progress', userId));
  return snap.exists() ? (snap.data() as UserProgress) : null;
};

export const saveUserProgress = async (userId: string, progress: UserProgress) => {
  await setDoc(
    doc(db, 'progress', userId),
    { ...progress, updatedAt: serverTimestamp() },
    { merge: true },
  );
};

// ========== USER PREFS (pinned chapters etc.) ==========
// Stored in Firestore under userPrefs/{uid}, so a user's pins follow them
// across devices instead of living only in localStorage on one browser.
export interface UserPrefs {
  pinnedChapters?: string[];
}

export const getUserPrefs = async (userId: string): Promise<UserPrefs> => {
  try {
    const snap = await getDoc(doc(db, 'userPrefs', userId));
    if (!snap.exists()) return { pinnedChapters: [] };
    const data = snap.data() as UserPrefs;
    return {
      pinnedChapters: Array.isArray(data?.pinnedChapters) ? data.pinnedChapters : [],
    };
  } catch (e) {
    console.error('getUserPrefs failed', e);
    return { pinnedChapters: [] };
  }
};

export const getPinnedChapters = async (userId: string): Promise<string[]> => {
  const prefs = await getUserPrefs(userId);
  return prefs.pinnedChapters || [];
};

export const savePinnedChapters = async (userId: string, pinnedChapters: string[]) => {
  try {
    await setDoc(
      doc(db, 'userPrefs', userId),
      { pinnedChapters, updatedAt: serverTimestamp() },
      { merge: true },
    );
  } catch (e) {
    console.error('savePinnedChapters failed', e);
  }
};

// ========== MISTAKES ==========
// Schema MUST match firestore.rules:
//   required: userId, questionId, questionText, timestamp
//   allowed:  + chapterId, subject, selectedOption, correctOption
export const recordMistake = async (
  userId: string,
  question: Pick<Question, 'id' | 'options' | 'correct_index' | 'subject' | 'chapter_id' | 'question_text'>,
  selectedOption: string,
) => {
  try {
    await addDoc(collection(db, 'mistakes'), {
      userId,
      questionId: question.id,
      chapterId: question.chapter_id,
      subject: question.subject,
      questionText: question.question_text,
      selectedOption,
      correctOption: question.options[question.correct_index] ?? '',
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.error('[Syllab] Failed to record mistake:', err);
  }
};

export interface MistakeRecord {
  id: string;
  userId: string;
  questionId: string;
  chapterId?: string;
  subject?: string;
  questionText: string;
  selectedOption?: string;
  correctOption?: string;
  timestamp?: unknown;
}

export const getMistakes = async (userId: string): Promise<MistakeRecord[]> => {
  const mistakesQuery = query(
    collection(db, 'mistakes'),
    where('userId', '==', userId),
    orderBy('timestamp', 'desc'),
    limit(50),
  );
  const snap = await getDocs(mistakesQuery);
  return snap.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<MistakeRecord, 'id'>) }));
};

// ========== QUIZ SESSIONS ==========
export interface QuizSession {
  userId: string;
  currentIndex: number;
  questions: Question[];
  score: number;
  updatedAt: unknown;
  config: Record<string, unknown>;
  active?: boolean;
}

export const saveQuizSession = async (
  userId: string,
  session: Omit<QuizSession, 'userId' | 'updatedAt'>,
) => {
  try {
    await setDoc(doc(db, 'quizSessions', userId), {
      ...session,
      userId,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error('[Syllab] Failed to save quiz session:', err);
  }
};

export const getPausedSession = async (userId: string): Promise<QuizSession | null> => {
  const snap = await getDoc(doc(db, 'quizSessions', userId));
  return snap.exists() ? (snap.data() as QuizSession) : null;
};

export const deleteQuizSession = async (userId: string) => {
  await setDoc(doc(db, 'quizSessions', userId), { active: false }, { merge: true });
};

// ========== CONTACT FORM ==========
// Rules schema: exactly { name, email, message, createdAt }. No extra fields.
export const submitEnquiry = async (name: string, email: string, message: string) => {
  await addDoc(collection(db, 'contacts'), {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
    createdAt: serverTimestamp(),
  });
};
