import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SiteSettings } from '../types/shared/shared';

interface SettingsState {
  settings: Partial<SiteSettings>;
  updateSetting: (key: keyof SiteSettings, value: any) => void;
  updateSettings: (settings: Partial<SiteSettings>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {},
      updateSetting: (key, value) => 
        set((state) => ({ 
          settings: { ...state.settings, [key]: value } 
        })),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        }))
    }),
    { name: 'settings-store' }
  )
);