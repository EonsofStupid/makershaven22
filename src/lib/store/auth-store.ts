import { create } from 'zustand';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { AuthUser, AuthSession } from '@/lib/types/store-types';

interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setIsTransitioning: (isTransitioning: boolean) => void;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  handleSessionUpdate: (session: AuthSession | null) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  isLoading: true,
  error: null,
  isTransitioning: false,

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

        set({
          session,
          user: { ...session.user, role: profile?.role || 'subscriber' },
          error: null
        });

        // Log security event
        await supabase.from('security_events').insert({
          user_id: session.user.id,
          event_type: 'session_updated',
          severity: 'low',
          details: { timestamp: new Date().toISOString() }
        });

      } else {
        set({ session: null, user: null });
      }
    } catch (error) {
      console.error('Session update error:', error);
      set({ error: error instanceof Error ? error : new Error('Session update failed') });
      toast.error('Session update failed');
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      set({ session: null, user: null });
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

        set({
          session,
          user: { ...session.user, role: profile?.role || 'subscriber' },
          error: null
        });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ error: error instanceof Error ? error : new Error('Failed to initialize auth') });
      toast.error('Authentication error occurred');
    } finally {
      set({ isLoading: false });
    }
  }
}));