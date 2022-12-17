import { configureStore } from "@reduxjs/toolkit";
import { HttpsAdapter } from "_/adapters";
import { DatabaseRepository } from "_/repositories/DatabaseRepository";
import { DATABASE_COLLECTION, GITHUB_URL } from "_/constants";
import { UserService } from "_/services";
import { AuthService } from "_/services/authService";
import { MiddlewareOptions } from "_/types/MiddlewareOptions";

import { authReducer, userReducer } from "./slices";

const gitAuthHttp = new HttpsAdapter(GITHUB_URL.AUTH_BASE_URL);
const gitApiHttp = new HttpsAdapter(GITHUB_URL.API_BASE_URL);
const database = new DatabaseRepository(DATABASE_COLLECTION.USERS);

const authService = new AuthService(gitAuthHttp, gitApiHttp);
const userService = new UserService(database);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware<MiddlewareOptions>({
      thunk: {
        extraArgument: {
          authService,
          userService,
        },
      },
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
