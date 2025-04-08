
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, ChevronLeft, ChevronRight,
  Settings, Users, Database, Radio, MessageSquare, CalendarClock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAdminSidebar } from "./AdminSidebarContext";
import { adminRoutes } from "@/routes/admin-routes";

export const AdminSidebar = () => {
  const { isExpanded, setIsExpanded } = useAdminSidebar();
  const [activeItem, setActiveItem] = useState("dashboard");
  const location = useLocation();

  // Map icons to route paths
  const getIconForPath = (path: string) => {
    switch (path) {
      case "":
        return LayoutDashboard;
      case "users":
        return Users;
      case "settings":
        return Settings;
      case "data-maestro":
        return Database;
      case "monitoring":
        return Radio;
      case "forum":
        return MessageSquare;
      default:
        return CalendarClock;
    }
  };

  // Update active item based on current path
  useEffect(() => {
    const currentPath = location.pathname.split('/').filter(Boolean);
    if (currentPath[0] === 'admin') {
      const activePath = currentPath[1] || '';
      setActiveItem(activePath);
    }
  }, [location.pathname]);

  return (
    <aside
      className={cn(
        "admin-sidebar",
        isExpanded ? "admin-sidebar-expanded" : "admin-sidebar-collapsed"
      )}
      style={{ "--sidebar-width": isExpanded ? "16rem" : "4rem" } as any}
    >
      <div className="flex justify-end p-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white/70 hover:text-white hover:bg-white/5"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>

      <div className="flex flex-col gap-2 p-4">
        {adminRoutes.map((route) => {
          const Icon = getIconForPath(route.path);
          return (
            <Link key={route.path} to={`/admin/${route.path}`}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/5",
                  activeItem === route.path && "bg-white/5 text-white",
                  !isExpanded && "justify-center"
                )}
                onClick={() => setActiveItem(route.path)}
              >
                <Icon className="w-5 h-5" />
                {isExpanded && <span>{route.title}</span>}
              </Button>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};
