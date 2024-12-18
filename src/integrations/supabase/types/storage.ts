export interface StorageFile {
  name: string;
  bucket: string;
  path: string;
  size: number;
  type: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface StorageBucket {
  id: string;
  name: string;
  public: boolean;
  created_at: string;
  updated_at: string;
}

export interface StorageError {
  message: string;
  statusCode: number;
}