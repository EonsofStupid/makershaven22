import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { AuthSession } from '@/lib/auth/types/auth';

export const sessionAtom = atomWithStorage<AuthSession | null>('auth_session', null);

export const setSessionAtom = atom(
  (get) => get(sessionAtom),
  (_get, set, session: AuthSession | null) => {
    set(sessionAtom, session);
  }
);

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