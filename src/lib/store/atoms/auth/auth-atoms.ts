import { atom } from 'jotai';
import { useAuthStore } from '../../auth-store';
import type { AuthUser, AuthSession } from '@/lib/types/auth';

// Auth atoms that sync with Zustand
export const userAtom = atom(
  (get) => useAuthStore.getState().user,
  (_get, _set, newUser: AuthUser | null) => {
    useAuthStore.setState({ user: newUser });
  }
);

export const sessionAtom = atom(
  (get) => useAuthStore.getState().session,
  (_get, _set, newSession: AuthSession | null) => {
    useAuthStore.setState({ session: newSession });
  }
);

// Loading state atom
export const authLoadingAtom = atom(
  (get) => useAuthStore.getState().isLoading
);

// Error state atom
export const authErrorAtom = atom(
  (get) => useAuthStore.getState().error
);

// Computed atoms
export const isAuthenticatedAtom = atom(
  (get) => !!get(sessionAtom)
);

export const userRoleAtom = atom(
  (get) => get(userAtom)?.role || 'guest'
);