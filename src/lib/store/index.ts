import { create } from 'zustand';
import { AuthUser, AuthSession, Settings } from '../types';

interface Store {
  // Auth
  user: AuthUser | null;
  session: AuthSession | null;
  
  // Settings
  settings: Settings | null;
  
  // Actions
  setUser: (user: AuthUser | null) => void;
  setSession: (session: AuthSession | null) => void;
  setSettings: (settings: Settings | null) => void;
}

export const useStore = create<Store>((set) => ({
  // Initial state
  user: null,
  session: null,
  settings: null,

  // Actions
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setSettings: (settings) => set({ settings }),
}));