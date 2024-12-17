export interface StorageFile {
  name: string;
  bucket: string;
  owner: string;
  created_at: string;
  updated_at: string;
  last_accessed_at: string;
  metadata: Record<string, any>;
  bucketId: string;
  size: number;
  mimetype: string;
}

export interface UploadOptions {
  cacheControl?: string;
  contentType?: string;
  upsert?: boolean;
}

export interface StorageError {
  message: string;
  statusCode: number;
}