
export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = Json[];
export type JsonObject = { [key: string]: Json | undefined };
export type Json = JsonPrimitive | JsonObject | JsonArray;

export interface SettingValue {
  label: string;
  value: boolean;
  description?: string;
}

// Type guards
export const isJsonPrimitive = (value: unknown): value is JsonPrimitive => {
  return value === null || 
    typeof value === "string" || 
    typeof value === "number" || 
    typeof value === "boolean";
};

export const isJsonArray = (value: unknown): value is JsonArray => {
  return Array.isArray(value) && value.every(item => isJson(item));
};

export const isJsonObject = (value: unknown): value is JsonObject => {
  return typeof value === "object" && 
    value !== null && 
    !Array.isArray(value) && 
    Object.values(value).every(item => item === undefined || isJson(item));
};

export const isJson = (value: unknown): value is Json => {
  return isJsonPrimitive(value) || isJsonArray(value) || isJsonObject(value);
};
