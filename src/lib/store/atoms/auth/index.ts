import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { AuthUser, AuthSession } from '@/lib/auth/types/auth';

// Persistent storage atoms
export const sessionAtom = atomWithStorage<AuthSession | null>('session', null);
export const userAtom = atomWithStorage<AuthUser | null>('user', null);

// Loading state atom
export const loadingStateAtom = atom<{ isLoading: boolean; message?: string }>({
  isLoading: true,
  message: 'Initializing...'
});

// Error handling
export const authErrorAtom = atom<Error | null>(null);

// Computed auth state
export const isAuthenticatedAtom = atom(
  (get) => get(sessionAtom) !== null && get(userAtom) !== null
);

// Role-based access control
export const hasRoleAtom = atom(
  (get) => (requiredRole: string | string[]) => {
    const user = get(userAtom);
    if (!user?.role) return false;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return user.role === requiredRole;
  }
);

// Writable atoms for state updates
export const setSessionAtom = atom(
  null,
  (_get, set, session: AuthSession | null) => {
    set(sessionAtom, session);
  }
);

export const setUserAtom = atom(
  null,
  (_get, set, user: AuthUser | null) => {
    set(userAtom, user);
  }
);

export const setLoadingAtom = atom(
  null,
  (_get, set, loading: { isLoading: boolean; message?: string }) => {
    set(loadingStateAtom, loading);
  }
);

export const setAuthErrorAtom = atom(
  null,
  (_get, set, error: Error | null) => {
    set(authErrorAtom, error);
  }
);