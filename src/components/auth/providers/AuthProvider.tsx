import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/auth/useAuth";
import { toast } from "sonner";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setAuthState } = useAuth();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        
        setAuthState({ isLoading: true, error: null });
        
        if (session) {
          try {
            const { data: profile } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();

            setAuthState({
              user: {
                ...session.user,
                role: profile?.role || "subscriber",
                ...profile
              },
              session,
              isLoading: false,
              error: null
            });
            
            if (event === "SIGNED_IN") {
              toast.success("Successfully signed in");
            }
          } catch (error) {
            console.error("Error fetching profile:", error);
            setAuthState({
              error: error as Error,
              isLoading: false
            });
          }
        } else {
          setAuthState({
            user: null,
            session: null,
            isLoading: false,
            error: null
          });
          
          if (event === "SIGNED_OUT") {
            toast.success("Successfully signed out");
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setAuthState]);

  return <>{children}</>;
};