import { atom } from 'jotai';
import type { AuthSession, AuthUser, SecurityLog, UserRole } from '@/lib/auth/types/auth';
import type { AuthWritableAtom, AuthState } from '@/lib/types/atom-types';

// Base atoms with proper typing
export const sessionAtom = atom<AuthSession | null>(null);
export const userAtom = atom<AuthUser | null>(null);
export const authLoadingAtom = atom<boolean>(true);
export const authErrorAtom = atom<Error | null>(null);
export const isOfflineAtom = atom<boolean>(!navigator.onLine);
export const isTransitioningAtom = atom<boolean>(false);
export const securityLogsAtom = atom<SecurityLog[]>([]);

// Derived read-only atoms
export const isAuthenticatedAtom = atom<boolean>((get) => {
  const session = get(sessionAtom);
  return !!session?.user;
});

export const userRoleAtom = atom<UserRole | null>((get) => {
  const user = get(userAtom);
  return user?.role || null;
});

export const hasValidSessionAtom = atom<boolean>((get) => {
  const session = get(sessionAtom);
  if (!session?.expires_at) return false;
  return new Date(session.expires_at * 1000) > new Date();
});

export const isAdminAtom = atom<boolean>((get) => {
  const role = get(userRoleAtom);
  return role === 'admin' || role === 'super_admin';
});

// Setter atoms
export const setSessionAtom: AuthWritableAtom<AuthSession | null> = atom(
  (get) => get(sessionAtom),
  (_get, set, update) => {
    set(sessionAtom, update);
    if (!update) {
      set(userAtom, null);
    }
  }
);

export const setUserAtom: AuthWritableAtom<AuthUser | null> = atom(
  (get) => get(userAtom),
  (_get, set, update) => {
    set(userAtom, update);
  }
);

export const setAuthLoadingAtom: AuthWritableAtom<boolean> = atom(
  (get) => get(authLoadingAtom),
  (_get, set, update) => {
    set(authLoadingAtom, update);
  }
);

export const setAuthErrorAtom: AuthWritableAtom<Error | null> = atom(
  (get) => get(authErrorAtom),
  (_get, set, update) => {
    set(authErrorAtom, update);
  }
);

export const setOfflineAtom: AuthWritableAtom<boolean> = atom(
  (get) => get(isOfflineAtom),
  (_get, set, update) => {
    set(isOfflineAtom, update);
  }
);

export const setIsTransitioningAtom: AuthWritableAtom<boolean> = atom(
  (get) => get(isTransitioningAtom),
  (_get, set, update) => {
    set(isTransitioningAtom, update);
  }
);

// Action atoms
export const appendSecurityLogAtom = atom(
  (get) => get(securityLogsAtom),
  (get, set, log: SecurityLog) => {
    const currentLogs = get(securityLogsAtom);
    set(securityLogsAtom, [...currentLogs, log]);
  }
);

export const clearAuthStateAtom = atom(
  (get) => ({
    session: get(sessionAtom),
    user: get(userAtom),
    loading: get(authLoadingAtom),
    error: get(authErrorAtom),
    logs: get(securityLogsAtom),
  } as AuthState),
  (_get, set) => {
    set(sessionAtom, null);
    set(userAtom, null);
    set(authLoadingAtom, false);
    set(authErrorAtom, null);
    set(securityLogsAtom, []);
  }
);

// RBAC utility atoms
export const hasRoleAtom = atom(
  (get) => (requiredRole: UserRole | UserRole[]): boolean => {
    const userRole = get(userRoleAtom);
    if (!userRole) return false;

    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.includes(userRole);
  }
);

// Type guard functions
export const isAuthSession = (value: unknown): value is AuthSession => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'user' in value &&
    typeof value.user === 'object'
  );
};

export const isAuthUser = (value: unknown): value is AuthUser => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof (value as AuthUser).id === 'string'
  );
};