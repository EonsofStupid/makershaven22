
import { useState, useCallback, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FlattenedSettings } from "@/lib/types/settings/core";
import { settingsSchema } from "../types/schema";
import { useSettingsFetch } from "./handlers/useSettingsFetch";
import { useSettingsReset } from "./handlers/useSettingsReset";
import { useSettingsUpdateHandlers } from "./handlers/useSettingsUpdateHandlers";
import debounce from "lodash/debounce";

export const useSettingsFormState = () => {
  const { settings, isLoading, error, fetchSettings } = useSettingsFetch();
  const { isResetting, handleSettingsReset } = useSettingsReset();
  const { handleSettingsUpdate } = useSettingsUpdateHandlers();

  const [isSaving, setIsSaving] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState("");
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);

  const form = useForm<FlattenedSettings>({
    resolver: zodResolver(settingsSchema),
    mode: "onChange",
    defaultValues: {
      site_title: "MakersImpulse",
      tagline: "Build Something Amazing",
      primary_color: "#7FFFD4",
      secondary_color: "#FFB6C1",
      accent_color: "#E6E6FA",
      text_primary_color: "#FFFFFF",
      text_secondary_color: "#A1A1AA",
      text_link_color: "#3B82F6",
      text_heading_color: "#FFFFFF",
      neon_cyan: "#41f0db",
      neon_pink: "#ff0abe",
      neon_purple: "#8000ff",
      transition_type: "fade",
      menu_animation_type: "fade",
      security_settings: {
        enable_ip_filtering: false,
        two_factor_auth: false,
        max_login_attempts: 5
      }
    }
  });

  // Update form with fetched settings
  useEffect(() => {
    if (settings) {
      form.reset(settings);
    }
  }, [settings, form]);

  // Auto-save when form changes (debounced)
  const debouncedSave = useCallback(
    debounce(async (formData: FlattenedSettings) => {
      try {
        setIsSaving(true);
        await handleSettingsUpdate(formData);
      } catch (error) {
        console.error("Error saving settings:", error);
        toast.error("Failed to save settings");
      } finally {
        setIsSaving(false);
      }
    }, 1000),
    []
  );

  const setupFormWatcher = useCallback(() => {
    const subscription = form.watch((formData) => {
      debouncedSave(formData as FlattenedSettings);
    });

    return () => subscription.unsubscribe();
  }, [form, debouncedSave]);

  const handleReset = async () => {
    if (resetConfirmation !== "RESET" || !confirmCheckbox) {
      toast.error("Please confirm the reset properly");
      return;
    }

    try {
      await handleSettingsReset();
      toast.success("Settings reset successfully");
      await fetchSettings();
      setShowResetDialog(false);
      setResetConfirmation("");
      setConfirmCheckbox(false);
    } catch (error) {
      console.error("Error resetting settings:", error);
      toast.error("Failed to reset settings");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleReset();
    }
  };

  // Create a preview of the current settings for the preview panel
  const getPreviewSettings = () => {
    return form.getValues();
  };

  return {
    form,
    isLoading,
    isSaving,
    showResetDialog,
    setShowResetDialog,
    resetConfirmation,
    setResetConfirmation,
    confirmCheckbox,
    setConfirmCheckbox,
    isResetting,
    handleReset,
    handleKeyPress,
    setupFormWatcher,
    getPreviewSettings
  };
};
