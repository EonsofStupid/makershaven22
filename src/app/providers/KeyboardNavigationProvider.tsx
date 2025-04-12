
import React from 'react';

// TODO: Update this import once the hook is migrated
const useKeyboardNavigation = () => {
  // Placeholder implementation
  return null;
};

interface KeyboardNavigationProviderProps {
  children: React.ReactNode;
}

export function KeyboardNavigationProvider({ children }: KeyboardNavigationProviderProps) {
  // Initialize keyboard navigation
  useKeyboardNavigation();
  
  return <>{children}</>;
}
