import React, { createContext, useContext, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useThemeStore } from '@/lib/store/theme-store';
import { themeSettingsAtom, themeModeAtom, effectiveThemeAtom } from '@/lib/store/atoms/theme';
import { applyThemeToDocument } from './utils/themeUtils';
import { toast } from "sonner";
import type { Settings, Theme } from '@/lib/types/settings';

interface ThemeContextType {
  theme: Theme | null;
  mode: 'light' | 'dark' | 'system';
  effectiveTheme: 'light' | 'dark';
  updateTheme: (theme: Settings) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Jotai state
  const [themeSettings] = useAtom(themeSettingsAtom);
  const [themeMode] = useAtom(themeModeAtom);
  const effectiveTheme = useAtom(effectiveThemeAtom)[0];

  // Zustand state and actions
  const { 
    settings: zustandSettings,
    updateSettings: updateZustandSettings,
    setError
  } = useThemeStore();

  // Apply theme settings to document
  useEffect(() => {
    if (themeSettings?.settings) {
      console.log("Applying theme settings:", themeSettings.settings);
      applyThemeToDocument(themeSettings);
    } else {
      console.warn("Theme settings are not defined, skipping theme application");
    }
  }, [themeSettings]);

  // Update theme in both stores
  const updateTheme = async (newSettings: Settings) => {
    try {
      // Update Zustand store
      updateZustandSettings(newSettings);
      
      // Update document
      applyThemeToDocument({ settings: newSettings, mode: themeMode });
      
      toast.success("Theme updated successfully");
    } catch (error) {
      console.error("Error updating theme:", error);
      setError(error instanceof Error ? error : new Error('Failed to update theme'));
      toast.error("Failed to update theme");
    }
  };

  const contextValue = {
    theme: themeSettings,
    mode: themeMode,
    effectiveTheme,
    updateTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};