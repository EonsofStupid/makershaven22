
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { AuthSession, AuthUser, AuthError } from '@/lib/types/auth/types';

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
        // Fetch user profile to get role information
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          throw profileError;
        }

        // Log the user role for debugging
        console.log('User authenticated with role:', profile?.role);
        
        set({ 
          session: session as AuthSession,
          user: { 
            ...session.user, 
            role: profile?.role 
          } as AuthUser,
          isLoading: false 
        });
      } else {
        set({ session: null, user: null, isLoading: false });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ 
        error: error as AuthError, 
        isLoading: false,
        session: null,
        user: null
      });
    }
  },

  handleSessionUpdate: async (session) => {
    try {
      set({ isTransitioning: true });
      
      if (session?.user) {
        // Fetch profile to get role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile during session update:', profileError);
          throw profileError;
        }

        console.log('Session update - User role:', profile?.role);
        
        set({ 
          session: session as AuthSession,
          user: { 
            ...session.user, 
            role: profile?.role 
          } as AuthUser,
          error: null 
        });
      } else {
        set({ session: null, user: null });
      }
    } catch (error) {
      console.error('Error handling session update:', error);
      set({ error: error as AuthError });
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
