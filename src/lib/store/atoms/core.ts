import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Core app state
export const appReadyAtom = atom<boolean>(false);
export const appErrorAtom = atom<Error | null>(null);
export const appMaintenanceModeAtom = atom<boolean>(false);

// Global UI state
export const globalLoadingAtom = atom<boolean>(false);
export const globalErrorAtom = atom<Error | null>(null);

// Persistent settings
export const userPreferencesAtom = atomWithStorage('userPreferences', {
  theme: 'system',
  reducedMotion: false,
  fontSize: 'medium',
  highContrast: false,
});

// Debug mode for development
export const debugModeAtom = atomWithStorage('debugMode', false);