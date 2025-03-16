
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import { ThemeState, settingsToUpdateParams } from '../types/theme/state';
import { FlattenedSettings, DEFAULT_SETTINGS } from '../types/settings/core';
import { ThemeMode } from '../types/core/enums';
import { applyThemeToDocument } from '@/components/theme/utils/themeUtils';
import { toast } from 'sonner';
import { devtools } from 'zustand/middleware';

// Get the system preference for dark mode
const getSystemPreference = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light'; // Default to light if not in browser
};

// Calculate the effective theme based on themeMode and systemPreference
const calculateEffectiveTheme = (
  themeMode: ThemeMode, 
  systemPreference: 'light' | 'dark'
): 'light' | 'dark' => {
  if (themeMode === 'system') {
    return systemPreference;
  }
  return themeMode as 'light' | 'dark';
};

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        settings: null,
        isLoading: true,
        error: null,
        themeMode: 'system',
        systemPreference: getSystemPreference(),
        
        // Computed
        get effectiveTheme() {
          return calculateEffectiveTheme(get().themeMode, get().systemPreference);
        },
        
        // Actions
        setSettings: (settings: FlattenedSettings) => {
          set({ settings });
          applyThemeToDocument(settings);
          
          // Sync theme mode if needed
          const themeMode = settings.theme_mode || 'system';
          if (themeMode !== get().themeMode) {
            set({ themeMode });
          }
        },
        
        setLoading: (isLoading: boolean) => set({ isLoading }),
        
        setError: (error: Error | null) => set({ error }),
        
        setThemeMode: (mode: ThemeMode) => {
          set({ themeMode: mode });
          
          // Update settings if they exist
          const { settings } = get();
          if (settings) {
            const updatedSettings = { ...settings, theme_mode: mode };
            get().updateSettings(updatedSettings);
          }
        },
        
        setSystemPreference: (preference: 'light' | 'dark') => {
          set({ systemPreference: preference });
        },
        
        updateSettings: async (settings: FlattenedSettings) => {
          set({ isLoading: true });
          try {
            console.log('Updating theme settings:', settings.site_title);
            const params = settingsToUpdateParams(settings);
            
            const { data, error } = await supabase.rpc('update_site_settings', params);
            
            if (error) {
              console.error('Error updating settings:', error);
              throw error;
            }
            
            set({ 
              settings: data || settings,
              error: null 
            });
            
            applyThemeToDocument(settings);
            
          } catch (error) {
            console.error('Failed to update theme settings:', error);
            set({ error: error as Error });
            toast.error('Failed to update theme settings');
          } finally {
            set({ isLoading: false });
          }
        },
      }),
      {
        name: 'theme-store',
        partialize: (state) => ({ 
          settings: state.settings,
          themeMode: state.themeMode
        }),
        onRehydrateStorage: () => (state) => {
          // Initialize system preference monitoring
          if (typeof window !== 'undefined') {
            // Set initial system preference
            state?.setSystemPreference(getSystemPreference());
            
            // Add listener for system preference changes
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e: MediaQueryListEvent) => {
              state?.setSystemPreference(e.matches ? 'dark' : 'light');
            };
            
            mediaQuery.addEventListener('change', handleChange);
            
            // Apply theme to DOM if settings exist
            if (state?.settings) {
              applyThemeToDocument(state.settings);
            }
          }
        }
      }
    ),
    { name: 'ThemeStore' }
  )
);

// Initialize the store with default settings if needed
export const initializeThemeStore = async () => {
  const { settings, isLoading } = useThemeStore.getState();
  
  if (!settings && !isLoading) {
    useThemeStore.setState({ isLoading: true });
    
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();
      
      if (error) {
        console.error('Error loading theme settings:', error);
        throw error;
      }
      
      // Convert database record to FlattenedSettings
      const loadedSettings: FlattenedSettings = {
        ...DEFAULT_SETTINGS,
        ...data,
        // Ensure security_settings is properly parsed if it's a string
        security_settings: typeof data.security_settings === 'string' 
          ? JSON.parse(data.security_settings)
          : data.security_settings || DEFAULT_SETTINGS.security_settings
      };
      
      useThemeStore.getState().setSettings(loadedSettings);
      
    } catch (error) {
      console.error('Failed to load theme settings, using defaults:', error);
      useThemeStore.getState().setSettings(DEFAULT_SETTINGS);
      useThemeStore.getState().setError(error as Error);
      
    } finally {
      useThemeStore.setState({ isLoading: false });
    }
  }
};
