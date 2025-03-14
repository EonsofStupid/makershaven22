
/**
 * Utility functions for safe type handling and conversions
 */

import { Json } from "../types/core/json";

/**
 * Safely convert a JSON value to a boolean
 */
export function safeBoolean(value: Json | null | undefined, defaultValue: boolean = false): boolean {
  if (value === null || value === undefined) return defaultValue;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  if (typeof value === 'number') return value !== 0;
  return defaultValue;
}

/**
 * Safely convert a JSON value to a number
 */
export function safeNumber(value: Json | null | undefined, defaultValue: number = 0): number {
  if (value === null || value === undefined) return defaultValue;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  return defaultValue;
}

/**
 * Safely convert a JSON value to a string
 */
export function safeString(value: Json | null | undefined, defaultValue: string = ''): string {
  if (value === null || value === undefined) return defaultValue;
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return defaultValue;
}

/**
 * Safely convert a JSON value to a string array
 */
export function safeStringArray(value: Json | null | undefined, defaultValue: string[] = []): string[] {
  if (value === null || value === undefined) return defaultValue;
  if (Array.isArray(value)) {
    return value.map(item => safeString(item));
  }
  return defaultValue;
}

/**
 * Safely convert a JSON value to a record object
 */
export function safeRecord<T>(
  value: Json | null | undefined, 
  transformer: (item: Json) => T,
  defaultValue: Record<string, T> = {}
): Record<string, T> {
  if (value === null || value === undefined) return defaultValue;
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const result: Record<string, T> = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = transformer(val as Json);
    }
    return result;
  }
  return defaultValue;
}

/**
 * Safely access a property from a JSON object
 */
export function safeJsonProperty<T>(
  obj: Record<string, Json> | null | undefined,
  key: string,
  transformer: (value: Json | null | undefined) => T
): T {
  if (!obj) return transformer(undefined);
  return transformer(obj[key]);
}

/**
 * Check if a value is a valid JSON object (not an array)
 */
export function isJsonObject(value: Json | null | undefined): value is Record<string, Json> {
  return value !== null && 
         typeof value === 'object' && 
         !Array.isArray(value);
}
