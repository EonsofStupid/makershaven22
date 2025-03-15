
import { FlattenedSettings } from "../types/settings/core";
import { SecuritySettings } from "../types/security/types";
import { Json } from "../types/core/json";
import { ThemeMode, TransitionType } from "../types/core/enums";
import { safeThemeMode, safeTransitionType, ensureJson, jsonToRecord } from "./type-utils";

/**
 * Processes a database record into a properly typed FlattenedSettings object.
 * This utility function centralizes the logic for safely converting database
 * data (which may include raw types, nulls, or incorrect values) into a
 * properly typed FlattenedSettings object.
 */
export function processDatabaseRecord(data: Record<string, any>, securitySettings: SecuritySettings): FlattenedSettings {
  // Process essential enums
  const themeMode = safeThemeMode(data.theme_mode);
  const transitionType = safeTransitionType(data.transition_type);
  
  // Process metadata to ensure it's in the correct format
  const metadata = typeof data.metadata === 'object' && data.metadata !== null
    ? ensureJson(data.metadata)
    : null;
  
  // Create the properly typed settings object
  return {
    ...data,
    // Set the properly processed & validated types
    theme_mode: themeMode,
    transition_type: transitionType,
    security_settings: securitySettings,
    metadata: metadata
  } as FlattenedSettings;
}

/**
 * Prepares a FlattenedSettings object for saving to the database.
 * Ensures that all types are compatible with the database schema.
 */
export function prepareSettingsForDatabase(settings: FlattenedSettings): Record<string, any> {
  return {
    ...settings,
    // Ensure complex types are stored in database-compatible formats
    security_settings: ensureJson(settings.security_settings),
    metadata: settings.metadata ? ensureJson(settings.metadata) : null
  };
}

/**
 * Creates deep typed object comparisons for settings objects
 * to determine if settings have changed or need saving.
 */
export function haveSettingsChanged(oldSettings: FlattenedSettings, newSettings: FlattenedSettings): boolean {
  // Basic properties comparison
  const basicPropsChanged = Object.keys(oldSettings).some(key => {
    // Skip complex objects that need deep comparison
    if (key === 'security_settings' || key === 'metadata') return false;
    
    // For regular properties, do a simple comparison
    return oldSettings[key as keyof FlattenedSettings] !== newSettings[key as keyof FlattenedSettings];
  });
  
  if (basicPropsChanged) return true;
  
  // Deep comparison for security settings
  const oldSecuritySettings = oldSettings.security_settings;
  const newSecuritySettings = newSettings.security_settings;
  
  // Compare required fields
  if (oldSecuritySettings.enable_ip_filtering !== newSecuritySettings.enable_ip_filtering ||
      oldSecuritySettings.two_factor_auth !== newSecuritySettings.two_factor_auth ||
      oldSecuritySettings.max_login_attempts !== newSecuritySettings.max_login_attempts) {
    return true;
  }
  
  // Compare arrays if they exist
  if (oldSecuritySettings.ip_blacklist !== undefined && newSecuritySettings.ip_blacklist !== undefined) {
    if (oldSecuritySettings.ip_blacklist.length !== newSecuritySettings.ip_blacklist.length ||
        !oldSecuritySettings.ip_blacklist.every((ip, idx) => ip === newSecuritySettings.ip_blacklist?.[idx])) {
      return true;
    }
  } else if (oldSecuritySettings.ip_blacklist !== newSecuritySettings.ip_blacklist) {
    return true;
  }
  
  // Similar comparison for other optional fields...
  // Note: This is simplified. For a complete implementation, all optional fields should be compared
  
  // Compare metadata (shallow comparison for simplicity)
  const oldMetadata = JSON.stringify(oldSettings.metadata);
  const newMetadata = JSON.stringify(newSettings.metadata);
  
  return oldMetadata !== newMetadata;
}
