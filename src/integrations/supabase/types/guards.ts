import type { Json } from './database/base';
import type { WorkflowStage, WorkflowTemplate } from './database/tables/workflow';
import type { Settings } from './database/tables/settings';

export const isJsonObject = (value: unknown): value is { [key: string]: Json } => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const parseJsonSafely = <T>(value: Json): T | null => {
  try {
    if (typeof value === 'string') {
      return JSON.parse(value) as T;
    }
    return value as T;
  } catch {
    return null;
  }
};

export const validateWorkflowStages = (stages: unknown[]): stages is WorkflowStage[] => {
  return stages.every(stage => {
    if (!isJsonObject(stage)) return false;
    return (
      typeof stage.id === 'string' &&
      typeof stage.name === 'string' &&
      typeof stage.type === 'string' &&
      typeof stage.order === 'number' &&
      isJsonObject(stage.config)
    );
  });
};

export const validateSettings = (data: unknown): data is Settings => {
  if (!isJsonObject(data)) return false;
  return (
    typeof data.site_title === 'string' &&
    typeof data.primary_color === 'string' &&
    typeof data.secondary_color === 'string' &&
    typeof data.accent_color === 'string'
  );
};

export const validateWorkflowTemplate = (data: unknown): data is WorkflowTemplate => {
  if (!isJsonObject(data)) return false;
  return (
    typeof data.id === 'string' &&
    typeof data.name === 'string' &&
    typeof data.is_active === 'boolean'
  );
};