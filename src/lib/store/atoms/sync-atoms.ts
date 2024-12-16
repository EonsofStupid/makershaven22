import { atom } from 'jotai';
import { useStore } from '../store';
import type { Settings, Theme } from '@/lib/types/settings';
import type { AuthUser, AuthSession } from '@/lib/types/auth/base';

// Theme atoms that sync with Zustand
export const themeAtom = atom(
  (get) => useStore.getState().theme,
  (_get, _set, newTheme: Theme) => {
    useStore.setState({ theme: newTheme });
  }
);

export const settingsAtom = atom(
  (get) => useStore.getState().settings,
  (_get, _set, newSettings: Settings) => {
    useStore.setState({ settings: newSettings });
  }
);

// Auth atoms that sync with Zustand
export const userAtom = atom(
  (get) => useStore.getState().user,
  (_get, _set, newUser: AuthUser | null) => {
    useStore.setState({ user: newUser });
  }
);

export const sessionAtom = atom(
  (get) => useStore.getState().session,
  (_get, _set, newSession: AuthSession | null) => {
    useStore.setState({ session: newSession });
  }
);

// Loading state atoms
export const isLoadingAtom = atom(
  (get) => useStore.getState().isAuthLoading || useStore.getState().isThemeLoading
);

// Error state atoms
export const errorAtom = atom(
  (get) => useStore.getState().authError || useStore.getState().themeError
);