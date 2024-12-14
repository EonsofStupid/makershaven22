import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Hammer, 
  Wrench, 
  BookOpen, 
  Globe,
  ChevronDown,
  Settings,
  User,
  Database,
  Radio,
  MessageSquare,
  LayoutDashboard,
  FileText
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAtom } from 'jotai';
import { userAtom } from '@/lib/store/atoms/auth';
import { BuildsMenu } from './menu-items/BuildsMenu';
import { PartsMenu } from './menu-items/PartsMenu';
import { GuidesMenu } from './menu-items/GuidesMenu';
import { SiteMenu } from './menu-items/SiteMenu';

export function MegaMenu() {
  const [user] = useAtom(userAtom);
  const isAdmin = user?.role === 'admin';

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex items-center gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className="h-9 px-4 py-2 group/nav-trigger bg-transparent text-white data-[state=open]:bg-white/5 hover:bg-gradient-to-r hover:from-[#41f0db]/20 hover:to-[#8000ff]/20 hover:text-[#41f0db] transition-all duration-300"
          >
            <Hammer className="w-4 h-4 mr-2" />
            <span className="relative">
              Builds
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover/nav-trigger:w-full" />
            </span>
            <ChevronDown className="w-3 h-3 ml-1 transition-transform duration-300 group-data-[state=open]/nav-trigger:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <BuildsMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className="h-9 px-4 py-2 group/nav-trigger bg-transparent text-white data-[state=open]:bg-white/5 hover:bg-gradient-to-r hover:from-[#41f0db]/20 hover:to-[#8000ff]/20 hover:text-[#41f0db] transition-all duration-300"
          >
            <Wrench className="w-4 h-4 mr-2" />
            <span className="relative">
              Parts
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover/nav-trigger:w-full" />
            </span>
            <ChevronDown className="w-3 h-3 ml-1 transition-transform duration-300 group-data-[state=open]/nav-trigger:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <PartsMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className="h-9 px-4 py-2 group/nav-trigger bg-transparent text-white data-[state=open]:bg-white/5 hover:bg-gradient-to-r hover:from-[#41f0db]/20 hover:to-[#8000ff]/20 hover:text-[#41f0db] transition-all duration-300"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            <span className="relative">
              Guides
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover/nav-trigger:w-full" />
            </span>
            <ChevronDown className="w-3 h-3 ml-1 transition-transform duration-300 group-data-[state=open]/nav-trigger:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <GuidesMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link 
            to="/blog"
            className="h-9 px-4 py-2 flex items-center group/nav-link bg-transparent text-white hover:bg-gradient-to-r hover:from-[#41f0db]/20 hover:to-[#8000ff]/20 hover:text-[#41f0db] transition-all duration-300 rounded-md"
          >
            <FileText className="w-4 h-4 mr-2" />
            <span className="relative">
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover/nav-link:w-full" />
            </span>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link 
            to="/maker-space"
            className="h-9 px-4 py-2 flex items-center group/nav-link bg-transparent text-white hover:bg-gradient-to-r hover:from-[#41f0db]/20 hover:to-[#8000ff]/20 hover:text-[#41f0db] transition-all duration-300 rounded-md"
          >
            <Settings className="w-4 h-4 mr-2" />
            <span className="relative">
              Maker Space
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover/nav-link:w-full" />
            </span>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}