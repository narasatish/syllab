import { beforeEach, describe, expect, it, vi } from 'vitest';

const createUserWithEmailAndPasswordMock = vi.fn();
const getDocMock = vi.fn();
const setDocMock = vi.fn();
const addDocMock = vi.fn();
const signInWithEmailAndPasswordMock = vi.fn();
const signInWithPopupMock = vi.fn();
const setPersistenceMock = vi.fn().mockResolvedValue(undefined);

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({ name: 'test-app' })),
}));

vi.mock('firebase/auth', () => {
  const GoogleAuthProvider = vi.fn();
  return {
    browserLocalPersistence: 'local',
    createUserWithEmailAndPassword: createUserWithEmailAndPasswordMock,
    getAuth: vi.fn(() => ({ signOut: vi.fn() })),
    GoogleAuthProvider,
    setPersistence: setPersistenceMock,
    signInWithEmailAndPassword: signInWithEmailAndPasswordMock,
    signInWithPopup: signInWithPopupMock,
    sendPasswordResetEmail: vi.fn(),
  };
});

vi.mock('firebase/firestore', () => ({
  addDoc: addDocMock,
  collection: vi.fn((database, path) => ({ database, path })),
  doc: vi.fn((database, ...segments: string[]) => ({ database, path: segments.join('/') })),
  getDoc: getDocMock,
  getDocs: vi.fn(),
  getFirestore: vi.fn(() => ({ name: 'db' })),
  limit: vi.fn((value: number) => value),
  orderBy: vi.fn((field: string, direction: string) => ({ field, direction })),
  query: vi.fn((...parts: unknown[]) => parts),
  serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
  setDoc: setDocMock,
  where: vi.fn((field: string, operator: string, value: string) => ({ field, operator, value })),
}));

describe('firebase auth helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setPersistenceMock.mockResolvedValue(undefined);
    setDocMock.mockResolvedValue(undefined);
    addDocMock.mockResolvedValue({ id: 'new-doc' });
    getDocMock.mockResolvedValue({
      exists: () => false,
      data: () => ({}),
    });
  });

  it('signup fails with invalid email', async () => {
    const { signUpWithEmail } = await import('./firebase');
    await expect(signUpWithEmail('bademail', '123456')).rejects.toThrow('Enter a valid email address');
    expect(createUserWithEmailAndPasswordMock).not.toHaveBeenCalled();
  });

  it('signup fails with short password', async () => {
    const { signUpWithEmail } = await import('./firebase');
    await expect(signUpWithEmail('student@example.com', '123')).rejects.toThrow(
      'Password must be at least 6 characters',
    );
    expect(createUserWithEmailAndPasswordMock).not.toHaveBeenCalled();
  });

  it('login maps firebase errors to user-friendly messages', async () => {
    signInWithEmailAndPasswordMock.mockRejectedValueOnce({ code: 'auth/user-not-found' });
    const { signInWithEmail } = await import('./firebase');
    await expect(signInWithEmail('student@example.com', '123456')).rejects.toThrow('No account exists');
  });

  it('signup still succeeds if Firestore profile initialization fails', async () => {
    createUserWithEmailAndPasswordMock.mockResolvedValueOnce({ user: { uid: 'user-setup-fails' } });
    setDocMock.mockRejectedValueOnce({ code: 'permission-denied' });

    const { signUpWithEmail } = await import('./firebase');
    await expect(signUpWithEmail('student@example.com', '123456')).resolves.toEqual({ uid: 'user-setup-fails' });
  });

  it('initializeUser writes the default user profile with both server timestamps', async () => {
    const { initializeUser } = await import('./firebase');
    await initializeUser({ uid: 'user-1' } as never);

    expect(setDocMock).toHaveBeenCalledWith(
      expect.objectContaining({ path: 'users/user-1' }),
      expect.objectContaining({
        score: 0,
        xp: 0,
        rank: 'Beginner',
        createdAt: 'SERVER_TIMESTAMP',
        updatedAt: 'SERVER_TIMESTAMP',
      }),
    );
  });

  it('signup initializes user and progress documents', async () => {
    createUserWithEmailAndPasswordMock.mockResolvedValueOnce({ user: { uid: 'user-2' } });
    const { signUpWithEmail } = await import('./firebase');
    await signUpWithEmail('student@example.com', '123456');

    expect(setDocMock).toHaveBeenCalledWith(
      expect.objectContaining({ path: 'users/user-2' }),
      expect.any(Object),
    );
    expect(setDocMock).toHaveBeenCalledWith(
      expect.objectContaining({ path: 'progress/user-2' }),
      expect.objectContaining({
        completedChapters: [],
        lastChapter: '',
        updatedAt: 'SERVER_TIMESTAMP',
      }),
    );
  });

  it('recordMistake writes the rules-compliant shape', async () => {
    const { recordMistake } = await import('./firebase');
    await recordMistake(
      'user-3',
      {
        id: 'q1',
        options: ['a', 'b', 'c', 'd'],
        correct_index: 2,
        subject: 'Physics',
        chapter_id: 'phy-laws-of-motion',
        question_text: 'Newton second law states',
      },
      'a',
    );

    expect(addDocMock).toHaveBeenCalledWith(
      expect.objectContaining({ path: 'mistakes' }),
      expect.objectContaining({
        userId: 'user-3',
        questionId: 'q1',
        chapterId: 'phy-laws-of-motion',
        subject: 'Physics',
        questionText: 'Newton second law states',
        selectedOption: 'a',
        correctOption: 'c',
        timestamp: 'SERVER_TIMESTAMP',
      }),
    );
  });

  it('submitEnquiry writes the rules-compliant shape', async () => {
    const { submitEnquiry } = await import('./firebase');
    await submitEnquiry('  Nara  ', '  NARA@X.COM  ', '  Hi there  ');

    expect(addDocMock).toHaveBeenCalledWith(
      expect.objectContaining({ path: 'contacts' }),
      expect.objectContaining({
        name: 'Nara',
        email: 'nara@x.com',
        message: 'Hi there',
        createdAt: 'SERVER_TIMESTAMP',
      }),
    );
  });
});
