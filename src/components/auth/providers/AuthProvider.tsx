
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthSetup } from '@/hooks/useAuthSetup';
import { motion } from "framer-motion";
import { applySecurityHeaders } from "@/utils/auth/securityHeaders";
import { sessionManager } from "@/lib/auth/SessionManager";
import { securityManager } from "@/lib/auth/SecurityManager";
import { useAuthStore } from '@/lib/store/auth-store';
import { ensureUserProfilesExist } from "@/utils/auth/profileUtils";
import { toast } from 'sonner';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { handleAuthChange, initialSetupDone } = useAuthSetup();
  const { isLoading, initialize, getIsAdmin } = useAuthStore();

  useEffect(() => {
    console.log('AuthProvider mounted - Starting initialization');
    
    // Apply security headers without blocking
    const initSecurity = async () => {
      try {
        const success = await applySecurityHeaders();
        if (!success) {
          console.warn('Security headers could not be applied, continuing with default security settings');
        }
      } catch (error) {
        console.error('Error initializing security headers:', error);
      }
    };

    initSecurity();
    
    // Initialize auth store
    initialize();

    // Only run the setup once
    if (initialSetupDone.current) {
      console.log('Initial setup already done, skipping');
      return;
    }
    
    initialSetupDone.current = true;

    // Setup authentication
    const setupAuth = async () => {
      try {
        console.log('Starting auth setup');
        
        // Initialize session and security in background
        try {
          await sessionManager.startSession();
          securityManager.initialize();
          console.log('Security systems initialized');
        } catch (securityError) {
          console.error('Error initializing security systems:', securityError);
          // Continue anyway - non-blocking
        }

        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          // Continue without session - non-blocking
        } else {
          console.log('Initial session check:', session?.user?.id || 'No session');
          await handleAuthChange(session);
          
          // Check and update user profiles if needed (admin function)
          if (session?.user?.id) {
            // Use the user's role from the auth store
            const isAdmin = getIsAdmin();
              
            if (isAdmin) {
              // Only admins should run this profile management task
              await ensureUserProfilesExist();
            }
          }
        }

        // Import and run the seed function if needed
        try {
          const { seedDemoProjects } = await import('@/scripts/seed-demo-data');
          await seedDemoProjects();
        } catch (error) {
          console.error("Error during demo data setup:", error);
          // Non-blocking, continue anyway
        }
      } catch (error) {
        console.error("Auth setup error:", error);
        toast.error("Error initializing auth", {
          description: "There was a problem setting up authentication. Some features may be limited."
        });
        // Continue anyway - non-blocking
      }
    };

    setupAuth();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.id);
      try {
        await handleAuthChange(session);
      } catch (error) {
        console.error("Auth state change error:", error);
      }
    });
    
    // Cleanup
    return () => {
      console.log('Cleaning up AuthProvider');
      subscription.unsubscribe();
      sessionManager.destroy();
      securityManager.cleanup();
    };
  }, [handleAuthChange, initialize, getIsAdmin]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
