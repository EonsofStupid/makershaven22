import { motion } from "framer-motion";
import { Database, Box, Users, TrendingUp, BookOpen } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";

const LandingPage = () => {
  const { user } = useAuthStore();
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#151A24]">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#41f0db]/10 via-[#ff0abe]/10 to-[#8000ff]/10" />
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-6 pt-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="neon-text-cyan">Build</span>{" "}
              <span className="neon-text-pink">Your Vision</span>
            </h1>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Join our community of makers and bring your ideas to life
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={Database}
              title="Latest Builds"
              description="Explore our comprehensive database of 3D printer builds."
              link={user ? "/maker-space/builds" : "/auth/login"}
              gradient="from-[#41f0db]/20 to-[#8000ff]/20"
            />
            <FeatureCard
              icon={Box}
              title="Parts Catalog"
              description="Find compatible parts and upgrades for your 3D printer."
              link={user ? "/maker-space/parts" : "/auth/login"}
              gradient="from-[#ff0abe]/20 to-[#41f0db]/20"
            />
            <FeatureCard
              icon={BookOpen}
              title="Community Guides"
              description="Learn from expert makers with our comprehensive guides."
              link={user ? "/maker-space/guides" : "/auth/login"}
              gradient="from-[#8000ff]/20 to-[#41f0db]/20"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, link, gradient }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${gradient} p-1`}
    >
      <a 
        href={link}
        className="block h-full"
      >
        <div className="glass p-6 h-full rounded-lg backdrop-blur-xl border border-white/10 hover:border-neon-cyan/30 transition-all duration-300">
          <Icon className="w-12 h-12 mb-4 text-[#41f0db]" />
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/80">{description}</p>
        </div>
      </a>
    </motion.div>
  );
};

export default LandingPage;