
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from '../types/core/enums';

interface AuthUser {
  id: string;
  email?: string;
  role?: UserRole;
  username?: string;
  displayName?: string;
  user_metadata?: {
    avatar_url?: string;
    [key: string]: any;
  };
}

interface AuthSession {
  user: AuthUser;
  expires_at?: number;
}

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
  setTransitioning: (transitioning: boolean) => void;
  setError: (error: Error | null) => void;
  setOffline: (isOffline: boolean) => void;
  signOut: () => Promise<void>;
  reset: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      user: null,
      isLoading: true,
      isTransitioning: false,
      error: null,
      isOffline: false,
      
      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setTransitioning: (isTransitioning) => set({ isTransitioning }),
      setError: (error) => set({ error }),
      setOffline: (isOffline) => set({ isOffline }),
      
      reset: () => set({ 
        session: null, 
        user: null, 
        error: null 
      }),
      
      initialize: async () => {
        set({ isLoading: true });
        
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) throw error;
          
          if (session) {
            const { user } = session;
            set({
              session: {
                user: {
                  id: user.id,
                  email: user.email,
                  role: user.user_metadata?.role,
                  username: user.user_metadata?.username,
                  displayName: user.user_metadata?.display_name || user.user_metadata?.username,
                  user_metadata: user.user_metadata
                },
                expires_at: session.expires_at
              },
              user: {
                id: user.id,
                email: user.email,
                role: user.user_metadata?.role,
                username: user.user_metadata?.username,
                displayName: user.user_metadata?.display_name || user.user_metadata?.username,
                user_metadata: user.user_metadata
              }
            });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          set({ error: error as Error });
        } finally {
          set({ isLoading: false });
        }
      },
      
      signOut: async () => {
        set({ isTransitioning: true });
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          set({ session: null, user: null, error: null });
        } catch (error) {
          set({ error: error as Error });
        } finally {
          set({ isTransitioning: false });
        }
      }
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        session: state.session,
        user: state.user,
        isOffline: state.isOffline
      })
    }
  )
);
