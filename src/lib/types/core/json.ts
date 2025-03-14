
/**
 * Basic JSON type definitions and type guards for use across the application
 */

// Basic JSON types
export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = Json[];
export type JsonObject = { [key: string]: Json | undefined };
export type Json = 
  | JsonPrimitive
  | JsonObject
  | JsonArray;

/**
 * Type guard to check if a value is a JSON object
 */
export function isJsonObject(value: Json | null | undefined): value is JsonObject {
  return value !== null && 
         typeof value === 'object' && 
         !Array.isArray(value);
}

/**
 * Type guard to check if a value is a JSON array
 */
export function isJsonArray(value: Json | null | undefined): value is JsonArray {
  return Array.isArray(value);
}

/**
 * Type guard to check if a value is a JSON primitive
 */
export function isJsonPrimitive(value: Json | null | undefined): value is JsonPrimitive {
  return value === null || 
         typeof value === 'string' || 
         typeof value === 'number' || 
         typeof value === 'boolean';
}

/**
 * Safely converts an unknown value to a JSON object
 */
export function safeJsonObject(value: unknown): JsonObject {
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    return value as JsonObject;
  }
  return {};
}

/**
 * Safely converts an unknown value to a JSON array
 */
export function safeJsonArray(value: unknown): JsonArray {
  if (Array.isArray(value)) {
    return value as JsonArray;
  }
  return [];
}

/**
 * Safely converts an unknown value to a JSON value with fallback
 */
export function safeJsonValue<T extends Json>(value: unknown, defaultValue: T): Json {
  if (value === null || 
      typeof value === 'string' || 
      typeof value === 'number' || 
      typeof value === 'boolean' ||
      (typeof value === 'object' && value !== null)) {
    return value as Json;
  }
  return defaultValue;
}
