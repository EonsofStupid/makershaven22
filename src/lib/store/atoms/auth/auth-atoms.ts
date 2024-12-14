import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useAuthStore } from '../../auth-store';
import type { AuthUser, AuthSession } from '@/lib/types/auth';

// Base atoms with storage
export const userAtom = atomWithStorage<AuthUser | null>('auth_user', null);
export const sessionAtom = atomWithStorage<AuthSession | null>('auth_session', null);
export const isLoadingAtom = atom<boolean>(false);
export const errorAtom = atom<Error | null>(null);
export const isTransitioningAtom = atom<boolean>(false);

// Writable atoms for state updates
export const setUserAtom = atom(
  (get) => get(userAtom),
  (_get, set, user: AuthUser | null) => set(userAtom, user)
);

export const setSessionAtom = atom(
  (get) => get(sessionAtom),
  (_get, set, session: AuthSession | null) => set(sessionAtom, session)
);

export const setLoadingAtom = atom(
  (get) => get(isLoadingAtom),
  (_get, set, isLoading: boolean) => set(isLoadingAtom, isLoading)
);

export const setErrorAtom = atom(
  (get) => get(errorAtom),
  (_get, set, error: Error | null) => set(errorAtom, error)
);

export const setTransitioningAtom = atom(
  (get) => get(isTransitioningAtom),
  (_get, set, isTransitioning: boolean) => set(isTransitioningAtom, isTransitioning)
);

// Computed atoms
export const isAuthenticatedAtom = atom(
  (get) => !!get(sessionAtom)?.user
);

export const userRoleAtom = atom(
  (get) => get(userAtom)?.role || 'guest'
);

// Action atoms
export const signInAtom = atom(
  null,
  async (_get, set, { email, password }: { email: string; password: string }) => {
    await useAuthStore.getState().signIn(email, password);
  }
);

export const signOutAtom = atom(
  null,
  async (_get, set) => {
    await useAuthStore.getState().signOut();
  }
);