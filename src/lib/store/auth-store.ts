
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase/client';

export type AuthUser = {
  id: string;
  email?: string | null;
  role?: string;
  username?: string;
  displayName?: string;
  user_metadata?: {
    avatar_url?: string;
    [key: string]: any;
  };
};

export interface AuthSession {
  user: AuthUser;
  expires_at?: number;
}

interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isOffline: boolean;
  
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setOffline: (isOffline: boolean) => void;
  signOut: () => Promise<void>;
  reset: () => void;
  initialize: () => Promise<void>;
  refreshUserRole: () => Promise<void>;
  getIsAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      user: null,
      isLoading: true,
      error: null,
      isOffline: false,
      
      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setOffline: (isOffline) => set({ isOffline }),
      
      reset: () => set({
        session: null,
        user: null,
        isLoading: false,
        error: null
      }),
      
      initialize: async () => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;
          
          if (data.session) {
            set({ session: {
              user: {
                id: data.session.user.id,
                email: data.session.user.email,
                role: data.session.user.user_metadata?.role || 'subscriber',
                username: data.session.user.user_metadata?.username,
                displayName: data.session.user.user_metadata?.display_name,
                user_metadata: data.session.user.user_metadata
              },
              expires_at: data.session.expires_at
            }});
            
            // Fetch user profile to get role
            await get().refreshUserRole();
          }
        } catch (error) {
          console.error('Error initializing auth store:', error);
          set({ error: error as Error });
        } finally {
          set({ isLoading: false });
        }
      },
      
      refreshUserRole: async () => {
        const { session } = get();
        if (!session?.user?.id) return;
        
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('role, username, display_name')
            .eq('id', session.user.id)
            .single();
          
          if (error) throw error;
          
          if (data) {
            set({
              user: {
                ...session.user,
                role: data.role,
                username: data.username,
                displayName: data.display_name
              }
            });
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      },
      
      getIsAdmin: () => {
        const { user } = get();
        return user?.role === 'admin' || user?.role === 'super_admin';
      },
      
      signOut: async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          get().reset();
        } catch (error) {
          console.error('Error signing out:', error);
          set({ error: error as Error });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        session: state.session,
        user: state.user 
      }),
    }
  )
);
