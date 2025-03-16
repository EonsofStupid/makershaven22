
import { create } from 'zustand';
import type { ContentRevision } from '@/lib/types/content/index';

// Define the interface for the revision state
interface RevisionState {
  revisions: ContentRevision[];
  selectedRevision: ContentRevision | null;
  compareRevision: ContentRevision | null;
  diffMode: 'split' | 'unified';
  selectedVersions: { left: number; right: number };
}

// Extend the state with actions
interface RevisionStore extends RevisionState {
  setRevisions: (revisions: ContentRevision[]) => void;
  setSelectedRevision: (revision: ContentRevision | null) => void;
  setCompareRevision: (revision: ContentRevision | null) => void;
  setDiffMode: (mode: 'split' | 'unified') => void;
  setSelectedVersions: (versions: { left: number; right: number }) => void;
}

export const useRevisionStore = create<RevisionStore>((set) => ({
  revisions: [],
  selectedRevision: null,
  compareRevision: null,
  diffMode: 'split',
  selectedVersions: {
    left: 1,
    right: 1
  },
  setRevisions: (revisions) => set({ revisions }),
  setSelectedRevision: (revision) => set({ selectedRevision: revision }),
  setCompareRevision: (revision) => set({ compareRevision: revision }),
  setDiffMode: (mode) => set({ diffMode: mode }),
  setSelectedVersions: (versions) => set({ selectedVersions: versions }),
}));
