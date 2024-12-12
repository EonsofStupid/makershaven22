import { atom } from 'jotai';
import { AuthSession, AuthUser } from '@/lib/auth/types';

// Base atoms
export const sessionAtom = atom<AuthSession | null>(null);
export const userAtom = atom<AuthUser | null>(null);
export const authLoadingAtom = atom<boolean>(true);
export const authErrorAtom = atom<Error | null>(null);
export const isOfflineAtom = atom<boolean>(!navigator.onLine);
export const isTransitioningAtom = atom<boolean>(false);

// Writable atoms
export const setSessionAtom = atom(
  null,
  (_, set, update: AuthSession | null) => set(sessionAtom, update)
);

export const setUserAtom = atom(
  null,
  (_, set, update: AuthUser | null) => set(userAtom, update)
);

export const setAuthLoadingAtom = atom(
  null,
  (_, set, update: boolean) => set(authLoadingAtom, update)
);

export const setAuthErrorAtom = atom(
  null,
  (_, set, update: Error | null) => set(authErrorAtom, update)
);

export const setOfflineAtom = atom(
  null,
  (_, set, update: boolean) => set(isOfflineAtom, update)
);

export const setIsTransitioningAtom = atom(
  null,
  (_, set, update: boolean) => set(isTransitioningAtom, update)
);