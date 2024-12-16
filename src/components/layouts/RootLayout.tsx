import React, { useEffect } from 'react';
import { Navigation } from '../shared/ui/Navigation';
import { Toaster } from '@/components/ui/sonner';
import { useTheme } from '@/components/theme/ThemeContext';
import { motion } from 'framer-motion';
import { useNavigationState } from '@/hooks/useNavigationState';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const { settings } = useNavigationState();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    console.log('RootLayout mounted, settings:', settings);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      console.log('RootLayout unmounted');
    };
  }, [settings]);

  return (
    <motion.div 
      className="min-h-screen bg-background"
      style={{
        '--transition-duration': theme?.settings?.transition_duration || '0.3s',
        '--backdrop-blur': theme?.settings?.backdrop_blur || '0px'
      } as React.CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: parseFloat(theme?.settings?.transition_duration || '0.3'),
      }}
    >
      <Navigation />
      <main className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: parseFloat(theme?.settings?.transition_duration || '0.3'),
            delay: 0.1 
          }}
        >
          {children}
        </motion.div>
      </main>
      <Toaster />
    </motion.div>
  );
};