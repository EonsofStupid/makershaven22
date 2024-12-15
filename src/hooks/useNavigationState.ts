import { useAtom } from 'jotai';
import { navigationSettingsAtom } from '@/lib/store/atoms/navigation';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const useNavigationState = () => {
  const [settings] = useAtom(navigationSettingsAtom);
  const { user, isAuthenticated } = useAuth();

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path);
    toast.success(`Navigating to ${path.split('/').pop()?.toUpperCase() || 'Home'}`);
  };

  return {
    settings,
    user,
    isAuthenticated,
    handleNavigation
  };
};