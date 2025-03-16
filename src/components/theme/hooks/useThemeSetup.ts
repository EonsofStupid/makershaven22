
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Settings } from "@/components/admin/settings/types";
import { toast } from "sonner";
import { DatabaseSettingsRow } from "../types/theme";
import { convertDbSettingsToTheme, DEFAULT_THEME_SETTINGS, applyThemeToDocument } from "../utils/themeUtils";
import { DEFAULT_SECURITY_SETTINGS } from "@/lib/types/security/types";

export const useThemeSetup = () => {
  // Initialize with proper security_settings and theme_mode
  const defaultSettings = {
    ...DEFAULT_THEME_SETTINGS,
    security_settings: DEFAULT_SECURITY_SETTINGS,
    theme_mode: 'system'
  };
  
  const [theme, setTheme] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const fetchInitialTheme = async () => {
      try {
        console.log("Fetching initial theme settings...");
        
        const { data: rawData, error } = await supabase
          .from("site_settings")
          .select("*")
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error("Error fetching theme:", error);
          setTheme(defaultSettings);
          applyThemeToDocument(defaultSettings);
          return;
        }

        if (!rawData) {
          console.log("No settings found, using defaults");
          setTheme(defaultSettings);
          applyThemeToDocument(defaultSettings);
          return;
        }

        const dbSettings = rawData as DatabaseSettingsRow;
        const themeData = convertDbSettingsToTheme(dbSettings);
        
        // Ensure we have security_settings and theme_mode
        const completeThemeData = {
          ...themeData,
          security_settings: dbSettings.security_settings || DEFAULT_SECURITY_SETTINGS,
          theme_mode: dbSettings.theme_mode || 'system'
        };
        
        console.log("Initial theme settings fetched:", completeThemeData);
        setTheme(completeThemeData);
        applyThemeToDocument(completeThemeData);
        toast.success("Theme settings loaded");
      } catch (error) {
        console.error("Error in theme setup:", error);
        setTheme(defaultSettings);
        applyThemeToDocument(defaultSettings);
      }
    };

    fetchInitialTheme();
  }, []);

  return { theme, setTheme };
};
