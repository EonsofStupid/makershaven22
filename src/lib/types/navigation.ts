import type { Json } from '@/integrations/supabase/types';

export interface NavigationSettings {
  id: string;
  user_id?: string;
  menu_type: string;
  settings: Json;
  created_at?: string;
  updated_at?: string;
}

export interface NavigationState {
  settings: NavigationSettings | null;
  isLoading: boolean;
  error: Error | null;
}

export interface NavigationStore extends NavigationState {
  setSettings: (settings: NavigationSettings | null) => void;
  updateSettings: (updates: Partial<NavigationSettings>) => void;
  setError: (error: Error | null) => void;
}