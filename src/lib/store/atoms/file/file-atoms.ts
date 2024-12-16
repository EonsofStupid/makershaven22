import { atom } from 'jotai';

export interface FileUploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export interface FileMetadata {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: Date;
}

// Base atoms
export const fileUploadStateAtom = atom<FileUploadState>({
  isUploading: false,
  progress: 0,
  error: null
});

export const uploadedFilesAtom = atom<FileMetadata[]>([]);

// Derived atoms
export const hasUploadErrorAtom = atom(
  (get) => get(fileUploadStateAtom).error !== null
);

export const isUploadingAtom = atom(
  (get) => get(fileUploadStateAtom).isUploading
);

// Action atoms
export const setFileUploadStateAtom = atom(
  null,
  (get, set, update: Partial<FileUploadState>) => {
    set(fileUploadStateAtom, {
      ...get(fileUploadStateAtom),
      ...update
    });
  }
);

export const addUploadedFileAtom = atom(
  null,
  (get, set, file: FileMetadata) => {
    set(uploadedFilesAtom, [...get(uploadedFilesAtom), file]);
  }
);

export const clearUploadStateAtom = atom(
  null,
  (_get, set) => {
    set(fileUploadStateAtom, {
      isUploading: false,
      progress: 0,
      error: null
    });
  }
);