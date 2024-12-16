import { atom } from 'jotai';
import type { AuthUser, AuthSession } from '@/lib/types/auth/base';
import { useAuthStore } from '../../auth/auth-store';

// Base atoms with persistence
export const authUserAtom = atom<AuthUser | null>(null);
export const authSessionAtom = atom<AuthSession | null>(null);

// Volatile state atoms
export const authLoadingAtom = atom<boolean>(false);
export const authErrorAtom = atom<Error | null>(null);
export const authTransitioningAtom = atom<boolean>(false);

// Computed atoms
export const isAuthenticatedAtom = atom(
  (get) => get(authSessionAtom) !== null && get(authUserAtom) !== null
);

// Sync atoms with Zustand store
export const currentUserAtom = atom((get) => useAuthStore.getState().user);
export const currentSessionAtom = atom((get) => useAuthStore.getState().session);
export const authLoadingStateAtom = atom((get) => useAuthStore.getState().isLoading);
export const authErrorStateAtom = atom((get) => useAuthStore.getState().error);

// Actions
export const setAuthStateAtom = atom(
  null,
  (get, set, update: { 
    user?: AuthUser | null;
    session?: AuthSession | null;
    isLoading?: boolean;
    error?: Error | null;
  }) => {
    if ('user' in update) {
      set(authUserAtom, update.user ?? null);
      useAuthStore.getState().setUser(update.user ?? null);
    }
    if ('session' in update) {
      set(authSessionAtom, update.session ?? null);
      useAuthStore.getState().setSession(update.session ?? null);
    }
    if ('isLoading' in update) {
      set(authLoadingAtom, update.isLoading ?? false);
      useAuthStore.getState().setLoading(update.isLoading ?? false);
    }
    if ('error' in update) {
      set(authErrorAtom, update.error ?? null);
      useAuthStore.getState().setError(update.error ?? null);
    }
  }
);