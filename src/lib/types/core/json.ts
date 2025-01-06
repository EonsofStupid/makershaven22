export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = Json[];
export type JsonObject = { [key: string]: Json };
export type Json = JsonPrimitive | JsonObject | JsonArray;

// Re-export to resolve ambiguity
export { Json as default, JsonArray, JsonObject, JsonPrimitive };