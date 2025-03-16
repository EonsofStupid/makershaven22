
import { ContentType } from '@/lib/types/enums';
import { ContentCreate, ContentUpdate } from '@/lib/types/content/types';
import { 
  getSchemaByType, 
  contentTypeRelationships, 
  contentCreateSchema, 
  contentUpdateSchema 
} from '../types/contentTypeSchema';
import { z } from 'zod';
import { isJsonObject, JsonObject } from '@/lib/types/core/json';

/**
 * Validate content data against its schema based on content type
 * @param type ContentType to validate against
 * @param data Content data to validate
 * @returns Validation result with success status and optional errors
 */
export const validateContentData = (type: ContentType, data: any) => {
  // Ensure data is an object before validation
  if (!isJsonObject(data)) {
    return {
      success: false,
      errors: [{ message: 'Content data must be an object' }]
    };
  }

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
 * @param data Content data to validate
 * @returns Validation result with success status, optional errors, and sanitized data
 */
export const validateContentCreate = (data: ContentCreate) => {
  // Ensure created_by is present and is a string
  if (!data.created_by || typeof data.created_by !== 'string') {
    return {
      success: false,
      errors: [{ message: 'created_by is required and must be a string' }]
    };
  }

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
  // Ensure updated_by is present and is a string
  if (!data.updated_by || typeof data.updated_by !== 'string') {
    return {
      success: false,
      errors: [{ message: 'updated_by is required and must be a string' }]
    };
  }

  // Ensure id is present and is a string
  if (!data.id || typeof data.id !== 'string') {
    return {
      success: false,
      errors: [{ message: 'id is required and must be a string' }]
    };
  }

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
 * Type guard to check if an object conforms to ContentUpdate
 * @param obj The object to check
 * @returns boolean indicating if the object is a valid ContentUpdate
 */
function isContentUpdate(obj: JsonObject): obj is ContentUpdate {
  return (
    'id' in obj && 
    typeof obj.id === 'string' && 
    'updated_by' in obj && 
    typeof obj.updated_by === 'string'
  );
}

/**
 * Type guard to check if an object has the minimum required fields for ContentCreate
 * @param obj The object to check
 * @returns boolean indicating if the object has the required fields for ContentCreate
 */
function hasCreateContentRequiredFields(obj: JsonObject): boolean {
  return (
    'type' in obj && 
    typeof obj.type === 'string' && 
    'title' in obj && 
    typeof obj.title === 'string' &&
    'created_by' in obj && 
    typeof obj.created_by === 'string'
  );
}

/**
 * General validation function that chooses the appropriate validator based on operation type
 * @param type ContentType to validate against
 * @param data Content data to validate
 * @returns Validation result with success status, optional errors, and sanitized data
 */
export const validateContent = (type: ContentType, data: any) => {
  // Ensure data is an object before validation
  if (!isJsonObject(data)) {
    return {
      success: false,
      errors: [{ message: 'Content data must be an object' }]
    };
  }

  // Use type guard to properly check if data is a ContentUpdate
  if (isContentUpdate(data)) {
    return validateContentUpdate(data);
  }
  
  // Check if data has the required fields for content creation
  if (hasCreateContentRequiredFields(data)) {
    // It's a create operation, ensure the type is set
    return validateContentCreate({...data, type} as ContentCreate);
  }
  
  // Neither update nor create conditions are met
  return {
    success: false,
    errors: [{ message: 'Invalid content data: missing required fields' }]
  };
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
