import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import newsReducer from './news/slice';
import friendsReducer from './friends/slice';
import authReducer from './auth/slice';
import citiesReducer from './cities/slice';
import noticesReducer from './notices/slice';   
import usersReducer from './users/slice';

const storage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const noticesPersistConfig = {
  key: "notices",
  storage,
  whitelist: ["favorites"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer) as unknown as typeof authReducer,
    news: newsReducer,
    friends: friendsReducer,
    cities: citiesReducer,
    notices: persistReducer(noticesPersistConfig, noticesReducer) as unknown as typeof noticesReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});





// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch



export const persistor = persistStore(store);