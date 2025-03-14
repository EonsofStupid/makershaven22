import React from "react";
import { AdminNav } from "@/components/admin/dashboard/AdminNav";

const CategoriesManagement = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-20 p-8">
      <AdminNav />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Categories Management</h1>
        <div className="grid gap-6">
          {/* Category management content will go here */}
          <div className="bg-gray-800/50 border border-white/10 rounded-lg p-6">
            <p className="text-white/60">Category management interface coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesManagement;