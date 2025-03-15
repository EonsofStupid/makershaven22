import { ContentType } from '@/lib/types/enums';
import { ContentCreate, ContentUpdate } from '@/lib/types/content/types';
import { 
  getSchemaByType, 
  contentTypeRelationships, 
  contentCreateSchema, 
  contentUpdateSchema 
} from '../types/contentTypeSchema';
import { z } from 'zod';

/**
 * Validate content data against its schema based on content type
 * @param type ContentType to validate against
 * @param data Content data to validate
 * @returns Validation result with success status and optional errors
 */
export const validateContentData = (type: ContentType, data: any) => {
  const schema = getSchemaByType(type);
  try {
    schema.parse(data);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors
      };
    }
    return {
      success: false,
      errors: [{ message: 'Unknown validation error' }]
    };
  }
};

/**
 * Validate content for creation operation
 * @param type ContentType to validate against
 * @param data Content data to validate
 * @returns Validation result with success status, optional errors, and sanitized data
 */
export const validateContentCreate = (data: ContentCreate) => {
  try {
    const validatedData = contentCreateSchema.parse(data);
    return { 
      success: true,
      data: validatedData
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors
      };
    }
    return {
      success: false,
      errors: [{ message: 'Unknown validation error during content creation' }]
    };
  }
};

/**
 * Validate content for update operation
 * @param data Content data to validate
 * @returns Validation result with success status, optional errors, and sanitized data
 */
export const validateContentUpdate = (data: ContentUpdate) => {
  try {
    const validatedData = contentUpdateSchema.parse(data);
    return { 
      success: true,
      data: validatedData
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors
      };
    }
    return {
      success: false,
      errors: [{ message: 'Unknown validation error during content update' }]
    };
  }
};

/**
 * General validation function that chooses the appropriate validator based on operation type
 * @param type ContentType to validate against
 * @param data Content data to validate
 * @returns Validation result with success status, optional errors, and sanitized data
 */
export const validateContent = (type: ContentType, data: any) => {
  // Check if it's a content update (has id and updated_by)
  if (data.id && data.updated_by) {
    return validateContentUpdate(data as ContentUpdate);
  }
  
  // Otherwise treat as content creation
  return validateContentCreate({...data, type} as ContentCreate);
};

/**
 * Check if a content type can be related to another
 * @param sourceType Source content type
 * @param targetType Target content type
 * @returns Boolean indicating if relationship is allowed
 */
export const canRelateContentTypes = (sourceType: ContentType, targetType: ContentType): boolean => {
  const allowedRelationships = contentTypeRelationships[sourceType] || [];
  return allowedRelationships.includes(targetType);
};
