
import { useState } from "react";
import { toast } from "sonner";
import { useSettingsForm } from "./useSettingsForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlattenedSettings } from "@/lib/types/settings/types";
import { flattenedSettingsSchema } from "@/lib/types/settings/schema";
import { useTheme } from "@/components/theme/ThemeContext";

export const useSettingsFormState = () => {
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState("");
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  
  const { settings, isLoading, isSaving, logoFile, faviconFile, handleLogoUpload, 
    handleFaviconUpload, handleSettingsUpdate, handleResetToDefault } = useSettingsForm();
  
  const { updateTheme } = useTheme();

  const form = useForm<FlattenedSettings>({
    resolver: zodResolver(flattenedSettingsSchema),
    defaultValues: {
      site_title: settings?.site_title || "MakersImpulse",
      tagline: settings?.tagline || "Create, Share, Inspire",
      primary_color: settings?.primary_color || "#7FFFD4",
      secondary_color: settings?.secondary_color || "#FFB6C1",
      accent_color: settings?.accent_color || "#E6E6FA",
      neon_cyan: settings?.neon_cyan || "#41f0db",
      neon_pink: settings?.neon_pink || "#ff0abe",
      neon_purple: settings?.neon_purple || "#8000ff",
      text_primary_color: settings?.text_primary_color || "#FFFFFF",
      text_secondary_color: settings?.text_secondary_color || "#A1A1AA",
      text_link_color: settings?.text_link_color || "#3B82F6",
      text_heading_color: settings?.text_heading_color || "#FFFFFF",
      border_radius: settings?.border_radius || "0.5rem",
      spacing_unit: settings?.spacing_unit || "1rem",
      transition_duration: settings?.transition_duration || "0.3s",
      shadow_color: settings?.shadow_color || "#000000",
      hover_scale: settings?.hover_scale || "1.05",
      font_family_heading: settings?.font_family_heading || "Inter",
      font_family_body: settings?.font_family_body || "Inter",
      font_size_base: settings?.font_size_base || "16px",
      font_weight_normal: settings?.font_weight_normal || "400",
      font_weight_bold: settings?.font_weight_bold || "700",
      line_height_base: settings?.line_height_base || "1.5",
      letter_spacing: settings?.letter_spacing || "normal",
      box_shadow: settings?.box_shadow || "none",
      backdrop_blur: settings?.backdrop_blur || "0",
      transition_type: settings?.transition_type || "fade",
      menu_animation_type: settings?.menu_animation_type || "fade",
      security_settings: settings?.security_settings || {
        enable_ip_filtering: false,
        two_factor_auth: false,
        max_login_attempts: 5
      }
    },
  });

  // Watch all form fields for changes
  const setupFormWatcher = () => {
    const subscription = form.watch((value, { name, type }) => {
      if (type === "change") {
        const formValues = form.getValues();
        handleSettingsUpdate(formValues as FlattenedSettings);
        updateTheme(formValues as FlattenedSettings);
      }
    });
    return () => subscription.unsubscribe();
  };

  const handleReset = async () => {
    if (resetConfirmation.toUpperCase() !== "IMPULSE" || !confirmCheckbox) {
      toast.error("Please type IMPULSE and check the confirmation box");
      return;
    }

    setIsResetting(true);
    toast.loading("Resetting settings to default...");

    try {
      await handleResetToDefault();
      toast.success("Settings reset successfully");
      setShowResetDialog(false);
      setResetConfirmation("");
      setConfirmCheckbox(false);
      form.reset(settings || undefined);
    } catch (error) {
      toast.error("Failed to reset settings");
    } finally {
      setIsResetting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleReset();
    }
  };

  // Get preview settings with all required fields
  const getPreviewSettings = (): FlattenedSettings => {
    return {
      ...form.getValues(),
      site_title: form.watch("site_title") || "MakersImpulse",
      primary_color: form.watch("primary_color") || "#7FFFD4",
      secondary_color: form.watch("secondary_color") || "#FFB6C1",
      accent_color: form.watch("accent_color") || "#E6E6FA",
      text_primary_color: form.watch("text_primary_color") || "#FFFFFF",
      text_secondary_color: form.watch("text_secondary_color") || "#A1A1AA",
      text_link_color: form.watch("text_link_color") || "#3B82F6",
      text_heading_color: form.watch("text_heading_color") || "#FFFFFF",
      neon_cyan: form.watch("neon_cyan") || "#41f0db",
      neon_pink: form.watch("neon_pink") || "#ff0abe",
      neon_purple: form.watch("neon_purple") || "#8000ff",
      logo_url: logoFile ? URL.createObjectURL(logoFile) : settings?.logo_url,
      favicon_url: faviconFile ? URL.createObjectURL(faviconFile) : settings?.favicon_url,
      security_settings: {
        enable_ip_filtering: form.watch("security_settings.enable_ip_filtering") || false,
        two_factor_auth: form.watch("security_settings.two_factor_auth") || false,
        max_login_attempts: form.watch("security_settings.max_login_attempts") || 5
      }
    };
  };

  return {
    form,
    settings,
    isLoading,
    isSaving,
    logoFile,
    faviconFile,
    handleLogoUpload,
    handleFaviconUpload,
    isResetting,
    showResetDialog,
    setShowResetDialog,
    resetConfirmation,
    setResetConfirmation,
    confirmCheckbox,
    setConfirmCheckbox,
    handleReset,
    handleKeyPress,
    setupFormWatcher,
    getPreviewSettings
  };
};
