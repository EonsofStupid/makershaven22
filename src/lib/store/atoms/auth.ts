import { atom } from 'jotai';
import type { AuthUser, AuthSession } from '@/lib/auth/types/auth';
import { createAtomPair } from '@/lib/types/atom-types';

// Create atom pairs with proper typing
const [sessionBaseAtom, sessionWritableAtom] = createAtomPair<AuthSession | null>({
  default: null,
  onSet: (newSession) => {
    console.log('Session updated:', newSession?.user?.id);
  }
});

const [userBaseAtom, userWritableAtom] = createAtomPair<AuthUser | null>({
  default: null,
  onSet: (newUser) => {
    console.log('User updated:', newUser?.id);
  }
});

const [loadingBaseAtom, loadingWritableAtom] = createAtomPair<boolean>({
  default: true
});

const [errorBaseAtom, errorWritableAtom] = createAtomPair<Error | null>({
  default: null,
  onSet: (error) => {
    if (error) {
      console.error('Auth error:', error);
    }
  }
});

const [offlineBaseAtom, offlineWritableAtom] = createAtomPair<boolean>({
  default: !navigator.onLine
});

// Export read-only atoms
export const sessionAtom = sessionBaseAtom;
export const userAtom = userBaseAtom;
export const authLoadingAtom = loadingBaseAtom;
export const authErrorAtom = errorBaseAtom;
export const isOfflineAtom = offlineBaseAtom;

// Export writable atoms
export const setSessionAtom = sessionWritableAtom;
export const setUserAtom = userWritableAtom;
export const setAuthLoadingAtom = loadingWritableAtom;
export const setAuthErrorAtom = errorWritableAtom;
export const setOfflineAtom = offlineWritableAtom;