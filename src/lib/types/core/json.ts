export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = Json[];
export type JsonObject = { [key: string]: Json };
export type Json = JsonPrimitive | JsonObject | JsonArray;

export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserOwnedEntity extends BaseEntity {
  created_by: string;
  updated_by?: string;
}