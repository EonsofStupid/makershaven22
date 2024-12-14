import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useAuthStore } from '../../auth-store';
import type { AuthUser, AuthSession } from '@/lib/types/auth';

// Sync atoms with Zustand store
export const userAtom = atom(
  (get) => useAuthStore.getState().user,
  (_get, set, newUser: AuthUser | null) => {
    useAuthStore.setState({ user: newUser });
  }
);

export const sessionAtom = atom(
  (get) => useAuthStore.getState().session,
  (_get, set, newSession: AuthSession | null) => {
    useAuthStore.setState({ session: newSession });
  }
);

export const isLoadingAtom = atom(
  (get) => useAuthStore.getState().isLoading
);

export const errorAtom = atom(
  (get) => useAuthStore.getState().error
);

export const isTransitioningAtom = atom(
  (get) => useAuthStore.getState().isTransitioning
);

// Computed atoms
export const isAuthenticatedAtom = atom(
  (get) => !!get(sessionAtom)?.user
);

export const userRoleAtom = atom(
  (get) => get(userAtom)?.role || 'guest'
);

// Persist some data in localStorage
export const lastLoginAtom = atomWithStorage<string | null>(
  'last_login',
  null
);

// Action atoms
export const signInAtom = atom(
  null,
  async (_get, set, { email, password }: { email: string; password: string }) => {
    await useAuthStore.getState().signIn(email, password);
    set(lastLoginAtom, new Date().toISOString());
  }
);

export const signOutAtom = atom(
  null,
  async (_get, set) => {
    await useAuthStore.getState().signOut();
    set(lastLoginAtom, null);
  }
);