
import { useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useNavigationStore } from "../NavigationState";
import { toast } from 'sonner';

interface NavigationContainerProps {
  children: React.ReactNode;
}

export const NavigationContainer = ({ children }: NavigationContainerProps) => {
  const { isScrolled, setIsScrolled, setMousePosition } = useNavigationStore();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 20;
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled, setIsScrolled]);

  // Handle mouse movement for dynamic effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  // Error boundary handler
  const handleError = () => {
    toast.error("Navigation error occurred", {
      description: "Please refresh the page if issues persist"
    });
  };

  return (
    <div 
      className="container mx-auto"
      onMouseMove={handleMouseMove}
      onError={handleError}
    >
      {children}
    </div>
  );
};
