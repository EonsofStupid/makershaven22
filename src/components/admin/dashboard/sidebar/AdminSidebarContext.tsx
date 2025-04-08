
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface AdminSidebarContextType {
  isOpen: boolean;
  isExpanded: boolean;
  activeTab: string;
  shortcuts: string[];
  setIsOpen: (value: boolean) => void;
  setIsExpanded: (value: boolean) => void;
  setActiveTab: (tab: string) => void;
  addShortcut: (id: string) => void;
  removeShortcut: (id: string) => void;
}

const AdminSidebarContext = createContext<AdminSidebarContextType | undefined>(undefined);

export const AdminSidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [shortcuts, setShortcuts] = useState<string[]>([]);

  // Load shortcuts on mount
  useEffect(() => {
    const loadShortcuts = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // In a production app, fetch shortcuts from a table
        // For now, we'll use default shortcuts
        setShortcuts(['Dashboard', 'Content', 'Users']);
      } catch (error) {
        console.error('Error loading shortcuts:', error);
      }
    };

    loadShortcuts();
  }, []);

  const addShortcut = async (id: string) => {
    if (shortcuts.includes(id)) return;
    
    try {
      // In a production app, save to the database
      setShortcuts([...shortcuts, id]);
      toast.success(`Added ${id} to shortcuts`);
    } catch (error) {
      console.error('Error saving shortcut:', error);
      toast.error('Failed to save shortcut');
    }
  };

  const removeShortcut = async (id: string) => {
    try {
      // In a production app, remove from the database
      setShortcuts(shortcuts.filter(s => s !== id));
      toast.success(`Removed ${id} from shortcuts`);
    } catch (error) {
      console.error('Error removing shortcut:', error);
      toast.error('Failed to remove shortcut');
    }
  };

  return (
    <AdminSidebarContext.Provider value={{ 
      isOpen, 
      isExpanded,
      activeTab,
      setIsOpen, 
      setIsExpanded,
      setActiveTab,
      shortcuts, 
      addShortcut, 
      removeShortcut 
    }}>
      {children}
    </AdminSidebarContext.Provider>
  );
};

export const useAdminSidebar = () => {
  const context = useContext(AdminSidebarContext);
  if (context === undefined) {
    throw new Error('useAdminSidebar must be used within an AdminSidebarProvider');
  }
  return context;
};
