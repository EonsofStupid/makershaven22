
/**
 * JSON value type
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

/**
 * JSON object type
 */
export interface JsonObject {
  [key: string]: Json;
}

/**
 * JSON array type
 */
export type JsonArray = Json[];

/**
 * Utility type to convert a type to its JSON representation
 */
export type ToJson<T> = {
  [P in keyof T]: T[P] extends object
    ? ToJson<T[P]>
    : T[P] extends Date
    ? string
    : T[P];
};
