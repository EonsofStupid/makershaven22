import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { AuthUser, AuthSession, AuthState } from '@/lib/types/auth';

// Session atoms
export const sessionAtom = atomWithStorage<AuthSession | null>('auth_session', null);

export const setSessionAtom = atom(
  null,
  (_get, set, session: AuthSession | null) => {
    set(sessionAtom, session);
  }
);

// User atoms
export const userAtom = atomWithStorage<AuthUser | null>('auth_user', null);

export const setUserAtom = atom(
  null,
  (_get, set, user: AuthUser | null) => {
    set(userAtom, user);
  }
);

// Loading state atoms
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export const loadingStateAtom = atom<LoadingState>({
  isLoading: false,
  message: undefined
});

export const setLoadingStateAtom = atom(
  null,
  (_get, set, state: LoadingState) => {
    set(loadingStateAtom, state);
  }
);

// Error atoms
export const authErrorAtom = atom<Error | null>(null);

export const setAuthErrorAtom = atom(
  null,
  (_get, set, error: Error | null) => {
    set(authErrorAtom, error);
  }
);

// Transition atoms
export const isTransitioningAtom = atom<boolean>(false);

export const setIsTransitioningAtom = atom(
  null,
  (_get, set, isTransitioning: boolean) => {
    set(isTransitioningAtom, isTransitioning);
  }
);

// Auth state atoms
export const authStateAtom = atom<AuthState>({
  isLoading: true,
  hasAccess: false,
  error: null,
  isTransitioning: false,
  reset: () => {}
});

export const setAuthStateAtom = atom(
  null,
  (_get, set, state: Partial<AuthState>) => {
    set(authStateAtom, (prev) => ({ ...prev, ...state }));
  }
);