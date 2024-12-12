import { atom } from 'jotai';
import type { AuthUser, AuthSession } from '@/lib/auth/types/auth';

export const sessionAtom = atom<AuthSession | null>(null);
export const userAtom = atom<AuthUser | null>(null);
export const authLoadingAtom = atom<boolean>(true);
export const authErrorAtom = atom<Error | null>(null);
export const isOfflineAtom = atom<boolean>(!navigator.onLine);

// Writable atoms
export const setSessionAtom = atom(
  null,
  (_, set, session: AuthSession | null) => {
    set(sessionAtom, session);
  }
);

export const setUserAtom = atom(
  null,
  (_, set, user: AuthUser | null) => {
    set(userAtom, user);
  }
);

export const setAuthLoadingAtom = atom(
  null,
  (_, set, loading: boolean) => {
    set(authLoadingAtom, loading);
  }
);

export const setAuthErrorAtom = atom(
  null,
  (_, set, error: Error | null) => {
    set(authErrorAtom, error);
  }
);

export const setOfflineAtom = atom(
  null,
  (_, set, offline: boolean) => {
    set(isOfflineAtom, offline);
  }
);