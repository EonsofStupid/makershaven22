import React, { createContext, useContext, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useThemeStore } from '@/lib/store/theme-store';
import { themeSettingsAtom, themeModeAtom, effectiveThemeAtom } from '@/lib/store/atoms/theme';
import { applyThemeToDocument } from './utils/themeUtils';
import { toast } from "sonner";
import type { Settings, Theme, ThemeContextType } from '@/lib/types/settings';

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeSettings] = useAtom(themeSettingsAtom);
  const [themeMode] = useAtom(themeModeAtom);
  const effectiveTheme = useAtom(effectiveThemeAtom)[0];

  const { 
    settings: zustandSettings,
    updateSettings: updateZustandSettings,
    setError
  } = useThemeStore();

  useEffect(() => {
    if (themeSettings) {
      console.log("Applying theme settings:", themeSettings);
      const theme: Theme = {
        settings: themeSettings,
        mode: themeMode
      };
      applyThemeToDocument(theme);
    } else {
      console.warn("Theme settings are not defined, skipping theme application");
    }
  }, [themeSettings, themeMode]);

  const updateTheme = async (newSettings: Settings) => {
    try {
      updateZustandSettings(newSettings);
      applyThemeToDocument({ settings: newSettings, mode: themeMode });
      toast.success("Theme updated successfully");
    } catch (error) {
      console.error("Error updating theme:", error);
      setError(error instanceof Error ? error : new Error('Failed to update theme'));
      toast.error("Failed to update theme");
    }
  };

  const contextValue: ThemeContextType = {
    theme: themeSettings ? { settings: themeSettings, mode: themeMode } : null,
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