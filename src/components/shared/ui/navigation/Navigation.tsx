import React from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { NavigationContainer } from "./core/NavigationContainer";
import { NavigationLinks } from "./NavigationLinks";
import { UserMenu } from "./menu/UserMenu";
import { SearchDialog } from "./SearchDialog";
import { MobileNav } from "./mobile/MobileNav";
import { Logo } from "./Logo";

export const Navigation = () => {
  const { user, isLoading } = useAuthStore();

  return (
    <NavigationContainer>
      <div className="flex items-center gap-6">
        <Logo />
        <NavigationLinks />
      </div>

      <div className="flex items-center gap-4">
        <SearchDialog />
        {!isLoading && (
          <>
            {user ? (
              <UserMenu user={user} />
            ) : (
              <div className="flex items-center gap-2">
                <a
                  href="/login"
                  className="text-sm font-medium text-white hover:text-neon-cyan transition-colors"
                >
                  Sign in
                </a>
              </div>
            )}
          </>
        )}
        <MobileNav />
      </div>
    </NavigationContainer>
  );
};