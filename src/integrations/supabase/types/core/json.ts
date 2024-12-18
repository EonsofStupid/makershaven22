export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = Json[];
export type JsonObject = { [key: string]: Json | undefined };
export type Json = JsonPrimitive | JsonObject | JsonArray;

// Type guards
export const isJsonObject = (value: unknown): value is JsonObject => {
  return typeof value === "object" && 
    value !== null && 
    !Array.isArray(value);
};

export const parseJsonField = <T>(json: Json, field: string, defaultValue: T): T => {
  if (!isJsonObject(json)) return defaultValue;
  const value = json[field];
  return (value as T) ?? defaultValue;
};