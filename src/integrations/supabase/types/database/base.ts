export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

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