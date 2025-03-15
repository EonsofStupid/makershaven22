
import { FlattenedSettings } from "../../types/settings/core";
import { ensureJson } from "../type-utils";

/**
 * Prepares settings object for database storage by ensuring compatible types
 */
export function prepareDatabaseSettings(settings: FlattenedSettings): Record<string, any> {
  // Create a clean copy without any complex types that aren't directly supported
  return {
    ...settings,
    // Ensure all fields have the correct type for database storage
    security_settings: ensureJson(settings.security_settings),
    metadata: settings.metadata ? ensureJson(settings.metadata) : null,
  };
}
