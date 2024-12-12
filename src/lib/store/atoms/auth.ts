import { atom } from 'jotai';
import type { 
  AuthSession, 
  AuthUser, 
  SecurityLog,
  UserRole 
} from '@/lib/auth/types/auth';
import type { 
  AuthAtomValue, 
  AuthWritableAtom 
} from '@/lib/types/atom-types';

// Helper function to create auth atoms with metadata
function createAuthAtom<T>(initialValue: T): AuthWritableAtom<T> {
  return atom<AuthAtomValue<T>>({
    value: initialValue,
    version: 0,
    lastUpdated: new Date()
  });
}

// Base atoms
export const sessionAtom = createAuthAtom<AuthSession | null>(null);
export const userAtom = createAuthAtom<AuthUser | null>(null);
export const authLoadingAtom = createAuthAtom<boolean>(true);
export const authErrorAtom = createAuthAtom<Error | null>(null);
export const isOfflineAtom = createAuthAtom<boolean>(!navigator.onLine);
export const isTransitioningAtom = createAuthAtom<boolean>(false);
export const securityLogsAtom = createAuthAtom<SecurityLog[]>([]);

// Derived read-only atoms
export const isAuthenticatedAtom = atom((get) => {
  const sessionState = get(sessionAtom);
  return !!sessionState.value?.user;
});

export const userRoleAtom = atom((get) => {
  const userState = get(userAtom);
  return userState.value?.role || null;
});

export const hasValidSessionAtom = atom((get) => {
  const sessionState = get(sessionAtom);
  if (!sessionState.value?.expires_at) return false;
  return new Date(sessionState.value.expires_at * 1000) > new Date();
});

export const isAdminAtom = atom((get) => {
  const roleState = get(userRoleAtom);
  return roleState === 'admin' || roleState === 'super_admin';
});

// Setter atoms
export const setSessionAtom = atom(
  null,
  (get, set, update: AuthSession | null) => {
    set(sessionAtom, {
      value: update,
      version: get(sessionAtom).version + 1,
      lastUpdated: new Date()
    });
    if (!update) {
      set(userAtom, {
        value: null,
        version: get(userAtom).version + 1,
        lastUpdated: new Date()
      });
    }
  }
);

export const setUserAtom = atom(
  null,
  (get, set, update: AuthUser | null) => {
    set(userAtom, {
      value: update,
      version: get(userAtom).version + 1,
      lastUpdated: new Date()
    });
  }
);

export const setAuthLoadingAtom = atom(
  null,
  (get, set, update: boolean) => {
    set(authLoadingAtom, {
      value: update,
      version: get(authLoadingAtom).version + 1,
      lastUpdated: new Date()
    });
  }
);

export const setAuthErrorAtom = atom(
  null,
  (get, set, update: Error | null) => {
    set(authErrorAtom, {
      value: update,
      version: get(authErrorAtom).version + 1,
      lastUpdated: new Date()
    });
  }
);

export const setOfflineAtom = atom(
  null,
  (get, set, update: boolean) => {
    set(isOfflineAtom, {
      value: update,
      version: get(isOfflineAtom).version + 1,
      lastUpdated: new Date()
    });
  }
);

export const setIsTransitioningAtom = atom(
  null,
  (get, set, update: boolean) => {
    set(isTransitioningAtom, {
      value: update,
      version: get(isTransitioningAtom).version + 1,
      lastUpdated: new Date()
    });
  }
);

// Action atoms
export const appendSecurityLogAtom = atom(
  null,
  (get, set, log: SecurityLog) => {
    const currentLogs = get(securityLogsAtom);
    set(securityLogsAtom, {
      value: [...currentLogs.value, log],
      version: currentLogs.version + 1,
      lastUpdated: new Date()
    });
  }
);

export const clearAuthStateAtom = atom(
  null,
  (get, set) => {
    set(sessionAtom, { value: null, version: get(sessionAtom).version + 1, lastUpdated: new Date() });
    set(userAtom, { value: null, version: get(userAtom).version + 1, lastUpdated: new Date() });
    set(authLoadingAtom, { value: false, version: get(authLoadingAtom).version + 1, lastUpdated: new Date() });
    set(authErrorAtom, { value: null, version: get(authErrorAtom).version + 1, lastUpdated: new Date() });
    set(securityLogsAtom, { value: [], version: get(securityLogsAtom).version + 1, lastUpdated: new Date() });
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