export type Json = string | number | boolean | null | JsonObject | JsonArray;
export type JsonObject = { [key: string]: Json };
export type JsonArray = Json[];