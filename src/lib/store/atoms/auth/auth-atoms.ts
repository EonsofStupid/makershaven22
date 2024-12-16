import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { AuthUser, AuthSession, AuthState } from '@/lib/types/auth/base';

// Persistent storage atoms
export const authUserAtom = atomWithStorage<AuthUser | null>('auth_user', null);
export const authSessionAtom = atomWithStorage<AuthSession | null>('auth_session', null);

// Volatile state atoms
export const authLoadingAtom = atom<boolean>(false);
export const authErrorAtom = atom<Error | null>(null);
export const authTransitioningAtom = atom<boolean>(false);

// Computed atoms
export const isAuthenticatedAtom = atom(
  (get) => get(authSessionAtom) !== null && get(authUserAtom) !== null
);

// Sync atoms with Zustand store
export const syncAuthStoreAtom = atom(
  null,
  (get, set, state: AuthState) => {
    set(authUserAtom, state.user);
    set(authSessionAtom, state.session);
    set(authLoadingAtom, state.isLoading);
    set(authErrorAtom, state.error);
    set(authTransitioningAtom, state.isTransitioning);
  }
);