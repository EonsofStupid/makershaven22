import { useEffect } from "react";
import { useAuthState } from '@/hooks/useAuthState';
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { toast } from "sonner";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isLoading } = useAuthState();

  useEffect(() => {
    console.log('AuthProvider mounted - Starting initialization');
    
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

          console.log('Profile data:', profile);
          toast.success('Successfully authenticated');
        } catch (error) {
          console.error('Error in auth state change:', error);
          toast.error('Authentication error occurred');
          await supabase.auth.signOut();
        }
      }
    });

    return () => {
      console.log('Cleaning up AuthProvider');
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
};