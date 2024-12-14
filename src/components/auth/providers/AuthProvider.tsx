import { useEffect } from "react";
import { useAtom } from 'jotai';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  sessionAtom,
  userAtom,
  loadingStateAtom,
  setErrorAtom,
  setTransitioningAtom,
  setSessionAtom,
  setUserAtom
} from '@/lib/store/atoms/auth/auth-atoms';
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import type { AuthUser } from '@/lib/types/auth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loadingState] = useAtom(loadingStateAtom);
  const [, setSession] = useAtom(setSessionAtom);
  const [, setUser] = useAtom(setUserAtom);
  const [, setError] = useAtom(setErrorAtom);
  const [, setTransitioning] = useAtom(setTransitioningAtom);

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
            
            setSession(session);
            setUser({ ...session.user, role: newProfile?.role || 'subscriber' } as AuthUser);
            toast.success('Profile created successfully');
          } else {
            setSession(session);
            setUser({ ...session.user, role: profile?.role || 'subscriber' } as AuthUser);
          }
        } else {
          setSession(null);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setError(error instanceof Error ? error : new Error('Failed to initialize auth'));
        toast.error('Failed to initialize authentication');
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      setTransitioning(true);
      
      try {
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
            
            setSession(session);
            setUser({ ...session.user, role: newProfile?.role || 'subscriber' } as AuthUser);
            toast.success('Profile created successfully');
          } else {
            setSession(session);
            setUser({ ...session.user, role: profile?.role || 'subscriber' } as AuthUser);
          }
        } else {
          setSession(null);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setError(error instanceof Error ? error : new Error('Auth state change failed'));
        toast.error('Authentication error occurred');
      } finally {
        setTransitioning(false);
      }
    });

    return () => {
      console.log('Cleaning up AuthProvider');
      subscription.unsubscribe();
    };
  }, [setSession, setUser, setError, setTransitioning]);

  if (loadingState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
};