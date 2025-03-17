
import { ThemeMode, TransitionType, GlassEffectLevel } from '../types/core/enums';
import { Json, JsonObject } from '../types/core/json';

/**
 * Ensures a value is a valid ThemeMode or returns a default
 */
export function safeThemeMode(value: unknown, defaultValue: ThemeMode = 'system'): ThemeMode {
  if (value === 'light' || value === 'dark' || value === 'system') {
    return value;
  }
  return defaultValue;
}

/**
 * Ensures a value is a valid TransitionType or returns a default
 */
export function safeTransitionType(value: unknown, defaultValue: TransitionType = 'fade'): TransitionType {
  if (value === 'fade' || value === 'slide' || value === 'scale' || value === 'blur') {
    return value;
  }
  return defaultValue;
}

/**
 * Ensures a value is a valid GlassEffectLevel or returns a default
 */
export function safeGlassEffectLevel(value: unknown, defaultValue: GlassEffectLevel = 'medium'): GlassEffectLevel {
  if (value === 'none' || value === 'light' || value === 'medium' || value === 'heavy') {
    return value;
  }
  return defaultValue;
}

/**
 * Ensures a value is a valid hex color or returns a default
 */
export function safeHexColor(value: unknown, defaultValue: string = '#000000'): string {
  if (typeof value === 'string' && /^#([0-9A-F]{3}){1,2}$/i.test(value)) {
    return value;
  }
  return defaultValue;
}

/**
 * Ensures a value is a valid CSS measurement or returns a default
 */
export function safeCssMeasurement(value: unknown, defaultValue: string = '0'): string {
  if (typeof value === 'string' && 
      (/^[0-9]+(\.[0-9]+)?(px|rem|em|%|vh|vw|vmin|vmax|pt|pc|in|cm|mm|ex|ch)$/.test(value) || 
       /^[0-9]+$/.test(value) || 
       value === 'auto' || 
       value === '0')) {
    return value;
  }
  return defaultValue;
}

/**
 * Ensures a value is a valid string or returns a default
 */
export function safeString(value: unknown, defaultValue: string = ''): string {
  return typeof value === 'string' ? value : defaultValue;
}

/**
 * Ensures a value is a valid number or returns a default
 */
export function safeNumber(value: unknown, defaultValue: number = 0): number {
  if (typeof value === 'number' && !isNaN(value)) {
    return value;
  }
  if (typeof value === 'string' && !isNaN(parseFloat(value))) {
    return parseFloat(value);
  }
  return defaultValue;
}

/**
 * Ensures a value is a valid boolean or returns a default
 */
export function safeBoolean(value: unknown, defaultValue: boolean = false): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  return defaultValue;
}

/**
 * Ensures a value is a valid JsonObject or returns a default
 */
export function safeJsonObject(value: unknown, defaultValue: JsonObject = {}): JsonObject {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return value as JsonObject;
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        return parsed as JsonObject;
      }
    } catch (e) {
      // Parse error, return default
    }
  }
  return defaultValue;
}

/**
 * Ensures a value is Json
 */
export function ensureJson(value: unknown): Json {
  if (value === null || 
      typeof value === 'string' || 
      typeof value === 'number' || 
      typeof value === 'boolean') {
    return value as Json;
  }
  
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.map(item => ensureJson(item)) as Json[];
    } else if (value !== null) {
      const result: Record<string, Json> = {};
      Object.entries(value).forEach(([key, val]) => {
        result[key] = ensureJson(val);
      });
      return result as Json;
    }
  }
  
  return null;
}

/**
 * Ensures a value is a JsonObject
 */
export function ensureJsonObject(value: unknown): JsonObject {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const result: JsonObject = {};
    Object.entries(value).forEach(([key, val]) => {
      result[key] = ensureJson(val);
    });
    return result;
  }
  
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        return ensureJsonObject(parsed);
      }
    } catch (e) {
      // Parse error, return empty object
    }
  }
  
  return {};
}
