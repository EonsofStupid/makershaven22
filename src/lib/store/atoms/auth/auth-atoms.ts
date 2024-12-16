import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { AuthUser, AuthSession, AuthState } from '@/lib/types/auth/base';
import { useAuthStore } from '../../auth/auth-store';

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
  (get, set) => {
    const store = useAuthStore.getState();
    set(authUserAtom, store.user);
    set(authSessionAtom, store.session);
    set(authLoadingAtom, store.isLoading);
    set(authErrorAtom, store.error);
    set(authTransitioningAtom, store.isTransitioning);
  }
);

// Action atoms
export const setAuthStateAtom = atom(
  null,
  (get, set, update: Partial<AuthState>) => {
    const store = useAuthStore.getState();
    if ('user' in update) {
      set(authUserAtom, update.user ?? null);
      store.setUser(update.user ?? null);
    }
    if ('session' in update) {
      set(authSessionAtom, update.session ?? null);
      store.setSession(update.session ?? null);
    }
    if ('isLoading' in update) {
      set(authLoadingAtom, update.isLoading ?? false);
      store.setLoading(update.isLoading ?? false);
    }
    if ('error' in update) {
      set(authErrorAtom, update.error ?? null);
      store.setError(update.error ?? null);
    }
    if ('isTransitioning' in update) {
      set(authTransitioningAtom, update.isTransitioning ?? false);
      store.setTransitioning(update.isTransitioning ?? false);
    }
  }
);