import type { Json } from "@/integrations/supabase/types";

export interface BuilderElement {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: BuilderElement[];
  content?: any;
}

export interface BuilderState {
  elements: BuilderElement[];
  selectedElement: string | null;
  history: BuilderElement[][];
  currentHistoryIndex: number;
}