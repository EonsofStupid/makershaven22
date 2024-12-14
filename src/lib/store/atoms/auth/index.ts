import { atom } from 'jotai';
import type { AuthUser, AuthSession } from '@/lib/types/auth';
import { useAuthStore } from '../../auth-store';

export const userAtom = atom<AuthUser | null>(
  (get) => useAuthStore.getState().user
);

export const sessionAtom = atom<AuthSession | null>(
  (get) => useAuthStore.getState().session
);

export const isAuthLoadingAtom = atom<boolean>(
  (get) => useAuthStore.getState().isLoading
);

export const authErrorAtom = atom<Error | null>(
  (get) => useAuthStore.getState().error
);