export * from './tables';
export * from './enums';
export * from './base';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];