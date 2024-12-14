import { useAtom } from 'jotai';
import { useGlobalStore } from '../global-store';
import { themeAtom, settingsAtom } from '../atoms/sync-atoms';
import { userAtom, sessionAtom } from '../atoms/auth/auth-atoms';

export const useStore = () => {
  const [theme] = useAtom(themeAtom);
  const [settings] = useAtom(settingsAtom);
  const [user] = useAtom(userAtom);
  const [session] = useAtom(sessionAtom);

  const {
    setTheme,
    setSettings,
    setUser,
    setSession,
    reset
  } = useGlobalStore();

  return {
    // State
    theme,
    settings,
    user,
    session,

    // Actions
    setTheme,
    setSettings,
    setUser,
    setSession,
    reset
  };
};