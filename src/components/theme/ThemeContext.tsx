import React, { createContext, useContext, useEffect } from 'react';
import { useAtom } from 'jotai';
import { themeSettingsAtom, themeModeAtom, effectiveThemeAtom } from '@/lib/store/atoms/theme';
import { applyThemeToDocument } from './utils/themeUtils';
import { toast } from "sonner";
import type { Settings, Theme, ThemeMode } from '@/lib/types/settings';
import { useSyncedStore } from '@/lib/store/hooks/useSyncedStore';

interface ThemeContextType {
  theme: Theme | null;
  mode: ThemeMode;
  effectiveTheme: 'light' | 'dark';
  updateTheme: (settings: Settings) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeSettings] = useAtom(themeSettingsAtom);
  const [themeMode] = useAtom(themeModeAtom);
  const effectiveTheme = useAtom(effectiveThemeAtom)[0];
  const { state, setState } = useSyncedStore();

  useEffect(() => {
    if (themeSettings) {
      console.log("Applying theme settings:", themeSettings);
      applyThemeToDocument(themeSettings);
    } else {
      console.warn("Theme settings are not defined, using defaults");
    }
  }, [themeSettings, themeMode]);

  const updateTheme = async (newSettings: Settings) => {
    try {
      setState({ settings: newSettings });
      applyThemeToDocument(newSettings);
      toast.success("Theme updated successfully");
    } catch (error) {
      console.error("Error updating theme:", error);
      toast.error("Failed to update theme");
      throw error;
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