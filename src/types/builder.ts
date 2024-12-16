export interface BuilderElement {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: BuilderElement[];
  styles?: Record<string, string>;
}

export interface BuilderState {
  elements: BuilderElement[];
  selectedElement: string | null;
  history: BuilderElement[][];
  currentHistoryIndex: number;
}

export interface BuilderAction {
  type: string;
  payload?: any;
}