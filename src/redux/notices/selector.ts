import type { RootState } from '../store';

export const selectNotices = (state: RootState) => state.notices.items;
export const selectNoticesCategories = (state: RootState) => state.notices.categories;
export const selectNoticesSex = (state: RootState) => state.notices.sexs;
export const selectNoticesSpecies = (state: RootState) => state.notices.species;
export const selectNoticesPage = (state: RootState) => state.notices.page;
export const selectNoticesTotalPages = (state: RootState) => state.notices.totalPages;
export const selectNoticesPerPage = (state: RootState) => state.notices.perPage;
export const selectNoticesFavorites = (state: RootState) => state.notices.favoriteItems;