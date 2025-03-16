
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type JsonObject = { [key: string]: Json | undefined };
export type JsonArray = Json[];
