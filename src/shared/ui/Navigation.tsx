
import { useState } from "react";

// TODO: Update these imports once the components are migrated
const NavigationContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="navigation-container">{children}</div>;
};

const NavigationSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return <div className={`navigation-section ${className}`}>{children}</div>;
};

const Logo = () => {
  return <div className="logo">Logo</div>;
};

const NavigationLinks = () => {
  return <div className="navigation-links">Links</div>;
};

const MegaMenu = () => {
  return <div className="mega-menu">Mega Menu</div>;
};

const SearchButton = ({ onClick }: { onClick: () => void }) => {
  return <button onClick={onClick}>Search</button>;
};

const SearchDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
  return open ? <div className="search-dialog">Search Dialog</div> : null;
};

const UserAvatar = ({ size, className, onClick }: { size: string, className: string, onClick: () => void }) => {
  return <div className={className} onClick={onClick}>Avatar</div>;
};

const UserMenu = ({ onClose }: { onClose: () => void }) => {
  return <div className="user-menu">User Menu</div>;
};

const MobileNav = () => {
  return <div className="mobile-nav">Mobile Nav</div>;
};

export const Navigation = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <NavigationContainer>
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
            className="transform translate-y-2 scale-115"
            onClick={() => setShowUserMenu(!showUserMenu)}
          />
          {showUserMenu && <UserMenu onClose={() => setShowUserMenu(false)} />}
        </div>
  
        <MobileNav />
      </NavigationSection>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </NavigationContainer>
  );
};
