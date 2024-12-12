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
  null,
  (_get, set, update: AuthSession | null) => set(sessionAtom, update)
);

export const setUserAtom = atom(
  null,
  (_get, set, update: AuthUser | null) => set(userAtom, update)
);

export const setAuthLoadingAtom = atom(
  null,
  (_get, set, update: boolean) => set(authLoadingAtom, update)
);

export const setAuthErrorAtom = atom(
  null,
  (_get, set, update: Error | null) => set(authErrorAtom, update)
);

export const setOfflineAtom = atom(
  null,
  (_get, set, update: boolean) => set(isOfflineAtom, update)
);

export const setIsTransitioningAtom = atom(
  null,
  (_get, set, update: boolean) => set(isTransitioningAtom, update)
);

export const setSecurityLogsAtom = atom(
  null,
  (_get, set, update: SecurityLog[]) => set(securityLogsAtom, update)
);

// Computed atoms
export const hasValidSessionAtom = atom(
  (get) => {
    const session = get(sessionAtom);
    if (!session) return false;
    return session.expires_at ? new Date(session.expires_at * 1000) > new Date() : false;
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