import { atom } from 'jotai';
import type { GlobalState } from '../types';
import type { AuthState } from '../types/auth';
import type { ThemeState } from '../types/store';

// Global store atom
export const globalStoreAtom = atom<Partial<GlobalState>>({});

// Auth store atom
export const authStoreAtom = atom<Partial<AuthState>>({
  user: null,
  session: null,
  isAuthLoading: false,
  error: null,
  isTransitioning: false,
  hasAccess: false
});

// Theme store atom
export const themeStoreAtom = atom<Partial<ThemeState>>({
  theme: null,
  settings: null,
  mode: 'system',
  isThemeLoading: false,
  themeError: null
});