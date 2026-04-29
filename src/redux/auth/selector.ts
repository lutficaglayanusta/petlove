import type { RootState } from '../store'

export const selectAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectRefreshing = (state: RootState) => state.auth.isRefreshing
export const selectUser = (state: RootState) => state.auth.user