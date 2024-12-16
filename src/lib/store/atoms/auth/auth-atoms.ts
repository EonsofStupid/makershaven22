import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { AuthUser, AuthSession, AuthState } from '@/lib/types/auth/base';

// Persistent storage atoms
export const authUserAtom = atomWithStorage<AuthUser | null>('auth_user', null);
export const authSessionAtom = atomWithStorage<AuthSession | null>('auth_session', null);
export const sessionAtom = authSessionAtom; // For backward compatibility

// Volatile state atoms
export const authLoadingAtom = atom<boolean>(false);
export const loadingStateAtom = atom<{ isLoading: boolean }>({ isLoading: false });
export const authErrorAtom = atom<Error | null>(null);
export const authTransitioningAtom = atom<boolean>(false);
export const userAtom = authUserAtom; // For backward compatibility

// Computed atoms
export const isAuthenticatedAtom = atom(
  (get) => get(authSessionAtom) !== null && get(authUserAtom) !== null
);

// Action atoms
export const setAuthStateAtom = atom(
  null,
  (get, set, update: Partial<AuthState>) => {
    if ('user' in update) set(authUserAtom, update.user ?? null);
    if ('session' in update) set(authSessionAtom, update.session ?? null);
    if ('isLoading' in update) {
      set(authLoadingAtom, update.isLoading ?? false);
      set(loadingStateAtom, { isLoading: update.isLoading ?? false });
    }
    if ('error' in update) set(authErrorAtom, update.error ?? null);
    if ('isTransitioning' in update) set(authTransitioningAtom, update.isTransitioning ?? false);
  }
);

export const setUserAtom = atom(
  null,
  (get, set, user: AuthUser | null) => {
    set(authUserAtom, user);
  }
);

export const setSessionAtom = atom(
  null,
  (get, set, session: AuthSession | null) => {
    set(authSessionAtom, session);
  }
);