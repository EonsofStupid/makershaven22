import { useAtom } from 'jotai';
import { appReadyAtom, appErrorAtom, globalLoadingAtom, globalErrorAtom, userPreferencesAtom } from '../atoms/core';

export const useStore = () => {
  const [appReady, setAppReady] = useAtom(appReadyAtom);
  const [appError, setAppError] = useAtom(appErrorAtom);
  const [globalLoading, setGlobalLoading] = useAtom(globalLoadingAtom);
  const [globalError, setGlobalError] = useAtom(globalErrorAtom);
  const [userPreferences, setUserPreferences] = useAtom(userPreferencesAtom);

  return {
    // App State
    appReady,
    setAppReady,
    appError,
    setAppError,

    // Global UI State
    globalLoading,
    setGlobalLoading,
    globalError,
    setGlobalError,

    // User Preferences
    userPreferences,
    setUserPreferences,
  };
};