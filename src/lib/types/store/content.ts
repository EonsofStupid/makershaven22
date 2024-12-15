import { BaseEntity, ContentStatus, ContentType, Json } from '../base';

export interface BaseContent extends BaseEntity {
  title: string;
  type: ContentType;
  content?: Json;
  metadata?: Json;
  slug?: string;
  status?: ContentStatus;
  version?: number;
  created_by?: string;
  updated_by?: string;
}