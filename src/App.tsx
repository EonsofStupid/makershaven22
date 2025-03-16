
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RootLayout } from "@/components/layouts/RootLayout";
import { AppRoutes } from "@/routes";
import { ErrorBoundary } from "@/components/shared/error-handling/ErrorBoundary";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { QueryProvider } from "@/components/auth/providers/QueryProvider";
import { AuthProvider } from "@/components/auth/providers/AuthProvider";
import { AdminSidebarProvider } from "@/components/admin/dashboard/sidebar/AdminSidebarContext";
import { ToastProvider } from "@/components/toast/ToastProvider";
import { KeyboardNavigationProvider } from "@/components/providers/KeyboardNavigationProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/lib/toast";

const App = () => {
  // Set up demo data and create missing user profiles
  useEffect(() => {
    const setupData = async () => {
      try {
        // Create or update missing user profiles
        await ensureUserProfilesExist();
        
        // Import the seed function and call it
        const { seedDemoProjects } = await import('./scripts/seed-demo-data');
        await seedDemoProjects();
      } catch (error) {
        console.error("Error during initial setup:", error);
      }
    };
    
    // Call the setup function
    setupData();
  }, []);

  return (
    <ErrorBoundary>
      <QueryProvider>
        <BrowserRouter>
          <ThemeProvider>
            <TooltipProvider>
              <ToastProvider>
                <AuthProvider>
                  <AdminSidebarProvider>
                    <KeyboardNavigationProvider>
                      <RootLayout>
                        <AppRoutes />
                      </RootLayout>
                    </KeyboardNavigationProvider>
                  </AdminSidebarProvider>
                </AuthProvider>
              </ToastProvider>
            </TooltipProvider>
          </ThemeProvider>
        </BrowserRouter>
      </QueryProvider>
    </ErrorBoundary>
  );
};

// Function to ensure user profiles exist with correct usernames
async function ensureUserProfilesExist() {
  const usersToCheck = [
    { email: 'jessay@angrygaming.org', username: 'Jessay', role: 'admin' },
    { email: 'jessay@gmail.com', username: 'Hades', role: 'maker' }
  ];

  for (const user of usersToCheck) {
    try {
      // First check if the user exists in auth
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id, username, role')
        .eq('email', user.email)
        .maybeSingle();
      
      if (userError) {
        console.error(`Error checking profile for ${user.email}:`, userError);
        continue;
      }
      
      if (!userData) {
        console.log(`No profile found for ${user.email}, cannot update without auth record`);
        continue;
      }
      
      // Update the profile with correct username and role if needed
      if (userData.username !== user.username || userData.role !== user.role) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            username: user.username,
            role: user.role,
            display_name: user.username
          })
          .eq('email', user.email);
        
        if (updateError) {
          console.error(`Error updating profile for ${user.email}:`, updateError);
        } else {
          console.log(`Updated profile for ${user.email} with username: ${user.username}, role: ${user.role}`);
        }
      } else {
        console.log(`Profile for ${user.email} already has correct username and role`);
      }
    } catch (error) {
      console.error(`Error processing user ${user.email}:`, error);
    }
  }
}

export default App;
