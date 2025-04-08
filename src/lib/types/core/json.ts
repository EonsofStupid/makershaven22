
/**
 * JSON primitive types
 */
export type JsonPrimitive = string | number | boolean | null;

/**
 * JSON object type with proper index signature
 */
export interface JsonObject {
  [key: string]: Json;
}

/**
 * JSON array type
 */
export type JsonArray = Json[];

/**
 * Union type for all possible JSON values
 */
export type Json = JsonPrimitive | JsonObject | JsonArray;

/**
 * Type guard to check if a value is a JsonObject
 */
export function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Type guard to check if a value is a valid JSON value
 */
export function isJson(value: unknown): value is Json {
  if (value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return true;
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.every(item => isJson(item));
    }
    
    if (value !== null) {
      return Object.values(value).every(item => isJson(item));
    }
  }
  
  return false;
}

/**
 * Converts any value to a Json type, throwing an error if not possible
 */
export function toJson(value: unknown): Json {
  if (isJson(value)) {
    return value;
  }
  throw new Error('Value cannot be converted to JSON');
}
