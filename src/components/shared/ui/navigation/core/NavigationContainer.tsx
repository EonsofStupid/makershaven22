import { useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useNavigationStore } from "../NavigationState";
import { useTheme } from '@/components/theme/ThemeContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface NavigationContainerProps {
  children: React.ReactNode;
}

export const NavigationContainer = ({ children }: NavigationContainerProps) => {
  const { isScrolled, mousePosition, setIsScrolled, setMousePosition } = useNavigationStore();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 20;
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
        console.log('Navigation scroll state changed:', shouldBeScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled, setIsScrolled]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (Math.abs(x - mousePosition.x) > 1 || Math.abs(y - mousePosition.y) > 1) {
      setMousePosition({ x, y });
    }
  };

  const handleError = () => {
    toast.error("Navigation error occurred", {
      description: "Please refresh the page if issues persist"
    });
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] h-[4.2rem]",
        "before:content-[''] before:absolute before:inset-0 before:bg-cyber-texture before:opacity-10",
        "after:content-[''] after:absolute before:inset-0 after:bg-scratch-overlay after:opacity-[0.05]",
        isScrolled && "shadow-lg shadow-black/20 backdrop-blur-xl"
      )}
      onMouseMove={handleMouseMove}
      onError={handleError}
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(77, 0, 179, ${isScrolled ? '0.3' : '0.2'}), 
            rgba(114, 34, 140, ${isScrolled ? '0.3' : '0.2'}), 
            rgba(176, 230, 83, ${isScrolled ? '0.3' : '0.2'})
          ),
          radial-gradient(
            circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(65, 240, 219, 0.25),
            rgba(255, 10, 190, 0.25),
            rgba(128, 0, 255, 0.25)
          )
        `,
        backdropFilter: isScrolled ? 'blur(16px)' : 'blur(12px)',
        borderBottom: '1px solid rgba(128, 0, 255, 0.5)',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[4.2rem]">
          {children}
        </div>
      </div>

      <div 
        className="absolute inset-0 pointer-events-none z-[-1]"
        style={{
          background: `radial-gradient(
            circle at ${mousePosition.x}% ${mousePosition.y}%,
            rgba(65, 240, 219, 0.15),
            transparent 25%
          )`,
        }}
      />

      <div 
        className="absolute bottom-0 left-0 right-0 h-[1px] opacity-50"
        style={{
          background: 'linear-gradient(90deg, transparent, #41f0db, #ff0abe, #8000ff, transparent)'
        }}
      />
    </motion.nav>
  );
};