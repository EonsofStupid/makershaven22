
import React from 'react';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

interface KeyboardNavigationProviderProps {
  children: React.ReactNode;
}

export function KeyboardNavigationProvider({ children }: KeyboardNavigationProviderProps) {
  // Initialize keyboard navigation
  useKeyboardNavigation();
  
  return <>{children}</>;
}
