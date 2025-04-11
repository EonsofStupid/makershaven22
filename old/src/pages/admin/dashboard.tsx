
import React, { useState } from 'react';
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { AdminSidebar } from "@/components/admin/dashboard/sidebar/AdminSidebar";
import { AdminSidebarProvider } from "@/components/admin/dashboard/sidebar/AdminSidebarContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { FileText, GitBranch, History } from "lucide-react";
import { Navigation } from '@/components/shared/ui/Navigation';

export function Dashboard() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <AdminSidebarProvider>
      <div 
        className="min-h-screen relative overflow-hidden flex flex-col w-full"
        onMouseMove={handleMouseMove}
      >
        <Navigation />
        
        {/* Background layers */}
        <div className="fixed inset-0 bg-[#151A24] z-0" />
        <div 
          className="fixed inset-0 bg-gradient-to-b from-[#41f0db]/20 via-[#ff0abe]/20 to-transparent z-0"
          style={{
            backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`
          }}
        />
        <div className="fixed inset-0 opacity-30 z-0" 
             style={{ backgroundImage: 'url(/cyber-grid.svg)' }} />
        <div className="fixed inset-0 opacity-[0.03] z-0" 
             style={{ backgroundImage: 'url(/scratch-overlay.svg)' }} />

        {/* Admin Layout */}
        <div className="flex-1 flex">
          {/* Sidebar */}
          <AdminSidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Top Navigation */}
            <AdminNav />
            
            {/* Main Content */}
            <main className="flex-1 p-8 mt-[3.7rem] ml-[var(--sidebar-width)] relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="bg-[#151A24]/50 backdrop-blur-xl border-[#41f0db]/10">
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="w-full bg-[#151A24]/50 border-b border-[#41f0db]/10 p-1">
                      <TabsTrigger 
                        value="content" 
                        className="data-[state=active]:bg-[#41f0db]/10 data-[state=active]:text-[#41f0db]"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Content
                      </TabsTrigger>
                      <TabsTrigger 
                        value="workflows" 
                        className="data-[state=active]:bg-[#41f0db]/10 data-[state=active]:text-[#41f0db]"
                      >
                        <GitBranch className="w-4 h-4 mr-2" />
                        Workflows
                      </TabsTrigger>
                      <TabsTrigger 
                        value="history" 
                        className="data-[state=active]:bg-[#41f0db]/10 data-[state=active]:text-[#41f0db]"
                      >
                        <History className="w-4 h-4 mr-2" />
                        History
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="p-6">
                      <h2 className="text-xl font-bold mb-4">Content Management</h2>
                      <p className="text-white/60">
                        Manage your site content, blogs, and pages from here.
                      </p>
                    </TabsContent>

                    <TabsContent value="workflows" className="p-6">
                      <h2 className="text-xl font-bold mb-4">Workflow Management</h2>
                      <p className="text-white/60">
                        Configure and monitor content workflows.
                      </p>
                    </TabsContent>

                    <TabsContent value="history" className="p-6">
                      <div className="text-white/60 text-center py-8">
                        <h2 className="text-xl font-bold mb-4">Revision History</h2>
                        <p>View and restore previous content versions</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </motion.div>
            </main>
          </div>
        </div>
      </div>
    </AdminSidebarProvider>
  );
}

export default Dashboard;
