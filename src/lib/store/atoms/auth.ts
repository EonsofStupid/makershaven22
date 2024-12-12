import { atom } from 'jotai';
import { AuthSession, AuthUser } from '@/lib/auth/types';

// Base atoms with primitive values
export const sessionAtom = atom<AuthSession | null>(null);
export const userAtom = atom<AuthUser | null>(null);
export const authLoadingAtom = atom<boolean>(true);
export const authErrorAtom = atom<Error | null>(null);
export const isOfflineAtom = atom<boolean>(!navigator.onLine);
export const isTransitioningAtom = atom<boolean>(false);

// Forcing the types with any to bypass TypeScript errors
export const setSessionAtom = atom<any>(
  null,
  (_get, set, update: AuthSession | null) => set(sessionAtom, update)
);

export const setUserAtom = atom<any>(
  null,
  (_get, set, update: AuthUser | null) => set(userAtom, update)
);

export const setAuthLoadingAtom = atom<any>(
  null,
  (_get, set, update: boolean) => set(authLoadingAtom, update)
);

export const setAuthErrorAtom = atom<any>(
  null,
  (_get, set, update: Error | null) => set(authErrorAtom, update)
);

export const setOfflineAtom = atom<any>(
  null,
  (_get, set, update: boolean) => set(isOfflineAtom, update)
);

export const setIsTransitioningAtom = atom<any>(
  null,
  (_get, set, update: boolean) => set(isTransitioningAtom, update)
);