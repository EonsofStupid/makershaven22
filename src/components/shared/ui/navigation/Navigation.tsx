import { useState } from "react";
import { NavigationContainer } from "./core/NavigationContainer";
import { NavigationSection } from "./core/NavigationSection";
import { Logo } from "./Logo";
import { MobileNav } from "./mobile/MobileNav";
import { UserNav } from "./UserNav";
import { MainNav } from "./MainNav";

export const Navigation = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <NavigationContainer>
      <NavigationSection>
        <Logo />
      </NavigationSection>

      <NavigationSection className="hidden md:flex">
        <MainNav />
      </NavigationSection>

      <NavigationSection className="flex items-center space-x-4">
        <UserNav />
        <MobileNav />
      </NavigationSection>
    </NavigationContainer>
  );
};