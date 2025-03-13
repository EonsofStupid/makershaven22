import { create } from 'zustand';
import type { ContentRevision, RevisionState } from '@/components/content/version-control/types/revision';

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