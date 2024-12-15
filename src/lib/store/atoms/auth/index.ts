import { atom } from 'jotai';
import type { AuthUser, AuthSession } from '@/lib/types/auth';

export const authUserAtom = atom<AuthUser | null>(null);
export const authSessionAtom = atom<AuthSession | null>(null);
export const authLoadingAtom = atom<boolean>(false);
export const authErrorAtom = atom<Error | null>(null);

// Computed atoms
export const isAuthenticatedAtom = atom(
  (get) => get(authSessionAtom) !== null && get(authUserAtom) !== null
);

// Actions
export const setAuthStateAtom = atom(
  null,
  (get, set, update: { 
    user?: AuthUser | null;
    session?: AuthSession | null;
    isLoading?: boolean;
    error?: Error | null;
  }) => {
    if ('user' in update) set(authUserAtom, update.user ?? null);
    if ('session' in update) set(authSessionAtom, update.session ?? null);
    if ('isLoading' in update) set(authLoadingAtom, update.isLoading ?? false);
    if ('error' in update) set(authErrorAtom, update.error ?? null);
  }
);