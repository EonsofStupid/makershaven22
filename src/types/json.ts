export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type JsonObject = { [key: string]: Json };

export const isJsonObject = (value: unknown): value is JsonObject => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const isJsonArray = (value: unknown): value is Json[] => {
  return Array.isArray(value);
};

export const isJsonPrimitive = (value: unknown): value is string | number | boolean | null => {
  const type = typeof value;
  return value === null || type === 'string' || type === 'number' || type === 'boolean';
};