export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
export type Json = JsonValue;

export const isJsonObject = (value: Json): value is JsonObject => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const isJsonArray = (value: Json): value is JsonArray => {
  return Array.isArray(value);
};