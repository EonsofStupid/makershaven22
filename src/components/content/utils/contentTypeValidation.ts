
import { ContentType, ContentStatus } from '@/lib/types/core/enums';
import { ContentCreate, ContentUpdate } from '@/lib/types/content/types';
import { isJsonObject, JsonObject } from '@/lib/types/core/json';

// Create validation result interface
interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: { message: string }[];
}

/**
 * Validate content for creation operation
 * @param data Content data to validate
 * @returns Validation result with success status, optional errors, and sanitized data
 */
export const validateContentCreate = (data: ContentCreate): ValidationResult<ContentCreate> => {
  const errors: { message: string }[] = [];
  
  // Validate required fields
  if (!data.title || data.title.trim() === '') {
    errors.push({ message: 'Title is required' });
  }
  
  if (!data.created_by) {
    errors.push({ message: 'Creator ID is required' });
  }
  
  // Validate enum values
  if (!isValidContentType(data.type)) {
    errors.push({ message: `Invalid content type: ${data.type}` });
  }
  
  if (data.status && !isValidContentStatus(data.status)) {
    errors.push({ message: `Invalid content status: ${data.status}` });
  }
  
  if (errors.length > 0) {
    return {
      success: false,
      errors
    };
  }
  
  // Return sanitized data
  return { 
    success: true,
    data
  };
};

/**
 * Validate content for update operation
 * @param data Content data to validate
 * @returns Validation result with success status, optional errors, and sanitized data
 */
export const validateContentUpdate = (data: ContentUpdate): ValidationResult<ContentUpdate> => {
  const errors: { message: string }[] = [];
  
  // Validate required fields
  if (!data.id) {
    errors.push({ message: 'ID is required' });
  }
  
  if (!data.updated_by) {
    errors.push({ message: 'Updater ID is required' });
  }
  
  // Validate optional fields that are present
  if (data.title !== undefined && data.title.trim() === '') {
    errors.push({ message: 'Title cannot be empty' });
  }
  
  if (data.type !== undefined && !isValidContentType(data.type)) {
    errors.push({ message: `Invalid content type: ${data.type}` });
  }
  
  if (data.status !== undefined && !isValidContentStatus(data.status)) {
    errors.push({ message: `Invalid content status: ${data.status}` });
  }
  
  if (errors.length > 0) {
    return {
      success: false,
      errors
    };
  }
  
  // Return sanitized data
  return { 
    success: true,
    data
  };
};

/**
 * Validate that a value is a valid ContentType
 */
function isValidContentType(value: any): value is ContentType {
  return [
    'page', 'component', 'template', 'build', 'guide', 
    'part', 'workflow', 'hero', 'feature'
  ].includes(value);
}

/**
 * Validate that a value is a valid ContentStatus
 */
function isValidContentStatus(value: any): value is ContentStatus {
  return ['draft', 'published', 'archived'].includes(value);
}

// Define relationship mappings between content types for frontend use
export const contentTypeRelationships: Record<string, string[]> = {
  page: ['template', 'component'],
  component: ['component'],
  template: ['page', 'component'],
  workflow: ['template', 'page', 'component'],
  build: ['component', 'part'],
  guide: ['component', 'build'],
  part: ['component'],
  hero: ['component'],
  feature: ['component']
};

/**
 * Check if a content type can be related to another
 * @param sourceType Source content type
 * @param targetType Target content type
 * @returns Boolean indicating if relationship is allowed
 */
export const canRelateContentTypes = (sourceType: string, targetType: string): boolean => {
  const allowedRelationships = contentTypeRelationships[sourceType] || [];
  return allowedRelationships.includes(targetType);
};
