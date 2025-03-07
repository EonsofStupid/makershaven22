
import React, { useEffect } from 'react';
import { useAuthStore } from '../auth-store';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthSession } from '@/lib/types/auth/types';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { initialize, handleSessionUpdate, setLoading, isLoading } = useAuthStore();

  useEffect(() => {
    console.log('AuthProvider: Initializing authentication state');
    
    // Initialize auth state from session
    initialize().catch(error => {
      console.error('Failed to initialize auth state:', error);
      toast.error('Failed to initialize authentication');
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        try {
          await handleSessionUpdate(session as AuthSession);
        } catch (error) {
          console.error('Error handling auth change:', error);
          toast.error('Authentication error occurred');
        }
      }
    );

    return () => {
      console.log('AuthProvider: Cleaning up subscription');
      subscription.unsubscribe();
    };
  }, [initialize, handleSessionUpdate]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center min-h-screen"
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </motion.div>
    );
  }

  return <>{children}</>;
};
