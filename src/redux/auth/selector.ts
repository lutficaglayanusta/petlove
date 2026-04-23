import type { RootState } from '../store'

export const selectAuthenticated = (state: RootState) => state.auth.isAuthenticated