
import { Json, JsonObject, isJsonObject, jsonToRecord, recordToJson } from "../types/core/json";
import { ThemeMode, TransitionType, isValidTransitionType, isValidThemeMode } from "../types/core/enums";

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
    return jsonToRecord(value);
  }
  return {};
}

/**
 * Safely converts a value to a ThemeMode enum value
 */
export function safeThemeMode(value: unknown): ThemeMode {
  if (typeof value === 'string' && isValidThemeMode(value)) {
    return value as ThemeMode;
  }
  return 'system';
}

/**
 * Safely converts a value to a TransitionType enum value
 */
export function safeTransitionType(value: unknown): TransitionType {
  if (typeof value === 'string' && isValidTransitionType(value)) {
    return value as TransitionType;
  }
  return 'fade';
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

/**
 * Convert a Record to Json safely
 */
export function recordToJsonSafe(record: Record<string, unknown>): Json {
  return recordToJson(record);
}

/**
 * Ensure a value is a Json compliant value
 */
export function ensureJson(value: unknown): Json {
  return valueToJson(value);
}

/**
 * Convert any value to Json
 */
function valueToJson(value: unknown): Json {
  if (value === null || 
      typeof value === 'string' || 
      typeof value === 'number' || 
      typeof value === 'boolean') {
    return value as Json;
  }
  
  if (Array.isArray(value)) {
    return value.map(valueToJson) as Json[];
  }
  
  if (typeof value === 'object' && value !== null) {
    const result: Record<string, Json> = {};
    
    for (const [key, val] of Object.entries(value)) {
      result[key] = valueToJson(val);
    }
    
    return result as Json;
  }
  
  // If we can't convert it, return null
  return null;
}

/**
 * Export isJsonObject from core/json for backward compatibility
 */
export { isJsonObject, jsonToRecord };
