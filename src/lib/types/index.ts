// Core types - explicitly import and re-export to avoid ambiguity
import type {
  Json,
  JsonObject,
  ThemeMode,
  GlassEffectLevel,
  TransitionType,
  UserRole,
  ContentStatus,
  ContentType,
  WorkflowStageType,
  BaseEntity,
  BaseContent,
  BaseWorkflow
} from './core';

// Re-export core types
export type {
  Json,
  JsonObject,
  ThemeMode,
  GlassEffectLevel,
  TransitionType,
  UserRole,
  ContentStatus,
  ContentType,
  WorkflowStageType,
  BaseEntity,
  BaseContent,
  BaseWorkflow
};

// Re-export core utilities
export {
  toJson,
  isJson,
  isJsonObject,
  isValidThemeMode,
  isValidGlassEffectLevel,
  isValidTransitionType,
  isValidUserRole,
  isValidContentStatus,
  isValidContentType,
  isValidWorkflowStageType
} from './core';

// Extended types that build on core types
export type { AuthSession } from './auth/types';
export type { 
  ContentCreate, 
  ContentUpdate, 
  ContentRevision, 
  ContentRelationship, 
  PostWithAuthor 
} from './content/types';
export type { 
  WorkflowStage, 
  WorkflowStageConfig, 
  WorkflowTemplate 
} from './workflow/types';
export type { ThemePreferences } from './theme/core';
export type { FlattenedSettings as ThemeSettings } from './theme/state';

// Database types
export type { DatabaseTables } from './database/core';
export * from './database/tables';

// Store types
export type { ThemeState, AuthState, SettingsState } from './store-types';

// Pagination types
export * from './pagination';
