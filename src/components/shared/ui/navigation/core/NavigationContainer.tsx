import React from 'react';
import { useTheme } from '@/components/theme/ThemeContext';
import type { ThemeConfig } from '@/lib/types/database/core/enums';

interface NavigationContainerProps {
  children: React.ReactNode;
}

export const NavigationContainer: React.FC<NavigationContainerProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <nav className="w-full bg-background/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        {children}
      </div>
    </nav>
  );
};