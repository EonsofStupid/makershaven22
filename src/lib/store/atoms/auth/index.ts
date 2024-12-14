import { atom } from 'jotai';
import type { AuthUser, AuthSession } from '@/lib/types/auth';

// Core auth atoms
export const userAtom = atom<AuthUser | null>(null);
export const sessionAtom = atom<AuthSession | null>(null);
export const loadingStateAtom = atom<{ isLoading: boolean }>({ isLoading: true });
export const authErrorAtom = atom<Error | null>(null);

// Computed atoms
export const isAuthenticatedAtom = atom((get) => !!get(sessionAtom));
export const userRoleAtom = atom((get) => get(userAtom)?.role || null);

// Action atoms
export const setSessionAtom = atom(
  null,
  (_, set, session: AuthSession | null) => {
    set(sessionAtom, session);
    if (session?.user) {
      set(userAtom, session.user);
    } else {
      set(userAtom, null);
    }
  }
);

export const setUserAtom = atom(
  null,
  (_, set, user: AuthUser | null) => {
    set(userAtom, user);
  }
);

export const setLoadingStateAtom = atom(
  null,
  (_, set, loadingState: { isLoading: boolean }) => {
    set(loadingStateAtom, loadingState);
  }
);

export const setAuthErrorAtom = atom(
  null,
  (_, set, error: Error | null) => {
    set(authErrorAtom, error);
  }
);