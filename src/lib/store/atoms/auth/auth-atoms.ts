import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { AuthUser, AuthSession } from '@/lib/types/store/auth';

// Base atoms
export const userAtom = atomWithStorage<AuthUser | null>('user', null);
export const sessionAtom = atomWithStorage<AuthSession | null>('session', null);
export const loadingStateAtom = atom<{ isLoading: boolean; message?: string }>({
  isLoading: true,
  message: 'Initializing...'
});
export const authErrorAtom = atom<Error | null>(null);

// Computed atoms
export const isAuthenticatedAtom = atom(
  (get) => get(sessionAtom) !== null && get(userAtom) !== null
);

// Action atoms
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
  (_get, set, loading: { isLoading: boolean; message?: string }) => {
    set(loadingStateAtom, loading);
  }
);

export const setAuthErrorAtom = atom(
  null,
  (_get, set, error: Error | null) => {
    set(authErrorAtom, error);
  }
);