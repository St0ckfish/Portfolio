import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import booleanSlice from '@/features/boolyanSlice';

export const store = configureStore({
  reducer: {
    boolean: booleanSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
