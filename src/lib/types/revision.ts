import { ContentRevision } from './content';

export interface RevisionStore {
  revisions: ContentRevision[];
  selectedRevision: ContentRevision | null;
  compareRevision: ContentRevision | null;
  diffMode: 'split' | 'unified';
  selectedVersions: {
    left: number;
    right: number;
  };
  setRevisions: (revisions: ContentRevision[]) => void;
  setSelectedRevision: (revision: ContentRevision | null) => void;
  setCompareRevision: (revision: ContentRevision | null) => void;
  setDiffMode: (mode: 'split' | 'unified') => void;
  setSelectedVersions: (versions: { left: number; right: number }) => void;
}