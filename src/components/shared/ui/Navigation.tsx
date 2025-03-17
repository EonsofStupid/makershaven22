
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NavigationContainer } from "./navigation/core/NavigationContainer";
import { NavigationSection } from "./navigation/core/NavigationSection";
import { Logo } from "./navigation/Logo";
import { NavigationLinks } from "./navigation/NavigationLinks";
import { MegaMenu } from "./navigation/MegaMenu";
import { SearchButton } from "./navigation/SearchButton";
import { SearchDialog } from "./navigation/SearchDialog";
import { UserAvatar } from "./avatar/UserAvatar";
import { UserMenu } from "./navigation/UserMenu";
import { MobileNav } from "./navigation/mobile/MobileNav";
import { useNavigationStore } from "./navigation/NavigationState";
import { useTheme } from '@/components/theme/ThemeContext';
import { motion } from 'framer-motion';

export const Navigation = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isScrolled, mousePosition } = useNavigationStore();
  const { theme } = useTheme();

  const neonCyan = theme?.neon_cyan || '#41f0db';
  const neonPink = theme?.neon_pink || '#ff0abe';
  const neonPurple = theme?.neon_purple || '#8000ff';

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] h-[3.7rem]",
        "before:content-[''] before:absolute before:inset-0 before:bg-cyber-texture before:opacity-10",
        "after:content-[''] after:absolute before:inset-0 after:bg-scratch-overlay after:opacity-[0.03]",
        isScrolled && "shadow-lg shadow-black/20 backdrop-blur-xl"
      )}
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(77, 0, 179, ${isScrolled ? '0.3' : '0.2'}), 
            rgba(114, 34, 140, ${isScrolled ? '0.3' : '0.2'}), 
            rgba(176, 230, 83, ${isScrolled ? '0.3' : '0.2'})
          ),
          radial-gradient(
            circle at ${mousePosition.x}% ${mousePosition.y}%, 
            ${neonCyan}25,
            ${neonPink}25,
            ${neonPurple}25
          )
        `,
        backdropFilter: isScrolled ? 'blur(16px)' : 'blur(12px)',
        borderBottom: `1px solid ${neonPurple}50`,
        transition: `all ${theme?.transition_duration || '0.3s'} ease-in-out`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <NavigationSection>
            <Logo />
          </NavigationSection>

          <NavigationSection className="hidden md:flex space-x-6">
            <NavigationLinks />
            <MegaMenu />
          </NavigationSection>

          <NavigationSection className="space-x-4">
            <SearchButton onClick={() => setSearchOpen(true)} />
      
            <div className="hidden md:block relative z-[60]">
              <UserAvatar
                size="lg"
                className="transform translate-y-0 hover:scale-110 transition-all duration-300"
                onClick={() => setShowUserMenu(!showUserMenu)}
              />
              {showUserMenu && <UserMenu onClose={() => setShowUserMenu(false)} />}
            </div>
      
            <MobileNav />
          </NavigationSection>
        </div>
      </div>

      {/* Dynamic glow effect based on mouse position */}
      <div 
        className="absolute inset-0 pointer-events-none z-[-1]"
        style={{
          background: `radial-gradient(
            circle at ${mousePosition.x}% ${mousePosition.y}%,
            ${neonCyan}15,
            transparent 25%
          )`,
        }}
      />

      {/* Additional cyberpunk accent line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[1px] opacity-50"
        style={{
          background: `linear-gradient(90deg, 
            transparent,
            ${neonCyan},
            ${neonPink},
            ${neonPurple},
            transparent
          )`
        }}
      />

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </motion.nav>
  );
};
