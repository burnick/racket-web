import { configureStore } from '@reduxjs/toolkit';
//import jobsReducer from './slice/jobs';
import userReducer from './slice/user';
import throttle from 'lodash/throttle';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const userPersistConfig = {
  key: 'user',
  storage,
  timeout: 3600 * 60,
};

const persistedReducer = persistReducer(userPersistConfig, userReducer);

/**
 * to combine reducers 
 * const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  notes: notesReducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
 * 
 */

export const store = configureStore({
  preloadedState: {},
  // reducer: {
  //   // job: jobsReducer,
  //   user: persistedReducer,
  // },
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
