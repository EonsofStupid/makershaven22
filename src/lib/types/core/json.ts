
/**
 * Base JSON value type
 */
export type Json = 
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

/**
 * JSON object type
 */
export interface JsonObject {
  [key: string]: Json;
}

/**
 * Type guard to check if a value is a JSON object
 */
export function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
