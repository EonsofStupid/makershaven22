import { useEffect } from "react";
import { useAuthStore } from '@/lib/store/auth';
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { toast } from "sonner";
import type { AuthSession } from '@/lib/store/auth';

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
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profileError) {
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert([{ 
                id: session.user.id,
                role: 'subscriber'
              }])
              .select()
              .single();
              
            if (createError) throw createError;
            
            const authSession: AuthSession = {
              user: { ...session.user, role: newProfile?.role || 'subscriber' },
              access_token: session.access_token,
              refresh_token: session.refresh_token,
              expires_in: session.expires_in
            };
            
            setSession(authSession);
            setUser(authSession.user);
            toast.success('Profile created successfully');
          } else {
            const authSession: AuthSession = {
              user: { ...session.user, role: profile?.role || 'subscriber' },
              access_token: session.access_token,
              refresh_token: session.refresh_token,
              expires_in: session.expires_in
            };
            
            setSession(authSession);
            setUser(authSession.user);
          }
        } else {
          setSession(null);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
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
            
          if (profileError) {
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert([{ 
                id: session.user.id,
                role: 'subscriber'
              }])
              .select()
              .single();
              
            if (createError) throw createError;
            
            const authSession: AuthSession = {
              user: { ...session.user, role: newProfile?.role || 'subscriber' },
              access_token: session.access_token,
              refresh_token: session.refresh_token,
              expires_in: session.expires_in
            };
            
            setSession(authSession);
            setUser(authSession.user);
            toast.success('Profile created successfully');
          } else {
            const authSession: AuthSession = {
              user: { ...session.user, role: profile?.role || 'subscriber' },
              access_token: session.access_token,
              refresh_token: session.refresh_token,
              expires_in: session.expires_in
            };
            
            setSession(authSession);
            setUser(authSession.user);
          }
        } catch (error) {
          console.error('Auth state change error:', error);
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