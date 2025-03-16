
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FlattenedSettings } from "@/lib/types/settings/core";
import { toast } from "sonner";
import { DatabaseSettingsRow } from "../types/theme";
import { convertDbSettingsToTheme, applyThemeToDocument } from "../utils/themeUtils";

export const useThemeSetup = () => {
  const [theme, setTheme] = useState<FlattenedSettings | null>(null);

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
          const defaultTheme = convertDbSettingsToTheme(null);
          setTheme(defaultTheme);
          applyThemeToDocument(defaultTheme);
          toast.error("Error loading theme settings, using defaults");
          return;
        }

        if (!rawData) {
          console.log("No settings found, using defaults");
          const defaultTheme = convertDbSettingsToTheme(null);
          setTheme(defaultTheme);
          applyThemeToDocument(defaultTheme);
          toast.info("Using default theme settings");
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
        const defaultTheme = convertDbSettingsToTheme(null);
        setTheme(defaultTheme);
        applyThemeToDocument(defaultTheme);
        toast.error("Failed to load theme settings, using defaults");
      }
    };

    fetchInitialTheme();
  }, []);

  return { theme, setTheme };
};
