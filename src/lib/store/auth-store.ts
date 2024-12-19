import { create } from 'zustand';
import { AuthSession, AuthUser } from '@/integrations/supabase/types/auth';
import { AuthState, StoreError } from '@/lib/types/store-types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  isLoading: true,
  error: null,
  isOffline: false,
  isTransitioning: false,
  initialSetupDone: false,

  initialize: async () => {
    try {
      set({ isLoading: true });
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (session) {
        set({
          session,
          user: session.user as AuthUser,
          initialSetupDone: true
        });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ error: { message: 'Failed to initialize authentication' } });
    } finally {
      set({ isLoading: false });
    }
  },

  setSession: (session) => {
    set({ 
      session,
      user: session?.user as AuthUser || null,
      isTransitioning: false
    });
  },

  setUser: (user) => set({ user }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  setOffline: (isOffline) => set({ isOffline }),

  handleSessionUpdate: (session) => {
    set({ 
      session,
      user: session?.user as AuthUser || null,
      isTransitioning: false
    });
  },

  signOut: async () => {
    try {
      set({ isTransitioning: true });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      set({
        session: null,
        user: null,
        isTransitioning: false
      });
      
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      set({ 
        error: { message: 'Failed to sign out' },
        isTransitioning: false
      });
      toast.error('Failed to sign out');
    }
  },

  reset: () => {
    set({
      session: null,
      user: null,
      isLoading: false,
      error: null,
      isOffline: false,
      isTransitioning: false,
      initialSetupDone: false
    });
  }
}));