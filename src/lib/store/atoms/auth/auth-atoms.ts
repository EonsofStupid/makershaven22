import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { AuthUser, AuthSession, UserRole } from '@/lib/types/auth';

export const userAtom = atomWithStorage<AuthUser | null>('auth_user', null);
export const sessionAtom = atomWithStorage<AuthSession | null>('auth_session', null);
export const isLoadingAtom = atom<boolean>(true);
export const errorAtom = atom<Error | null>(null);
export const isTransitioningAtom = atom<boolean>(false);

// Setter atoms
export const setUserAtom = atom(
  null,
  (get, set, user: AuthUser | null) => {
    set(userAtom, user);
  }
);

export const setSessionAtom = atom(
  null,
  (get, set, session: AuthSession | null) => {
    set(sessionAtom, session);
  }
);

export const setLoadingAtom = atom(
  null,
  (get, set, loading: boolean) => {
    set(isLoadingAtom, loading);
  }
);

export const setErrorAtom = atom(
  null,
  (get, set, error: Error | null) => {
    set(errorAtom, error);
  }
);

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