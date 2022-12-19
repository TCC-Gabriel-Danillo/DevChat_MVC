import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "_/types";

export interface AuthState {
  isLoading: boolean;
  user?: User;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  user: undefined,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authIsLoading: (state) => {
      state.isLoading = true;
    },
    authIsLoaded: (state) => {
      state.isLoading = false;
    },
    authedUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
});

export const { authIsLoading, authIsLoaded, authedUser } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
