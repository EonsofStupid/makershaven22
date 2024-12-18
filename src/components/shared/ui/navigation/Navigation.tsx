import { useState } from "react";
import { NavigationContainer } from "./core/NavigationContainer";
import { NavigationSection } from "./core/NavigationSection";
import { Logo } from "./Logo";
import { NavigationLinks } from "./NavigationLinks";
import { MegaMenu } from "./MegaMenu";
import { SearchButton } from "./SearchButton";
import { SearchDialog } from "./SearchDialog";
import { UserAvatar } from "../avatar/UserAvatar";
import { UserMenu } from "./UserMenu";
import { MobileNav } from "./mobile/MobileNav";

export const Navigation = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16">
      {/* Glass background with gradient */}
      <div className="absolute inset-0 bg-[#151A24]/80 backdrop-blur-xl border-b border-[#41f0db]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#41f0db]/5 via-transparent to-[#ff0abe]/5" />
      
      {/* Navigation content */}
      <div className="container relative z-10 h-full mx-auto px-4">
        <div className="flex items-center justify-between h-full">
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
                className="transform translate-y-2"
                onClick={() => setShowUserMenu(!showUserMenu)}
              />
              {showUserMenu && <UserMenu onClose={() => setShowUserMenu(false)} />}
            </div>
    
            <MobileNav />
          </NavigationSection>
        </div>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </nav>
  );
};