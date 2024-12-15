export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface BaseTableDefinitions {
  id: string;
  created_at?: string;
  updated_at?: string;
}