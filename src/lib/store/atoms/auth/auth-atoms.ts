import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { AuthUser, AuthSession } from '@/lib/types/auth';

// Base atoms
export const userAtom = atomWithStorage<AuthUser | null>('auth_user', null);
export const sessionAtom = atomWithStorage<AuthSession | null>('auth_session', null);
export const loadingAtom = atom(false);
export const errorAtom = atom<Error | null>(null);
export const isTransitioningAtom = atom(false);

// Loading state atoms
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export const loadingStateAtom = atom<LoadingState>({
  isLoading: false,
  message: undefined
});

// Setter atoms
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
  (_get, set, state: LoadingState) => {
    set(loadingStateAtom, state);
  }
);

export const setErrorAtom = atom(
  null,
  (_get, set, error: Error | null) => {
    set(errorAtom, error);
  }
);

export const setTransitioningAtom = atom(
  null,
  (_get, set, transitioning: boolean) => {
    set(isTransitioningAtom, transitioning);
  }
);

// Auth action atoms
export const signInAtom = atom(
  null,
  async (_get, set, credentials: { email: string; password: string }) => {
    set(loadingStateAtom, { isLoading: true, message: "Signing in..." });
    try {
      // Implement sign in logic here
      set(loadingStateAtom, { isLoading: false });
    } catch (error) {
      set(errorAtom, error as Error);
      set(loadingStateAtom, { isLoading: false });
    }
  }
);

export const signOutAtom = atom(
  null,
  async (_get, set) => {
    set(loadingStateAtom, { isLoading: true, message: "Signing out..." });
    try {
      // Implement sign out logic here
      set(sessionAtom, null);
      set(userAtom, null);
      set(loadingStateAtom, { isLoading: false });
    } catch (error) {
      set(errorAtom, error as Error);
      set(loadingStateAtom, { isLoading: false });
    }
  }
);