import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import authSlice from './slices/authSlice';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
//   auth: authSlice,
auth: persistReducer(authPersistConfig, authSlice),
});

export { rootPersistConfig, rootReducer };

