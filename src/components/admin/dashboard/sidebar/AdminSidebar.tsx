
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, Clock, Settings, Users, Database, 
  Radio, MessageSquare, LayoutDashboard, ChevronLeft, ChevronRight 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAdminSidebar } from "./AdminSidebarContext";

export const AdminSidebar = () => {
  const { isExpanded, setIsExpanded } = useAdminSidebar();
  const [activeItem, setActiveItem] = useState("dashboard");
  const location = useLocation();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { id: "schedule", label: "Schedule", icon: Calendar, path: "/admin/content/schedule" },
    { id: "queue", label: "Queue", icon: Clock, path: "/admin/content/queue" },
    { id: "users", label: "Users", icon: Users, path: "/admin/users" },
    { id: "data", label: "Data", icon: Database, path: "/admin/data-maestro" },
    { id: "monitoring", label: "Monitoring", icon: Radio, path: "/admin/monitoring" },
    { id: "forum", label: "Forum", icon: MessageSquare, path: "/admin/forum" },
    { id: "settings", label: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  // Update active item based on current path
  useEffect(() => {
    const path = location.pathname;
    const currentItem = menuItems.find((item) => 
      path === item.path || path.startsWith(item.path + "/")
    );
    if (currentItem) {
      setActiveItem(currentItem.id);
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
        {menuItems.map((item) => (
          <Link key={item.id} to={item.path}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/5",
                activeItem === item.id && "bg-white/5 text-white",
                !isExpanded && "justify-center"
              )}
              onClick={() => setActiveItem(item.id)}
            >
              <item.icon className="w-5 h-5" />
              {isExpanded && <span>{item.label}</span>}
            </Button>
          </Link>
        ))}
      </div>
    </aside>
  );
};
