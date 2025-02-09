
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
export type JsonObject = { [key: string]: Json };
export type JsonArray = Json[];

export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}
