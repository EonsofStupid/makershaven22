import { Settings } from "../settings/types";

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: Settings;
        Insert: Partial<Settings>;
        Update: Partial<Settings>;
      };
    };
  };
}

export type Tables = Database["public"]["Tables"];
export type TableNames = keyof Tables;