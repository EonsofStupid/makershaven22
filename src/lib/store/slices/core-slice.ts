import { StateCreator } from 'zustand';
import { GlobalState } from '../types';

export interface CoreSlice {
  isReady: boolean;
  isMaintenanceMode: boolean;
  error: Error | null;
  isLoading: boolean;
  setReady: (isReady: boolean) => void;
  setMaintenanceMode: (isMaintenanceMode: boolean) => void;
  setError: (error: Error | null) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

export const createCoreSlice: StateCreator<
  GlobalState,
  [],
  [],
  CoreSlice
> = (set) => ({
  isReady: false,
  isMaintenanceMode: false,
  error: null,
  isLoading: false,
  setReady: (isReady) => set({ isReady }),
  setMaintenanceMode: (isMaintenanceMode) => set({ isMaintenanceMode }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({
    isReady: false,
    isMaintenanceMode: false,
    error: null,
    isLoading: false
  })
});