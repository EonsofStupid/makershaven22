import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { AuthUser, AuthSession } from '@/lib/auth/types/auth';
import { useAuthStore } from '../../auth-store';

// Persistent storage atoms that sync with Zustand
export const sessionAtom = atom(
  (get) => useAuthStore.getState().session,
  (_get, _set, newSession: AuthSession | null) => {
    useAuthStore.getState().setSession(newSession);
  }
);

export const userAtom = atom(
  (get) => useAuthStore.getState().user,
  (_get, _set, newUser: AuthUser | null) => {
    useAuthStore.getState().setUser(newUser);
  }
);

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