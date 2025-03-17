
import { Dashboard } from "@/pages/admin/dashboard";
import { UsersList } from "@/components/admin/users/UsersList";
import { PostsTable } from "@/components/admin/posts/PostsTable";
import { ForumManagement } from "@/components/admin/dashboard/forum/ForumManagement";
import { SettingsDashboard } from "@/components/admin/settings/SettingsDashboard";

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
    element: <PostsTable />,
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
  }
];
