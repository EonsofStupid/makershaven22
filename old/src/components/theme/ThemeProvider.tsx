import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Theme } from './types/theme';
import { FlattenedSettings } from '@/lib/types/settings/core';
import { flattenedSettingsToTheme, themeToFlattenedSettings } from './types/theme';
import { toast } from 'sonner';
import { ThemeMode } from '@/lib/types/core/enums';
import { SecuritySettings, DEFAULT_SECURITY_SETTINGS } from '@/lib/types/security/types';
import { ensureJson } from '@/lib/utils/type-utils';
import { TransitionType } from '@/lib/types/core/enums';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  updateTheme: (theme: FlattenedSettings) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const DEFAULT_THEME: Theme = {
  site_title: 'MakersImpulse',
  tagline: '',
  description: '',
  keywords: [],
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
  transition_type: 'fade',
  theme_mode: 'system',
  security_settings: DEFAULT_SECURITY_SETTINGS,
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
  glass_effect: 'none',
  custom_css: '',
  menu_animation_type: 'fade'
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    // Load theme from database on mount
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();

      if (error) {
        console.error('Error loading theme:', error);
        return;
      }

      if (data) {
        const settings: FlattenedSettings = {
          ...data,
          security_settings: ensureJson(data.security_settings) || DEFAULT_SECURITY_SETTINGS,
          theme_mode: data.theme_mode || 'system',
          transition_type: data.transition_type || 'fade',
          menu_animation_type: data.menu_animation_type || 'fade',
          glass_effect: data.glass_effect || 'none'
        };
        setTheme(flattenedSettingsToTheme(settings));
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const updateTheme = async (settings: FlattenedSettings) => {
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({
          ...settings,
          security_settings: ensureJson(settings.security_settings),
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error updating theme:', error);
        toast.error('Failed to update theme settings');
        return;
      }

      setTheme(flattenedSettingsToTheme(settings));
      toast.success('Theme settings updated successfully');
    } catch (error) {
      console.error('Error updating theme:', error);
      toast.error('Failed to update theme settings');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
