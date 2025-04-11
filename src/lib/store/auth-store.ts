import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from '@/lib/types/core/enums';
import { AuthUser, AuthSession, mapSupabaseSession } from '@/lib/types/auth/types';
import { toast } from '@/lib/toast';

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  isTransitioning: boolean;
  hasAccess: boolean;
  error: Error | { message: string } | null;
  
  // Auth methods
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, userData: any) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
  
  // Helper methods
  initialize: () => Promise<void>;
  refreshUserRole: () => Promise<void>;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  getIsAdmin: () => boolean;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
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
        const mappedSession = mapSupabaseSession(session);
        if (mappedSession) {
          // Get user profile with role info
          const { data: profileData } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          const role = profileData?.role as UserRole | undefined;
          
          const authUser: AuthUser = {
            id: session.user.id,
            email: session.user.email,
            role,
            username: session.user.user_metadata?.username,
            displayName: session.user.user_metadata?.display_name,
            user_metadata: session.user.user_metadata
          };
          
          set({ 
            user: authUser, 
            session: mappedSession,
            hasAccess: true,
            isLoading: false
          });
        }
      } else {
        set({
          user: null,
          session: null,
          hasAccess: false,
          isLoading: false
        });
      }
      
      // Return undefined to ensure this is a proper void promise
      return undefined;
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({
        error: error as Error,
        isLoading: false
      });
      // Return undefined to ensure this is a proper void promise
      return undefined;
    }
  },
  
  // Refresh user role from database
  refreshUserRole: async () => {
    const { user } = get();
    
    if (!user) return;
    
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      
      const role = profileData?.role as UserRole | undefined;
      
      set({ 
        user: { 
          ...user, 
          role 
        } 
      });
    } catch (error) {
      console.error('Error refreshing user role:', error);
    }
  },
  
  // Helper state setters
  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  // Check if user is admin
  getIsAdmin: () => {
    const { user } = get();
    return user?.role === UserRole.ADMIN || user?.role === UserRole.SUPER_ADMIN;
  },
  
  // Auth methods
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null, isTransitioning: true });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      const mappedSession = mapSupabaseSession(data.session);
      
      if (mappedSession) {
        // Get user profile with role info
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
          
        const role = profileData?.role as UserRole | undefined;
        
        const authUser: AuthUser = {
          id: data.user.id,
          email: data.user.email,
          role,
          username: data.user.user_metadata?.username,
          displayName: data.user.user_metadata?.display_name,
          user_metadata: data.user.user_metadata
        };
        
        set({ 
          user: authUser, 
          session: mappedSession,
          hasAccess: true,
          isLoading: false,
          isTransitioning: false
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      set({ 
        error: error as Error, 
        isLoading: false,
        isTransitioning: false
      });
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
      
    } catch (error) {
      console.error('Sign out error:', error);
      set({ 
        error: error as Error, 
        isLoading: false,
        isTransitioning: false
      });
    }
  },
  
  register: async (email, password, userData) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      if (error) throw error;
      
      // Note: At this point, the user is not fully authenticated yet
      // They need to verify their email first (in most setups)
      
      set({ 
        isLoading: false,
        // Keep user and session null until they verify
      });
      
      toast.success('Registration successful! Please check your email to verify your account.');
      
    } catch (error) {
      console.error('Registration error:', error);
      set({ 
        error: error as Error, 
        isLoading: false
      });
    }
  },
  
  resetPassword: async (email) => {
    try {
      set({ isLoading: true, error: null });
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) throw error;
      
      set({ isLoading: false });
      
      toast.success('Password reset link sent to your email.');
      
    } catch (error) {
      console.error('Password reset error:', error);
      set({ 
        error: error as Error, 
        isLoading: false
      });
      
      toast.error('Failed to send password reset link.');
    }
  },
  
  updateProfile: async (data) => {
    try {
      set({ isLoading: true, error: null });
      
      if (!get().user) {
        throw new Error('User not authenticated');
      }
      
      // Update auth metadata if needed
      if (data.email || data.username || data.displayName) {
        const { error } = await supabase.auth.updateUser({
          email: data.email,
          data: {
            username: data.username,
            display_name: data.displayName
          }
        });
        
        if (error) throw error;
      }
      
      // Update profile in profiles table if needed
      if (data.role) {
        const { error } = await supabase
          .from('profiles')
          .update({ role: data.role })
          .eq('id', get().user!.id);
          
        if (error) throw error;
      }
      
      // Update local state
      set({
        user: {
          ...get().user!,
          ...data
        },
        isLoading: false
      });
      
      toast.success('Profile updated successfully.');
      
    } catch (error) {
      console.error('Profile update error:', error);
      set({ 
        error: error as Error, 
        isLoading: false
      });
      
      toast.error('Failed to update profile.');
    }
  }
}));
