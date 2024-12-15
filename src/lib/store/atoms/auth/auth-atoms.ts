import { atom } from 'jotai';
import type { AuthUser, AuthSession } from '@/lib/types/auth';

// Base atoms
export const userAtom = atom<AuthUser | null>(null);
export const sessionAtom = atom<AuthSession | null>(null);
export const loadingStateAtom = atom<{ isLoading: boolean; message?: string }>({
  isLoading: true,
  message: 'Initializing...'
});
export const authErrorAtom = atom<Error | null>(null);

// Auth state atom that combines multiple states
export const authStateAtom = atom({
  user: null as AuthUser | null,
  session: null as AuthSession | null,
  isLoading: true,
  error: null as Error | null
});

// Computed atoms
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

// Action atoms
export const setUserAtom = atom(
  null,
  (_get, set, user: AuthUser | null) => {
    set(userAtom, user);
    set(authStateAtom, (prev) => ({ ...prev, user }));
  }
);

export const setSessionAtom = atom(
  null,
  (_get, set, session: AuthSession | null) => {
    set(sessionAtom, session);
    set(authStateAtom, (prev) => ({ ...prev, session }));
  }
);

export const setLoadingStateAtom = atom(
  null,
  (_get, set, loading: { isLoading: boolean; message?: string }) => {
    set(loadingStateAtom, loading);
    set(authStateAtom, (prev) => ({ ...prev, isLoading: loading.isLoading }));
  }
);

export const setAuthErrorAtom = atom(
  null,
  (_get, set, error: Error | null) => {
    set(authErrorAtom, error);
    set(authStateAtom, (prev) => ({ ...prev, error }));
  }
);