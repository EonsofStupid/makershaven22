import type { Json } from './base';

export interface ContentTableDefinitions {
  cms_content: {
    Row: {
      id: string;
      title: string;
      type: string;
      content: Json;
      metadata: Json | null;
      created_by: string;
      updated_by: string | null;
      created_at: string;
      updated_at: string | null;
    };
    Insert: {
      title: string;
      type: string;
      content: Json;
      created_by: string;
    };
    Update: {
      title?: string;
      content?: Json;
      updated_by?: string;
    };
  };
}