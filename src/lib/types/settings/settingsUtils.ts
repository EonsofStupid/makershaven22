
// /src/lib/types/settings/settingsUtils.ts

import { Settings, SettingsFormData } from "./types";

/**
 * Converts Settings to SettingsFormData, applying default values for optional fields.
 * @param settings - The settings object to transform.
 * @returns The transformed SettingsFormData object.
 */
export function convertToUpdateParams(settings: Settings): SettingsFormData {
  return {
    ...settings,
    tagline: settings.tagline || "",
    neon_cyan: settings.neon_cyan || "",
    neon_pink: settings.neon_pink || "",
    neon_purple: settings.neon_purple || "",
    box_shadow: settings.box_shadow || "none",
    backdrop_blur: settings.backdrop_blur || "0",
    transition_type: settings.transition_type || "fade",
    menu_animation_type: settings.menu_animation_type || "fade",
  };
}
