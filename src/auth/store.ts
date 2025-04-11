
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { AuthState, AuthUser, AuthSession } from './types';
import { toast } from '@/lib/toast';
import { getLogger } from '@/logging';

const logger = getLogger('AuthStore');

export interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  isTransitioning: false,
  hasAccess: false,
  error: null,

  // Initialize authentication state
  initialize: async () => {
    try {
      set({ isLoading: true });
      
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Get user profile with role info
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        const role = profileData?.role;
        
        const authUser: AuthUser = {
          id: session.user.id,
          email: session.user.email,
          role,
          username: session.user.user_metadata?.username,
          displayName: session.user.user_metadata?.display_name,
          user_metadata: session.user.user_metadata
        };
        
        const authSession: AuthSession = {
          id: session.access_token,
          user: authUser,
          expires_at: session.expires_at,
          created_at: new Date().toISOString()
        };
        
        set({ 
          user: authUser, 
          session: authSession,
          hasAccess: true,
          isLoading: false
        });
      } else {
        set({
          user: null,
          session: null,
          hasAccess: false,
          isLoading: false
        });
      }
      
      logger.info('Auth initialized');
    } catch (error) {
      logger.error('Auth initialization error:', { error });
      set({
        error: error as Error,
        isLoading: false
      });
    }
  },
  
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null, isTransitioning: true });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.session) {
        // Get user profile with role info
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
          
        const role = profileData?.role;
        
        const authUser: AuthUser = {
          id: data.user.id,
          email: data.user.email,
          role,
          username: data.user.user_metadata?.username,
          displayName: data.user.user_metadata?.display_name,
          user_metadata: data.user.user_metadata
        };
        
        const authSession: AuthSession = {
          id: data.session.access_token,
          user: authUser,
          expires_at: data.session.expires_at,
          created_at: new Date().toISOString()
        };
        
        set({ 
          user: authUser, 
          session: authSession,
          hasAccess: true,
          isLoading: false,
          isTransitioning: false
        });
        
        toast.success('Logged in successfully');
      }
    } catch (error) {
      logger.error('Login error:', { error });
      set({ 
        error: error as Error, 
        isLoading: false,
        isTransitioning: false
      });
      
      toast.error('Login failed: ' + (error as Error).message);
    }
  },
  
  logout: async () => {
    await get().signOut();
  },
  
  signOut: async () => {
    try {
      set({ isLoading: true, isTransitioning: true });
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      set({ 
        user: null, 
        session: null,
        hasAccess: false,
        isLoading: false,
        isTransitioning: false
      });
      
      toast.info('Logged out');
    } catch (error) {
      logger.error('Sign out error:', { error });
      set({ 
        error: error as Error, 
        isLoading: false,
        isTransitioning: false
      });
    }
  }
}));

// Initialize auth when this module is imported
// useAuthStore.getState().initialize();
