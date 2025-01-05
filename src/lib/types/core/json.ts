export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface JsonObject {
  [key: string]: Json;
}

export type JsonArray = Json[];

export const isJsonObject = (value: Json): value is JsonObject => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const isJsonArray = (value: Json): value is JsonArray => {
  return Array.isArray(value);
};