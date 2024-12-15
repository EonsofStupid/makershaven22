import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { PinLogin } from "@/components/auth/components/PinLogin";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { sessionManager } from '@/lib/auth/SessionManager';
import { securityManager } from '@/lib/auth/SecurityManager';
import { ErrorBoundary } from "@/components/shared/error-handling/ErrorBoundary";
import { useAtom } from 'jotai';
import { sessionAtom, loadingStateAtom, userAtom } from '@/lib/store/atoms/auth';
import { useAuthStore } from '@/lib/store/auth-store';

const LoginContent = () => {
  const navigate = useNavigate();
  const [session] = useAtom(sessionAtom);
  const [loadingState] = useAtom(loadingStateAtom);
  const [, setUser] = useAtom(userAtom);
  const { signIn } = useAuthStore();

  useEffect(() => {
    console.log('Login page render:', { session, loadingState });
    
    if (session?.user) {
      console.log("Existing session found, redirecting to home");
      navigate("/");
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed in login:", event, session?.user?.id);
      
      if (event === 'SIGNED_IN' && session) {
        try {
          await sessionManager.startSession();
          securityManager.initialize();
          
          if (session.user) {
            setUser(session.user);
            signIn(session.user.email!, ''); // Update Zustand store
          }
          
          console.log("User signed in, redirecting to home");
          toast.success("Successfully signed in!");
          navigate("/");
        } catch (error) {
          console.error('Error initializing session:', error);
          toast.error('Error signing in', {
            description: 'There was a problem initializing your session'
          });
          await supabase.auth.signOut();
        }
      }
    });

    return () => {
      console.log("Cleaning up auth listener in login page");
      subscription.unsubscribe();
    };
  }, [session, navigate, loadingState, setUser, signIn]);

  if (loadingState.isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-[#0F1114]"
      >
        <LoadingSpinner />
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#0F1114] to-[#1A1F2C] flex flex-col relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-cyber-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-scratch-overlay opacity-30 pointer-events-none" />
      
      <div className="sticky top-0 z-50 flex items-center p-4 bg-black/40 backdrop-blur-xl border-b border-[#41f0db]/20">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-2 text-white hover:text-[#41f0db]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold bg-gradient-to-r from-[#41f0db] to-[#ff0abe] text-transparent bg-clip-text">
          Sign In
        </h1>
      </div>

      <div className="flex-1 flex flex-col p-4 space-y-6">
        <div className="grid grid-cols-1 gap-4 mb-8">
          <Button 
            variant="outline" 
            className="w-full h-12 flex items-center justify-center gap-2 bg-black/40 backdrop-blur-sm border-border/40 hover:bg-black/60"
            onClick={() => {/* Handle GitHub login */}}
          >
            <Github className="h-5 w-5" />
            Continue with GitHub
          </Button>
          
          <Button
            variant="outline"
            className="w-full h-12 flex items-center justify-center gap-2 bg-black/40 backdrop-blur-sm border-border/40 hover:bg-black/60"
            onClick={() => {/* Handle Google login */}}
          >
            <Mail className="h-5 w-5" />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 flex items-center justify-center gap-2 bg-black/40 backdrop-blur-sm border-border/40 hover:bg-black/60"
            onClick={() => {/* Handle Discord login */}}
          >
            <Phone className="h-5 w-5" />
            Continue with Discord
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/40" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0F1114] px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/60 backdrop-blur-xl p-6 rounded-lg shadow-lg border border-border/40"
        >
          <Auth 
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              extend: true,
              variables: {
                default: {
                  colors: {
                    brand: '#34ebbd',
                    brandAccent: '#fa19a7',
                    brandButtonText: 'white',
                    defaultButtonBackground: '#34ebbd',
                    defaultButtonBackgroundHover: '#fa19a7',
                    defaultButtonBorder: 'transparent',
                    defaultButtonText: 'white',
                    dividerBackground: '#2D2D2D',
                    inputBackground: 'transparent',
                    inputBorder: '#2D2D2D',
                    inputBorderHover: '#4D4D4D',
                    inputBorderFocus: '#34ebbd',
                    inputText: 'white',
                    inputLabelText: '#666',
                    inputPlaceholder: '#444',
                  },
                },
              },
              className: {
                container: 'space-y-4',
                button: 'w-full h-12 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium',
                label: 'text-sm font-medium text-gray-400',
                input: 'h-12 bg-black/40 border-border/40 text-white rounded-lg px-4',
                message: 'text-red-500 text-sm',
                divider: 'bg-border/40',
                anchor: 'text-primary hover:text-primary/80 transition-colors',
              },
            }}
            theme="dark"
            providers={['github', 'google', 'discord']}
            redirectTo={`${window.location.origin}/`}
            onlyThirdPartyProviders
          />
        </motion.div>

        <div className="mt-8 space-y-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-primary"
            onClick={() => navigate('/help')}
          >
            Need help?
          </Button>
          <Button 
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-primary"
            onClick={() => navigate('/privacy')}
          >
            Privacy Policy
          </Button>
          <Button 
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-primary"
            onClick={() => navigate('/terms')}
          >
            Terms of Service
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const Login = () => {
  return (
    <ErrorBoundary>
      <LoginContent />
    </ErrorBoundary>
  );
};

export default Login;
