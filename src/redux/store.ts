import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './news/slice';
import friendsReducer from './friends/slice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    friends: friendsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch