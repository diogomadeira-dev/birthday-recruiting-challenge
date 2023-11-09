import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistReducer,
  persistStore
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// slices
import authReducer from './../redux/slices/authSlice';
import countriesSlice from './slices/countriesSlice';
import customersSlice from './slices/customersSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ["auth"],
}

const reducers = combineReducers({ 
  auth: authReducer, 
  customers: customersSlice,
  countries: countriesSlice
});

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

