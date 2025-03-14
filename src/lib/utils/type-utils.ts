
import { Json, JsonObject, isJsonObject } from "../types/core/json";
import { ThemeMode } from "../types/core/enums";

/**
 * Checks if a value is a non-array object that can be used as a JSON object
 */
export function isJsonObject(value: any): boolean {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Safely converts a value to a boolean with fallback
 */
export function safeBoolean(value: any, defaultValue: boolean): boolean {
  return typeof value === 'boolean' ? value : defaultValue;
}

/**
 * Safely converts a value to a number with fallback
 */
export function safeNumber(value: any, defaultValue: number): number {
  return typeof value === 'number' && !isNaN(value) ? value : defaultValue;
}

/**
 * Safely filters an array to only include strings
 */
export function safeStringArray(arr: any[]): string[] {
  return arr.filter(item => typeof item === 'string');
}

/**
 * Safely converts a JSON value to a Record<string, unknown>
 */
export function safeRecord(value: any): Record<string, unknown> {
  if (isJsonObject(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

/**
 * Safely converts a value to a ThemeMode enum value
 */
export function safeThemeMode(value: unknown): ThemeMode {
  if (typeof value === 'string' && 
      (value === 'light' || value === 'dark' || value === 'system')) {
    return value as ThemeMode;
  }
  return 'system';
}
