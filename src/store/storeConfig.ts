import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HttpsAdapter, RealtimeDatabaseAdapter, DatabaseAdapter } from "_/adapters";
import { DATABASE_COLLECTION, GITHUB_URL } from "_/constants";
import { AuthService, UserService, ConversationService } from "_/services";
import { MiddlewareOptions } from "_/types";
import { persistStore, persistReducer } from "redux-persist";

import { authReducer, conversationReducer, userReducer } from "./slices";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  conversation: conversationReducer,
  auth: authReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const gitAuthHttp = new HttpsAdapter(GITHUB_URL.AUTH_BASE_URL);
const gitApiHttp = new HttpsAdapter(GITHUB_URL.API_BASE_URL);

const userDatabase = new DatabaseAdapter(DATABASE_COLLECTION.USERS);
const conversationDatabase = new DatabaseAdapter(DATABASE_COLLECTION.CONVERSATIONS);
const conversationDatabaseRealTime = new RealtimeDatabaseAdapter(DATABASE_COLLECTION.CONVERSATIONS);

const authService = new AuthService(gitAuthHttp, gitApiHttp);
const userService = new UserService(userDatabase);
const conversationService = new ConversationService(conversationDatabase, userDatabase, conversationDatabaseRealTime);

export const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware<MiddlewareOptions>({
      thunk: {
        extraArgument: {
          conversationService,
          authService,
          userService,
        },
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
