import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { create } from 'zustand';

interface AdminSidebarState {
  isOpen: boolean;
  isExpanded: boolean;
  activeTab: string | null;
  shortcuts: string[];
  setIsOpen: (isOpen: boolean) => void;
  setIsExpanded: (isExpanded: boolean) => void;
  setActiveTab: (tab: string | null) => void;
  addShortcut: (id: string) => Promise<void>;
  removeShortcut: (id: string) => Promise<void>;
}

const useAdminSidebarStore = create<AdminSidebarState>((set, get) => ({
  isOpen: false,
  isExpanded: true,
  activeTab: null,
  shortcuts: [],
  setIsOpen: (isOpen) => set({ isOpen }),
  setIsExpanded: (isExpanded) => set({ isExpanded }),
  setActiveTab: (activeTab) => set({ activeTab }),
  addShortcut: async (id) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('admin_toolbar_shortcuts')
      .insert({
        user_id: user.id,
        item_id: id,
        position: get().shortcuts.length
      });

    if (error) {
      console.error('Error saving shortcut:', error);
      toast.error('Failed to save shortcut');
      return;
    }

    set({ shortcuts: [...get().shortcuts, id] });
  },
  removeShortcut: async (id) => {
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

    set({ shortcuts: get().shortcuts.filter(s => s !== id) });
  }
}));

export const useAdminSidebar = useAdminSidebarStore;