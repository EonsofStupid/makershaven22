
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { AuthUser, AuthSession } from '@/lib/types/auth/types';

interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  isTransitioning: boolean;
  error: Error | null;
  isOffline: boolean;
  
  // Actions
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setOffline: (isOffline: boolean) => void;
  signOut: () => Promise<void>;
  reset: () => void;
  initialize: () => Promise<void>;
  handleSessionUpdate: (session: AuthSession | null) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  isLoading: true,
  isTransitioning: false,
  error: null,
  isOffline: false,

  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setOffline: (isOffline) => set({ isOffline }),

  reset: () => set({
    session: null,
    user: null,
    error: null,
    isLoading: false,
    isTransitioning: false
  }),

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

        if (profileError && !profileError.message.includes('No rows found')) {
          throw profileError;
        }

        set({ 
          session: {
            user: {
              id: session.user.id,
              email: session.user.email,
              role: profile?.role || session.user.user_metadata?.role,
              username: profile?.username || session.user.user_metadata?.username,
              displayName: profile?.display_name || session.user.user_metadata?.display_name,
              user_metadata: session.user.user_metadata
            },
            expires_at: session.expires_at
          },
          user: {
            id: session.user.id,
            email: session.user.email,
            role: profile?.role || session.user.user_metadata?.role,
            username: profile?.username || session.user.user_metadata?.username,
            displayName: profile?.display_name || session.user.user_metadata?.display_name,
            user_metadata: session.user.user_metadata
          },
          isLoading: false
        });
      } else {
        set({ session: null, user: null, isLoading: false });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ error: error as Error, isLoading: false });
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

        if (profileError && !profileError.message.includes('No rows found')) {
          throw profileError;
        }

        set({ 
          session,
          user: {
            ...session.user,
            role: profile?.role || session.user.role 
          },
          error: null 
        });
      } else {
        set({ session: null, user: null });
      }
    } catch (error) {
      console.error('Error handling session update:', error);
      set({ error: error as Error });
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
      set({ error: error as Error });
      toast.error('Failed to sign out');
    } finally {
      set({ isTransitioning: false });
    }
  }
}));
