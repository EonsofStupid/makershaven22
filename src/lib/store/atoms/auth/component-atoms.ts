import { atom } from 'jotai';
import type { AuthUser, AuthSession } from '@/lib/types/auth';
import { useAuthStore } from '../../auth-store';

// Component-level atoms for auth UI state
export interface AuthUIState {
  isAuthenticating: boolean;
  showPassword: boolean;
  rememberMe: boolean;
  validationErrors: Record<string, string>;
}

export const authUIStateAtom = atom<AuthUIState>({
  isAuthenticating: false,
  showPassword: false,
  rememberMe: true,
  validationErrors: {},
});

// Derived atoms that read from Zustand store
export const currentUserAtom = atom((get) => useAuthStore.getState().user);
export const currentSessionAtom = atom((get) => useAuthStore.getState().session);
export const authLoadingAtom = atom((get) => useAuthStore.getState().isLoading);
export const authErrorAtom = atom((get) => useAuthStore.getState().error);

// Action atoms for component-level state changes
export const setAuthUIStateAtom = atom(
  null,
  (get, set, updates: Partial<AuthUIState>) => {
    const currentState = get(authUIStateAtom);
    set(authUIStateAtom, { ...currentState, ...updates });
  }
);

export const resetAuthUIStateAtom = atom(
  null,
  (_get, set) => {
    set(authUIStateAtom, {
      isAuthenticating: false,
      showPassword: false,
      rememberMe: true,
      validationErrors: {},
    });
  }
);