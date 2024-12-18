import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RevisionState {
  revisions: any[];
  activeRevision: any | null;
  setRevisions: (revisions: any[]) => void;
  setActiveRevision: (revision: any | null) => void;
  clearRevisions: () => void;
}

export const useRevisionStore = create<RevisionState>()(
  persist(
    (set) => ({
      revisions: [],
      activeRevision: null,
      setRevisions: (revisions) => set({ revisions }),
      setActiveRevision: (revision) => set({ activeRevision: revision }),
      clearRevisions: () => set({ revisions: [], activeRevision: null }),
    }),
    { name: 'revision-store' }
  )
);