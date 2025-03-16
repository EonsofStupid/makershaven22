
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FlattenedSettings, DEFAULT_SETTINGS } from "@/lib/types/settings/core";
import { DatabaseSettingsRow } from "../types/theme";
import { convertDbSettingsToTheme, applyThemeToDocument } from "../utils/themeUtils";
import { toast } from "@/lib/toast";

export const useThemeSetup = () => {
  const [theme, setTheme] = useState<FlattenedSettings>({ ...DEFAULT_SETTINGS });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Apply default theme immediately to ensure something is always rendered
    applyThemeToDocument(DEFAULT_SETTINGS);

    const fetchInitialTheme = async () => {
      try {
        console.log("Fetching initial theme settings...");
        
        const { data: rawData, error } = await supabase
          .from("site_settings")
          .select("*")
          .limit(1)
          .maybeSingle();

        if (error) {
          console.warn("Error fetching theme:", error.message);
          toast.error("Could not load theme settings", {
            description: "Using default theme instead"
          });
          // Continue with default theme
          setIsLoading(false);
          return;
        }

        if (!rawData) {
          console.log("No settings found, using defaults");
          setIsLoading(false);
          return;
        }

        const dbSettings = rawData as DatabaseSettingsRow;
        const themeData = convertDbSettingsToTheme(dbSettings);
        
        console.log("Initial theme settings fetched:", themeData.site_title);
        setTheme(themeData);
        applyThemeToDocument(themeData);
      } catch (error) {
        console.error("Error in theme setup:", error);
        toast.error("Theme setup error", {
          description: "An unexpected error occurred when loading theme"
        });
        // Still using the default theme applied earlier
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialTheme();
  }, []);

  return { theme, setTheme, isLoading };
};
