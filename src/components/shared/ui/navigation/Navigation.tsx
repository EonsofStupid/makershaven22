import { useState } from "react";
import { useAuth } from "@/lib/store/auth/use-auth";
import { NavigationContainer } from "./core/NavigationContainer";
import { NavigationSection } from "./core/NavigationSection";
import { Logo } from "./Logo";
import { UnifiedNavigation } from "./UnifiedNavigation";
import { SearchButton } from "./SearchButton";
import { SearchDialog } from "./SearchDialog";
import { UserAvatar } from "../avatar/UserAvatar";
import { UserMenu } from "./UserMenu";
import { MobileNav } from "./mobile/MobileNav";

export const Navigation = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <NavigationSection>
        <Logo />
      </NavigationSection>

      <NavigationSection className="hidden md:flex">
        <UnifiedNavigation />
      </NavigationSection>

      <NavigationSection className="space-x-4">
        <SearchButton onClick={() => setSearchOpen(true)} />
  
        {isAuthenticated && (
          <div className="hidden md:block relative z-[60]">
            <UserAvatar
              size="lg"
              className="transform translate-y-2"
              onClick={() => setShowUserMenu(!showUserMenu)}
            />
            {showUserMenu && <UserMenu onClose={() => setShowUserMenu(false)} />}
          </div>
        )}
  
        <MobileNav />
      </NavigationSection>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </NavigationContainer>
  );
};