
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  userSessionAtom,
  userProfileAtom,
  userLoadingAtom,
  userErrorAtom,
  isAuthenticatedAtom,
  userRoleAtom,
  fetchUserProfileAtom,
  signOutAtom
} from '@/lib/store/atoms/user-atoms';
import { mapSupabaseSession } from '@/lib/types/auth/types';

export function useAuth() {
  const [session, setSession] = useAtom(userSessionAtom);
  const [user, setUser] = useAtom(userProfileAtom);
  const [isLoading, setIsLoading] = useAtom(userLoadingAtom);
  const [error, setError] = useAtom(userErrorAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userRole] = useAtom(userRoleAtom);
  const [, fetchProfile] = useAtom(fetchUserProfileAtom);
  const [, signOut] = useAtom(signOutAtom);

  // Set up auth subscription
  useEffect(() => {
    setIsLoading(true);
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const mappedSession = mapSupabaseSession(session);
      setSession(mappedSession);
      if (mappedSession) {
        fetchProfile();
      } else {
        setIsLoading(false);
      }
    });
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const mappedSession = mapSupabaseSession(session);
        setSession(mappedSession);
        
        if (mappedSession) {
          fetchProfile();
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [setSession, setUser, setIsLoading, fetchProfile]);

  return {
    session,
    user,
    isLoading,
    error,
    isAuthenticated,
    userRole,
    signOut,
    refreshProfile: fetchProfile
  };
}
