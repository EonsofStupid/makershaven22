
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

/**
 * Converts a Json value to a Record<string, unknown>
 * This addresses the type incompatibility between Json and Record<string, unknown>
 */
export function jsonToRecord(json: Json | null | undefined): Record<string, unknown> {
  if (!isJsonObject(json)) {
    return {};
  }
  
  const result: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(json)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }
  
  return result;
}

/**
 * Converts a Record<string, unknown> to a Json object
 */
export function recordToJson(record: Record<string, unknown>): JsonObject {
  const result: JsonObject = {};
  
  for (const [key, value] of Object.entries(record)) {
    result[key] = valueToJson(value);
  }
  
  return result;
}

/**
 * Converts any value to a Json-compatible value
 */
function valueToJson(value: unknown): Json {
  if (value === null || 
      typeof value === 'string' || 
      typeof value === 'number' || 
      typeof value === 'boolean') {
    return value as JsonPrimitive;
  }
  
  if (Array.isArray(value)) {
    return value.map(valueToJson) as JsonArray;
  }
  
  if (typeof value === 'object' && value !== null) {
    return recordToJson(value as Record<string, unknown>);
  }
  
  return null;
}
