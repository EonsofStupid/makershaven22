export interface BuilderElement {
  id: string;
  type: string;
  content: any;
  props: Record<string, any>;
}

export interface BuilderState {
  elements: BuilderElement[];
  selectedElement: string | null;
  history: BuilderElement[][];
  historyIndex: number;
}