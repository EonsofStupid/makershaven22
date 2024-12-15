import { useAtom } from 'jotai';
import { useAuthStore } from '../auth-store';
import { authUserAtom, authSessionAtom, authLoadingAtom, authErrorAtom } from '../atoms/auth';

export const useAuth = () => {
  const [user] = useAtom(authUserAtom);
  const [session] = useAtom(authSessionAtom);
  const [isLoading] = useAtom(authLoadingAtom);
  const [error] = useAtom(authErrorAtom);
  const { signIn, signOut } = useAuthStore();

  return {
    user,
    session,
    isLoading,
    error,
    signIn,
    signOut,
  };
};