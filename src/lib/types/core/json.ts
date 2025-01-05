export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];
export type JsonArray = Json[];
export type JsonObject = { [key: string]: Json };

export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserOwnedEntity extends BaseEntity {
  created_by: string;
  updated_by?: string;
}