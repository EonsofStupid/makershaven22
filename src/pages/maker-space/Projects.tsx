import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export const MakerSpaceProjects = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-6">Maker Space Projects</h1>
      <Card className="p-6 bg-gray-800/50 border border-white/10">
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        <p className="text-gray-400">No projects available</p>
      </Card>
    </motion.div>
  );
};

export default MakerSpaceProjects;