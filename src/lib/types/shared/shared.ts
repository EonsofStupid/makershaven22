import { Json } from '../core/base';
import { Settings } from '../settings/types';
import { AuthState, AuthUser, AuthSession, AuthError } from '../auth/types';

export type {
  Settings,
  AuthState,
  AuthUser,
  AuthSession,
  AuthError,
  Json
};

export interface CmsContent {
  id: string;
  title: string;
  content?: Json;
  metadata?: Json;
  slug?: string;
  status: 'draft' | 'published' | 'archived';
  type: 'page' | 'component' | 'template' | 'workflow';
  version?: number;
  created_by: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContentWithAuthor extends Omit<CmsContent, 'created_by'> {
  created_by: {
    display_name: string;
  };
}