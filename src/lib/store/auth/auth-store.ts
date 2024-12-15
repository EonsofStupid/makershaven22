import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import type { AuthStore, AuthUser, AuthSession } from '@/lib/types/auth';
import { toast } from 'sonner';
import { handleAuthError } from '@/utils/errorHandling';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isLoading: true,
      error: null,
      isTransitioning: false,
      hasAccess: false,

      signIn: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();

          const authUser: AuthUser = {
            id: data.user.id,
            email: data.user.email!,
            role: profile?.role || 'subscriber',
            user_metadata: data.user.user_metadata
          };

          const authSession: AuthSession = {
            user: authUser,
            access_token: data.session!.access_token,
            refresh_token: data.session!.refresh_token!,
            expires_in: data.session!.expires_in!
          };

          set({ 
            user: authUser,
            session: authSession,
            isLoading: false,
            hasAccess: true
          });
          
          toast.success('Successfully signed in');
        } catch (error) {
          console.error('Sign in error:', error);
          const handledError = handleAuthError(error);
          set({ 
            error: handledError,
            isLoading: false,
            hasAccess: false
          });
          toast.error(handledError.message);
        }
      },

      signOut: async () => {
        set({ isLoading: true, error: null });
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          
          set({ 
            user: null,
            session: null,
            isLoading: false,
            hasAccess: false
          });
          
          toast.success('Successfully signed out');
        } catch (error) {
          console.error('Sign out error:', error);
          const handledError = handleAuthError(error);
          set({ 
            error: handledError,
            isLoading: false
          });
          toast.error(handledError.message);
        }
      },

      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setError: (error) => set({ error }),
      setTransitioning: (isTransitioning) => set({ isTransitioning }),
      reset: () => set({ 
        user: null,
        session: null,
        isLoading: false,
        error: null,
        isTransitioning: false,
        hasAccess: false
      }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ 
        user: state.user,
        session: state.session
      }),
    }
  )
);