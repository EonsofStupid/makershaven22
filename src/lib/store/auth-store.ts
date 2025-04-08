import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { AuthState, AuthUser, AuthSession } from '@/lib/types/store-types';
import { UserRole } from '@/lib/types/core/enums';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  isTransitioning: false,
  hasAccess: false,
  error: null,

  // Utility methods for derived state
  getIsAuthenticated: () => {
    return !!get().user;
  },
  
  getUserRole: () => {
    return get().user?.role;
  },
  
  checkAccess: (requiredRoles?: UserRole[]) => {
    const { user } = get();
    if (!user) return false;
    
    // If no specific roles are required, just being authenticated is enough
    if (!requiredRoles || requiredRoles.length === 0) return true;
    
    // Check if the user's role is in the list of required roles
    return user.role ? requiredRoles.includes(user.role) : false;
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
      
      const authSession: AuthSession = {
        id: data.session.id,
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
      console.error('Logout error:', error);
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
      
    } catch (error) {
      console.error('Password reset error:', error);
      set({ 
        error: error as Error, 
        isLoading: false
      });
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
      
    } catch (error) {
      console.error('Profile update error:', error);
      set({ 
        error: error as Error, 
        isLoading: false
      });
    }
  }
}));

// Initialize auth state on app load
export const initializeAuth = async () => {
  const store = useAuthStore.getState();
  
  try {
    store.isLoading = true;
    
    // Get current session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
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
      
      const authSession: AuthSession = {
        id: session.id,
        user: authUser,
        expires_at: session.expires_at,
        created_at: new Date().toISOString()
      };
      
      useAuthStore.setState({ 
        user: authUser, 
        session: authSession,
        hasAccess: true,
        isLoading: false
      });
    } else {
      useAuthStore.setState({
        user: null,
        session: null,
        hasAccess: false,
        isLoading: false
      });
    }
    
    // Set up auth listener for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Handle the same as initial auth
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
          
          const authSession: AuthSession = {
            id: session.id,
            user: authUser,
            expires_at: session.expires_at,
            created_at: new Date().toISOString()
          };
          
          useAuthStore.setState({ 
            user: authUser, 
            session: authSession,
            hasAccess: true,
            isLoading: false,
            isTransitioning: false
          });
          
        } else if (event === 'SIGNED_OUT') {
          useAuthStore.setState({
            user: null,
            session: null,
            hasAccess: false,
            isLoading: false,
            isTransitioning: false
          });
        }
      }
    );
    
    // Clean up subscription on app unmount
    return () => {
      subscription.unsubscribe();
    };
    
  } catch (error) {
    console.error('Auth initialization error:', error);
    useAuthStore.setState({
      error: error as Error,
      isLoading: false
    });
  }
};
