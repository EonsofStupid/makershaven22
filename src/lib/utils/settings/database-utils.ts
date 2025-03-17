
import { FlattenedSettings } from "../../types/settings/core";
import { ensureJson } from "../type-utils";
import { prepareSecuritySettingsForDb } from "../../types/security/types";

/**
 * Prepares settings object for database storage by ensuring compatible types
 */
export function prepareDatabaseSettings(settings: FlattenedSettings): Record<string, any> {
  // Create a clean copy without any complex types that aren't directly supported
  return {
    ...settings,
    // Ensure all fields have the correct type for database storage
    security_settings: prepareSecuritySettingsForDb(settings.security_settings),
    metadata: settings.metadata ? ensureJson(settings.metadata) : null,
    theme_preferences: settings.theme_preferences ? ensureJson(settings.theme_preferences) : null,
    theme_metadata: settings.theme_metadata ? ensureJson(settings.theme_metadata) : null,
  };
}
