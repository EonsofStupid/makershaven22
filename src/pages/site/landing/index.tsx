import { motion, useScroll, useTransform } from "framer-motion";
import { Search, User } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ["0%", "50%"]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#1a1a1a]">
      {/* Dynamic Background */}
      <div className="fixed inset-0 cyber-grid" />
      <div className="fixed inset-0 circuit-overlay" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-[#41f0db]/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-3xl font-bold flex items-center space-x-1">
                <span className="neon-text-cyan relative transform -translate-y-1">
                  Makers
                </span>
                <span className="neon-text-pink relative transform translate-y-1">
                  Impulse
                </span>
              </span>
            </Link>

            <div className="flex items-center space-x-6">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 px-4 py-2 bg-black/20 border border-[#41f0db]/20 rounded-lg text-white 
                           placeholder:text-white/50 focus:outline-none focus:border-[#41f0db]/50
                           group-hover:border-[#41f0db]/50 transition-all duration-300"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#41f0db] opacity-50 
                                 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <button className="p-2 rounded-full bg-black/20 border border-[#41f0db]/20 
                               hover:border-[#41f0db]/50 transition-all duration-300">
                <User className="w-5 h-5 text-[#41f0db]" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div 
        style={{ y: backgroundY }}
        className="relative min-h-screen flex items-center justify-center px-6 py-32"
      >
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-bold"
          >
            <span className="neon-text-cyan">Build</span>{" "}
            <span className="neon-text-pink">Your Dream</span>{" "}
            <span className="neon-text-cyan">Machine</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80"
          >
            Join our community of makers and bring your ideas to life
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {/* CTAs with Images */}
            <Link 
              to="/builds"
              className="group relative w-64 h-48 rounded-xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
                alt="Innovation"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 
                         group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-[#41f0db]">Latest Builds</h3>
                <p className="text-white/80">Explore community creations</p>
              </div>
            </Link>

            <Link 
              to="/guides"
              className="group relative w-64 h-48 rounded-xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
                alt="Robot"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 
                         group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-[#ff0abe]">Build Guides</h3>
                <p className="text-white/80">Step-by-step tutorials</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Visual Database Preview */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative z-10 min-h-screen bg-black/50 backdrop-blur-xl py-32"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="neon-text-cyan">Build</span>{" "}
            <span className="neon-text-pink">Database</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-black/40 border border-[#41f0db]/20 rounded-xl p-6 hover:border-[#41f0db]/50 
                         transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-r from-[#41f0db]/20 to-[#8000ff]/20 rounded-lg mb-4" />
                <div className="h-4 w-2/3 bg-white/20 rounded mb-2" />
                <div className="h-4 w-1/2 bg-white/10 rounded" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;