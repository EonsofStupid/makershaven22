import { atom } from 'jotai';
import type { AuthUser, AuthSession } from '@/lib/auth/types/auth';

// Base atoms
export const sessionAtom = atom<AuthSession | null>(null);
export const userAtom = atom<AuthUser | null>(null);
export const authLoadingAtom = atom<boolean>(true);
export const authErrorAtom = atom<Error | null>(null);
export const isOfflineAtom = atom<boolean>(!navigator.onLine);

// Writable atoms
export const setSessionAtom = atom(
  (get) => get(sessionAtom),
  (_get, set, session: AuthSession | null) => {
    set(sessionAtom, session);
  }
);

export const setUserAtom = atom(
  (get) => get(userAtom),
  (_get, set, user: AuthUser | null) => {
    set(userAtom, user);
  }
);

export const setAuthLoadingAtom = atom(
  (get) => get(authLoadingAtom),
  (_get, set, loading: boolean) => {
    set(authLoadingAtom, loading);
  }
);

export const setAuthErrorAtom = atom(
  (get) => get(authErrorAtom),
  (_get, set, error: Error | null) => {
    set(authErrorAtom, error);
  }
);

export const setOfflineAtom = atom(
  (get) => get(isOfflineAtom),
  (_get, set, offline: boolean) => {
    set(isOfflineAtom, offline);
  }
);