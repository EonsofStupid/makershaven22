import { Navigation } from "./shared/ui/navigation/Navigation";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <motion.div 
      className="min-h-screen bg-[#151A24]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navigation />
      <main className="pt-16 min-h-screen">
        {children}
      </main>
    </motion.div>
  );
};

export default Layout;