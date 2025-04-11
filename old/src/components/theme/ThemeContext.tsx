
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Theme, flattenedSettingsToTheme, themeToFlattenedSettings } from './types/theme';
import { applyThemeToDocument, convertDbSettingsToTheme } from './utils/themeUtils';
import { FlattenedSettings } from '@/lib/types/settings/core';
import toast from '@/lib/toast';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  updateTheme: (theme: Theme) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>({
    site_title: 'MakersImpulse',
    tagline: '',
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
    border_radius: '0.5rem',
    spacing_unit: '1rem',
    transition_duration: '0.3s',
    shadow_color: '#000000',
    hover_scale: '1.05',
    font_family_heading: 'Inter',
    font_family_body: 'Inter',
    font_size_base: '16px',
    font_weight_normal: '400',
    font_weight_bold: '700',
    line_height_base: '1.5',
    letter_spacing: 'normal',
    box_shadow: 'none',
    backdrop_blur: '0',
    transition_type: 'fade',
    theme_mode: 'system',
    security_settings: {
      ip_blacklist: [],
      ip_whitelist: [],
      enable_ip_filtering: false,
      two_factor_auth: false,
      max_login_attempts: 5,
      rate_limit_requests: 100,
      rate_limit_window_minutes: 5,
      session_timeout_minutes: 60,
      lockout_duration_minutes: 30
    },
    logo_url: '',
    favicon_url: '',
    maintenance_mode: false,
    maintenance_message: '',
    primary_domain: '',
    support_email: '',
    contact_email: '',
    social_links: {},
    analytics_id: '',
    custom_scripts: [],
    glass_effect: 'medium',
    custom_css: '',
    menu_animation_type: 'fade'
  });

  // Initialize theme from database
  useEffect(() => {
    const fetchTheme = async () => {
      const toastId = toast.loading('Loading theme settings...');
      
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .single();

        if (error) throw error;

        // Convert database settings to theme object
        const flattenedSettings = convertDbSettingsToTheme(data);
        const themeData = flattenedSettingsToTheme(flattenedSettings);
        
        setThemeState(themeData);
        applyThemeToDocument(flattenedSettings);
        
        toast.updateLoading(toastId, 'Theme loaded successfully', 'success');
      } catch (error) {
        console.error('Error fetching theme:', error);
        toast.updateLoading(toastId, 'Failed to load theme settings', 'error');
      }
    };

    fetchTheme();
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    
    // Convert theme to flattened settings and apply to document
    const flattenedSettings = themeToFlattenedSettings(newTheme);
    applyThemeToDocument(flattenedSettings);
  };

  const updateTheme = async (newTheme: Theme): Promise<void> => {
    const toastId = toast.loading('Updating theme settings...');
    
    try {
      // Convert theme to flattened settings format for database
      const flattenedSettings = themeToFlattenedSettings(newTheme);
      
      // Update in database
      const { error } = await supabase
        .from('site_settings')
        .update({
          site_title: flattenedSettings.site_title,
          tagline: flattenedSettings.tagline,
          primary_color: flattenedSettings.primary_color,
          secondary_color: flattenedSettings.secondary_color,
          accent_color: flattenedSettings.accent_color,
          text_primary_color: flattenedSettings.text_primary_color,
          text_secondary_color: flattenedSettings.text_secondary_color,
          text_link_color: flattenedSettings.text_link_color,
          text_heading_color: flattenedSettings.text_heading_color,
          neon_cyan: flattenedSettings.neon_cyan,
          neon_pink: flattenedSettings.neon_pink,
          neon_purple: flattenedSettings.neon_purple,
          border_radius: flattenedSettings.border_radius,
          spacing_unit: flattenedSettings.spacing_unit,
          transition_duration: flattenedSettings.transition_duration,
          shadow_color: flattenedSettings.shadow_color,
          hover_scale: flattenedSettings.hover_scale,
          font_family_heading: flattenedSettings.font_family_heading,
          font_family_body: flattenedSettings.font_family_body,
          font_size_base: flattenedSettings.font_size_base,
          font_weight_normal: flattenedSettings.font_weight_normal,
          font_weight_bold: flattenedSettings.font_weight_bold,
          line_height_base: flattenedSettings.line_height_base,
          letter_spacing: flattenedSettings.letter_spacing,
          box_shadow: flattenedSettings.box_shadow,
          backdrop_blur: flattenedSettings.backdrop_blur,
          transition_type: flattenedSettings.transition_type,
          theme_mode: flattenedSettings.theme_mode,
          security_settings: flattenedSettings.security_settings,
          logo_url: flattenedSettings.logo_url,
          favicon_url: flattenedSettings.favicon_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', '1'); // Assuming there's only one site settings row

      if (error) throw error;
      
      // Apply changes
      setTheme(newTheme);
      toast.updateLoading(toastId, 'Theme settings updated successfully', 'success');
    } catch (error) {
      console.error('Error updating theme:', error);
      toast.updateLoading(toastId, 'Failed to update theme settings', 'error');
      throw error;
    }
  };

  const value = {
    theme,
    setTheme,
    updateTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
