import { atom } from 'jotai';
import { useGlobalStore } from '../global-store';
import type { Settings, Theme } from '@/lib/types/settings';
import type { AuthUser, AuthSession } from '@/lib/auth/types';

// Theme atoms that sync with Zustand
export const themeAtom = atom(
  (get) => useGlobalStore.getState().theme,
  (_get, _set, newTheme: Theme) => {
    useGlobalStore.setState({ theme: newTheme });
  }
);

export const settingsAtom = atom(
  (get) => useGlobalStore.getState().settings,
  (_get, _set, newSettings: Settings) => {
    useGlobalStore.setState({ settings: newSettings });
  }
);

// Auth atoms that sync with Zustand
export const userAtom = atom(
  (get) => useGlobalStore.getState().user,
  (_get, _set, newUser: AuthUser | null) => {
    useGlobalStore.setState({ user: newUser });
  }
);

export const sessionAtom = atom(
  (get) => useGlobalStore.getState().session,
  (_get, _set, newSession: AuthSession | null) => {
    useGlobalStore.setState({ session: newSession });
  }
);

// Loading state atoms
export const isLoadingAtom = atom(
  (get) => useGlobalStore.getState().isAuthLoading || useGlobalStore.getState().isThemeLoading
);

// Error state atoms
export const errorAtom = atom(
  (get) => useGlobalStore.getState().authError || useGlobalStore.getState().themeError
);