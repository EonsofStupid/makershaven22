
import { lazy } from "react";
import Dashboard from "@/pages/admin/dashboard";

// Lazy-loaded components
const UsersList = lazy(() => import("@/components/admin/users/UsersList"));
const PostsTable = lazy(() => import("@/components/admin/posts/PostsTable"));
const ForumManagement = lazy(() => import("@/components/admin/dashboard/forum/ForumManagement"));
const SettingsDashboard = lazy(() => import("@/components/admin/settings/SettingsDashboard"));

interface AdminRoute {
  path: string;
  element: React.ReactNode;
  title: string;
  icon?: string;
}

// Admin routes that require authentication and admin role
export const adminRoutes: AdminRoute[] = [
  {
    path: "", // Empty path for the default admin dashboard
    element: <Dashboard />,
    title: "Dashboard"
  },
  {
    path: "users",
    element: <UsersList />,
    title: "Users Management"
  },
  {
    path: "posts",
    element: <PostsTable posts={[]} onDelete={() => {}} />,
    title: "Content Management"
  },
  {
    path: "forum",
    element: <ForumManagement />,
    title: "Forum Management"
  },
  {
    path: "settings",
    element: <SettingsDashboard />,
    title: "Site Settings"
  },
  {
    path: "data-maestro",
    element: <div>Data Maestro</div>,
    title: "Data Management"
  },
  {
    path: "monitoring",
    element: <div>Monitoring Dashboard</div>,
    title: "System Monitoring"
  }
];
