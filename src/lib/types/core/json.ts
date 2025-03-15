
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
