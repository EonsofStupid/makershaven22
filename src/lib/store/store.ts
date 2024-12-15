import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createCoreSlice } from './slices/core-slice';
import { createThemeSlice } from './slices/theme-slice';
import type { GlobalState } from './types';

export const useStore = create<GlobalState>()(
  persist(
    (...a) => ({
      ...createCoreSlice(...a),
      ...createThemeSlice(...a)
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