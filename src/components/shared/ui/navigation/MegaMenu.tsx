import React from 'react';
import { useSyncedAuth } from '@/lib/store/hooks/useSyncedStore';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const MegaMenu = () => {
  const { user } = useSyncedAuth();

  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {user && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {menuItems.map((item) => (
                  <ListItem key={item.title} title={item.title} href={item.href}>
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const menuItems = [
  {
    title: "Profile",
    href: "/profile",
    description: "Manage your account settings"
  },
  {
    title: "My Builds",
    href: "/builds",
    description: "View your saved builds"
  },
  {
    title: "Messages",
    href: "/messages",
    description: "Check your inbox"
  },
  {
    title: "Settings",
    href: "/settings",
    description: "Customize your experience"
  }
];