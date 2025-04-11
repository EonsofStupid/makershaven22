
import { JsonObject } from '../types/core/json';

/**
 * Ensure a value is an object
 */
export function ensureObject<T extends object>(value: any, defaultValue: T): T {
  if (typeof value === 'object' && value !== null) {
    return value as T;
  }
  return defaultValue;
}

/**
 * Ensure a value is a JsonObject
 */
export function ensureJson(value: any): JsonObject {
  if (typeof value === 'object' && value !== null) {
    return value as JsonObject;
  }
  return {};
}

/**
 * Type guard for checking if a value is not null or undefined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Convert object to record where values are strings
 */
export function objectToRecord(obj: any, defaultValue: string = ''): Record<string, string> {
  if (!obj || typeof obj !== 'object') {
    return {};
  }
  
  const result: Record<string, string> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      result[key] = typeof value === 'string' ? value : defaultValue;
    }
  }
  
  return result;
}

/**
 * Convert an object to a flattened record using dot notation
 */
export function flattenObject(obj: any, prefix: string = ''): Record<string, any> {
  if (!obj || typeof obj !== 'object') {
    return {};
  }
  
  return Object.keys(obj).reduce((acc, key) => {
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObject(obj[key], prefixedKey));
    } else {
      acc[prefixedKey] = obj[key];
    }
    
    return acc;
  }, {} as Record<string, any>);
}

/**
 * Unflatten a record using dot notation
 */
export function unflattenObject(record: Record<string, any>): any {
  const result: Record<string, any> = {};
  
  for (const key in record) {
    if (Object.prototype.hasOwnProperty.call(record, key)) {
      const value = record[key];
      const keys = key.split('.');
      let current = result;
      
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        
        if (i === keys.length - 1) {
          current[k] = value;
        } else {
          if (!current[k] || typeof current[k] !== 'object') {
            current[k] = {};
          }
          current = current[k];
        }
      }
    }
  }
  
  return result;
}
