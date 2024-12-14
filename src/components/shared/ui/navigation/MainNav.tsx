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

export const MainNav = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <Link to="/" className="nav-link">
          Home
        </Link>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="nav-trigger">
            <Hammer className="w-4 h-4 mr-2" />
            <span>Builds</span>
            <ChevronDown className="nav-chevron" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 glass-menu">
              <Link to="/maker-space/builds" className="nav-menu-item">
                <div className="text-sm font-medium">Featured Builds</div>
                <p className="text-sm text-muted">Browse featured 3D printer builds</p>
              </Link>
              <Link to="/maker-space/builds/latest" className="nav-menu-item">
                <div className="text-sm font-medium">Latest Builds</div>
                <p className="text-sm text-muted">See the newest community builds</p>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="nav-trigger">
            <Wrench className="w-4 h-4 mr-2" />
            <span>Parts</span>
            <ChevronDown className="nav-chevron" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 glass-menu">
              <Link to="/maker-space/parts" className="nav-menu-item">
                <div className="text-sm font-medium">Parts Catalog</div>
                <p className="text-sm text-muted">Browse our parts database</p>
              </Link>
              <Link to="/maker-space/parts/compatibility" className="nav-menu-item">
                <div className="text-sm font-medium">Compatibility Guide</div>
                <p className="text-sm text-muted">Check part compatibility</p>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="nav-trigger">
            <BookOpen className="w-4 h-4 mr-2" />
            <span>Guides</span>
            <ChevronDown className="nav-chevron" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 glass-menu">
              <Link to="/maker-space/guides" className="nav-menu-item">
                <div className="text-sm font-medium">All Guides</div>
                <p className="text-sm text-muted">Browse all building guides</p>
              </Link>
              <Link to="/maker-space/guides/getting-started" className="nav-menu-item">
                <div className="text-sm font-medium">Getting Started</div>
                <p className="text-sm text-muted">New to 3D printing? Start here</p>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="nav-trigger">
            <Globe className="w-4 h-4 mr-2" />
            <span>Site</span>
            <ChevronDown className="nav-chevron" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 glass-menu">
              <Link to="/about" className="nav-menu-item">
                <div className="text-sm font-medium">About Us</div>
                <p className="text-sm text-muted">Learn about MakersImpulse</p>
              </Link>
              <Link to="/contact" className="nav-menu-item">
                <div className="text-sm font-medium">Contact</div>
                <p className="text-sm text-muted">Get in touch with us</p>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};