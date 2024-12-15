import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { AuthUser, AuthSession, AuthState } from '@/lib/types/auth';

// Documentation for future AI responses:
// 1. Use atomWithStorage for persistent auth state
// 2. Keep all auth-related atoms in this file
// 3. Follow the naming convention: entityAtom, setEntityAtom

export const userAtom = atomWithStorage<AuthUser | null>('user', null);
export const sessionAtom = atomWithStorage<AuthSession | null>('session', null);
export const loadingStateAtom = atom<boolean>(true);
export const authErrorAtom = atom<Error | null>(null);

export const isAuthenticatedAtom = atom(
  (get) => get(sessionAtom) !== null && get(userAtom) !== null
);

export const setUserAtom = atom(
  null,
  (_get, set, user: AuthUser | null) => {
    set(userAtom, user);
  }
);

export const setSessionAtom = atom(
  null,
  (_get, set, session: AuthSession | null) => {
    set(sessionAtom, session);
  }
);

export const setLoadingAtom = atom(
  null,
  (_get, set, loading: boolean) => {
    set(loadingStateAtom, loading);
  }
);

export const setAuthErrorAtom = atom(
  null,
  (_get, set, error: Error | null) => {
    set(authErrorAtom, error);
  }
);
