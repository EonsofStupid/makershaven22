
import { useEffect } from 'react';
import { toast } from '@/lib/toast';

export const useKeyboardNavigation = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+K to focus on the most recent toast
      if (e.altKey && e.key === 'k') {
        const toasts = document.querySelectorAll('[role="status"]');
        if (toasts.length) {
          (toasts[0] as HTMLElement).focus();
        }
      }
      
      // Escape to dismiss all toasts when focus is on a toast
      if (e.key === 'Escape' && document.activeElement?.getAttribute('role') === 'status') {
        toast.dismissAll();
      }

      // Tab navigation within toasts
      if (e.key === 'Tab' && document.activeElement?.getAttribute('role') === 'status') {
        const activeToast = document.activeElement;
        const focusableElements = activeToast.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
          // If Shift+Tab is pressed, move focus backward
          if (e.shiftKey) {
            if (document.activeElement === focusableElements[0]) {
              (focusableElements[focusableElements.length - 1] as HTMLElement).focus();
              e.preventDefault();
            }
          } 
          // If Tab is pressed, move focus forward
          else {
            if (document.activeElement === focusableElements[focusableElements.length - 1]) {
              (focusableElements[0] as HTMLElement).focus();
              e.preventDefault();
            }
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
};
