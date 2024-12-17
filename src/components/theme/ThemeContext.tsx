import React, { createContext, useContext } from "react";
import { useSettingsStore } from "@/lib/store/settings-store";
import type { Settings } from "@/components/admin/settings/types";

interface ThemeContextType {
  theme: Settings | null;
  updateTheme: (theme: Settings) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { settings, updateSettings } = useSettingsStore();

  const value = {
    theme: settings,
    updateTheme: updateSettings
  };

  return (
    <ThemeContext.Provider value={value}>
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