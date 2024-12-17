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
      <div className="min-h-screen">
        {children}
      </div>
    </motion.div>
  );
};

export default Layout;