export interface BuilderElement {
  id: string;
  type: string;
  props?: Record<string, any>;
  styles?: Record<string, any>;
  children?: BuilderElement[];
}

export interface BuilderState {
  elements: BuilderElement[];
  selectedElement: string | null;
  history: BuilderElement[][];
  historyIndex: number;
}

export interface BuilderAction {
  type: string;
  payload?: any;
}