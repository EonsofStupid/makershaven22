import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { AuthUser, AuthSession } from '@/lib/auth/types/auth';

// Persistent storage atoms
export const sessionAtom = atomWithStorage<AuthSession | null>('session', null);
export const userAtom = atomWithStorage<AuthUser | null>('user', null);

// Writable derived atoms
export const sessionWriteAtom = atom(
  (get) => get(sessionAtom),
  (_get, set, session: AuthSession | null) => {
    set(sessionAtom, session);
  }
);

export const userWriteAtom = atom(
  (get) => get(userAtom),
  (_get, set, user: AuthUser | null) => {
    set(userAtom, user);
  }
);

// Loading state
export const authLoadingAtom = atom<boolean>(false);

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