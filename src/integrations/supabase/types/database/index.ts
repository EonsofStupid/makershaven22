import type { AuthTableDefinitions } from './auth';
import type { ContentTableDefinitions } from './content';
import type { SettingsTableDefinitions } from './settings';
import type { Json } from './base';

export interface Database {
  public: {
    Tables: AuthTableDefinitions & ContentTableDefinitions & SettingsTableDefinitions;
    Views: {
      [key: string]: {
        Row: Record<string, unknown>;
      };
    };
    Functions: {
      [key: string]: unknown;
    };
    Enums: {
      [key: string]: string[];
    };
  };
}

export type { Json };