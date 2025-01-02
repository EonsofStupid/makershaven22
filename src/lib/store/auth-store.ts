import { create } from 'zustand';
import { AuthError } from '../types/shared/shared';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthState {
  isLoading: boolean;
  isTransitioning: boolean;
  error: AuthError | null;
  initialize: () => Promise<void>;
  handleSessionUpdate: (session: any) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: true,
  isTransitioning: false,
  error: null,
  initialize: async () => {
    try {
      set({ isLoading: true });
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { user } = session;
        if (user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (profileError) throw profileError;
          
          // Update last seen
          await supabase
            .from('profiles')
            .update({ last_seen: new Date().toISOString() })
            .eq('id', user.id);
        }
      }
      
      set({ isLoading: false });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ error: error as AuthError });
      toast.error('Failed to initialize authentication');
    }
  },
  handleSessionUpdate: async (session) => {
    try {
      set({ isTransitioning: true });
      
      if (session?.user) {
        const { user } = session;
        
        // Update profile
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            last_seen: new Date().toISOString(),
            last_login_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (profileError) throw profileError;

        // Record login activity
        await supabase.from('user_activity').insert({
          user_id: user.id,
          activity_type: 'login',
          metadata: {
            provider: session.provider,
            timestamp: new Date().toISOString()
          }
        });
      }

      set({ isTransitioning: false, error: null });
    } catch (error) {
      console.error('Error handling session update:', error);
      set({ error: error as AuthError });
      toast.error('Failed to update session');
    }
  }
}));