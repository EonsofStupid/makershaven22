import { atom } from 'jotai';
import type { AuthUser, AuthSession } from '@/lib/auth/types/auth';

export const sessionAtom = atom<AuthSession | null>(null);
export const userAtom = atom<AuthUser | null>(null);
export const authLoadingAtom = atom(true);
export const authErrorAtom = atom<Error | null>(null);
export const isOfflineAtom = atom(!navigator.onLine);