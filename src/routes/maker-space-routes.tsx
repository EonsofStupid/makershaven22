import React from 'react';
import { AuthGuard } from "@/components/auth/AuthGuard";
import MakerSpaceDashboard from "@/pages/maker-space/Dashboard";
import MakerSpaceSettings from "@/pages/maker-space/Settings";
import MakerSpaceProjects from "@/pages/maker-space/Projects";

export const makerSpaceRoutes = [
  {
    path: "/maker-space",
    element: (
      <AuthGuard requireAuth={true} fallbackPath="/login">
        <MakerSpaceDashboard />
      </AuthGuard>
    )
  },
  {
    path: "/maker-space/settings",
    element: (
      <AuthGuard requireAuth={true} fallbackPath="/login">
        <MakerSpaceSettings />
      </AuthGuard>
    )
  },
  {
    path: "/maker-space/projects",
    element: (
      <AuthGuard requireAuth={true} fallbackPath="/login">
        <MakerSpaceProjects />
      </AuthGuard>
    )
  }
];