
import { Json } from '../core/json';
import { ContentType, ContentStatus } from '../core/enums';

export interface BaseContent {
  id: string;
  title: string;
  slug?: string;
  type: ContentType;
  status: ContentStatus;
  content?: Json;
  metadata?: Json;
  created_by: string;
  created_at?: string;
  updated_by?: string;
  updated_at?: string;
  version?: number;
}

export interface ContentRevision {
  id: string;
  content_id: string;
  revision_number: number;
  content: Json;
  metadata?: Json;
  created_by: string;
  created_at: string;
  change_summary?: string;
}

export interface ContentFormData {
  title: string;
  slug?: string;
  content?: Json;
  metadata?: Json;
  type: ContentType;
  status: ContentStatus;
}

export interface ContentTypeDefinition {
  type: ContentType;
  label: string;
  description: string;
  icon?: string;
  fields: ContentFieldDefinition[];
}

export interface ContentFieldDefinition {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'rich-text' | 'number' | 'boolean' | 'date' | 'select' | 'media' | 'relation';
  required?: boolean;
  options?: any[];
  default?: any;
  validations?: any[];
}
