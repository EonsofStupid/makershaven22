import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { ContentType } from "@/lib/types/core/content-types";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/lovable-uploads/293dada8-67ab-4da3-8f66-2f83623340b5.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#151A24]/80 via-[#151A24]/50 to-[#151A24]" />
        </div>

        {/* Hero Content */}
        <motion.div 
          className="container relative z-10 px-6 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-center">
            <span className="neon-text-cyan">Build</span>{" "}
            <span className="neon-text-pink">Your Vision</span>
          </h1>
          <p className="text-xl md:text-2xl text-center text-gray-300 max-w-3xl mx-auto">
            Join our community of makers and bring your ideas to life
          </p>
        </motion.div>

        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </section>

      {/* Feature Cards Section */}
      <section className="relative py-20 bg-[#151A24]">
        <div className="container px-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Card 1 */}
            <Card className="p-6 bg-glass-card hover:bg-glass-hover transition-all duration-300 border-neon-cyan/20 group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-4"
              >
                <div className="h-12 w-12 rounded-lg bg-neon-cyan/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl neon-text-cyan">🛠️</span>
                </div>
                <h3 className="text-xl font-bold neon-text-cyan">Design Tools</h3>
                <p className="text-gray-300">Advanced tools for creating and customizing your 3D printer builds</p>
              </motion.div>
            </Card>

            {/* Card 2 */}
            <Card className="p-6 bg-glass-card hover:bg-glass-hover transition-all duration-300 border-neon-pink/20 group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-4"
              >
                <div className="h-12 w-12 rounded-lg bg-neon-pink/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl neon-text-pink">🤝</span>
                </div>
                <h3 className="text-xl font-bold neon-text-pink">Community</h3>
                <p className="text-gray-300">Connect with fellow makers and share your experiences</p>
              </motion.div>
            </Card>

            {/* Card 3 */}
            <Card className="p-6 bg-glass-card hover:bg-glass-hover transition-all duration-300 border-neon-purple/20 group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-4"
              >
                <div className="h-12 w-12 rounded-lg bg-neon-purple/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl neon-text-purple">📚</span>
                </div>
                <h3 className="text-xl font-bold neon-text-purple">Resources</h3>
                <p className="text-gray-300">Comprehensive guides and documentation for your builds</p>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;