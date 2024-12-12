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
export const setSessionAtom = atom<AuthSession | null, [AuthSession | null], void>(
  (get) => get(sessionAtom),
  (_get, set, update) => set(sessionAtom, update)
);

export const setUserAtom = atom<AuthUser | null, [AuthUser | null], void>(
  (get) => get(userAtom),
  (_get, set, update) => set(userAtom, update)
);

export const setAuthLoadingAtom = atom<boolean, [boolean], void>(
  (get) => get(authLoadingAtom),
  (_get, set, update) => set(authLoadingAtom, update)
);

export const setAuthErrorAtom = atom<Error | null, [Error | null], void>(
  (get) => get(authErrorAtom),
  (_get, set, update) => set(authErrorAtom, update)
);

export const setOfflineAtom = atom<boolean, [boolean], void>(
  (get) => get(isOfflineAtom),
  (_get, set, update) => set(isOfflineAtom, update)
);

export const setIsTransitioningAtom = atom<boolean, [boolean], void>(
  (get) => get(isTransitioningAtom),
  (_get, set, update) => set(isTransitioningAtom, update)
);