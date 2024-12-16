export interface ComponentType {
  id: string;
  name: string;
  description?: string;
  props: Record<string, any>;
}

export interface ComponentConfig {
  type: string;
  props: Record<string, any>;
  children?: ComponentConfig[];
}

export interface ComponentProps {
  config: ComponentConfig;
  onUpdate?: (config: ComponentConfig) => void;
}