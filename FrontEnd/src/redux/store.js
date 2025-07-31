import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './features/auth/authApi'
import { profileApi } from './features/profile/profileApi'
import authReducer from './features/auth/authSlice'
import profileReducer from './features/profile/profileSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware)
})

export const getState = store.getState
export const dispatch = store.dispatch
