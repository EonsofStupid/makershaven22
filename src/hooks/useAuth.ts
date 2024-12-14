import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { 
  userAtom, 
  sessionAtom, 
  isLoadingAtom,
  errorAtom,
  isAuthenticatedAtom,
  userRoleAtom,
  signInAtom,
  signOutAtom
} from '@/lib/store/atoms/auth/auth-atoms';

export const useAuth = () => {
  const [user] = useAtom(userAtom);
  const [session] = useAtom(sessionAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const [error] = useAtom(errorAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [role] = useAtom(userRoleAtom);
  const [, signIn] = useAtom(signInAtom);
  const [, signOut] = useAtom(signOutAtom);

  const handleSignIn = useCallback(async (email: string, password: string) => {
    await signIn({ email, password });
  }, [signIn]);

  const handleSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  return {
    user,
    session,
    isLoading,
    error,
    isAuthenticated,
    role,
    signIn: handleSignIn,
    signOut: handleSignOut
  };
};