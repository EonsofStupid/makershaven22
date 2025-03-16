
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Theme, FlattenedSettings, flattenedSettingsToTheme, themeToFlattenedSettings } from './types/theme';
import { toast } from 'sonner';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  updateTheme: (theme: FlattenedSettings) => Promise<void>;
}

// Default theme values
const defaultTheme: Theme = {
  site_title: 'MakersImpulse',
  primary_color: '#7FFFD4',
  secondary_color: '#FFB6C1',
  accent_color: '#E6E6FA',
  text_primary_color: '#FFFFFF',
  text_secondary_color: '#A1A1AA',
  text_link_color: '#3B82F6',
  text_heading_color: '#FFFFFF',
  neon_cyan: '#41f0db',
  neon_pink: '#ff0abe',
  neon_purple: '#8000ff',
  font_family_heading: 'Inter',
  font_family_body: 'Inter',
  font_size_base: '16px',
  font_weight_normal: '400',
  font_weight_bold: '700',
  line_height_base: '1.5',
  letter_spacing: 'normal',
  border_radius: '0.5rem',
  spacing_unit: '1rem',
  transition_duration: '0.3s',
  shadow_color: '#000000',
  hover_scale: '1.05',
  box_shadow: 'none',
  backdrop_blur: '0',
  transition_type: 'fade'
};

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
  updateTheme: async () => {}
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // Initialize theme
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .single();

        if (error) {
          console.error('Error fetching theme:', error);
          return;
        }

        if (data) {
          const themeData: Theme = {
            site_title: data.site_title || defaultTheme.site_title,
            primary_color: data.primary_color || defaultTheme.primary_color,
            secondary_color: data.secondary_color || defaultTheme.secondary_color,
            accent_color: data.accent_color || defaultTheme.accent_color,
            text_primary_color: data.text_primary_color || defaultTheme.text_primary_color,
            text_secondary_color: data.text_secondary_color || defaultTheme.text_secondary_color,
            text_link_color: data.text_link_color || defaultTheme.text_link_color,
            text_heading_color: data.text_heading_color || defaultTheme.text_heading_color,
            neon_cyan: data.neon_cyan || defaultTheme.neon_cyan,
            neon_pink: data.neon_pink || defaultTheme.neon_pink,
            neon_purple: data.neon_purple || defaultTheme.neon_purple,
            font_family_heading: data.font_family_heading || defaultTheme.font_family_heading,
            font_family_body: data.font_family_body || defaultTheme.font_family_body,
            font_size_base: data.font_size_base || defaultTheme.font_size_base,
            font_weight_normal: data.font_weight_normal || defaultTheme.font_weight_normal,
            font_weight_bold: data.font_weight_bold || defaultTheme.font_weight_bold,
            line_height_base: data.line_height_base || defaultTheme.line_height_base,
            letter_spacing: data.letter_spacing || defaultTheme.letter_spacing,
            border_radius: data.border_radius || defaultTheme.border_radius,
            spacing_unit: data.spacing_unit || defaultTheme.spacing_unit,
            transition_duration: data.transition_duration || defaultTheme.transition_duration,
            shadow_color: data.shadow_color || defaultTheme.shadow_color,
            hover_scale: data.hover_scale || defaultTheme.hover_scale,
            box_shadow: data.box_shadow || defaultTheme.box_shadow,
            backdrop_blur: data.backdrop_blur || defaultTheme.backdrop_blur,
            transition_type: data.transition_type || defaultTheme.transition_type
          };
          
          setTheme(themeData);
          applyThemeToDOM(themeData);
        }
      } catch (error) {
        console.error('Error setting up theme:', error);
      }
    };

    fetchTheme();
  }, []);

  // Update theme in database
  const updateTheme = async (newThemeData: FlattenedSettings): Promise<void> => {
    try {
      // Convert theme to the format expected by the database function
      const params = {
        p_site_title: newThemeData.site_title,
        p_tagline: newThemeData.tagline || '',
        p_primary_color: newThemeData.primary_color,
        p_secondary_color: newThemeData.secondary_color,
        p_accent_color: newThemeData.accent_color,
        p_text_primary_color: newThemeData.text_primary_color,
        p_text_secondary_color: newThemeData.text_secondary_color,
        p_text_link_color: newThemeData.text_link_color,
        p_text_heading_color: newThemeData.text_heading_color,
        p_neon_cyan: newThemeData.neon_cyan,
        p_neon_pink: newThemeData.neon_pink,
        p_neon_purple: newThemeData.neon_purple,
        p_font_family_heading: newThemeData.font_family_heading,
        p_font_family_body: newThemeData.font_family_body,
        p_font_size_base: newThemeData.font_size_base,
        p_font_weight_normal: newThemeData.font_weight_normal,
        p_font_weight_bold: newThemeData.font_weight_bold,
        p_line_height_base: newThemeData.line_height_base,
        p_letter_spacing: newThemeData.letter_spacing,
        p_border_radius: newThemeData.border_radius,
        p_spacing_unit: newThemeData.spacing_unit,
        p_transition_duration: newThemeData.transition_duration,
        p_shadow_color: newThemeData.shadow_color,
        p_hover_scale: newThemeData.hover_scale
      };

      const { error } = await supabase
        .rpc('update_site_settings', params);

      if (error) {
        console.error('Error updating theme:', error);
        throw new Error(`Failed to update theme: ${error.message}`);
      }

      // Update local state with the new theme
      const updatedTheme = flattenedSettingsToTheme(newThemeData);
      
      setTheme(updatedTheme);
      applyThemeToDOM(updatedTheme);
      
      toast.success('Theme updated successfully');
    } catch (error) {
      console.error('Error updating theme:', error);
      toast.error('Failed to update theme');
      throw error;
    }
  };

  // Apply theme to DOM as CSS variables
  const applyThemeToDOM = (theme: Theme) => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      if (value) {
        root.style.setProperty(`--${kebabCase(key)}`, value);
      }
    });
  };

  // Helper to convert camelCase to kebab-case for CSS variables
  const kebabCase = (str: string): string => {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
