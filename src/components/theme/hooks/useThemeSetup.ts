
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FlattenedSettings } from "@/lib/types/settings/core";
import { toast } from "sonner";
import { DatabaseSettingsRow } from "../types/theme";
import { convertDbSettingsToTheme, DEFAULT_THEME_SETTINGS, applyThemeToDocument } from "../utils/themeUtils";
import { DEFAULT_SECURITY_SETTINGS } from "@/lib/types/security/types";
import { ThemeMode, TransitionType } from "@/lib/types/core/enums";

export const useThemeSetup = () => {
  // Initialize with proper security_settings, theme_mode and transition_type
  const defaultSettings: FlattenedSettings = {
    ...DEFAULT_THEME_SETTINGS,
    security_settings: DEFAULT_SECURITY_SETTINGS,
    theme_mode: 'system' as ThemeMode,
    transition_type: 'fade' as TransitionType // explicitly set as TransitionType
  };
  
  const [theme, setTheme] = useState<FlattenedSettings>(defaultSettings);

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
        
        console.log("Initial theme settings fetched:", themeData.site_title);
        setTheme(themeData);
        applyThemeToDocument(themeData);
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
