import { atom } from 'jotai';
import type { AuthUIState } from './types';
import { useAuthStore } from './auth-store';

/**
 * Component-level UI state using Jotai
 * Handles temporary form state and UI interactions
 */

// Base UI state atom
export const authUIStateAtom = atom<AuthUIState>({
  isAuthenticating: false,
  showPassword: false,
  rememberMe: true,
  validationErrors: {},
});

// Derived atoms that sync with Zustand store
export const currentUserAtom = atom((get) => useAuthStore.getState().user);
export const currentSessionAtom = atom((get) => useAuthStore.getState().session);
export const authLoadingAtom = atom((get) => useAuthStore.getState().isLoading);
export const authErrorAtom = atom((get) => useAuthStore.getState().error);

// UI state actions
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