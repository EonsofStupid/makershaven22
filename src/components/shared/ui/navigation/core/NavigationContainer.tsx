import { motion } from "framer-motion";
import { useNavigationStore } from "../NavigationState";
import { ReactNode, useEffect, useState } from "react";

interface NavigationContainerProps {
  children: ReactNode;
}

export const NavigationContainer = ({ children }: NavigationContainerProps) => {
  const { isScrolled } = useNavigationStore();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 }); // Default position

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-[100] h-[3.7rem]"
    >
      <div 
        className="absolute inset-0 backdrop-blur-xl transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, 
            rgba(77, 0, 179, ${isScrolled ? '0.3' : '0.2'}), 
            rgba(114, 34, 140, ${isScrolled ? '0.3' : '0.2'}), 
            rgba(176, 230, 83, ${isScrolled ? '0.3' : '0.2'})
          )`,
          borderBottom: '1px solid rgba(65, 240, 219, 0.2)'
        }}
      />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 relative z-10">
          {children}
        </div>
      </div>

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            circle at ${mousePosition.x}% ${mousePosition.y}%,
            rgba(65, 240, 219, 0.15),
            transparent 25%
          )`
        }}
      />
    </motion.nav>
  );
};