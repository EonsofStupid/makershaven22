import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { AuthUser, AuthSession, AuthState } from '@/lib/types/auth';

export const userAtom = atomWithStorage<AuthUser | null>('user', null);

export const sessionAtom = atomWithStorage<AuthSession | null>('session', null);

export const authStateAtom = atom<AuthState>({
  user: null,
  session: null,
  isLoading: true,
  error: null,
  isTransitioning: false
});

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