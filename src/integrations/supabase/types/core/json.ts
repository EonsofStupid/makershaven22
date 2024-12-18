export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type JsonObject = { [key: string]: Json };
export type JsonArray = Json[];

export interface JsonResponse<T> {
  data: T | null;
  error: Error | null;
}