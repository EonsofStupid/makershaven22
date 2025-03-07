
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
export type JsonObject = { [key: string]: Json };
export type JsonArray = Json[];

export interface JsonCompatible {
  toJSON(): JsonObject;
}

// Helper type for converting JSON to specific types
export type FromJson<T> = (json: Json) => T;
