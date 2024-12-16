import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GlobalState } from '../types/store';

export const useStore = create<GlobalState>()(
  persist(
    (set) => ({
      // Core state
      isReady: false,
      isMaintenanceMode: false,
      error: null,
      isLoading: false,

      // Theme state
      theme: null,
      settings: null,
      mode: 'system',
      isThemeLoading: false,
      themeError: null,

      // Content state
      activeContent: null,
      contentHistory: {},
      isContentLoading: false,
      contentError: null,

      // Workflow state
      activeWorkflows: {},
      workflowHistory: {},
      isWorkflowLoading: false,
      workflowError: null,

      // Actions
      setState: (updates) => set((state) => ({ ...state, ...updates })),
      updateSettings: (settings) => set({ settings, error: null }),
      setMode: (mode) => set({ mode }),
      setError: (error) => set({ error }),
      reset: () => set({
        theme: null,
        settings: null,
        mode: 'system',
        isThemeLoading: false,
        themeError: null,
        isReady: false,
        isMaintenanceMode: false,
        error: null,
        isLoading: false,
        activeContent: null,
        contentHistory: {},
        isContentLoading: false,
        contentError: null,
        activeWorkflows: {},
        workflowHistory: {},
        isWorkflowLoading: false,
        workflowError: null
      })
    }),
    {
      name: 'global-store',
      partialize: (state) => ({
        theme: state.theme,
        settings: state.settings,
        mode: state.mode
      })
    }
  )
);