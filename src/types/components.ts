export interface ComponentConfig {
  id: string;
  name: string;
  type: string;
  props: Record<string, any>;
  children?: ComponentConfig[];
  styles?: Record<string, string>;
  validation?: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
  };
}

export interface ComponentProps {
  config: ComponentConfig;
  onChange?: (value: any) => void;
  value?: any;
}