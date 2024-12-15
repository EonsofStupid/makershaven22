import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createCoreSlice } from './slices/core-slice';
import { createThemeSlice } from './slices/theme-slice';
import { createAuthSlice } from './slices/auth-slice';
import { createContentSlice } from './slices/content-slice';
import { createWorkflowSlice } from './slices/workflow-slice';
import type { GlobalState } from './types';

export const useStore = create<GlobalState>()(
  persist(
    (...a) => ({
      ...createCoreSlice(...a),
      ...createThemeSlice(...a),
      ...createAuthSlice(...a),
      ...createContentSlice(...a),
      ...createWorkflowSlice(...a)
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