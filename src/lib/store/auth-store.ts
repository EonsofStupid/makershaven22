import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { AuthState, Result, StoreError } from './types/store-types';
import { toast } from 'sonner';

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Initial state
  user: null,
  session: null,
  profile: null,
  status: 'idle',
  error: null,
  validationErrors: [],
  securityState: {
    mfaEnabled: false,
    pinEnabled: false,
    lastLogin: null,
    failedAttempts: 0,
    lockoutUntil: null,
  },

  // Actions
  initialize: async () => {
    set({ status: 'loading' });
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;

      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        set({
          session,
          user: session.user,
          profile: profile ? {
            ...profile,
            createdAt: new Date(profile.created_at),
            updatedAt: new Date(profile.updated_at),
            createdBy: profile.id,
            updatedBy: profile.id
          } : null,
          status: 'success'
        });
      }
    } catch (error) {
      const storeError: StoreError = {
        code: 'AUTH_INIT_ERROR',
        message: error instanceof Error ? error.message : 'Failed to initialize auth'
      };
      set({ error: storeError, status: 'error' });
      toast.error('Authentication error', {
        description: storeError.message
      });
    }
  },

  signIn: async (email: string, password: string): Promise<Result<AuthSession>> => {
    set({ status: 'loading', error: null });
    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        set({
          session,
          user: session.user,
          profile: profile ? {
            ...profile,
            createdAt: new Date(profile.created_at),
            updatedAt: new Date(profile.updated_at),
            createdBy: profile.id,
            updatedBy: profile.id
          } : null,
          status: 'success'
        });

        return { data: session };
      }

      return { 
        error: { 
          code: 'AUTH_NO_SESSION', 
          message: 'No session returned after sign in' 
        } 
      };
    } catch (error) {
      const storeError: StoreError = {
        code: 'AUTH_SIGNIN_ERROR',
        message: error instanceof Error ? error.message : 'Failed to sign in'
      };
      set({ error: storeError, status: 'error' });
      toast.error('Sign in failed', {
        description: storeError.message
      });
      return { error: storeError };
    }
  },

  signOut: async () => {
    set({ status: 'loading' });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      set({
        user: null,
        session: null,
        profile: null,
        status: 'success'
      });
      
      toast.success('Signed out successfully');
    } catch (error) {
      const storeError: StoreError = {
        code: 'AUTH_SIGNOUT_ERROR',
        message: error instanceof Error ? error.message : 'Failed to sign out'
      };
      set({ error: storeError, status: 'error' });
      toast.error('Sign out failed', {
        description: storeError.message
      });
    }
  },

  updateProfile: async (profileUpdate): Promise<Result<Profile>> => {
    const { user } = get();
    if (!user) {
      return { 
        error: { 
          code: 'AUTH_NO_USER', 
          message: 'No authenticated user' 
        } 
      };
    }

    set({ status: 'loading' });
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(profileUpdate)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const updatedProfile = {
          ...data,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
          createdBy: data.id,
          updatedBy: user.id
        };
        
        set({
          profile: updatedProfile,
          status: 'success'
        });

        toast.success('Profile updated successfully');
        return { data: updatedProfile };
      }

      return { 
        error: { 
          code: 'PROFILE_UPDATE_NO_DATA', 
          message: 'No data returned after profile update' 
        } 
      };
    } catch (error) {
      const storeError: StoreError = {
        code: 'PROFILE_UPDATE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to update profile'
      };
      set({ error: storeError, status: 'error' });
      toast.error('Profile update failed', {
        description: storeError.message
      });
      return { error: storeError };
    }
  },

  clearErrors: () => {
    set({ error: null, validationErrors: [], status: 'idle' });
  }
}));