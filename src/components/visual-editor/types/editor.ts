import { LucideIcon } from 'lucide-react';

export interface VisualElement {
  id: string;
  type: 'heading' | 'text' | 'image' | 'button';
  content: Record<string, any>;
}

export interface ElementPreset {
  id: string;
  name: string;
  category: string;
  icon: LucideIcon;
  preview: string;
  defaultProps?: Record<string, any>;
}

export interface EditorState {
  elements: VisualElement[];
  selectedElement: string | null;
  isDragging: boolean;
}

export interface ElementEditorProps {
  element: VisualElement;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (id: string, content: any) => void;
  onDelete: (id: string) => void;
}

export interface PreviewModeProps {
  elements: VisualElement[];
}

export interface ToolbarProps {
  onAddElement: (preset: ElementPreset) => void;
  onSave: () => void;
  isSaving?: boolean;
}