import { useState } from "react";
import { useSyncedAuth } from "@/lib/store/hooks/useSyncedStore";
import { NavigationContainer } from "./navigation/core/NavigationContainer";
import { NavigationSection } from "./navigation/core/NavigationSection";
import { Logo } from "./navigation/Logo";
import { UnifiedNavigation } from "./navigation/UnifiedNavigation";
import { SearchButton } from "./navigation/SearchButton";
import { SearchDialog } from "./navigation/SearchDialog";
import { UserAvatar } from "./avatar/UserAvatar";
import { UserMenu } from "./navigation/UserMenu";
import { MobileNav } from "./navigation/mobile/MobileNav";

export const Navigation = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { session, user } = useSyncedAuth();

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
  
        {session && (
          <div className="hidden md:block relative z-[60]">
            <UserAvatar
              user={user}
              size="lg"
              className="transform translate-y-2 cursor-pointer"
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