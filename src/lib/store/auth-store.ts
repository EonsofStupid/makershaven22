import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { AuthSession, AuthUser } from '@/integrations/supabase/types/auth';
import type { Profile } from '@/integrations/supabase/types/tables';
import type { Status, StoreError, ValidationError, AuditInfo } from './types/base';

interface AuthState {
  // Core Auth
  user: AuthUser | null;
  session: AuthSession | null;
  profile: (Profile & AuditInfo) | null;
  
  // Status
  status: Status;
  error: StoreError | null;
  validationErrors: ValidationError[];
  
  // Security
  securityState: {
    mfaEnabled: boolean;
    pinEnabled: boolean;
    lastLogin: Date | null;
    failedAttempts: number;
    lockoutUntil: Date | null;
  };
  
  // Actions
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<Profile>) => Promise<void>;
  clearErrors: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
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
    lockoutUntil: null
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
          profile: profile as (Profile & AuditInfo) | null,
          status: 'success'
        });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ 
        error: { 
          code: 'AUTH_INIT_ERROR',
          message: 'Failed to initialize authentication'
        },
        status: 'error' 
      });
    }
  },

  signIn: async (email: string, password: string) => {
    set({ status: 'loading', error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      set({ 
        session: data.session,
        user: data.user,
        status: 'success'
      });

      toast.success('Signed in successfully');
    } catch (error) {
      console.error('Sign in error:', error);
      set({
        error: {
          code: 'SIGN_IN_ERROR',
          message: 'Failed to sign in'
        },
        status: 'error'
      });
      toast.error('Failed to sign in');
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
      console.error('Sign out error:', error);
      set({
        error: {
          code: 'SIGN_OUT_ERROR',
          message: 'Failed to sign out'
        },
        status: 'error'
      });
      toast.error('Failed to sign out');
    }
  },

  updateProfile: async (profile: Partial<Profile>) => {
    const { user } = get();
    if (!user) {
      toast.error('Must be signed in to update profile');
      return;
    }

    set({ status: 'loading' });
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', user.id);

      if (error) throw error;

      set(state => ({
        profile: { ...state.profile, ...profile } as (Profile & AuditInfo),
        status: 'success'
      }));

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Profile update error:', error);
      set({
        error: {
          code: 'PROFILE_UPDATE_ERROR',
          message: 'Failed to update profile'
        },
        status: 'error'
      });
      toast.error('Failed to update profile');
    }
  },

  clearErrors: () => {
    set({ error: null, validationErrors: [] });
  }
}));