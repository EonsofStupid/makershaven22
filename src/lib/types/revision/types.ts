export interface RevisionState {
  revisions: any[];
  selectedRevision: string | null;
  compareRevision: string | null;
  diffMode: 'split' | 'unified';
  selectedVersions: string[];
}