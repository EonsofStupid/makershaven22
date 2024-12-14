import { useEffect } from "react";
import { useAuthStore } from '@/lib/store/auth/auth-store';
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { toast } from "sonner";
import type { AuthSession } from '@/lib/types/auth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setSession, setUser, setLoading, setError, isLoading } = useAuthStore();

  useEffect(() => {
    console.log('AuthProvider mounted - Starting initialization');
    
    const initializeAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (session?.user) {
          console.log('Valid session found, checking profile');
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profileError) {
            console.error('Profile fetch error:', profileError);
            throw profileError;
          }

          console.log('Profile data:', profile);

          const authSession: AuthSession = {
            user: { 
              ...session.user, 
              role: profile?.role || 'subscriber',
              username: profile?.username,
              displayName: profile?.display_name
            },
            access_token: session.access_token,
            refresh_token: session.refresh_token,
            expires_in: session.expires_in
          };
          
          setSession(authSession);
          setUser(authSession.user);
        } else {
          setSession(null);
          setUser(null);
        }
      } catch (error) {
        console.error("Session check error:", error);
        setError(error instanceof Error ? error : new Error('Failed to initialize auth'));
        toast.error('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      
      if (session?.user) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profileError) throw profileError;

          const authSession: AuthSession = {
            user: { 
              ...session.user, 
              role: profile?.role || 'subscriber',
              username: profile?.username,
              displayName: profile?.display_name
            },
            access_token: session.access_token,
            refresh_token: session.refresh_token,
            expires_in: session.expires_in
          };
          
          setSession(authSession);
          setUser(authSession.user);
          
          if (event === 'SIGNED_IN') {
            toast.success('Successfully signed in');
          }
        } catch (error) {
          console.error('Error in auth state change:', error);
          setError(error instanceof Error ? error : new Error('Auth state change failed'));
          toast.error('Authentication error occurred');
        }
      } else {
        setSession(null);
        setUser(null);
      }
    });

    return () => {
      console.log('Cleaning up AuthProvider');
      subscription.unsubscribe();
    };
  }, [setSession, setUser, setLoading, setError]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
};