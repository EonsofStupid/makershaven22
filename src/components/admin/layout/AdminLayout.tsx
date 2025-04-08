
import React from 'react';
import { AdminSidebarProvider } from '../dashboard/sidebar/AdminSidebarContext';
import { AdminSidebar } from '../dashboard/sidebar/AdminSidebar';
import { AdminNav } from '../dashboard/AdminNav';
import { Navigation } from '@/components/shared/ui/Navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <AdminSidebarProvider>
      <div className="min-h-screen flex flex-col w-full relative overflow-hidden">
        {/* Background layers */}
        <div className="fixed inset-0 bg-[#151A24] z-0" />
        <div className="fixed inset-0 bg-gradient-to-b from-[#41f0db]/20 via-[#ff0abe]/20 to-transparent z-0" />
        <div className="fixed inset-0 opacity-30 z-0" style={{ backgroundImage: 'url(/cyber-grid.svg)' }} />
        <div className="fixed inset-0 opacity-[0.03] z-0" style={{ backgroundImage: 'url(/scratch-overlay.svg)' }} />
        
        <Navigation />
        
        <div className="flex flex-1">
          <AdminSidebar />
          
          <div className="flex-1 flex flex-col">
            <AdminNav />
            
            <main className="flex-1 p-8 mt-[3.7rem] ml-[var(--sidebar-width)] relative z-10">
              {children}
            </main>
          </div>
        </div>
      </div>
    </AdminSidebarProvider>
  );
};

export default AdminLayout;
