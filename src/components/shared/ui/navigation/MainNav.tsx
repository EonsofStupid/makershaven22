import React from 'react';
import { useSyncedAuth } from '@/lib/store/hooks/useSyncedStore';
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface MainNavProps {
  className?: string;
}

export const MainNav = ({ className }: MainNavProps) => {
  const { user } = useSyncedAuth();

  const items = [
    {
      title: "Home",
      href: "/",
      public: true
    },
    {
      title: "Maker Space",
      href: "/maker-space",
      requiresAuth: true
    },
    {
      title: "Admin",
      href: "/admin",
      requiresRole: ["admin", "super_admin"]
    }
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {items.map((item) => {
        // Skip items that require auth if user is not logged in
        if (item.requiresAuth && !user) return null;
        
        // Skip items that require specific roles
        if (item.requiresRole && (!user?.role || !item.requiresRole.includes(user.role))) {
          return null;
        }

        return (
          <Link
            key={item.href}
            to={item.href}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};