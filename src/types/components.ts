export interface ValidationSchema {
  type: string;
  rules: ValidationRule[];
}

export interface ValidationRule {
  type: string;
  params?: any;
  message: string;
}

export interface ComponentConfig {
  name: string;
  schema: ValidationSchema;
  defaultProps?: Record<string, any>;
}