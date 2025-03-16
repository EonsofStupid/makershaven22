/**
 * Core JSON types and utilities
 */
export type Json = 
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export type JsonObject = { [key: string]: Json };

export function toJson(value: unknown): Json {
  return JSON.parse(JSON.stringify(value));
}

export function isJson(value: unknown): value is Json {
  try {
    JSON.stringify(value);
    return true;
  } catch {
    return false;
  }
}

export function isJsonObject(value: unknown): value is JsonObject {
  return isJson(value) && typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Core enum types
 */
export type ThemeMode = 'light' | 'dark' | 'system';
export type GlassEffectLevel = 'none' | 'low' | 'medium' | 'high';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin' | 'moderator';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type ContentType = 
  | 'template' 
  | 'page' 
  | 'build' 
  | 'guide' 
  | 'part' 
  | 'component'
  | 'workflow'
  | 'hero'
  | 'feature';
export type WorkflowStageType = 'APPROVAL' | 'TASK' | 'REVIEW' | 'NOTIFICATION';

/**
 * Type guards for core types
 */
export function isValidThemeMode(value: unknown): value is ThemeMode {
  return typeof value === 'string' && ['light', 'dark', 'system'].includes(value as string);
}

export function isValidGlassEffectLevel(value: unknown): value is GlassEffectLevel {
  return typeof value === 'string' && ['none', 'low', 'medium', 'high'].includes(value as string);
}

export function isValidTransitionType(value: unknown): value is TransitionType {
  return typeof value === 'string' && ['fade', 'slide', 'scale', 'blur'].includes(value as string);
}

export function isValidUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && 
         ['subscriber', 'maker', 'admin', 'super_admin', 'moderator'].includes(value as string);
}

export function isValidContentStatus(value: unknown): value is ContentStatus {
  return typeof value === 'string' && ['draft', 'published', 'archived'].includes(value as string);
}

export function isValidContentType(value: unknown): value is ContentType {
  const validTypes = [
    'template', 'page', 'build', 'guide', 'part', 
    'component', 'workflow', 'hero', 'feature'
  ];
  return typeof value === 'string' && validTypes.includes(value as string);
}

export function isValidWorkflowStageType(value: unknown): value is WorkflowStageType {
  return typeof value === 'string' && 
         ['APPROVAL', 'TASK', 'REVIEW', 'NOTIFICATION'].includes(value as string);
}

/**
 * Base interfaces
 */
export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

export interface BaseContent extends BaseEntity {
  title: string;
  type: ContentType;
  content?: Json;
  metadata?: Json;
  slug?: string;
  status?: ContentStatus;
  version?: number;
}

export interface BaseWorkflow extends BaseEntity {
  name: string;
  description?: string;
  type: WorkflowStageType;
  config?: JsonObject;
  status?: string;
  metadata?: JsonObject;
} 