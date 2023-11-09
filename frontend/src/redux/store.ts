import { configureStore } from '@reduxjs/toolkit';
import authReducer from './../redux/slices/authSlice';


import { combineReducers } from 'redux';
import {
  persistReducer,
  persistStore
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     [authApi.reducerPath]: authApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(authApi.middleware),
// })

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ["auth"],
}

const reducers = combineReducers({ auth: authReducer });

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
      serializableCheck: false
  }),
})

const persistor = persistStore(store);


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export { persistor };

