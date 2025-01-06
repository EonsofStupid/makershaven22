export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [key: string]: Json };
export type JsonArray = Json[];
export type Json = JsonPrimitive | JsonObject | JsonArray;

// Re-export with type keyword to fix isolatedModules error
export type { 
  Json as JsonType, 
  JsonArray as JsonArrayType, 
  JsonObject as JsonObjectType, 
  JsonPrimitive as JsonPrimitiveType 
};