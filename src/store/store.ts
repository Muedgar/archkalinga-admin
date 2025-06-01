import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  authReducer,
  createGetTotalItemUsageAccrossTasksReducer,
  errorReducer,
  getShellScheduleTreeReducer,
  getUserItemUsageReducer,
  itemAndQuantityBreakdownByTaskReducer,
  itemUsageWithUserContributionsReducer,
  navigationReducer,
  permissionReducer,
  projectReducer,
  roleReducer,
  shellQuantityReducer,
  userReducer,
} from './slices'
import { errorMiddleware } from './middlewares/error.middleware'

import storage from 'redux-persist/lib/storage'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import { taskReducer } from './slices/task.slice'
import { shellItemReducer } from './slices/shellitem.slice'

// Define a persist config
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'],
}

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  navigation: navigationReducer,
  user: userReducer,
  permission: permissionReducer,
  role: roleReducer,
  project: projectReducer,
  task: taskReducer,
  shellItem: shellItemReducer,
  shellQuantity: shellQuantityReducer,
  createGetTotalItemUsageAccrossTasks:
    createGetTotalItemUsageAccrossTasksReducer,
  itemAndQuantityBreakdownByTask: itemAndQuantityBreakdownByTaskReducer,
  getUserItemUsage: getUserItemUsageReducer,
  itemUsageWithUserContributions: itemUsageWithUserContributionsReducer,
  getShellScheduleTree: getShellScheduleTreeReducer
})

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable checks
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(errorMiddleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
