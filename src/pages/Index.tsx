import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Hammer, Wrench, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useSyncedAuth } from '@/lib/store/hooks/useSyncedStore';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useSyncedAuth();

  const handleNavigation = (path: string) => {
    if (!user) {
      toast.error("Please sign in to access this feature");
      navigate("/login");
      return;
    }
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#41f0db] to-[#8000ff] text-transparent bg-clip-text">
            Welcome to MakersImpulse
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Your hub for 3D printing innovation. Discover builds, parts, and join our community of makers.
          </p>
        </motion.div>

        {/* Featured Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-6 rounded-xl cursor-pointer"
            onClick={() => handleNavigation('/maker-space/builds')}
          >
            <Hammer className="w-8 h-8 text-[#41f0db] mb-4" />
            <h2 className="text-xl font-semibold mb-2">Latest Builds</h2>
            <p className="text-white/70">Explore the newest community printer builds and modifications.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-6 rounded-xl cursor-pointer"
            onClick={() => handleNavigation('/maker-space/parts')}
          >
            <Wrench className="w-8 h-8 text-[#ff0abe] mb-4" />
            <h2 className="text-xl font-semibold mb-2">Parts Catalog</h2>
            <p className="text-white/70">Find compatible parts and upgrades for your printer.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-6 rounded-xl cursor-pointer"
            onClick={() => handleNavigation('/maker-space/guides')}
          >
            <BookOpen className="w-8 h-8 text-[#8000ff] mb-4" />
            <h2 className="text-xl font-semibold mb-2">Guides</h2>
            <p className="text-white/70">Learn from our comprehensive collection of 3D printing guides.</p>
          </motion.div>
        </div>

        {/* CTA Section */}
        {!user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <Button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-[#41f0db] to-[#8000ff] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Join Our Community
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;