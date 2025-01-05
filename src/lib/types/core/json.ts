export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];
export type JsonObject = { [key: string]: Json };
export type JsonArray = Json[];

export const isJsonObject = (value: unknown): value is JsonObject => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const isJsonArray = (value: unknown): value is JsonArray => {
  return Array.isArray(value);
};