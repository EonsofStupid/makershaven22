export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];
export type JsonArray = Json[];
export type JsonObject = { [key: string]: Json };