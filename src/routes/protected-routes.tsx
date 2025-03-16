
import { Navigate, RouteObject } from "react-router-dom";
import { AuthBoundary } from "@/components/auth/AuthBoundary";

// Admin routes
import { Dashboard } from "@/pages/admin/dashboard";
import { UsersList } from "@/components/admin/users/UsersList";
import { PostsTable } from "@/components/admin/posts/PostsTable";
import { ForumManagement } from "@/components/admin/dashboard/forum/ForumManagement";
import { SettingsDashboard } from "@/components/admin/settings/SettingsDashboard";
import { ErrorBoundary } from "@/components/shared/error-handling/ErrorBoundary";

// Protected routes that require authentication
export const protectedRoutes: RouteObject[] = [
  {
    path: "admin",
    element: (
      <ErrorBoundary>
        <AuthBoundary requiredRole="admin">
          <Dashboard />
        </AuthBoundary>
      </ErrorBoundary>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="dashboard" replace />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "users",
        element: <UsersList />
      },
      {
        path: "posts",
        element: <PostsTable />
      },
      {
        path: "forum",
        element: <ForumManagement />
      },
      {
        path: "settings",
        element: <SettingsDashboard />
      }
    ]
  }
];
