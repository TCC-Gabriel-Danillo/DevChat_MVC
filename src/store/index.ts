import { configureStore } from "@reduxjs/toolkit";

import { httpsReducer } from "./slices";

export const store = configureStore({
  reducer: {
    https: httpsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
