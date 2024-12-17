export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = Json[];
export type JsonObject = { [key: string]: Json | undefined };
export type Json = JsonPrimitive | JsonObject | JsonArray;

export const isJsonPrimitive = (value: unknown): value is JsonPrimitive => {
  return (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
};

export const isJsonArray = (value: unknown): value is JsonArray => {
  return Array.isArray(value) && value.every((item) => isJson(item));
};

export const isJsonObject = (value: unknown): value is JsonObject => {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((item) => item === undefined || isJson(item))
  );
};

export const isJson = (value: unknown): value is Json => {
  return (
    isJsonPrimitive(value) || isJsonArray(value) || isJsonObject(value)
  );
};

export const parseJson = <T>(value: Json): T => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      throw new Error("Invalid JSON string");
    }
  }
  return value as T;
};

export const assertJsonObject = (value: unknown): JsonObject => {
  if (!isJsonObject(value)) {
    throw new Error("Value is not a JSON object");
  }
  return value;
};

export const assertJsonArray = (value: unknown): JsonArray => {
  if (!isJsonArray(value)) {
    throw new Error("Value is not a JSON array");
  }
  return value;
};