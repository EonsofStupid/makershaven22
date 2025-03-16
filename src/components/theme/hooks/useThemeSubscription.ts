
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Settings } from "@/components/admin/settings/types";
import { DatabaseSettingsRow } from "../types/theme";
import { convertDbSettingsToTheme } from "../utils/themeUtils";
import { toast } from "sonner";
import { DEFAULT_SECURITY_SETTINGS } from "@/lib/types/security/types";

export const useThemeSubscription = (setTheme: (theme: Settings) => void) => {
  useEffect(() => {
    const channel = supabase
      .channel('site_settings_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'site_settings'
        },
        (payload) => {
          console.log("Received real-time theme update:", payload.new);
          const dbSettings = payload.new as DatabaseSettingsRow;
          const themeData = convertDbSettingsToTheme(dbSettings);
          
          // Ensure theme data is compatible with FlattenedSettings
          const completeThemeData = {
            ...themeData,
            security_settings: dbSettings.security_settings || DEFAULT_SECURITY_SETTINGS,
            theme_mode: dbSettings.theme_mode || 'system'
          };
          
          setTheme(completeThemeData);
          toast.success("Theme updated in real-time");
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [setTheme]);
};
