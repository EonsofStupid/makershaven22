import { atom } from 'jotai';
import type { AuthUser, AuthSession } from '@/lib/types/auth';
import { useAuthStore } from '../../auth-store';

// Base atoms
export const authUserAtom = atom<AuthUser | null>(null);
export const authSessionAtom = atom<AuthSession | null>(null);
export const authLoadingAtom = atom<boolean>(false);
export const authErrorAtom = atom<Error | null>(null);

// Computed atoms
export const isAuthenticatedAtom = atom(
  (get) => get(authSessionAtom) !== null && get(authUserAtom) !== null
);

// Sync atom that connects Jotai and Zustand
export const authSyncAtom = atom(
  (get) => ({
    user: get(authUserAtom),
    session: get(authSessionAtom),
    isLoading: get(authLoadingAtom),
    error: get(authErrorAtom)
  }),
  (get, set, update: Partial<{
    user: AuthUser | null;
    session: AuthSession | null;
    isLoading: boolean;
    error: Error | null;
  }>) => {
    if ('user' in update) {
      set(authUserAtom, update.user ?? null);
      useAuthStore.getState().setUser(update.user ?? null);
    }
    if ('session' in update) {
      set(authSessionAtom, update.session ?? null);
      useAuthStore.getState().setSession(update.session ?? null);
    }
    if ('error' in update) {
      set(authErrorAtom, update.error ?? null);
      useAuthStore.getState().setError(update.error ?? null);
    }
  }
);