import type { RootState } from '../store';

export const selectNews = (state: RootState) => state.news.items;