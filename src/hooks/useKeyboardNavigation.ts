
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/lib/toast';

type KeyboardShortcut = {
  key: string;
  altKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  action: () => void;
  description: string;
};

export function useKeyboardNavigation() {
  const navigate = useNavigate();

  useEffect(() => {
    // Define keyboard shortcuts
    const shortcuts: KeyboardShortcut[] = [
      {
        key: 'h',
        altKey: true,
        action: () => navigate('/'),
        description: 'Go to home page'
      },
      {
        key: 'd',
        altKey: true,
        action: () => navigate('/admin/dashboard'),
        description: 'Go to dashboard'
      },
      {
        key: 'p',
        altKey: true,
        action: () => navigate('/profile'),
        description: 'Go to profile'
      },
      {
        key: 's',
        altKey: true,
        action: () => navigate('/admin/settings'),
        description: 'Go to settings'
      },
      {
        key: '/',
        action: () => {
          // Focus on search input if it exists
          const searchInput = document.querySelector('input[type="search"]');
          if (searchInput) {
            (searchInput as HTMLInputElement).focus();
          }
        },
        description: 'Focus search'
      },
      {
        key: 'Escape',
        action: () => {
          // Close any open dialogs or focus on main content
          const dialogs = document.querySelectorAll('[role="dialog"]');
          if (dialogs.length) {
            // Find any close buttons in the dialog
            const closeButton = dialogs[0].querySelector('button[aria-label="Close"]');
            if (closeButton) {
              (closeButton as HTMLButtonElement).click();
            }
          } else {
            // Focus on main content
            const main = document.querySelector('main');
            if (main) {
              (main as HTMLElement).focus();
            }
          }
        },
        description: 'Close dialog or return focus'
      },
      {
        key: '?',
        action: () => {
          // Show help dialog with keyboard shortcuts
          toast.info('Keyboard Shortcuts', {
            description: 'Alt+H: Home, Alt+D: Dashboard, Alt+S: Settings, Alt+P: Profile, /: Search, ESC: Close/Return',
            duration: 8000,
          });
        },
        description: 'Show keyboard shortcuts'
      }
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if the user is typing in an input field
      if (e.target instanceof HTMLInputElement || 
          e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      // Check if the key combination matches any of our shortcuts
      const matchingShortcut = shortcuts.find(shortcut => 
        shortcut.key === e.key &&
        (shortcut.altKey ? e.altKey : !e.altKey) &&
        (shortcut.ctrlKey ? e.ctrlKey : !e.ctrlKey) &&
        (shortcut.shiftKey ? e.shiftKey : !e.shiftKey)
      );
      
      if (matchingShortcut) {
        e.preventDefault();
        matchingShortcut.action();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
  
  // Function to show help with all available shortcuts
  const showKeyboardShortcutsHelp = () => {
    toast.info('Keyboard Shortcuts', {
      description: 'Alt+H: Home, Alt+D: Dashboard, Alt+S: Settings, Alt+P: Profile, /: Search, ESC: Close/Return, ?: Show this help',
      duration: 8000,
    });
  };
  
  return { showKeyboardShortcutsHelp };
}
