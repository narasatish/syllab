// src/lib/pinnedChapters.ts
//
// Cloud-synced pinned chapters. Replaces the old localStorage approach.
// When a user is signed in, pins are read from / written to userPrefs/{uid}
// in Firestore, so the same pins follow the user across devices.
// When signed out, pins are kept only in React state (lost on reload).

import { useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getPinnedChapters, savePinnedChapters } from './firebase';

export function usePinnedChapters() {
  const [pins, setPins] = useState<string[]>([]);
  const [uid, setUid] = useState<string | null>(auth.currentUser?.uid || null);
  const [hydrated, setHydrated] = useState(false);

  // Track auth state
  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUid(u ? u.uid : null);
    });
  }, []);

  // Load pins whenever the signed-in user changes
  useEffect(() => {
    let cancelled = false;
    setHydrated(false);

    if (!uid) {
      setPins([]);
      setHydrated(true);
      return;
    }

    getPinnedChapters(uid)
      .then((p) => {
        if (!cancelled) {
          setPins(p);
          setHydrated(true);
        }
      })
      .catch((err) => {
        console.error('usePinnedChapters: load failed', err);
        if (!cancelled) {
          setPins([]);
          setHydrated(true);
        }
      });

    return () => { cancelled = true; };
  }, [uid]);

  const togglePin = useCallback(
    (chapterId: string): boolean => {
      // Guests can't persist pins, so we ignore the action and let the UI
      // surface a hint via the `isAuthed` flag.
      if (!uid) return false;

      setPins((prev) => {
        const next = prev.includes(chapterId)
          ? prev.filter((id) => id !== chapterId)
          : [...prev, chapterId];
        // Fire-and-forget save; the UI updates immediately on local state.
        savePinnedChapters(uid, next).catch((err) =>
          console.error('usePinnedChapters: save failed', err),
        );
        return next;
      });

      return true;
    },
    [uid],
  );

  return {
    pins,
    togglePin,
    isAuthed: !!uid,
    hydrated,
  };
}