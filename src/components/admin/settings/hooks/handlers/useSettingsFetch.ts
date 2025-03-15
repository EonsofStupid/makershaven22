
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FlattenedSettings } from "@/lib/types/settings/types";
import { SettingsResponse } from "../../types";
import { processDatabaseSettings } from "@/lib/utils/settings/process-utils";

export const useSettingsFetch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<FlattenedSettings | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchSettings = async (): Promise<SettingsResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select("*")
        .single();

      if (error) throw error;
      
      // Process the data to ensure type safety
      const processedSettings = processDatabaseSettings(data);
      
      // Update state with processed settings
      setSettings(processedSettings);
      
      return { data: processedSettings, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch settings";
      console.error("Error fetching settings:", err);
      setError(err instanceof Error ? err : new Error(errorMessage));
      
      return { 
        data: null as unknown as FlattenedSettings, 
        error: { message: errorMessage } 
      };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings().catch(err => {
      console.error("Error in fetchSettings useEffect:", err);
      toast.error("Failed to load settings");
    });
  }, []);

  return {
    isLoading,
    settings,
    error,
    fetchSettings
  };
};
