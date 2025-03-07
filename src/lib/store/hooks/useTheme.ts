
import { useEffect } from 'react';
import { useThemeStore } from '@/lib/store/theme-store';
import { supabase } from '@/integrations/supabase/client';
import { Settings } from '@/lib/types/settings/core';
import { ThemeMode } from '@/lib/types/core/enums';

export const useTheme = () => {
  const { 
    settings,
    themeMode,
    setThemeMode,
    systemTheme,
    setSystemTheme,
    effectiveTheme,
    cssVariables,
    themeState,
    isLoading,
    setLoading,
    error,
    setError,
    setSettings,
    updateTheme
  } = useThemeStore();

  useEffect(() => {
    const loadTheme = async () => {
      setLoading(true);
      try {
        // Get stored theme preference from localStorage
        const storedTheme = localStorage.getItem('theme-mode') as ThemeMode | null;
        if (storedTheme) {
          setThemeMode(storedTheme);
        }

        // Detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setSystemTheme(prefersDark ? 'dark' : 'light');

        // Load theme settings from database
        const { data, error: fetchError } = await supabase
          .from('site_settings')
          .select('*')
          .single();

        if (fetchError) throw fetchError;

        // Convert the data to Settings type and update state
        const themeSettings: Settings = {
          site_title: data.site_title,
          tagline: data.tagline,
          primary_color: data.primary_color,
          secondary_color: data.secondary_color,
          accent_color: data.accent_color,
          text_primary_color: data.text_primary_color,
          text_secondary_color: data.text_secondary_color,
          text_link_color: data.text_link_color,
          text_heading_color: data.text_heading_color,
          neon_cyan: data.neon_cyan,
          neon_pink: data.neon_pink,
          neon_purple: data.neon_purple,
          border_radius: data.border_radius,
          spacing_unit: data.spacing_unit,
          transition_duration: data.transition_duration,
          shadow_color: data.shadow_color,
          hover_scale: data.hover_scale,
          font_family_heading: data.font_family_heading,
          font_family_body: data.font_family_body,
          font_size_base: data.font_size_base,
          font_weight_normal: data.font_weight_normal,
          font_weight_bold: data.font_weight_bold,
          line_height_base: data.line_height_base,
          letter_spacing: data.letter_spacing,
          box_shadow: data.box_shadow,
          backdrop_blur: data.backdrop_blur,
          transition_type: data.transition_type as 'fade' | 'slide' | 'scale',
          logo_url: data.logo_url,
          favicon_url: data.favicon_url,
          theme_mode: data.theme_mode as ThemeMode,
        };
        
        setSettings(themeSettings);
        updateTheme(themeSettings);
      } catch (err) {
        console.error('Error loading theme settings:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return {
    theme: settings,
    mode: themeMode,
    setMode: setThemeMode,
    isLoading,
    error,
    updateTheme
  };
};
