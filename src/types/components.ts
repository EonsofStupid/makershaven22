import { ComponentType } from './enums';

export interface BuilderElement {
  id: string;
  type: ComponentType;
  content: any;
  props: Record<string, any>;
}

export interface ElementProps {
  text?: string;
  url?: string;
  alt?: string;
  [key: string]: any;
}

export interface StageConfigUpdateProps {
  stageId: string;
  config: Record<string, any>;
}

export interface WorkflowState {
  activeWorkflow?: string;
  history: string[];
  setActiveWorkflow: (id: string | undefined) => void;
  addToHistory: (id: string) => void;
}