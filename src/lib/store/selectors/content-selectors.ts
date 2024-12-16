import { GlobalState } from '../types';
import { BaseContent } from '../types/store/content';

export const selectActiveContent = (state: GlobalState): BaseContent | null => 
  state.activeContent;

export const selectContentHistory = (state: GlobalState) => 
  state.contentHistory;

export const selectContentByType = (state: GlobalState, type: string) => {
  const content = state.activeContent;
  return content?.type === type ? content : null;
};

export const selectContentIsLoading = (state: GlobalState) => 
  state.isLoading;

export const selectContentError = (state: GlobalState) => 
  state.error;