import type { Json as SupabaseJson } from '@supabase/supabase-js';

export type Json = SupabaseJson;

export type JsonObject = { [key: string]: Json };

export function isJsonObject(value: Json): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function parseJsonField<T>(json: Json | null): T | null {
  if (!json) return null;
  try {
    return typeof json === 'string' ? JSON.parse(json) : json as T;
  } catch {
    return null;
  }
}