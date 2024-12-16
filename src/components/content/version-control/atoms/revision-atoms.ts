import { create } from 'zustand';
import type { ContentRevision } from '@/integrations/supabase/types/content';

interface SelectedVersions {
  left: number;
  right: number;
}

interface RevisionState {
  selectedVersions: SelectedVersions;
  revisions: ContentRevision[];
  rollbackVersion: number | null;
  showRollbackConfirm: boolean;
  setSelectedVersions: (versions: SelectedVersions) => void;
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

// Selector for getting selected revisions
export const getSelectedRevisions = (state: RevisionState) => {
  const { revisions, selectedVersions } = state;
  return {
    left: revisions.find(r => r.version_number === selectedVersions.left),
    right: revisions.find(r => r.version_number === selectedVersions.right)
  };
};