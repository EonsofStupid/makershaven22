import React, { createContext, useContext } from 'react';
import { useAtom } from 'jotai';
import { themeAtom } from '@/lib/store/atoms/theme';
import { Settings } from '@/components/admin/settings/types';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect } from 'react';
import { applyThemeToDocument } from './utils/themeUtils';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    if (theme) {
      applyThemeToDocument(theme);
    }
  }, [theme]);

  const updateTheme = async (newTheme: Settings) => {
    try {
      const { error } = await supabase.rpc('update_site_settings', {
        p_site_title: newTheme.site_title,
        p_tagline: newTheme.tagline,
        p_primary_color: newTheme.primary_color,
        p_secondary_color: newTheme.secondary_color,
        p_accent_color: newTheme.accent_color,
        p_text_primary_color: newTheme.text_primary_color,
        p_text_secondary_color: newTheme.text_secondary_color,
        p_text_link_color: newTheme.text_link_color,
        p_text_heading_color: newTheme.text_heading_color,
        p_neon_cyan: newTheme.neon_cyan,
        p_neon_pink: newTheme.neon_pink,
        p_neon_purple: newTheme.neon_purple,
        p_font_family_heading: newTheme.font_family_heading,
        p_font_family_body: newTheme.font_family_body,
        p_font_size_base: newTheme.font_size_base,
        p_font_weight_normal: newTheme.font_weight_normal,
        p_font_weight_bold: newTheme.font_weight_bold,
        p_line_height_base: newTheme.line_height_base,
        p_letter_spacing: newTheme.letter_spacing
      });

      if (error) throw error;
      
      setTheme(newTheme);
      applyThemeToDocument(newTheme);
      toast.success("Theme updated successfully");
    } catch (error) {
      console.error("Error updating theme:", error);
      toast.error("Failed to update theme");
    }
  };

  const contextValue = {
    theme,
    updateTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemeContext = createContext<{
  theme: Settings | null;
  updateTheme: (theme: Settings) => void;
}>({
  theme: null,
  updateTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};