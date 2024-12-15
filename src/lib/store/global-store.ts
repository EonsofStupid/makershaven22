import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Settings, Theme } from '@/lib/types/settings';
import type { AuthUser, AuthSession } from '@/lib/types/auth';

interface GlobalState {
  // Theme state
  theme: Theme | null;
  settings: Settings | null;
  isThemeLoading: boolean;
  themeError: Error | null;
  
  // Auth state
  user: AuthUser | null;
  session: AuthSession | null;
  isAuthLoading: boolean;
  authError: Error | null;

  // Actions
  setTheme: (theme: Theme) => void;
  setSettings: (settings: Settings) => void;
  setUser: (user: AuthUser | null) => void;
  setSession: (session: AuthSession | null) => void;
  reset: () => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      // Initial theme state
      theme: null,
      settings: null,
      isThemeLoading: false,
      themeError: null,

      // Initial auth state
      user: null,
      session: null,
      isAuthLoading: false,
      authError: null,

      // Actions
      setTheme: (theme) => set({ theme }),
      setSettings: (settings) => set({ settings }),
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      reset: () => set({
        theme: null,
        settings: null,
        user: null,
        session: null,
        isThemeLoading: false,
        isAuthLoading: false,
        themeError: null,
        authError: null
      })
    }),
    {
      name: 'global-store',
      partialize: (state) => ({
        theme: state.theme,
        settings: state.settings,
        user: state.user,
        session: state.session
      })
    }
  )
);