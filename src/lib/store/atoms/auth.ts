import { atom } from 'jotai';
import type { 
  AuthSession, 
  AuthUser, 
  SecurityLog,
  UserRole 
} from '@/lib/auth/types/auth';
import type { WritableAtom } from 'jotai';

// Base atoms with proper WritableAtom types
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

// Setter atoms with proper WritableAtom types
export const setSessionAtom = atom(
  null, // Read value is not used for setter atoms
  (get, set, update: AuthSession | null) => {
    set(sessionAtom, update);
    if (!update) {
      set(userAtom, null);
    }
  }
) as WritableAtom<null, [AuthSession | null], void>;

export const setUserAtom = atom(
  null,
  (get, set, update: AuthUser | null) => {
    set(userAtom, update);
  }
) as WritableAtom<null, [AuthUser | null], void>;

export const setAuthLoadingAtom = atom(
  null,
  (get, set, update: boolean) => {
    set(authLoadingAtom, update);
  }
) as WritableAtom<null, [boolean], void>;

export const setAuthErrorAtom = atom(
  null,
  (get, set, update: Error | null) => {
    set(authErrorAtom, update);
  }
) as WritableAtom<null, [Error | null], void>;

export const setOfflineAtom = atom(
  null,
  (get, set, update: boolean) => {
    set(isOfflineAtom, update);
  }
) as WritableAtom<null, [boolean], void>;

export const setIsTransitioningAtom = atom(
  null,
  (get, set, update: boolean) => {
    set(isTransitioningAtom, update);
  }
) as WritableAtom<null, [boolean], void>;

// Action atoms with proper types
export const appendSecurityLogAtom = atom(
  null,
  (get, set, log: SecurityLog) => {
    const currentLogs = get(securityLogsAtom);
    set(securityLogsAtom, [...currentLogs, log]);
  }
) as WritableAtom<null, [SecurityLog], void>;

export const clearAuthStateAtom = atom(
  null,
  (get, set) => {
    set(sessionAtom, null);
    set(userAtom, null);
    set(authLoadingAtom, false);
    set(authErrorAtom, null);
    set(securityLogsAtom, []);
  }
) as WritableAtom<null, [null], void>;

// RBAC utility atoms
export const hasRoleAtom = atom(
  (get) => (requiredRole: UserRole | UserRole[]) => {
    const userRole = get(userRoleAtom);
    if (!userRole) return false;
    
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.includes(userRole);
  }
);