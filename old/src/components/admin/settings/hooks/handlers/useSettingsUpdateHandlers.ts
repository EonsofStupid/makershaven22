
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { FlattenedSettings } from "@/lib/types/settings/core";
import { prepareDatabaseSettings } from "@/lib/utils/settings/database-utils";

export const useSettingsUpdateHandlers = () => {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleSettingsUpdate = async (settings: Partial<FlattenedSettings>) => {
    try {
      // Prepare settings for database storage
      const dbSettings = prepareDatabaseSettings(settings as FlattenedSettings);
      
      // Update settings in database
      const { error } = await supabase
        .from("site_settings")
        .update(dbSettings)
        .eq("id", settings.id || '1');
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error("Error updating settings:", error);
      throw error;
    }
  };
  
  const handleFileUpload = async (file: File, fieldName: "logo_url" | "favicon_url") => {
    if (!file) return;
    
    try {
      setIsUploading(true);
      
      // Get file extension
      const fileExt = file.name.split(".").pop();
      const fileName = `${fieldName.replace("_url", "")}-${Date.now()}.${fileExt}`;
      
      // Upload to storage
      const { error: uploadError, data } = await supabase.storage
        .from("site-assets")
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from("site-assets")
        .getPublicUrl(fileName);
      
      // Update settings
      const { error: updateError } = await supabase
        .from("site_settings")
        .update({ [fieldName]: urlData.publicUrl })
        .eq("id", '1');
      
      if (updateError) throw updateError;
      
      toast.success(`${fieldName === "logo_url" ? "Logo" : "Favicon"} uploaded successfully`);
      
      return urlData.publicUrl;
    } catch (error) {
      console.error(`Error uploading ${fieldName === "logo_url" ? "logo" : "favicon"}:`, error);
      toast.error(`Failed to upload ${fieldName === "logo_url" ? "logo" : "favicon"}`);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };
  
  return {
    handleSettingsUpdate,
    handleFileUpload,
    isUploading
  };
};
