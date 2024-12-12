import { atom } from 'jotai';
import type { AuthSession, AuthUser, SecurityLog } from '@/lib/auth/types/auth';

// Base atoms
export const sessionAtom = atom<AuthSession | null>(null);
export const userAtom = atom<AuthUser | null>(null);
export const authLoadingAtom = atom<boolean>(true);
export const authErrorAtom = atom<Error | null>(null);
export const isOfflineAtom = atom<boolean>(!navigator.onLine);
export const isTransitioningAtom = atom<boolean>(false);
export const securityLogsAtom = atom<SecurityLog[]>([]);

// Writable atoms
export const setSessionAtom = atom(
  (get) => get(sessionAtom),
  (_get, set, update: AuthSession | null) => set(sessionAtom, update)
);

export const setUserAtom = atom(
  (get) => get(userAtom),
  (_get, set, update: AuthUser | null) => set(userAtom, update)
);

export const setAuthLoadingAtom = atom(
  (get) => get(authLoadingAtom),
  (_get, set, update: boolean) => set(authLoadingAtom, update)
);

export const setAuthErrorAtom = atom(
  (get) => get(authErrorAtom),
  (_get, set, update: Error | null) => set(authErrorAtom, update)
);

export const setOfflineAtom = atom(
  (get) => get(isOfflineAtom),
  (_get, set, update: boolean) => set(isOfflineAtom, update)
);

export const setIsTransitioningAtom = atom(
  (get) => get(isTransitioningAtom),
  (_get, set, update: boolean) => set(isTransitioningAtom, update)
);

export const setSecurityLogsAtom = atom(
  (get) => get(securityLogsAtom),
  (_get, set, update: SecurityLog[]) => set(securityLogsAtom, update)
);

// Computed atoms
export const hasValidSessionAtom = atom(
  (get) => {
    const session = get(sessionAtom);
    if (!session) return false;
    return session.isValid && new Date(session.expiresAt) > new Date();
  }
);

export const isAdminAtom = atom(
  (get) => {
    const user = get(userAtom);
    return user?.role === 'admin' || user?.role === 'super_admin';
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