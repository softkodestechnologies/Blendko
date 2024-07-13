import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { blendkoApi } from './api';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    [blendkoApi.reducerPath]: blendkoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blendkoApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
