/**
 * Checks if a value is a non-array object that can be used as a JSON object
 */
export function isJsonObject(value: any): boolean {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Safely converts a value to a boolean with fallback
 */
export function safeBoolean(value: any, defaultValue: boolean): boolean {
  return typeof value === 'boolean' ? value : defaultValue;
}

/**
 * Safely converts a value to a number with fallback
 */
export function safeNumber(value: any, defaultValue: number): number {
  return typeof value === 'number' && !isNaN(value) ? value : defaultValue;
}

/**
 * Safely filters an array to only include strings
 */
export function safeStringArray(arr: any[]): string[] {
  return arr.filter(item => typeof item === 'string');
}
