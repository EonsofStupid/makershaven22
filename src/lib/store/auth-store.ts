
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from '../types/core/enums';

// Define our auth user type
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

// Define our auth session type
interface AuthSession {
  user: AuthUser;
  expires_at?: number;
}

// Define the auth state
interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  isTransitioning: boolean;
  error: Error | null;
  isOffline: boolean;
  lastVerified: number | null;
  
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
  refreshUserRole: () => Promise<UserRole | null>;
  
  // Computed properties
  getIsAuthenticated: () => boolean;
  getIsAdmin: () => boolean;
  getIsMaker: () => boolean;
  getUserRole: () => UserRole | null;
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
      lastVerified: null,
      
      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setTransitioning: (isTransitioning) => set({ isTransitioning }),
      setError: (error) => set({ error }),
      setOffline: (isOffline) => set({ isOffline }),
      
      reset: () => set({ 
        session: null, 
        user: null, 
        error: null,
        lastVerified: null
      }),
      
      initialize: async () => {
        set({ isLoading: true });
        
        try {
          console.log('Initializing auth store');
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Error initializing auth store:', error);
            throw error;
          }
          
          if (session) {
            const { user } = session;
            console.log('User authenticated:', user.id);
            
            // Fetch the user's profile to get their role
            const { data: profile } = await supabase
              .from('profiles')
              .select('role, username, display_name')
              .eq('id', user.id)
              .single();
              
            const role = profile?.role || user.user_metadata?.role || 'subscriber';
            
            set({
              session: {
                user: {
                  id: user.id,
                  email: user.email,
                  role: role,
                  username: profile?.username || user.user_metadata?.username,
                  displayName: profile?.display_name || user.user_metadata?.display_name || user.user_metadata?.username,
                  user_metadata: user.user_metadata
                },
                expires_at: session.expires_at
              },
              user: {
                id: user.id,
                email: user.email,
                role: role,
                username: profile?.username || user.user_metadata?.username,
                displayName: profile?.display_name || user.user_metadata?.display_name || user.user_metadata?.username,
                user_metadata: user.user_metadata
              },
              lastVerified: Date.now()
            });
          } else {
            console.log('No active session');
            set({ session: null, user: null });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          set({ error: error as Error });
        } finally {
          set({ isLoading: false });
        }
      },
      
      refreshUserRole: async () => {
        const userId = get().user?.id;
        if (!userId) return null;
        
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', userId)
            .single();
            
          if (error) throw error;
          
          if (profile?.role) {
            set(state => ({
              user: state.user ? { ...state.user, role: profile.role } : null,
              session: state.session ? {
                ...state.session,
                user: { ...state.session.user, role: profile.role }
              } : null,
              lastVerified: Date.now()
            }));
            return profile.role as UserRole;
          }
          
          return null;
        } catch (error) {
          console.error('Error refreshing user role:', error);
          return null;
        }
      },
      
      signOut: async () => {
        set({ isTransitioning: true });
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          set({ session: null, user: null, error: null, lastVerified: null });
        } catch (error) {
          console.error('Error signing out:', error);
          set({ error: error as Error });
        } finally {
          set({ isTransitioning: false });
        }
      },
      
      // Computed properties as methods
      getIsAuthenticated: () => {
        const state = get();
        return !!state.session?.user?.id;
      },
      
      getIsAdmin: () => {
        const state = get();
        return state.user?.role === 'admin' || state.user?.role === 'super_admin';
      },
      
      getIsMaker: () => {
        const state = get();
        return state.user?.role === 'maker';
      },
      
      getUserRole: () => {
        return get().user?.role || null;
      }
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        session: state.session,
        user: state.user,
        isOffline: state.isOffline,
        lastVerified: state.lastVerified
      })
    }
  )
);
