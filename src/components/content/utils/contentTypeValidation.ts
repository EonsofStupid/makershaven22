
import { ContentType } from '@/lib/types/enums';
import { getSchemaByType, contentTypeRelationships } from '../types/contentTypes';
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
 * Same as validateContentData but additionally returns sanitized data
 * @param type ContentType to validate against
 * @param data Content data to validate
 * @returns Validation result with success status, optional errors, and sanitized data
 */
export const validateContent = (type: ContentType, data: any) => {
  const schema = getSchemaByType(type);
  try {
    const validatedData = schema.parse(data);
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
      errors: [{ message: 'Unknown validation error' }]
    };
  }
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
