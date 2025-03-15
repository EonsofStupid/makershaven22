
/**
 * Type representing any JSON value: object, array, string, number, boolean, or null
 */
export type Json = 
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

/**
 * Type representing a JSON object
 */
export type JsonObject = { [key: string]: Json };

/**
 * Safely converts any value to a JSON-compatible format
 */
export function toJson(value: unknown): Json {
  return JSON.parse(JSON.stringify(value));
}

/**
 * Type guard to check if a value is a valid JSON value
 */
export function isJson(value: unknown): value is Json {
  try {
    JSON.stringify(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Type guard to check if a value is a valid JSON object
 */
export function isJsonObject(value: unknown): value is JsonObject {
  return isJson(value) && typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Convert a JSON object to a typed Record
 */
export function jsonToRecord<T>(json: Json): Record<string, T> {
  if (!isJsonObject(json)) {
    return {};
  }
  
  return Object.entries(json).reduce((acc, [key, value]) => {
    acc[key] = value as T;
    return acc;
  }, {} as Record<string, T>);
}

/**
 * Convert a typed Record to a JSON object
 */
export function recordToJson<T>(record: Record<string, T>): JsonObject {
  return Object.entries(record).reduce((acc, [key, value]) => {
    acc[key] = value as Json;
    return acc;
  }, {} as JsonObject);
}
