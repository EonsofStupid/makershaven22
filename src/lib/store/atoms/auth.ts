import { atom } from 'jotai';
import type { AuthSession, AuthUser, SecurityLog, UserRole } from '@/lib/auth/types/auth';

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

// Setter atoms
export const setSessionAtom = atom(
  null,
  (_get, set, update: AuthSession | null) => {
    set(sessionAtom, update);
    if (!update) {
      set(userAtom, null);
    }
  }
);

export const setUserAtom = atom(
  null,
  (_get, set, update: AuthUser | null) => {
    set(userAtom, update);
  }
);

export const setAuthLoadingAtom = atom(
  null,
  (_get, set, update: boolean) => {
    set(authLoadingAtom, update);
  }
);

export const setAuthErrorAtom = atom(
  null,
  (_get, set, update: Error | null) => {
    set(authErrorAtom, update);
  }
);

export const setOfflineAtom = atom(
  null,
  (_get, set, update: boolean) => {
    set(isOfflineAtom, update);
  }
);

export const setIsTransitioningAtom = atom(
  null,
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