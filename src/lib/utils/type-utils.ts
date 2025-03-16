import { Json, JsonObject } from '@/lib/types/core/json';
import { ThemeMode, TransitionType } from '@/lib/types/core/enums';

/**
 * Ensures a value is a valid JSON object, converting it if necessary
 */
export function ensureJson(value: unknown): Json {
  if (value === null || value === undefined) {
    return null;
  }
  
  try {
    if (typeof value === 'string') {
      // If it's already a JSON string, parse it
      return JSON.parse(value);
    } else {
      // Otherwise, try to convert to JSON
      return JSON.parse(JSON.stringify(value));
    }
  } catch (e) {
    console.error('Failed to convert value to JSON:', e);
    return null;
  }
}

/**
 * Ensures a value is a valid JSON object, not null or an array
 */
export function ensureJsonObject(value: unknown): JsonObject {
  const jsonValue = ensureJson(value);
  
  if (jsonValue === null || Array.isArray(jsonValue) || typeof jsonValue !== 'object') {
    return {};
  }
  
  return jsonValue as JsonObject;
}

/**
 * Safely parse a string to an object
 */
export function safeParseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch (e) {
    return fallback;
  }
}

/**
 * Convert a JSON value to a Record<string, unknown>
 */
export function jsonToRecord(value: Json | null | undefined): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }
  return value as Record<string, unknown>;
}

/**
 * Safely convert a value to a string with fallback
 */
export function safeString(value: unknown, fallback: string): string {
  if (typeof value === 'string') {
    return value;
  }
  return fallback;
}

/**
 * Safely convert a value to a hex color with fallback
 */
export function safeHexColor(value: unknown, fallback: string): string {
  if (typeof value === 'string' && /^#[0-9A-Fa-f]{6}$/.test(value)) {
    return value;
  }
  return fallback;
}

/**
 * Safely convert a value to a CSS measurement with fallback
 */
export function safeCssMeasurement(value: unknown, fallback: string): string {
  if (typeof value === 'string' && /^[0-9]+(\.[0-9]+)?(px|rem|em|vh|vw|%)$/.test(value)) {
    return value;
  }
  return fallback;
}

/**
 * Safely convert a value to a theme mode with fallback
 */
export function safeThemeMode(value: unknown, fallback: ThemeMode = 'system'): ThemeMode {
  if (typeof value === 'string' && ['light', 'dark', 'system'].includes(value)) {
    return value as ThemeMode;
  }
  return fallback;
}

/**
 * Safely convert a value to a transition type with fallback
 */
export function safeTransitionType(value: unknown, fallback: TransitionType = 'fade'): TransitionType {
  if (typeof value === 'string' && ['fade', 'slide', 'scale'].includes(value)) {
    return value as TransitionType;
  }
  return fallback;
}

/**
 * Deep merge two objects
 */
export function deepMerge<T>(target: T, source: Partial<T>): T {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
}

/**
 * Type guard for objects
 */
function isObject(item: unknown): item is Record<string, unknown> {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item));
}
