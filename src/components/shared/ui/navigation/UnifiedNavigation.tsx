import { Link } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { 
  Hammer, 
  Wrench, 
  BookOpen, 
  Globe,
  ChevronDown 
} from 'lucide-react';
import { BuildsMenu } from './menu-items/BuildsMenu';
import { PartsMenu } from './menu-items/PartsMenu';
import { GuidesMenu } from './menu-items/GuidesMenu';
import { SiteMenu } from './menu-items/SiteMenu';
import { useNavigation } from "@/hooks/useNavigation";

export const UnifiedNavigation = () => {
  const { handleNavigation } = useNavigation();

  return (
    <div className="flex items-center space-x-6">
      <Link 
        to="/" 
        className="nav-link"
        onClick={() => handleNavigation("/")}
      >
        Home
      </Link>
      <Link 
        to="/reviews" 
        className="nav-link"
        onClick={() => handleNavigation("/reviews")}
      >
        Reviews
      </Link>
      <Link 
        to="/podcasts" 
        className="nav-link"
        onClick={() => handleNavigation("/podcasts")}
      >
        Podcasts
      </Link>
      <Link 
        to="/tv-shows" 
        className="nav-link"
        onClick={() => handleNavigation("/tv-shows")}
      >
        TV Shows
      </Link>

      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-1">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="nav-trigger">
              <Hammer className="w-4 h-4 mr-2" />
              <span className="relative">
                Builds
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover/nav-trigger:w-full" />
              </span>
              <ChevronDown className="nav-chevron" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <BuildsMenu />
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="nav-trigger">
              <Wrench className="w-4 h-4 mr-2" />
              <span className="relative">
                Parts
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover/nav-trigger:w-full" />
              </span>
              <ChevronDown className="nav-chevron" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <PartsMenu />
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="nav-trigger">
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="relative">
                Guides
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover/nav-trigger:w-full" />
              </span>
              <ChevronDown className="nav-chevron" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <GuidesMenu />
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="nav-trigger">
              <Globe className="w-4 h-4 mr-2" />
              <span className="relative">
                Site
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover/nav-trigger:w-full" />
              </span>
              <ChevronDown className="nav-chevron" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <SiteMenu />
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};