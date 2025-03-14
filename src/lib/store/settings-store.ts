
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FlattenedSettings } from '../types/settings/types';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

interface SettingsState {
  settings: Partial<FlattenedSettings>;
  isLoading: boolean;
  error: string | null;
  updateSetting: (key: keyof FlattenedSettings, value: any) => void;
  updateSettings: (settings: Partial<FlattenedSettings>) => Promise<void>;
  resetSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      settings: {},
      isLoading: false,
      error: null,
      
      updateSetting: (key, value) => 
        set((state) => ({ 
          settings: { ...state.settings, [key]: value } 
        })),
      
      updateSettings: async (newSettings) => {
        set({ isLoading: true, error: null });
        
        try {
          // Update in Supabase if we have access
          const { error } = await supabase
            .from('site_settings')
            .update(newSettings)
            .eq('id', get().settings.id || '1');
          
          if (error) throw error;
          
          // Update local state
          set((state) => ({
            settings: { ...state.settings, ...newSettings },
            isLoading: false
          }));
          
          toast.success('Settings updated successfully');
          return Promise.resolve();
        } catch (error) {
          console.error('Error updating settings:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update settings',
            isLoading: false
          });
          
          toast.error('Failed to update settings');
          return Promise.reject(error);
        }
      },
      
      resetSettings: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Call the reset_site_settings function
          const { error } = await supabase
            .rpc('reset_site_settings');
          
          if (error) throw error;
          
          // Fetch the refreshed settings
          const { data, error: fetchError } = await supabase
            .from('site_settings')
            .select('*')
            .single();
          
          if (fetchError) throw fetchError;
          
          // Update local state
          set({ 
            settings: data as FlattenedSettings,
            isLoading: false
          });
          
          toast.success('Settings reset to defaults');
          return Promise.resolve();
        } catch (error) {
          console.error('Error resetting settings:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to reset settings',
            isLoading: false
          });
          
          toast.error('Failed to reset settings');
          return Promise.reject(error);
        }
      }
    }),
    { name: 'settings-store' }
  )
);
