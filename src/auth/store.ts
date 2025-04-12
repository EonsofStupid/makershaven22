
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../integrations/supabase/client';
import { useLogger } from '../logging';
import { LogCategory } from '../shared/types/enums';

interface UserData {
  id: string;
  email?: string;
  username?: string;
  avatarUrl?: string;
  role?: string;
  createdAt?: string;
}

export interface AuthSession {
  user: UserData;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}

interface AuthState {
  session: AuthSession | null;
  user: UserData | null;
  isLoading: boolean;
  error: string | null;
  
  // Auth actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, metadata?: Record<string, any>) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateUser: (updates: Partial<UserData>) => Promise<{ success: boolean; error?: string }>;
  
  // Session management
  refreshSession: () => Promise<void>;
  setUser: (user: UserData | null) => void;
  setSession: (session: AuthSession | null) => void;
  
  // Auth state
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => {
      // Initialize logger
      const logger = useLogger('authStore', LogCategory.auth);
      
      return {
        session: null,
        user: null,
        isLoading: false,
        error: null,
        
        // Auth actions
        login: async (email, password) => {
          try {
            set({ isLoading: true, error: null });
            
            const { data, error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            
            if (error) {
              logger.logError('Login error', error, 'auth');
              set({ error: error.message, isLoading: false });
              return { success: false, error: error.message };
            }
            
            if (!data.user || !data.session) {
              const errorMsg = 'No user or session returned from login';
              logger.logError(errorMsg, new Error(errorMsg), 'auth');
              set({ error: errorMsg, isLoading: false });
              return { success: false, error: errorMsg };
            }
            
            const session: AuthSession = {
              user: {
                id: data.user.id,
                email: data.user.email || undefined,
                username: data.user.user_metadata?.username || undefined,
                avatarUrl: data.user.user_metadata?.avatar_url || undefined,
                role: data.user.user_metadata?.role || 'user',
                createdAt: data.user.created_at,
              },
              accessToken: data.session.access_token,
              refreshToken: data.session.refresh_token,
              expiresAt: Date.now() + (data.session.expires_in || 3600) * 1000,
            };
            
            logger.log('User logged in successfully', 'auth', { userId: data.user.id });
            set({ 
              session,
              user: session.user,
              isLoading: false,
            });
            
            return { success: true };
          } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Unknown login error';
            logger.logError('Login exception', error instanceof Error ? error : new Error(errorMsg), 'auth');
            set({ error: errorMsg, isLoading: false });
            return { success: false, error: errorMsg };
          }
        },
        
        signup: async (email, password, metadata) => {
          try {
            set({ isLoading: true, error: null });
            
            const { data, error } = await supabase.auth.signUp({
              email,
              password,
              options: {
                data: metadata || {},
              },
            });
            
            if (error) {
              logger.logError('Signup error', error, 'auth');
              set({ error: error.message, isLoading: false });
              return { success: false, error: error.message };
            }
            
            if (!data.user) {
              const errorMsg = 'No user returned from signup';
              logger.logError(errorMsg, new Error(errorMsg), 'auth');
              set({ error: errorMsg, isLoading: false });
              return { success: false, error: errorMsg };
            }
            
            logger.log('User signed up successfully', 'auth', { userId: data.user.id });
            set({ isLoading: false });
            
            // If autoconfirm is enabled, we'll have a session too
            if (data.session) {
              const session: AuthSession = {
                user: {
                  id: data.user.id,
                  email: data.user.email || undefined,
                  username: data.user.user_metadata?.username || undefined,
                  avatarUrl: data.user.user_metadata?.avatar_url || undefined,
                  role: data.user.user_metadata?.role || 'user',
                  createdAt: data.user.created_at,
                },
                accessToken: data.session.access_token,
                refreshToken: data.session.refresh_token,
                expiresAt: Date.now() + (data.session.expires_in || 3600) * 1000,
              };
              
              set({ session, user: session.user });
            }
            
            return { success: true };
          } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Unknown signup error';
            logger.logError('Signup exception', error instanceof Error ? error : new Error(errorMsg), 'auth');
            set({ error: errorMsg, isLoading: false });
            return { success: false, error: errorMsg };
          }
        },
        
        logout: async () => {
          try {
            set({ isLoading: true, error: null });
            
            const { error } = await supabase.auth.signOut();
            
            if (error) {
              logger.logError('Logout error', error, 'auth');
              set({ error: error.message, isLoading: false });
              return;
            }
            
            logger.log('User logged out successfully', 'auth');
            set({ 
              session: null,
              user: null,
              isLoading: false,
            });
          } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Unknown logout error';
            logger.logError('Logout exception', error instanceof Error ? error : new Error(errorMsg), 'auth');
            set({ error: errorMsg, isLoading: false });
          }
        },
        
        resetPassword: async (email) => {
          try {
            set({ isLoading: true, error: null });
            
            const { error } = await supabase.auth.resetPasswordForEmail(email);
            
            if (error) {
              logger.logError('Password reset error', error, 'auth');
              set({ error: error.message, isLoading: false });
              return { success: false, error: error.message };
            }
            
            logger.log('Password reset email sent', 'auth', { email });
            set({ isLoading: false });
            return { success: true };
          } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Unknown password reset error';
            logger.logError('Password reset exception', error instanceof Error ? error : new Error(errorMsg), 'auth');
            set({ error: errorMsg, isLoading: false });
            return { success: false, error: errorMsg };
          }
        },
        
        updateUser: async (updates) => {
          try {
            set({ isLoading: true, error: null });
            
            const { error } = await supabase.auth.updateUser({
              data: updates,
            });
            
            if (error) {
              logger.logError('Update user error', error, 'auth');
              set({ error: error.message, isLoading: false });
              return { success: false, error: error.message };
            }
            
            // Update local state
            const currentUser = get().user;
            if (currentUser) {
              const updatedUser = { ...currentUser, ...updates };
              set({ user: updatedUser, isLoading: false });
              
              // Update session user if it exists
              const currentSession = get().session;
              if (currentSession) {
                set({ 
                  session: { 
                    ...currentSession, 
                    user: updatedUser 
                  } 
                });
              }
            }
            
            logger.log('User updated successfully', 'auth');
            return { success: true };
          } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Unknown user update error';
            logger.logError('Update user exception', error instanceof Error ? error : new Error(errorMsg), 'auth');
            set({ error: errorMsg, isLoading: false });
            return { success: false, error: errorMsg };
          }
        },
        
        refreshSession: async () => {
          try {
            set({ isLoading: true, error: null });
            
            const { data, error } = await supabase.auth.refreshSession();
            
            if (error) {
              logger.logError('Session refresh error', error, 'auth');
              set({ error: error.message, isLoading: false });
              return;
            }
            
            if (data.session) {
              const session: AuthSession = {
                user: {
                  id: data.user!.id,
                  email: data.user!.email || undefined,
                  username: data.user!.user_metadata?.username || undefined,
                  avatarUrl: data.user!.user_metadata?.avatar_url || undefined,
                  role: data.user!.user_metadata?.role || 'user',
                  createdAt: data.user!.created_at,
                },
                accessToken: data.session.access_token,
                refreshToken: data.session.refresh_token,
                expiresAt: Date.now() + (data.session.expires_in || 3600) * 1000,
              };
              
              logger.log('Session refreshed successfully', 'auth');
              set({ 
                session,
                user: session.user,
                isLoading: false,
              });
            } else {
              // No session available, user is logged out
              logger.log('No session available for refresh', 'auth');
              set({ 
                session: null,
                user: null,
                isLoading: false,
              });
            }
          } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Unknown session refresh error';
            logger.logError('Session refresh exception', error instanceof Error ? error : new Error(errorMsg), 'auth');
            set({ error: errorMsg, isLoading: false });
          }
        },
        
        // State setters
        setUser: (user) => set({ user }),
        setSession: (session) => set({ session }),
        setIsLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
      };
    },
    {
      name: 'auth-store',
      partialize: (state) => ({ 
        session: state.session,
        user: state.user,
      }),
    }
  )
);
