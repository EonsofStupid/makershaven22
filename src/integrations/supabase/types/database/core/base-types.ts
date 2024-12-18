import { Json } from '../json';

export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

export interface BaseContentEntity extends BaseEntity {
  title: string;
  content?: Json;
  metadata?: Json;
  created_by: string;
  updated_by?: string;
  version?: number;
}

export interface BaseWorkflowEntity extends BaseEntity {
  name: string;
  description?: string;
  is_active?: boolean;
  created_by?: string;
}