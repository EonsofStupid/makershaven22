export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface JsonObject {
  [key: string]: Json
}

export type JsonArray = Json[]

export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

export interface DatabaseRow {
  id: string;
  created_at?: string;
  updated_at?: string;
}

export interface SettingValue {
  label: string;
  value: boolean;
  description?: string;
}