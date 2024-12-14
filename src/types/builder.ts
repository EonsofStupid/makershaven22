export interface BuilderElement {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: BuilderElement[];
  styles?: Record<string, string | number>;
}

export interface BuilderState {
  elements: BuilderElement[];
  selectedElement: string | null;
  history: BuilderElement[][];
  currentHistoryIndex: number;
}