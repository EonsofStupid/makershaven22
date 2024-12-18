import { Json } from '../base/json';
import { ContentStatus, ContentType } from '../base/enums';

export interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  content?: Json;
  metadata?: Json;
  created_by: string;
  updated_by?: string;
  created_at: string;
  updated_at?: string;
  version?: number;
  slug?: string;
}

export interface ContentWithAuthor extends Omit<BaseContent, 'created_by'> {
  created_by: {
    display_name: string;
  };
}