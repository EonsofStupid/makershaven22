export type ComponentType = 'text' | 'image' | 'button' | 'container' | 'form' | 'bearings' | 'extruders' | 'addons';

export interface ComponentConfig {
  type: ComponentType;
  label: string;
  icon?: string;
  defaultProps?: Record<string, any>;
  validationRules?: ValidationRule[];
}

export interface ValidationRule {
  type: string;
  message: string;
  value?: any;
}

export interface ValidationSchema {
  [key: string]: ValidationRule[];
}