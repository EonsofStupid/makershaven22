
import { useState, useCallback } from 'react';

// TODO: Import these types from the appropriate location
interface VisualElement {
  id: string;
  type: string;
  content: Record<string, any>;
}

interface ElementPreset {
  id: string;
  name: string;
  description?: string;
  category?: string;
  defaultProps?: Record<string, any>;
  icon?: string;
}

export const useEditorState = (initialElements: VisualElement[] = []) => {
  const [elements, setElements] = useState<VisualElement[]>(initialElements);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const addElement = useCallback((preset: ElementPreset) => {
    const newElement: VisualElement = {
      id: `element-${Date.now()}`,
      type: preset.id as any,
      content: preset.defaultProps || {},
    };
    setElements((prev) => [...prev, newElement]);
  }, []);

  const updateElement = useCallback((id: string, content: any) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, content } : el))
    );
  }, []);

  const deleteElement = useCallback((id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    setSelectedElement(null);
  }, []);

  const reorderElements = useCallback((startIndex: number, endIndex: number) => {
    setElements((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, []);

  return {
    elements,
    selectedElement,
    isDragging,
    setSelectedElement,
    setIsDragging,
    addElement,
    updateElement,
    deleteElement,
    reorderElements,
  };
};
