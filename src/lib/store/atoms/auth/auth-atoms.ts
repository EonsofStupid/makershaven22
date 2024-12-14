import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { AuthUser, AuthSession, UserRole } from '@/lib/types/auth';

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

export const setLoadingAtom = atom(
  null,
  (get, set, state: LoadingState) => {
    set(loadingStateAtom, state);
  }
);

// Error handling atoms
export const setErrorAtom = atom(
  null,
  (get, set, error: Error | null) => {
    set(errorAtom, error);
  }
);

// Transition state atoms
export const setTransitioningAtom = atom(
  null,
  (get, set, transitioning: boolean) => {
    set(isTransitioningAtom, transitioning);
  }
);

// Computed atoms
export const isAuthenticatedAtom = atom(
  (get) => !!get(sessionAtom)?.user
);

export const userRoleAtom = atom<UserRole | undefined>(
  (get) => get(userAtom)?.role
);