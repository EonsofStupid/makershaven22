import React, { createContext, useContext, useEffect } from 'react';
import { useThemeStore } from '@/lib/store/theme-store';
import type { Settings } from '@/components/admin/settings/types';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { applyThemeToDocument } from './utils/themeUtils';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { settings, mode, setMode, updateTheme } = useThemeStore();

  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (mode === 'system') {
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    if (mode === 'system') {
      setMode(mediaQuery.matches ? 'dark' : 'light');
    }
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode, setMode]);

  // Apply theme settings to document
  useEffect(() => {
    if (settings) {
      applyThemeToDocument(settings);
      document.documentElement.classList.toggle('dark', mode === 'dark');
    }
  }, [settings, mode]);

  const handleThemeUpdate = async (newTheme: Settings) => {
    try {
      await updateTheme(newTheme);
      toast.success("Theme updated successfully");
    } catch (error) {
      console.error("Error updating theme:", error);
      toast.error("Failed to update theme");
    }
  };

  const contextValue = {
    theme: settings,
    mode,
    effectiveTheme: mode,
    updateTheme: handleThemeUpdate
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemeContext = createContext<{
  theme: Settings | null;
  mode: 'light' | 'dark' | 'system';
  effectiveTheme: 'light' | 'dark';
  updateTheme: (theme: Settings) => void;
}>({
  theme: null,
  mode: 'system',
  effectiveTheme: 'dark',
  updateTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};