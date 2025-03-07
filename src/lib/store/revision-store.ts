
import { create } from 'zustand';
import { ContentRevision } from '@/lib/types/content/types';

export interface RevisionState {
  revisions: ContentRevision[];
  selectedRevision: ContentRevision | null;
  compareRevision: ContentRevision | null;
  diffMode: 'unified' | 'split';
  selectedVersions: [number | null, number | null];
  isLoading: boolean;
  error: Error | null;
  
  setRevisions: (revisions: ContentRevision[]) => void;
  setSelectedRevision: (revision: ContentRevision | null) => void;
  setCompareRevision: (revision: ContentRevision | null) => void;
  setDiffMode: (mode: 'unified' | 'split') => void;
  setSelectedVersions: (versions: [number | null, number | null]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export const useRevisionStore = create<RevisionState>((set) => ({
  revisions: [],
  selectedRevision: null,
  compareRevision: null,
  diffMode: 'unified',
  selectedVersions: [null, null],
  isLoading: false,
  error: null,
  
  setRevisions: (revisions) => set({ revisions }),
  setSelectedRevision: (revision) => set({ selectedRevision: revision }),
  setCompareRevision: (revision) => set({ compareRevision: revision }),
  setDiffMode: (mode) => set({ diffMode: mode }),
  setSelectedVersions: (versions) => set({ selectedVersions: versions }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error: error as Error }),
}));
