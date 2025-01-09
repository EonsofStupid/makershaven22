import { create } from 'zustand';
import { AuthError } from '../types/shared/shared';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { AuthSession, AuthUser } from '@/lib/types/auth/types';

interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  isTransitioning: boolean;
  error: AuthError | null;
  initialize: () => Promise<void>;
  handleSessionUpdate: (session: AuthSession | null) => Promise<void>;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: AuthError | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  isLoading: true,
  isTransitioning: false,
  error: null,

  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  initialize: async () => {
    try {
      set({ isLoading: true });
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (session) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) throw profileError;

        set({ 
          session: session as AuthSession,
          user: { ...session.user, role: profile?.role } as AuthUser,
          isLoading: false 
        });
      } else {
        set({ session: null, user: null, isLoading: false });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ error: error as AuthError, isLoading: false });
      toast.error('Failed to initialize authentication');
    }
  },

  handleSessionUpdate: async (session) => {
    try {
      set({ isTransitioning: true });
      
      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) throw profileError;

        set({ 
          session: session as AuthSession,
          user: { ...session.user, role: profile?.role } as AuthUser,
          error: null 
        });
      } else {
        set({ session: null, user: null });
      }
    } catch (error) {
      console.error('Error handling session update:', error);
      set({ error: error as AuthError });
      toast.error('Failed to update session');
    } finally {
      set({ isTransitioning: false });
    }
  },

  signOut: async () => {
    try {
      set({ isTransitioning: true });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ session: null, user: null });
      toast.success('Successfully signed out');
    } catch (error) {
      console.error('Error signing out:', error);
      set({ error: error as AuthError });
      toast.error('Failed to sign out');
    } finally {
      set({ isTransitioning: false });
    }
  }
}));