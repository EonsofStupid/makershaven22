import { Json } from '../core/json';
import { ContentType, ContentStatus } from '../core/enums';

export interface CmsContent {
  id: string;
  title: string;
  type: ContentType;
  content: Json;
  metadata?: Json;
  slug?: string;
  status: ContentStatus;
  version?: number;
  created_by: string;
  updated_by?: string;
  created_at: string;
  updated_at?: string;
}

export interface ContentTypeDefinition {
  id: string;
  name: string;
  description?: string;
  fields: ContentField[];
  validations?: ContentValidation[];
}

export interface ContentField {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: any;
}

export interface ContentValidation {
  field: string;
  rule: string;
  params?: any;
}