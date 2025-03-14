
// Basic JSON type definition to use across the application
export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = Json[];
export type JsonObject = { [key: string]: Json | undefined };
export type Json = 
  | JsonPrimitive
  | JsonObject
  | JsonArray;

// Type guards for JSON values
export function isJsonObject(value: Json | null | undefined): value is JsonObject {
  return value !== null && 
         typeof value === 'object' && 
         !Array.isArray(value);
}

export function isJsonArray(value: Json | null | undefined): value is JsonArray {
  return Array.isArray(value);
}

export function isJsonPrimitive(value: Json | null | undefined): value is JsonPrimitive {
  return value === null || 
         typeof value === 'string' || 
         typeof value === 'number' || 
         typeof value === 'boolean';
}

// Utility function to convert any value to a JSON object safely
export function safeJsonObject(value: unknown): JsonObject {
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    return value as JsonObject;
  }
  return {};
}
