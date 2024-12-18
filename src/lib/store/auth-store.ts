import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { AuthState, AuthUser, AuthSession, StoreError } from '../types/store-types';
import { toast } from 'sonner';

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  isLoading: true,
  isTransitioning: false,
  error: null,
  isOffline: false,

  initialize: async () => {
    try {
      set({ isLoading: true });
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (session) {
        const { user } = session;
        set({ 
          session: session as AuthSession,
          user: user as AuthUser
        });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ error: error as StoreError });
    } finally {
      set({ isLoading: false });
    }
  },

  handleSessionUpdate: async (session) => {
    try {
      set({ isTransitioning: true });
      
      if (session) {
        const { user } = session;
        set({ 
          session: session as AuthSession,
          user: user as AuthUser,
          error: null 
        });
      } else {
        set({ 
          session: null, 
          user: null,
          error: null
        });
      }
    } catch (error) {
      console.error('Session update error:', error);
      set({ error: error as StoreError });
    } finally {
      set({ isTransitioning: false });
    }
  },

  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setOffline: (isOffline) => set({ isOffline }),

  signOut: async () => {
    try {
      set({ isLoading: true });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      set({ 
        session: null,
        user: null,
        error: null
      });
      
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      set({ error: error as StoreError });
      toast.error('Failed to sign out');
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({
      session: null,
      user: null,
      isLoading: false,
      isTransitioning: false,
      error: null,
      isOffline: false
    });
  }
}));