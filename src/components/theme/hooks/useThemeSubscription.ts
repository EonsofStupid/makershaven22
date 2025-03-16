
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FlattenedSettings } from "@/lib/types/settings/core";
import { DatabaseSettingsRow } from "../types/theme";
import { convertDbSettingsToTheme } from "../utils/themeUtils";
import { toast } from "sonner";

export const useThemeSubscription = (setTheme: (theme: FlattenedSettings) => void) => {
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
          console.log("Received real-time theme update");
          const dbSettings = payload.new as DatabaseSettingsRow;
          const themeData = convertDbSettingsToTheme(dbSettings);
          
          setTheme(themeData);
          toast.success("Theme updated in real-time");
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [setTheme]);
};
