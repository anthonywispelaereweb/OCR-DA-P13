import { configureStore } from "@reduxjs/toolkit";
import { authApi } from './features/auth/api';
import { profileApi } from './features/profile/profileApi';
import authReducer from './features/auth/slice';


export const store = configureStore({
  devTools: import.meta.env.MODE !== "production", // Active Redux DevTools uniquement en mode dev

  reducer: {
    auth: authReducer,
    profile: null,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware),
});


export default store;
