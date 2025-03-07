
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
export type JsonObject = { [key: string]: Json };
export type JsonArray = Json[];

export interface JsonCompatible {
  toJSON(): JsonObject;
}

// Helper type for converting JSON to specific types
export type FromJson<T> = (json: Json) => T;

// Helper functions to safely handle JSON data
export const safeJsonParse = <T>(jsonString: string, fallback: T): T => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return fallback;
  }
};

export const isJsonObject = (value: unknown): value is JsonObject => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

export const isJsonArray = (value: unknown): value is JsonArray => {
  return Array.isArray(value);
};

// Helper to safely convert security settings JSON to SecuritySettings type
export const parseJsonToObject = <T>(json: unknown, fallback: T): T => {
  if (typeof json === 'string') {
    try {
      return JSON.parse(json) as T;
    } catch (e) {
      console.error('Error parsing JSON string:', e);
      return fallback;
    }
  }
  
  if (isJsonObject(json)) {
    // Convert the JSON object to the target type
    return json as unknown as T;
  }
  
  return fallback;
};

// Type guard for checking if a value is Json
export const isJson = (value: unknown): value is Json => {
  if (value === null) return true;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return true;
  if (Array.isArray(value)) return value.every(isJson);
  if (typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).every(v => v === undefined || isJson(v));
  }
  return false;
};
