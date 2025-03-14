
// Basic JSON type definition to use across the application
export type Json = 
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Type guards for JSON values
export function isJsonObject(value: Json | null | undefined): value is Record<string, Json> {
  return value !== null && 
         typeof value === 'object' && 
         !Array.isArray(value);
}

export function isJsonArray(value: Json | null | undefined): value is Json[] {
  return Array.isArray(value);
}

export function isJsonPrimitive(value: Json | null | undefined): value is string | number | boolean | null {
  return value === null || 
         typeof value === 'string' || 
         typeof value === 'number' || 
         typeof value === 'boolean';
}
