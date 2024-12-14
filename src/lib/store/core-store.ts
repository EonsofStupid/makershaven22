import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CoreState {
  isReady: boolean;
  isMaintenanceMode: boolean;
  error: Error | null;
  // Global UI state
  isLoading: boolean;
  // Actions
  setReady: (isReady: boolean) => void;
  setMaintenanceMode: (isMaintenanceMode: boolean) => void;
  setError: (error: Error | null) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

export const useCoreStore = create<CoreState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'core-store'
    }
  )
);