import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useCoreStore } from '../../core-store';

// Core app state atoms
export const appReadyAtom = atom(
  (get) => useCoreStore.getState().isReady,
  (_get, set, isReady: boolean) => {
    useCoreStore.getState().setReady(isReady);
  }
);

export const maintenanceModeAtom = atom(
  (get) => useCoreStore.getState().isMaintenanceMode,
  (_get, set, isMaintenanceMode: boolean) => {
    useCoreStore.getState().setMaintenanceMode(isMaintenanceMode);
  }
);

export const globalErrorAtom = atom(
  (get) => useCoreStore.getState().error,
  (_get, set, error: Error | null) => {
    useCoreStore.getState().setError(error);
  }
);

export const globalLoadingAtom = atom(
  (get) => useCoreStore.getState().isLoading,
  (_get, set, isLoading: boolean) => {
    useCoreStore.getState().setLoading(isLoading);
  }
);

// User preferences with persistence
export const userPreferencesAtom = atomWithStorage('userPreferences', {
  theme: 'system',
  reducedMotion: false,
  fontSize: 'medium',
  highContrast: false,
});

// Debug mode for development
export const debugModeAtom = atomWithStorage('debugMode', false);