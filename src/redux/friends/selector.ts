import type { RootState } from '../store';

export const selectFriends = (state: RootState) => state.friends.friendsList;