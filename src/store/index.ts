import { configureStore } from "@reduxjs/toolkit";
import { HttpsAdapter } from "_/adapters";
import { GITHUB_URL } from "_/constants";
import { AuthService } from "_/services/authService";
import { MiddlewareOptions } from "_/types/MiddlewareOptions";

import { authReducer } from "./slices";

const gitAuthHttp = new HttpsAdapter(GITHUB_URL.AUTH_BASE_URL);
const gitApiHttp = new HttpsAdapter(GITHUB_URL.API_BASE_URL);

const authService = new AuthService(gitAuthHttp, gitApiHttp);

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware<MiddlewareOptions>({
      thunk: {
        extraArgument: {
          authService,
        },
      },
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
