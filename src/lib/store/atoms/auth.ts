import { atom } from 'jotai';
import type { 
  AuthSession, 
  AuthUser, 
  SecurityLog,
  UserRole 
} from '@/lib/auth/types/auth';

// Base primitive atoms with proper write access
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

// Writable atoms (setters) with proper types
export const setSessionAtom = atom<null, [AuthSession | null], void>(
  null,
  (get, set, update: AuthSession | null) => {
    set(sessionAtom, update);
    if (!update) {
      set(userAtom, null);
    }
  }
);

export const setUserAtom = atom<null, [AuthUser | null], void>(
  null,
  (get, set, update: AuthUser | null) => {
    set(userAtom, update);
  }
);

export const setAuthLoadingAtom = atom<null, [boolean], void>(
  null,
  (get, set, update: boolean) => {
    set(authLoadingAtom, update);
  }
);

export const setAuthErrorAtom = atom<null, [Error | null], void>(
  null,
  (get, set, update: Error | null) => {
    set(authErrorAtom, update);
  }
);

export const setOfflineAtom = atom<null, [boolean], void>(
  null,
  (get, set, update: boolean) => {
    set(isOfflineAtom, update);
  }
);

export const setIsTransitioningAtom = atom<null, [boolean], void>(
  null,
  (get, set, update: boolean) => {
    set(isTransitioningAtom, update);
  }
);

// Action atoms
export const appendSecurityLogAtom = atom<null, [SecurityLog], void>(
  null,
  (get, set, log: SecurityLog) => {
    const currentLogs = get(securityLogsAtom);
    set(securityLogsAtom, [...currentLogs, log]);
  }
);

export const clearAuthStateAtom = atom<null, [], void>(
  null,
  (get, set) => {
    set(sessionAtom, update => null);
    set(userAtom, update => null);
    set(authLoadingAtom, update => false);
    set(authErrorAtom, update => null);
    set(securityLogsAtom, update => []);
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