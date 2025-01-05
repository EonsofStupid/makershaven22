export interface RevisionState {
  revisions: any[];
  selectedRevision: string | null;
  compareRevision: string | null;
  diffMode: 'split' | 'unified';
  selectedVersions: string[];
}

export interface RevisionStore extends RevisionState {
  setRevisions: (revisions: any[]) => void;
  setSelectedRevision: (id: string | null) => void;
  setCompareRevision: (id: string | null) => void;
  setDiffMode: (mode: 'split' | 'unified') => void;
  setSelectedVersions: (versions: string[]) => void;
}