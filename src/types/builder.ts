export interface BuilderElement {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: BuilderElement[];
  content?: string;
}

export interface BuilderState {
  elements: BuilderElement[];
  selectedElement: string | null;
}

export type BuilderAction =
  | { type: 'ADD_ELEMENT'; element: BuilderElement }
  | { type: 'UPDATE_ELEMENT'; id: string; updates: Partial<BuilderElement> }
  | { type: 'DELETE_ELEMENT'; id: string }
  | { type: 'SELECT_ELEMENT'; id: string | null };