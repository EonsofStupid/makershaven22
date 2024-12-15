import { CoreSlice } from './slices/core-slice';
import { ThemeSlice } from './slices/theme-slice';

export interface GlobalState extends CoreSlice, ThemeSlice {}