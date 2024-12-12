import { atom } from 'jotai';
import type { AuthSession, AuthUser, SecurityLog, UserRole } from '@/lib/auth/types/auth';

// Base atoms
export const sessionAtom = atom<AuthSession | null>(null);
export const userAtom = atom<AuthUser | null>(null);
export const authLoadingAtom = atom<boolean>(true);
export const authErrorAtom = atom<Error | null>(null);
export const isOfflineAtom = atom<boolean>(!navigator.onLine);
export const isTransitioningAtom = atom<boolean>(false);
export const securityLogsAtom = atom<SecurityLog[]>([]);

// Derived read-only atoms
export const isAuthenticatedAtom = atom((get) => {
  const session = get(sessionAtom);
  return !!session?.user;
});

export const userRoleAtom = atom((get) => {
  const user = get(userAtom);
  return user?.role || null;
});

export const hasValidSessionAtom = atom((get) => {
  const session = get(sessionAtom);
  if (!session?.expires_at) return false;
  return new Date(session.expires_at * 1000) > new Date();
});

export const isAdminAtom = atom((get) => {
  const role = get(userRoleAtom);
  return role === 'admin' || role === 'super_admin';
});

// Setter atoms (Writable Atoms)
export const setSessionAtom = atom<AuthSession | null, AuthSession | null>(
  (get) => get(sessionAtom), // Read
  (_, set, update) => { // Write
    set(sessionAtom, update);
    if (!update) {
      set(userAtom, null);
    }
  }
);

export const setUserAtom = atom<AuthUser | null, AuthUser | null>(
  (get) => get(userAtom), // Read
  (_, set, update) => { // Write
    set(userAtom, update);
  }
);

export const setAuthLoadingAtom = atom<boolean, boolean>(
  (get) => get(authLoadingAtom), // Read
  (_, set, update) => { // Write
    set(authLoadingAtom, update);
  }
);

export const setAuthErrorAtom = atom<Error | null, Error | null>(
  (get) => get(authErrorAtom), // Read
  (_, set, update) => { // Write
    set(authErrorAtom, update);
  }
);

export const setOfflineAtom = atom<boolean, boolean>(
  (get) => get(isOfflineAtom), // Read
  (_, set, update) => { // Write
    set(isOfflineAtom, update);
  }
);

export const setIsTransitioningAtom = atom<boolean, boolean>(
  (get) => get(isTransitioningAtom), // Read
  (_, set, update) => { // Write
    set(isTransitioningAtom, update);
  }
);

// Action atoms
export const appendSecurityLogAtom = atom<SecurityLog[], SecurityLog>(
  (get) => get(securityLogsAtom), // Read
  (get, set, log) => { // Write
    const currentLogs = get(securityLogsAtom);
    set(securityLogsAtom, [...currentLogs, log]);
  }
);

export const clearAuthStateAtom = atom<
  { session: AuthSession | null; user: AuthUser | null; loading: boolean; error: Error | null; logs: SecurityLog[] },
  void
>(
  (get) => ({
    session: get(sessionAtom),
    user: get(userAtom),
    loading: get(authLoadingAtom),
    error: get(authErrorAtom),
    logs: get(securityLogsAtom),
  }), // Read
  (_, set) => { // Write
    set(sessionAtom, null);
    set(userAtom, null);
    set(authLoadingAtom, false);
    set(authErrorAtom, null);
    set(securityLogsAtom, []);
  }
);

// RBAC utility atoms
export const hasRoleAtom = atom<(requiredRole: UserRole | UserRole[]) => boolean>(
  (get) => (requiredRole: UserRole | UserRole[]) => {
    const userRole = get(userRoleAtom);
    if (!userRole) return false;

    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.includes(userRole);
  }
);
