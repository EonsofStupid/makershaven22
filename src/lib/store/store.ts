import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GlobalState } from '../types/base';

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

      // Auth state
      user: null,
      session: null,
      isAuthLoading: false,
      authError: null,
      isTransitioning: false,
      hasAccess: false,

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
      setState: (state) => set(state),
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
        user: null,
        session: null,
        isAuthLoading: false,
        authError: null,
        isTransitioning: false,
        hasAccess: false,
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
        mode: state.mode,
        user: state.user,
        session: state.session
      })
    }
  )
);