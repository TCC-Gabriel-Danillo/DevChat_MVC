import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HttpsAdapter, RealtimeDatabaseAdapter, DatabaseAdapter } from "_/adapters";
import { DATABASE_COLLECTION, GITHUB_URL } from "_/constants";
import { AuthService, UsersService, ConversationService } from "_/services";
import { MiddlewareOptions } from "_/types";
import { persistStore, persistReducer } from "redux-persist";

import { authReducer, conversationReducer, usersReducer } from "./slices";
import { MessageService } from "_/services/messageService";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  conversation: conversationReducer,
  auth: authReducer,
  users: usersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const gitAuthHttp = new HttpsAdapter(GITHUB_URL.AUTH_BASE_URL);
const gitApiHttp = new HttpsAdapter(GITHUB_URL.API_BASE_URL);

const userDatabase = new DatabaseAdapter(DATABASE_COLLECTION.USERS);
const conversationDatabase = new DatabaseAdapter(DATABASE_COLLECTION.CONVERSATIONS);
const conversationDatabaseRealTime = new RealtimeDatabaseAdapter(DATABASE_COLLECTION.CONVERSATIONS);

const messageDatabase = new DatabaseAdapter(DATABASE_COLLECTION.MESSAGES);
const messageRealTimeDatabase = new RealtimeDatabaseAdapter(DATABASE_COLLECTION.MESSAGES);
const messageService = new MessageService(messageDatabase, messageRealTimeDatabase, userDatabase);

const authService = new AuthService(gitAuthHttp, gitApiHttp);
const usersService = new UsersService(userDatabase);
const conversationService = new ConversationService(conversationDatabase, userDatabase, conversationDatabaseRealTime);

export const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware<MiddlewareOptions>({
      serializableCheck: false,
      thunk: {
        extraArgument: {
          conversationService,
          authService,
          usersService,
          messageService,
        },
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
