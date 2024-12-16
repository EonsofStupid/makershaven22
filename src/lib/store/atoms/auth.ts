import { atom } from 'jotai';
import type { Session } from '@supabase/supabase-js';
import type { UserRole } from '@/integrations/supabase/types/auth';

export interface AuthUser {
  id: string;
  email?: string;
  role?: UserRole;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
}

export const sessionAtom = atom<Session | null>(null);
export const userAtom = atom<AuthUser | null>(null);
export const setSessionAtom = atom(
  null,
  (_get, set, session: Session | null) => {
    set(sessionAtom, session);
  }
);
export const setUserAtom = atom(
  null,
  (_get, set, user: AuthUser | null) => {
    set(userAtom, user);
  }
);