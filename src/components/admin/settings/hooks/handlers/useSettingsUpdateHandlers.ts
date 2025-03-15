
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { uploadMedia } from "@/utils/media";
import { FlattenedSettings } from "@/lib/types/settings/types";
import { safeRecord, safeThemeMode, safeTransitionType, ensureJson, jsonToRecord } from "@/lib/utils/type-utils";
import { parseSecuritySettings } from "@/lib/types/security/types";
import { prepareDatabaseSettings } from "@/lib/utils/settings/database-utils";
import { processDatabaseSettings } from "@/lib/utils/settings/process-utils";

export const useSettingsUpdateHandlers = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  const handleLogoUpload = async (file: File) => {
    console.log("Handling logo upload with file:", file);
    setLogoFile(file);
  };

  const handleFaviconUpload = async (file: File) => {
    console.log("Handling favicon upload with file:", file);
    setFaviconFile(file);
  };

  const handleSettingsUpdate = async (formData: FlattenedSettings): Promise<FlattenedSettings> => {
    console.log("Starting settings update with formData:", formData);
    setIsSaving(true);
    try {
      let logo_url = formData.logo_url;
      let favicon_url = formData.favicon_url;

      if (logoFile) {
        console.log("Uploading new logo file...");
        logo_url = await uploadMedia(logoFile);
        console.log("Logo uploaded successfully:", logo_url);
      }

      if (faviconFile) {
        console.log("Uploading new favicon file...");
        favicon_url = await uploadMedia(faviconFile);
        console.log("Favicon uploaded successfully:", favicon_url);
      }

      // Create a database-ready object with the updated URLs
      const dataToUpdate = {
        ...formData,
        logo_url,
        favicon_url
      };

      // Use prepareDatabaseSettings to ensure database compatibility
      const databaseData = prepareDatabaseSettings(dataToUpdate);

      // Use Supabase update directly
      const { data, error } = await supabase
        .from('site_settings')
        .update(databaseData)
        .eq('id', '1') // Use string instead of number
        .select()
        .single();

      if (error) throw error;

      console.log("Settings updated successfully:", data);
      
      // Process the returned data to ensure correct typing
      const processedSettings = processDatabaseSettings(data);
      
      toast.success("Settings updated successfully");
      
      return processedSettings;
    } catch (error) {
      console.error("Error in handleSettingsUpdate:", error);
      toast.error("Failed to update settings");
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    logoFile,
    faviconFile,
    handleLogoUpload,
    handleFaviconUpload,
    handleSettingsUpdate,
  };
};
