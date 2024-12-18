import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { AuthState, AuthUser, AuthSession } from '../types/store-types';
import { toast } from 'sonner';

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  isLoading: true,
  error: null,
  isOffline: false,
  isTransitioning: false,

  initialize: async () => {
    try {
      console.log("Initializing auth...");
      set({ isLoading: true });

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Session error:", sessionError);
        throw sessionError;
      }

      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          // Don't throw here, just log the error
          toast.error("Failed to load user profile");
        }

        // Merge auth user with profile data
        const enrichedUser: AuthUser = {
          ...session.user,
          role: profile?.role || 'subscriber',
          username: profile?.username,
          displayName: profile?.display_name,
          avatarUrl: profile?.avatar_url,
        };

        const enrichedSession: AuthSession = {
          ...session,
          user: enrichedUser,
        };

        set({ 
          session: enrichedSession,
          user: enrichedUser,
          isLoading: false 
        });
      } else {
        set({ 
          session: null,
          user: null,
          isLoading: false 
        });
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      set({ 
        error: error as Error,
        isLoading: false 
      });
      toast.error("Failed to initialize authentication");
    }
  },

  handleSessionUpdate: async (session: AuthSession | null) => {
    try {
      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          toast.error("Failed to load user profile");
          return;
        }

        const enrichedUser: AuthUser = {
          ...session.user,
          role: profile?.role || 'subscriber',
          username: profile?.username,
          displayName: profile?.display_name,
          avatarUrl: profile?.avatar_url,
        };

        const enrichedSession: AuthSession = {
          ...session,
          user: enrichedUser,
        };

        set({ session: enrichedSession, user: enrichedUser });
      } else {
        set({ session: null, user: null });
      }
    } catch (error) {
      console.error("Session update error:", error);
      toast.error("Failed to update session");
    }
  },

  setSession: (session: AuthSession | null) => set({ session }),
  setUser: (user: AuthUser | null) => set({ user }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: Error | null) => set({ error }),
  setOffline: (isOffline: boolean) => set({ isOffline }),

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
      
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
      set({ isTransitioning: false });
      toast.error("Failed to sign out");
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
    });
  },
}));