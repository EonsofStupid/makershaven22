import { create } from 'zustand';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { AuthState, AuthUser, AuthSession } from '../types/store-types';

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: true,
  error: null,
  isTransitioning: false,
  hasAccess: false,

  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setIsTransitioning: (isTransitioning) => set({ isTransitioning }),

  handleSessionUpdate: async (session) => {
    try {
      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) throw profileError;

        const authUser: AuthUser = {
          ...session.user,
          role: profile?.role || 'subscriber',
          username: profile?.username,
          displayName: profile?.display_name,
          avatarUrl: profile?.avatar_url
        };

        set({
          session: { ...session, user: authUser } as AuthSession,
          user: authUser,
          error: null,
          hasAccess: true
        });

      } else {
        set({ 
          session: null, 
          user: null,
          hasAccess: false 
        });
      }
    } catch (error) {
      console.error('Session update error:', error);
      set({ 
        error: error instanceof Error ? error : new Error('Session update failed'),
        hasAccess: false
      });
      toast.error('Session update failed');
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      set({ 
        session: null, 
        user: null,
        hasAccess: false
      });
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  },

  initialize: async () => {
    set({ isLoading: true });
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;

      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
            
        if (profileError) throw profileError;

        const authUser: AuthUser = {
          ...session.user,
          role: profile?.role || 'subscriber',
          username: profile?.username,
          displayName: profile?.display_name,
          avatarUrl: profile?.avatar_url
        };

        set({
          session: { ...session, user: authUser } as AuthSession,
          user: authUser,
          error: null,
          hasAccess: true
        });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ 
        error: error instanceof Error ? error : new Error('Failed to initialize auth'),
        hasAccess: false
      });
      toast.error('Authentication error occurred');
    } finally {
      set({ isLoading: false });
    }
  }
}));