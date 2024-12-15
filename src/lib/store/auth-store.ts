import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { AuthUser, AuthSession } from '@/lib/types/auth';
import { handleSecurityEvent } from '@/utils/auth/securityHandlers';
import { attachCSRFToken, clearCSRFToken } from '@/utils/auth/csrfProtection';
import { sessionManager } from '@/lib/auth/SessionManager';
import { securityManager } from '@/lib/auth/SecurityManager';

interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  setSession: (session: AuthSession | null) => void;
  setError: (error: Error | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: false,
  error: null,
  signIn: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      if (data.user) {
        await attachCSRFToken();
        await sessionManager.startSession();
        securityManager.initialize();

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) throw profileError;

        const user: AuthUser = {
          id: data.user.id,
          email: data.user.email!,
          role: profile.role || 'subscriber',
          username: profile.username,
          displayName: profile.display_name,
          metadata: data.user.user_metadata
        };

        const session: AuthSession = {
          user,
          access_token: data.session!.access_token,
          refresh_token: data.session!.refresh_token,
          expires_in: data.session!.expires_in
        };

        set({ user, session, isLoading: false });
        toast.success('Successfully signed in');

        await handleSecurityEvent(user.id, 'login_success', 'low', {
          method: 'password'
        });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      clearCSRFToken();
      sessionManager.destroy();
      securityManager.clearSecurityData();
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in';
      set({ error: new Error(errorMessage), isLoading: false });
      toast.error('Authentication failed', {
        description: errorMessage
      });

      if (error instanceof Error) {
        await handleSecurityEvent('system', 'login_failed', 'medium', {
          error: error.message,
          email: credentials.email
        });
      }
    }
  },
  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      clearCSRFToken();
      await sessionManager.handleSignOut();
      securityManager.clearSecurityData();

      set({ user: null, session: null, isLoading: false });
      toast.success('Successfully signed out');
    } catch (error) {
      console.error('Sign out error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign out';
      set({ error: new Error(errorMessage), isLoading: false });
      toast.error('Sign out failed', {
        description: errorMessage
      });
    }
  },
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setError: (error) => set({ error })
}));