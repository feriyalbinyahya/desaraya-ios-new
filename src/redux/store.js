import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authRegistrationReducer from './registration'
import credentialReducer from './credentials'
import pendukungReducer from './pendukung'
import daerahReducer from './daerah'
import laporanReducer from './laporan'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


// import * as RootNavigation from '~utils/RootNavigation'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  // whitelist: [
  //   bankApi.reducerPath,
  //   regionApi.reducerPath,
  //   exampleReducer.reducerPath,
  //   farmerReducer.reducerPath,
  //   regionReducer.reducerPath
  // ],
}

const rootReducer = combineReducers({
  authRegistration: authRegistrationReducer,
  credential: credentialReducer,
  pendukung: pendukungReducer,
  daerah: daerahReducer,
  laporan: laporanReducer
  
  // [rtkquery.reducerPath]: rtkquery.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare({
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }).concat([
      // rtk query middleware
      // rtkquery.middleware,
    ])
  }
})
setupListeners(store.dispatch)
export const persistor = persistStore(store)
