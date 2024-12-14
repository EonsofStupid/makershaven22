import { useAtom } from 'jotai';
import { useAuthStore } from './auth-store';
import {
  currentUserAtom,
  currentSessionAtom,
  authLoadingAtom,
  authErrorAtom,
  authUIStateAtom,
  setAuthUIStateAtom,
  resetAuthUIStateAtom,
} from './auth-atoms';

/**
 * Unified auth hook that provides access to both global and component-level state
 * 
 * Global state (Zustand):
 * - Authentication state (user, session)
 * - Loading and error states
 * - Auth actions (signIn, signOut)
 * 
 * Component state (Jotai):
 * - UI state (form visibility, validation)
 * - Temporary form data
 */
export const useAuth = () => {
  // Global auth state from Zustand
  const { signIn, signOut } = useAuthStore();

  // Component state from Jotai
  const [user] = useAtom(currentUserAtom);
  const [session] = useAtom(currentSessionAtom);
  const [isLoading] = useAtom(authLoadingAtom);
  const [error] = useAtom(authErrorAtom);
  const [uiState] = useAtom(authUIStateAtom);
  const [, setUIState] = useAtom(setAuthUIStateAtom);
  const [, resetUIState] = useAtom(resetAuthUIStateAtom);

  return {
    // Global state
    user,
    session,
    isLoading,
    error,
    signIn,
    signOut,

    // Component state
    uiState,
    setUIState,
    resetUIState,

    // Computed
    isAuthenticated: !!session?.user,
    role: user?.role || null,
  };
};