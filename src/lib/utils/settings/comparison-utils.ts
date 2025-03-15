
import { FlattenedSettings } from "../../types/settings/core";

/**
 * Deep comparison utility for settings objects
 * Determines if settings have changed and need saving
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
  
  // Compare metadata (shallow comparison for simplicity)
  const oldMetadata = JSON.stringify(oldSettings.metadata);
  const newMetadata = JSON.stringify(newSettings.metadata);
  
  return oldMetadata !== newMetadata;
}
