
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_SETTINGS } from "@/lib/types/settings/core";
import { prepareDatabaseSettings } from "@/lib/utils/settings/database-utils";

export const useSettingsReset = () => {
  const [isResetting, setIsResetting] = useState(false);
  
  const handleSettingsReset = async () => {
    try {
      setIsResetting(true);
      
      // First get the current settings to preserve the ID
      const { data, error: fetchError } = await supabase
        .from("site_settings")
        .select("id")
        .single();
      
      if (fetchError) throw fetchError;
      
      // Prepare default settings for database
      const settingsWithId = {
        ...DEFAULT_SETTINGS,
        id: data.id
      };
      
      const dbSettings = prepareDatabaseSettings(settingsWithId);
      
      // Update with default settings
      const { error } = await supabase
        .from("site_settings")
        .update(dbSettings)
        .eq("id", data.id);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error("Error resetting settings:", error);
      throw error;
    } finally {
      setIsResetting(false);
    }
  };
  
  return {
    isResetting,
    handleSettingsReset
  };
};
