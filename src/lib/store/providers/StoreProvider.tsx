import { type ReactNode } from 'react';
import { useAuthStore } from '../auth-store';
import { useThemeStore } from '../theme-store';
import { useRedisStore } from '../redis-store';
import { useWorkflowStore } from '../workflow-store';
import { useContentStore } from '../content-store';

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  // Initialize stores
  useAuthStore.getState();
  useThemeStore.getState();
  useRedisStore.getState();
  useWorkflowStore.getState();
  useContentStore.getState();

  return children;
};