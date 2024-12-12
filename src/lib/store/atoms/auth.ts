import { atom } from 'jotai';
import type { AuthSession, AuthUser } from '@/lib/auth/types';

// Base atoms with proper typing
export const sessionAtom = atom<AuthSession | null>(null);
export const userAtom = atom<AuthUser | null>(null);
export const authLoadingAtom = atom<boolean>(true);
export const authErrorAtom = atom<Error | null>(null);
export const isOfflineAtom = atom<boolean>(!navigator.onLine);
export const isTransitioningAtom = atom<boolean>(false);

// Writable atoms with explicit typing
export const setSessionAtom = atom(
  (get) => get(sessionAtom),
  (_get, set, update: AuthSession | null) => set(sessionAtom, update)
);

export const setUserAtom = atom(
  (get) => get(userAtom),
  (_get, set, update: AuthUser | null) => set(userAtom, update)
);

export const setAuthLoadingAtom = atom(
  (get) => get(authLoadingAtom),
  (_get, set, update: boolean) => set(authLoadingAtom, update)
);

export const setAuthErrorAtom = atom(
  (get) => get(authErrorAtom),
  (_get, set, update: Error | null) => set(authErrorAtom, update)
);

export const setOfflineAtom = atom(
  (get) => get(isOfflineAtom),
  (_get, set, update: boolean) => set(isOfflineAtom, update)
);

export const setIsTransitioningAtom = atom(
  (get) => get(isTransitioningAtom),
  (_get, set, update: boolean) => set(isTransitioningAtom, update)
);