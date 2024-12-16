import { create } from 'zustand';
import type { ContentRevision } from '@/integrations/supabase/types/content';

interface RevisionState {
  selectedVersions: { left: number; right: number };
  revisions: ContentRevision[];
  rollbackVersion: number | null;
  showRollbackConfirm: boolean;
  setSelectedVersions: (versions: { left: number; right: number }) => void;
  setRevisions: (revisions: ContentRevision[]) => void;
  setRollbackVersion: (version: number | null) => void;
  setShowRollbackConfirm: (show: boolean) => void;
}

export const useRevisionStore = create<RevisionState>((set) => ({
  selectedVersions: { left: 1, right: 1 },
  revisions: [],
  rollbackVersion: null,
  showRollbackConfirm: false,
  setSelectedVersions: (versions) => set({ selectedVersions: versions }),
  setRevisions: (revisions) => set({ revisions }),
  setRollbackVersion: (version) => set({ rollbackVersion: version }),
  setShowRollbackConfirm: (show) => set({ showRollbackConfirm: show }),
}));