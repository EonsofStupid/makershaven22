import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  sidebarOpenAtom, 
  sidebarExpandedAtom, 
  sidebarActiveTabAtom, 
  sidebarShortcutsAtom 
} from '@/lib/store/atoms/sidebar';
import type { AdminToolbarShortcut } from '@/integrations/supabase/types/tables/admin';

interface AdminSidebarProviderProps {
  children: React.ReactNode;
}

export const AdminSidebarProvider = ({ children }: AdminSidebarProviderProps) => {
  const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom);
  const [isExpanded, setIsExpanded] = useAtom(sidebarExpandedAtom);
  const [activeTab, setActiveTab] = useAtom(sidebarActiveTabAtom);
  const [shortcuts, setShortcuts] = useAtom(sidebarShortcutsAtom);

  useEffect(() => {
    const loadShortcuts = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('admin_toolbar_shortcuts')
        .select('*')
        .eq('user_id', user.id)
        .order('position');

      if (error) {
        console.error('Error loading shortcuts:', error);
        return;
      }

      setShortcuts(data.map(s => s.item_id));
    };

    loadShortcuts();
  }, [setShortcuts]);

  const addShortcut = async (id: string) => {
    if (shortcuts.includes(id)) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('admin_toolbar_shortcuts')
      .insert({
        user_id: user.id,
        item_id: id,
        position: shortcuts.length
      });

    if (error) {
      console.error('Error saving shortcut:', error);
      toast.error('Failed to save shortcut');
      return;
    }

    setShortcuts([...shortcuts, id]);
  };

  const removeShortcut = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('admin_toolbar_shortcuts')
      .delete()
      .eq('user_id', user.id)
      .eq('item_id', id);

    if (error) {
      console.error('Error removing shortcut:', error);
      toast.error('Failed to remove shortcut');
      return;
    }

    setShortcuts(shortcuts.filter(s => s !== id));
  };

  const contextValue = {
    isOpen,
    isExpanded,
    activeTab,
    shortcuts,
    setIsOpen,
    setIsExpanded,
    setActiveTab,
    addShortcut,
    removeShortcut
  };

  return (
    <AdminSidebarContext.Provider value={contextValue}>
      {children}
    </AdminSidebarContext.Provider>
  );
};

const AdminSidebarContext = React.createContext<any>(undefined);

export const useAdminSidebar = () => {
  const context = React.useContext(AdminSidebarContext);
  if (context === undefined) {
    throw new Error('useAdminSidebar must be used within an AdminSidebarProvider');
  }
  return context;
};