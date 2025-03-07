
import React, { createContext, useContext, useEffect } from 'react';
import { useTheme } from '@/lib/store/hooks/useTheme';
import { Settings } from '@/lib/types/settings/core';

interface ThemeContextType {
  theme: Settings | null;
  mode: string;
  updateTheme: (theme: Settings) => void;
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, mode, setMode, updateTheme, isLoading } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, mode, updateTheme, setMode, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
