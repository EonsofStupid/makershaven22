
import { useEffect } from 'react';
import { AppRoutes } from './routes';
import { useAuthStore } from './lib/store/auth-store';
import { supabase } from './integrations/supabase/client';
import './App.css';

function App() {
  const { session, user } = useAuthStore();

  useEffect(() => {
    // Debug log for app initialization and auth state
    console.log('App initialized with auth state:', {
      isAuthenticated: !!session,
      userId: session?.user?.id,
      userRole: user?.role
    });
    
    // Additional logging for admin detection
    if (user?.role === 'admin' || user?.role === 'super_admin') {
      console.log('Admin user detected in App component');
    }
  }, [session, user]);

  return (
    <AppRoutes />
  );
}

export default App;
