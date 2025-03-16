
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { supabase } from '@/integrations/supabase/client';
import type { AuthUser, AuthSession } from '@/lib/types/auth/types';

// Atoms for persistent and temporary state
export const userSessionAtom = atomWithStorage<AuthSession | null>('user-session', null);
export const userProfileAtom = atomWithStorage<AuthUser | null>('user-profile', null);
export const userLoadingAtom = atom<boolean>(true);
export const userErrorAtom = atom<Error | null>(null);

// Derived atoms
export const isAuthenticatedAtom = atom<boolean>(
  (get) => !!get(userSessionAtom) && !!get(userProfileAtom)
);

export const userRoleAtom = atom<string | null>(
  (get) => get(userProfileAtom)?.role || null
);

// Actions
export const fetchUserProfileAtom = atom(
  null,
  async (get, set) => {
    const session = get(userSessionAtom);
    
    if (!session?.user?.id) {
      set(userProfileAtom, null);
      set(userLoadingAtom, false);
      return;
    }
    
    set(userLoadingAtom, true);
    set(userErrorAtom, null);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (error) throw error;
      
      set(userProfileAtom, {
        ...session.user,
        ...data
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      set(userErrorAtom, error as Error);
    } finally {
      set(userLoadingAtom, false);
    }
  }
);

export const signOutAtom = atom(
  null,
  async (_get, set) => {
    set(userLoadingAtom, true);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      set(userSessionAtom, null);
      set(userProfileAtom, null);
    } catch (error) {
      console.error('Error signing out:', error);
      set(userErrorAtom, error as Error);
    } finally {
      set(userLoadingAtom, false);
    }
  }
);
