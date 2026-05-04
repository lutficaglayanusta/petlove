// selectors.ts
import type { RootState } from "../store";

export const selectUser = (state: RootState) => state.users;
export const selectUserId = (state: RootState) => state.users._id;
export const selectUserName = (state: RootState) => state.users.name;
export const selectUserEmail = (state: RootState) => state.users.email;
export const selectUserAvatar = (state: RootState) => state.users.avatar;
export const selectUserPhone = (state: RootState) => state.users.phone;
export const selectUserToken = (state: RootState) => state.users.token;
export const selectUserPets = (state: RootState) => state.users.pets;
export const selectNoticesViewed = (state: RootState) => state.users.noticesViewed;
export const selectNoticesFavorites = (state: RootState) => state.users.noticesFavorites;