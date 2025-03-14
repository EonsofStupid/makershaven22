
import { Json, JsonObject, isJsonObject } from "../types/core/json";
import { ThemeMode } from "../types/core/enums";

/**
 * Safely converts a value to a boolean with fallback
 */
export function safeBoolean(value: unknown, defaultValue: boolean): boolean {
  return typeof value === 'boolean' ? value : defaultValue;
}

/**
 * Safely converts a value to a number with fallback
 */
export function safeNumber(value: unknown, defaultValue: number): number {
  return typeof value === 'number' && !isNaN(value) ? value : defaultValue;
}

/**
 * Safely converts a value to a string with fallback
 */
export function safeString(value: unknown, defaultValue: string): string {
  return typeof value === 'string' ? value : defaultValue;
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
export function safeRecord(value: unknown): Record<string, unknown> {
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

/**
 * Safely checks if a string is a valid hex color
 */
export function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Safely checks if a string is a valid CSS measurement
 */
export function isValidCssMeasurement(value: string): boolean {
  return /^[0-9]+(px|rem|em|%|vh|vw|vmin|vmax|pt|pc|in|cm|mm|ex|ch)$/.test(value);
}

/**
 * Ensures a value is a valid hex color or returns fallback
 */
export function safeHexColor(value: unknown, fallback: string): string {
  if (typeof value === 'string' && isValidHexColor(value)) {
    return value;
  }
  return fallback;
}

/**
 * Ensures a value is a valid CSS measurement or returns fallback
 */
export function safeCssMeasurement(value: unknown, fallback: string): string {
  if (typeof value === 'string' && isValidCssMeasurement(value)) {
    return value;
  }
  return fallback;
}
