import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Settings } from '@/integrations/supabase/types/settings';

interface SettingsState {
  settings: Partial<Settings>;
  updateSetting: (key: keyof Settings, value: any) => void;
  saveTransformationRule: (rule: any) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {},
      updateSetting: (key, value) => 
        set((state) => ({ 
          settings: { ...state.settings, [key]: value } 
        })),
      saveTransformationRule: async (rule) => {
        // Implementation for saving transformation rules
        console.log('Saving transformation rule:', rule);
      }
    }),
    { name: 'settings-store' }
  )
);