
import { FlattenedSettings } from "../types/settings/types";
import { SecuritySettings, parseSecuritySettings } from "../types/security/types";
import { safeRecord, safeThemeMode } from "./type-utils";
import { ThemeMode } from "../types/core/enums";
import { Json } from "../types/core/json";

/**
 * Processes raw database response into a properly typed FlattenedSettings object
 */
export function processDatabaseSettings(data: any): FlattenedSettings {
  if (!data) {
    throw new Error("No data provided to process settings");
  }
  
  // Process security settings from JSON to SecuritySettings type
  const securitySettings = parseSecuritySettings(data.security_settings);
  
  // Process metadata
  const metadata = safeRecord(data.metadata);
  
  // Ensure theme_mode is a valid ThemeMode
  const themeMode = safeThemeMode(data.theme_mode);
  
  // Create a properly typed FlattenedSettings object
  const settingsResult: FlattenedSettings = {
    ...data,
    theme_mode: themeMode as ThemeMode,
    security_settings: securitySettings,
    metadata: metadata
  };
  
  return settingsResult;
}

/**
 * Prepares settings object for database storage by ensuring compatible types
 */
export function prepareDatabaseSettings(settings: FlattenedSettings): Record<string, any> {
  // Create a clean copy without any complex types that aren't directly supported
  return {
    ...settings,
    // Ensure all fields have the correct type for database storage
    security_settings: settings.security_settings,
    metadata: settings.metadata || {},
  };
}
