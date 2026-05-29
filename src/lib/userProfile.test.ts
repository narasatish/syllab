import { beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * Bot-account integration tests for the parent ⇄ student connection flow.
 *
 * Two simulated accounts drive these tests:
 *   • STUDENT_BOT — uid 'bot-student', email 'bot.student@syllab.test'
 *   • PARENT_BOT  — uid 'bot-parent',  email 'bot.parent@syllab.test'
 *
 * The Firestore SDK is mocked so the suite runs offline. The mock store models
 * the one rule that matters here: a parent may only write `parentId` on the
 * child's user doc (firestore.rules line 56), NOT the nested `parent.connected`
 * flag. So the student profile must DERIVE its connected state from `parentId`.
 */

const getDocMock = vi.fn();
const setDocMock = vi.fn();
const addDocMock = vi.fn();

vi.mock('./firebase', () => ({ db: { name: 'test-db' } }));

vi.mock('firebase/firestore', () => ({
  addDoc: addDocMock,
  collection: vi.fn((database, path) => ({ database, path })),
  doc: vi.fn((database, ...segments: string[]) => ({ database, path: segments.join('/') })),
  getDoc: getDocMock,
  serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
  setDoc: setDocMock,
}));

const STUDENT_BOT = { uid: 'bot-student', email: 'bot.student@syllab.test', name: 'Student Bot' };
const PARENT_BOT = { uid: 'bot-parent', email: 'bot.parent@syllab.test' };

/** Build a getDoc result for a given user-doc data object (or non-existent). */
function userDoc(data: Record<string, unknown> | null) {
  return { exists: () => data !== null, data: () => data ?? {} };
}

describe('parent ⇄ student connection (bot accounts)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setDocMock.mockResolvedValue(undefined);
    addDocMock.mockResolvedValue({ id: 'request-doc-1' });
  });

  it('student sends a parent request with a rules-compliant, lowercased shape', async () => {
    const { sendParentRequest } = await import('./userProfile');
    await sendParentRequest(STUDENT_BOT.uid, STUDENT_BOT.email, STUDENT_BOT.name, '  BOT.Parent@Syllab.TEST  ');

    expect(addDocMock).toHaveBeenCalledWith(
      expect.objectContaining({ path: 'parentRequests' }),
      expect.objectContaining({
        childUid: STUDENT_BOT.uid,
        childEmail: STUDENT_BOT.email,
        childName: STUDENT_BOT.name,
        parentEmailLower: 'bot.parent@syllab.test',
        status: 'pending',
        createdAt: 'SERVER_TIMESTAMP',
      }),
    );
  });

  it('falls back to childEmail as childName when display name is blank', async () => {
    const { sendParentRequest } = await import('./userProfile');
    await sendParentRequest(STUDENT_BOT.uid, STUDENT_BOT.email, '', PARENT_BOT.email);

    expect(addDocMock).toHaveBeenCalledWith(
      expect.objectContaining({ path: 'parentRequests' }),
      expect.objectContaining({ childName: STUDENT_BOT.email }),
    );
  });

  it('student profile shows DISCONNECTED before the parent accepts (no parentId)', async () => {
    getDocMock.mockResolvedValueOnce(
      userDoc({ personal: { firstName: 'Bot' }, parent: { requestSent: true, parentEmail: PARENT_BOT.email } }),
    );
    const { getExtendedProfile } = await import('./userProfile');
    const profile = await getExtendedProfile(STUDENT_BOT.uid);

    expect(profile.parent.connected).toBe(false);
    expect(profile.parent.requestSent).toBe(true);
    expect(profile.parent.parentUid).toBeNull();
  });

  it('student profile DERIVES connected=true once the parent writes parentId (the bug fix)', async () => {
    // Parent has accepted → linkChild wrote `parentId` onto the child doc.
    // The nested parent.connected flag is still false because rules forbid the
    // parent from touching it — the derivation must kick in.
    getDocMock.mockResolvedValueOnce(
      userDoc({
        personal: { firstName: 'Bot' },
        parent: { requestSent: true, parentEmail: PARENT_BOT.email, connected: false },
        parentId: PARENT_BOT.uid,
      }),
    );
    const { getExtendedProfile } = await import('./userProfile');
    const profile = await getExtendedProfile(STUDENT_BOT.uid);

    expect(profile.parent.connected).toBe(true);
    expect(profile.parent.parentUid).toBe(PARENT_BOT.uid);
  });

  it('treats an empty-string parentId as NOT connected', async () => {
    getDocMock.mockResolvedValueOnce(userDoc({ parentId: '', parent: {} }));
    const { getExtendedProfile } = await import('./userProfile');
    const profile = await getExtendedProfile(STUDENT_BOT.uid);

    expect(profile.parent.connected).toBe(false);
  });

  it('returns safe defaults when the user doc does not exist yet', async () => {
    getDocMock.mockResolvedValueOnce(userDoc(null));
    const { getExtendedProfile, DEFAULT_EXTENDED_PROFILE } = await import('./userProfile');
    const profile = await getExtendedProfile('brand-new-bot');

    expect(profile).toEqual(DEFAULT_EXTENDED_PROFILE);
  });

  it('returns safe defaults (does not throw) when Firestore read fails', async () => {
    getDocMock.mockRejectedValueOnce(new Error('network down'));
    const { getExtendedProfile, DEFAULT_EXTENDED_PROFILE } = await import('./userProfile');
    const profile = await getExtendedProfile(STUDENT_BOT.uid);

    expect(profile).toEqual(DEFAULT_EXTENDED_PROFILE);
  });

  it('saveExtendedProfile merges a patch and stamps updatedAt', async () => {
    const { saveExtendedProfile } = await import('./userProfile');
    await saveExtendedProfile(STUDENT_BOT.uid, { parent: { parentEmail: PARENT_BOT.email, parentUid: null, connected: false, requestSent: true } });

    expect(setDocMock).toHaveBeenCalledWith(
      expect.objectContaining({ path: `users/${STUDENT_BOT.uid}` }),
      expect.objectContaining({
        parent: expect.objectContaining({ requestSent: true }),
        updatedAt: 'SERVER_TIMESTAMP',
      }),
      { merge: true },
    );
  });

  it('saveUserRole writes the role with merge', async () => {
    const { saveUserRole } = await import('./userProfile');
    await saveUserRole(PARENT_BOT.uid, 'parent');

    expect(setDocMock).toHaveBeenCalledWith(
      expect.objectContaining({ path: `users/${PARENT_BOT.uid}` }),
      expect.objectContaining({ role: 'parent', updatedAt: 'SERVER_TIMESTAMP' }),
      { merge: true },
    );
  });

  it('getCloudRole returns the stored role and null for unknown values', async () => {
    const { getCloudRole } = await import('./userProfile');

    getDocMock.mockResolvedValueOnce(userDoc({ role: 'student' }));
    expect(await getCloudRole(STUDENT_BOT.uid)).toBe('student');

    getDocMock.mockResolvedValueOnce(userDoc({ role: 'teacher' }));
    expect(await getCloudRole(STUDENT_BOT.uid)).toBeNull();

    getDocMock.mockResolvedValueOnce(userDoc(null));
    expect(await getCloudRole(STUDENT_BOT.uid)).toBeNull();
  });
});

/**
 * Exam share-code round-trip used by the live-exam flow.
 * The parent dashboard encodes the config and truncates+uppercases it to an
 * 8-char Firestore key; the student joins by that key. These tests pin the
 * encoding so a future refactor can't silently break code sharing.
 */
describe('live exam share-code (bot parent → bot student)', () => {
  it('produces a stable 8-char uppercase alphanumeric code from an exam config', async () => {
    const { encodeExamConfig } = await import('./examCode');
    const config = { class: '10', subjects: ['Mathematics'], level: 'Medium', count: 20 };
    const code = encodeExamConfig(config);

    expect(code).toHaveLength(8);
    expect(code).toMatch(/^[A-Z0-9]{8}$/);
    // Deterministic — same config always yields the same join code
    expect(encodeExamConfig(config)).toBe(code);
  });

  it('different configs yield different codes (regression: old encoder collided everything)', async () => {
    const { encodeExamConfig } = await import('./examCode');
    const a = encodeExamConfig({ class: '10', subjects: ['Mathematics'], level: 'Medium', count: 20 });
    const b = encodeExamConfig({ class: '12', subjects: ['Physics'], level: 'Hard', count: 30 });
    expect(a).not.toBe(b);
  });

  it('subject ORDER does not change the code (canonicalized)', async () => {
    const { encodeExamConfig } = await import('./examCode');
    const a = encodeExamConfig({ class: '10', subjects: ['Mathematics', 'Science'], level: 'Medium', count: 20 });
    const b = encodeExamConfig({ class: '10', subjects: ['Science', 'Mathematics'], level: 'Medium', count: 20 });
    expect(a).toBe(b);
  });

  it('stays collision-free across a large grid of realistic configs', async () => {
    const { encodeExamConfig } = await import('./examCode');
    const classes = ['5', '6', '7', '8', '9', '10', '11', '12'];
    const subjectSets = [['Mathematics'], ['Physics'], ['Chemistry'], ['Biology'], ['English'], ['Mathematics', 'Science'], ['Physics', 'Chemistry']];
    const levels = ['Easy', 'Medium', 'Hard'];
    const counts = [10, 20, 30];
    const seen = new Map<string, string>();
    for (const c of classes)
      for (const s of subjectSets)
        for (const l of levels)
          for (const n of counts) {
            const cfg = { class: c, subjects: s, level: l, count: n };
            const code = encodeExamConfig(cfg);
            const key = JSON.stringify(cfg);
            const prior = [...seen.entries()].find(([, v]) => v === code);
            expect(prior, `collision: ${key} ↔ ${prior?.[0]}`).toBeUndefined();
            seen.set(key, code);
          }
    expect(seen.size).toBe(classes.length * subjectSets.length * levels.length * counts.length);
  });
});
