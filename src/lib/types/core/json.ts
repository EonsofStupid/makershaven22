export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [key: string]: Json };
export type JsonArray = Json[];
export type Json = JsonPrimitive | JsonObject | JsonArray;

export type { Json as JsonType };
export type { JsonArray as JsonArrayType };
export type { JsonObject as JsonObjectType };
export type { JsonPrimitive as JsonPrimitiveType };