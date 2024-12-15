export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export type ErrorState = {
  message: string;
  code?: string;
  details?: Record<string, any>;
};

export type LoadingState = {
  isLoading: boolean;
  message?: string;
};

export type ValidationError = {
  field: string;
  message: string;
  code?: string;
};

export type ApiResponse<T = any> = {
  data?: T;
  error?: ErrorState;
  status: number;
  timestamp: string;
};

export type PaginationParams = {
  page: number;
  limit: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};