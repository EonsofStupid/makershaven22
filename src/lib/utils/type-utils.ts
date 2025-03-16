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
 * Convert object to camelCase keys
 */
export function toCamelCase<T extends object>(obj: T): Record<string, any> {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCase(item)) as unknown as Record<string, any>;
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    acc[camelKey] = value !== null && typeof value === 'object' ? toCamelCase(value as object) : value;
    return acc;
  }, {} as Record<string, any>);
}

/**
 * Convert object to snake_case keys
 */
export function toSnakeCase<T extends object>(obj: T): Record<string, any> {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => toSnakeCase(item)) as unknown as Record<string, any>;
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    acc[snakeKey] = value !== null && typeof value === 'object' ? toSnakeCase(value as object) : value;
    return acc;
  }, {} as Record<string, any>);
}

/**
 * Safely convert a value to a ThemeMode, with fallback
 */
export function safeThemeMode(value: unknown, fallback: ThemeMode = 'system'): ThemeMode {
  if (typeof value === 'string' && ['light', 'dark', 'system'].includes(value)) {
    return value as ThemeMode;
  }
  return fallback;
}

/**
 * Safely convert a value to a TransitionType, with fallback
 */
export function safeTransitionType(value: unknown, fallback: TransitionType = 'fade'): TransitionType {
  if (typeof value === 'string' && ['fade', 'slide', 'scale', 'blur'].includes(value)) {
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
      if (isObject(source[key as keyof typeof source])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key as keyof typeof source] });
        } else {
          (output as any)[key] = deepMerge(
            (target as any)[key],
            source[key as keyof typeof source] as any
          );
        }
      } else {
        Object.assign(output, { [key]: source[key as keyof typeof source] });
      }
    });
  }
  
  return output;
}

/**
 * Check if value is an object
 */
function isObject(item: unknown): item is Record<string, unknown> {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}
