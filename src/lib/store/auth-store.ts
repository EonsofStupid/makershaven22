import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { AuthState, AuthUser, AuthSession } from '@/lib/types/store-types';

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: true,
  error: null,
  isTransitioning: false,

  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setIsTransitioning: (transitioning) => set({ isTransitioning: transitioning }),

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ session: null, user: null });
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  },

  initialize: async () => {
    try {
      set({ isLoading: true });
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (session) {
        const { user } = session;
        set({ 
          session,
          user: user as AuthUser,
        });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },

  handleSessionUpdate: async (session) => {
    set({ isTransitioning: true });
    try {
      if (session) {
        const { user } = session;
        set({ 
          session,
          user: user as AuthUser,
        });
      } else {
        set({ session: null, user: null });
      }
    } catch (error) {
      console.error('Error handling session update:', error);
      set({ error: error as Error });
    } finally {
      set({ isTransitioning: false });
    }
  }
}));