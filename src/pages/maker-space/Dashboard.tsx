import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export const MakerSpaceDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-6">Maker Space Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 bg-gray-800/50 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
          <p className="text-gray-400">No projects yet</p>
        </Card>
        
        <Card className="p-6 bg-gray-800/50 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Activity</h2>
          <p className="text-gray-400">No recent activity</p>
        </Card>
        
        <Card className="p-6 bg-gray-800/50 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <p className="text-gray-400">No actions available</p>
        </Card>
      </div>
    </motion.div>
  );
};

export default MakerSpaceDashboard;