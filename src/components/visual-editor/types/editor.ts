export interface EditorState {
  selectedElement: string | null;
  elements: EditorElement[];
  history: EditorHistory[];
  isDragging: boolean;
}

export interface EditorElement {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: EditorElement[];
}

export interface EditorHistory {
  timestamp: number;
  state: EditorState;
  description: string;
}

export type EditorAction = 
  | { type: 'SELECT_ELEMENT'; payload: string }
  | { type: 'UPDATE_ELEMENT'; payload: { id: string; updates: Partial<EditorElement> } }
  | { type: 'ADD_ELEMENT'; payload: EditorElement }
  | { type: 'REMOVE_ELEMENT'; payload: string }
  | { type: 'SET_DRAGGING'; payload: boolean };