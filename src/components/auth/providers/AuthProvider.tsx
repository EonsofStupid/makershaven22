import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuthStore } from '@/lib/store/auth-store';
import { AuthErrorBoundary } from "@/components/auth/error-handling/AuthErrorBoundary";
import { LoadingOverlay } from "@/components/auth/components/loading/LoadingOverlay";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { 
    setSession, 
    setUser, 
    setLoading, 
    setError, 
    setIsTransitioning 
  } = useAuthStore();

  useEffect(() => {
    console.log('AuthProvider mounted - Starting initialization');
    
    setLoading(true);
    
    const initializeAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profileError) {
            console.error('Profile fetch error:', profileError);
            throw profileError;
          }

          setSession(session);
          setUser({ ...session.user, role: profile?.role || 'subscriber' });
          console.log('Auth initialized with session:', session.user.id);
        } else {
          setSession(null);
          setUser(null);
          console.log('Auth initialized with no session');
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setError(error instanceof Error ? error : new Error('Failed to initialize auth'));
        toast.error('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      setIsTransitioning(true);
      
      try {
        if (session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profileError) {
            console.error('Profile fetch error:', profileError);
            throw profileError;
          }

          setSession(session);
          setUser({ ...session.user, role: profile?.role || 'subscriber' });
        } else {
          setSession(null);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setError(error instanceof Error ? error : new Error('Auth state change failed'));
        toast.error('Authentication error occurred');
      } finally {
        setIsTransitioning(false);
      }
    });

    initializeAuth();

    return () => {
      console.log('Cleaning up AuthProvider');
      subscription.unsubscribe();
      setLoading(false);
    };
  }, [setSession, setUser, setLoading, setError, setIsTransitioning]);

  return (
    <AuthErrorBoundary>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AuthErrorBoundary>
  );
};