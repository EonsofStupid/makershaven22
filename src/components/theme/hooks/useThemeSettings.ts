
import { useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Theme, DatabaseSettingsRow } from "../types/theme";
import { convertDbSettingsToTheme, applyThemeToDocument } from "../utils/themeUtils";
import { DEFAULT_SECURITY_SETTINGS } from '@/lib/types/security/types';
import { ThemeMode } from '@/lib/types/core/enums';
import { ensureJson } from '@/lib/utils/type-utils';

export const useThemeSettings = () => {
  const [theme, setTheme] = useState<Theme | null>(null);

  const fetchSettings = useCallback(async () => {
    console.log("Fetching theme settings...");
    try {
      const { data: rawData, error } = await supabase
        .from("site_settings")
        .select("*")
        .maybeSingle();

      if (error) {
        console.error("Error fetching settings:", error);
        throw error;
      }

      if (!rawData) {
        console.log("No settings found, creating default settings...");
        // Create default settings with properly typed security_settings and theme_mode
        const defaultSettings = {
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
          transition_type: 'fade',
          setting_key: 'theme_settings', // Required field for site_settings table
          // Convert complex objects to JSON for database
          security_settings: ensureJson(DEFAULT_SECURITY_SETTINGS),
          theme_mode: 'system'
        };

        // Insert with proper database types
        const { data: newSettings, error: insertError } = await supabase
          .from("site_settings")
          .insert(defaultSettings)
          .select()
          .single();

        if (insertError) {
          console.error("Error creating default settings:", insertError);
          throw insertError;
        }

        console.log("Default settings created");
        
        // Convert database row to Theme object
        const themeData = convertDbSettingsToTheme(newSettings as DatabaseSettingsRow);
        setTheme(themeData);
        applyThemeToDocument(themeData);
        toast.success("Default theme settings applied");
        return;
      }

      console.log("Settings found");
      // Convert database row to Theme object
      const themeData = convertDbSettingsToTheme(rawData as DatabaseSettingsRow);
      setTheme(themeData);
      applyThemeToDocument(themeData);
      toast.success("Theme settings loaded");
    } catch (error) {
      console.error("Error in fetchSettings:", error);
      // Create a default theme with required properties
      const defaultTheme = convertDbSettingsToTheme(null);
      setTheme(defaultTheme);
      applyThemeToDocument(defaultTheme);
      toast.error("Failed to load theme settings, using defaults");
    }
  }, []);

  return { theme, setTheme, fetchSettings };
};
