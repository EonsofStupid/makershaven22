import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { navigationSettingsAtom } from '@/lib/store/atoms/navigation';

export const useNavigation = () => {
  const [settings] = useAtom(navigationSettingsAtom);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path);
    navigate(path);
    toast.success(`Navigating to ${path.split('/').pop()?.toUpperCase() || 'Home'}`);
  };

  return {
    settings,
    user,
    isAuthenticated,
    handleNavigation
  };
};