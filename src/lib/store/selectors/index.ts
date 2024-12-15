import type { GlobalState } from '../types';

// Core selectors
export const selectIsReady = (state: GlobalState) => state.isReady;
export const selectIsMaintenanceMode = (state: GlobalState) => state.isMaintenanceMode;
export const selectError = (state: GlobalState) => state.error;

// Theme selectors
export const selectTheme = (state: GlobalState) => state.theme;
export const selectThemeSettings = (state: GlobalState) => state.settings;
export const selectThemeMode = (state: GlobalState) => state.mode;
export const selectIsThemeLoading = (state: GlobalState) => state.isThemeLoading;
export const selectThemeError = (state: GlobalState) => state.themeError;

// Auth selectors
export const selectUser = (state: GlobalState) => state.user;
export const selectSession = (state: GlobalState) => state.session;
export const selectIsAuthLoading = (state: GlobalState) => state.isAuthLoading;
export const selectAuthError = (state: GlobalState) => state.authError;
export const selectIsTransitioning = (state: GlobalState) => state.isTransitioning;
export const selectHasAccess = (state: GlobalState) => state.hasAccess;

// Content selectors
export const selectActiveContent = (state: GlobalState) => state.activeContent;
export const selectContentHistory = (state: GlobalState) => state.contentHistory;
export const selectIsContentLoading = (state: GlobalState) => state.isContentLoading;
export const selectContentError = (state: GlobalState) => state.contentError;

// Workflow selectors
export const selectActiveWorkflows = (state: GlobalState) => state.activeWorkflows;
export const selectWorkflowHistory = (state: GlobalState) => state.workflowHistory;
export const selectIsWorkflowLoading = (state: GlobalState) => state.isWorkflowLoading;
export const selectWorkflowError = (state: GlobalState) => state.workflowError;

// Computed selectors
export const selectIsAuthenticated = (state: GlobalState) => 
  !!state.session && !!state.user;

export const selectUserRole = (state: GlobalState) => 
  state.user?.role || null;

export const selectEffectiveTheme = (state: GlobalState) => {
  const mode = state.mode === 'system' 
    ? (window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : state.mode;
  return { ...state.theme, mode };
};