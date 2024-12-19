import type { Json } from './json';

export type TableDefinition<RowType extends { id: string }> = {
  Row: Readonly<RowType>;
  Insert: Partial<RowType> & Required<Pick<RowType, "id">>;
  Update: Partial<RowType>;
  Relationships: Array<{
    foreignKeyName: string;
    columns: Array<keyof RowType>;
    referencedRelation: string;
    referencedColumns: Array<keyof RowType>;
  }>;
};

export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuditableEntity extends BaseEntity {
  created_by?: string;
  updated_by?: string;
}

export interface MetadataEntity extends BaseEntity {
  metadata?: Json;
}