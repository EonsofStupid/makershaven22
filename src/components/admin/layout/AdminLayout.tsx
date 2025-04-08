
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
      <div className="min-h-screen flex flex-col w-full">
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
