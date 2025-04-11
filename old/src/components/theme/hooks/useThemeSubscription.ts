
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FlattenedSettings } from "@/lib/types/settings/core";
import { toast } from "sonner";
import { convertDbSettingsToTheme, applyThemeToDocument } from "../utils/themeUtils";

export function useThemeSubscription(
  setTheme: (theme: FlattenedSettings) => void
) {
  useEffect(() => {
    console.log("Setting up theme subscription...");
    
    const subscription = supabase
      .channel("site_settings_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "site_settings",
        },
        (payload) => {
          console.log("Theme settings changed:", payload);
          
          const newData = payload.new;
          if (!newData) return;
          
          try {
            const updatedTheme = convertDbSettingsToTheme(newData);
            setTheme(updatedTheme);
            applyThemeToDocument(updatedTheme);
            toast.info("Theme settings updated");
          } catch (error) {
            console.error("Error processing theme update:", error);
          }
        }
      )
      .subscribe();

    return () => {
      console.log("Cleaning up theme subscription");
      supabase.removeChannel(subscription);
    };
  }, [setTheme]);
}
