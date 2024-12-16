import React from 'react';
import { useSyncedAuth } from '@/lib/store/hooks/useSyncedStore';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const UnifiedNavigation = () => {
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
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      MakersImpulse
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Create, Share, Inspire
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Learn about MakersImpulse and get started
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                Step-by-step guide to set up your first build
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {user && (
          <>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Maker Space</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {makerSpaceItems.map((item) => (
                    <ListItem key={item.title} title={item.title} href={item.href}>
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {user.role === 'admin' && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {adminItems.map((item) => (
                      <ListItem key={item.title} title={item.title} href={item.href}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const makerSpaceItems = [
  {
    title: "Builds",
    href: "/maker-space/builds",
    description: "Browse and share 3D printer builds"
  },
  {
    title: "Parts",
    href: "/maker-space/parts",
    description: "Explore compatible parts and upgrades"
  },
  {
    title: "Guides",
    href: "/maker-space/guides",
    description: "Learn from expert makers"
  },
  {
    title: "Community",
    href: "/maker-space/community",
    description: "Connect with other makers"
  }
];

const adminItems = [
  {
    title: "Dashboard",
    href: "/admin",
    description: "Overview of site activity and metrics"
  },
  {
    title: "Content",
    href: "/admin/content",
    description: "Manage site content and media"
  },
  {
    title: "Users",
    href: "/admin/users",
    description: "User management and permissions"
  },
  {
    title: "Settings",
    href: "/admin/settings",
    description: "Site configuration and preferences"
  }
];