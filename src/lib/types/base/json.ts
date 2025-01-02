export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface JsonObject {
  [key: string]: Json;
}

export type JsonArray = Json[];

export interface MetadataEntity {
  metadata?: Json;
}