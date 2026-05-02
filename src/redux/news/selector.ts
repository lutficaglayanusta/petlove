import type { RootState } from '../store';

export const selectNews = (state: RootState) => state.news.items;
export const selectNewsPage = (state: RootState) => state.news.page;
export const selectNewsTotalPages = (state: RootState) => state.news.totalPages;
export const selectNewsPerPage = (state: RootState) => state.news.perPage;