import { atom } from 'jotai';
import type { 
  AuthSession, 
  AuthUser, 
  SecurityLog,
  UserRole 
} from '@/lib/auth/types/auth';

// Base primitive atoms
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

// Writable atoms (setters)
export const setSessionAtom = atom(
  (get) => get(sessionAtom),
  (_get, set, update: AuthSession | null) => {
    set(sessionAtom, update);
    if (!update) {
      set(userAtom, null);
    }
  }
);

export const setUserAtom = atom(
  (get) => get(userAtom),
  (_get, set, update: AuthUser | null) => {
    set(userAtom, update);
  }
);

export const setAuthLoadingAtom = atom(
  (get) => get(authLoadingAtom),
  (_get, set, update: boolean) => {
    set(authLoadingAtom, update);
  }
);

export const setAuthErrorAtom = atom(
  (get) => get(authErrorAtom),
  (_get, set, update: Error | null) => {
    set(authErrorAtom, update);
  }
);

export const setOfflineAtom = atom(
  (get) => get(isOfflineAtom),
  (_get, set, update: boolean) => {
    set(isOfflineAtom, update);
  }
);

export const setIsTransitioningAtom = atom(
  (get) => get(isTransitioningAtom),
  (_get, set, update: boolean) => {
    set(isTransitioningAtom, update);
  }
);

// Action atoms
export const appendSecurityLogAtom = atom(
  null,
  (get, set, log: SecurityLog) => {
    const currentLogs = get(securityLogsAtom);
    set(securityLogsAtom, [...currentLogs, log]);
  }
);

export const clearAuthStateAtom = atom(
  null,
  (_get, set) => {
    set(sessionAtom, null);
    set(userAtom, null);
    set(authLoadingAtom, false);
    set(authErrorAtom, null);
    set(securityLogsAtom, []);
  }
);

// Utility atoms for role-based access control
export const hasRoleAtom = atom(
  (get) => (requiredRole: UserRole | UserRole[]) => {
    const userRole = get(userRoleAtom);
    if (!userRole) return false;
    
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.includes(userRole);
  }
);