export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface JsonObject {
  [key: string]: Json;
}

export type JsonArray = Json[];

export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserOwnedEntity extends BaseEntity {
  created_by: string;
  updated_by?: string;
}

export interface MetadataEntity extends BaseEntity {
  metadata?: Json;
}