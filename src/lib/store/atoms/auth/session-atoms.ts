import { atom } from 'jotai';
import type { AuthSession } from '@/lib/auth/types/auth';

// Base session atom
export const sessionAtom = atom<AuthSession | null>(null);

// Setter atom for session
export const setSessionAtom = atom(
  null,
  (_get, set, session: AuthSession | null) => {
    set(sessionAtom, session);
  }
);

// Derived session states
export const isAuthenticatedAtom = atom(
  (get) => !!get(sessionAtom)?.user
);

export const hasValidSessionAtom = atom(
  (get) => {
    const session = get(sessionAtom);
    if (!session?.expires_at) return false;
    return new Date(session.expires_at * 1000) > new Date();
  }
);