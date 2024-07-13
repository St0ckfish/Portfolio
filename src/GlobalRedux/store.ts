import { configureStore } from "@reduxjs/toolkit";
import booleanReducer from '@/features/boolyanSlice';

export const store = configureStore({
  reducer: {
    boolean: booleanReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
