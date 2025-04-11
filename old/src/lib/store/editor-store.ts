import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EditorState {
  activeElement: any | null;
  isSaving: boolean;
  setActiveElement: (element: any | null) => void;
  setSaving: (isSaving: boolean) => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      activeElement: null,
      isSaving: false,
      setActiveElement: (element) => set({ activeElement: element }),
      setSaving: (isSaving) => set({ isSaving }),
    }),
    { name: 'editor-store' }
  )
);