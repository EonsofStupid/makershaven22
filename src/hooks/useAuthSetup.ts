import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema } from "../types/schema";
import type { Settings, SettingsFormData } from "../types";
import { useSettingsFetch } from "./handlers/useSettingsFetch";
import { useSettingsUpdateHandlers } from "./handlers/useSettingsUpdateHandlers";
import { useSettingsReset } from "./handlers/useSettingsReset";

export const useSettingsForm = () => {
  const { data: settings, isLoading } = useSettingsFetch();
  const { 
    isSaving, 
    logoFile, 
    faviconFile, 
    handleLogoUpload, 
    handleFaviconUpload, 
    handleSettingsUpdate 
  } = useSettingsUpdateHandlers();
  const { isResetting, handleResetToDefault } = useSettingsReset();

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings || {}
  });

  return {
    form,
    settings,
    isLoading,
    isSaving,
    isResetting,
    logoFile,
    faviconFile,
    handleLogoUpload,
    handleFaviconUpload,
    handleSettingsUpdate,
    handleResetToDefault,
  };
};
