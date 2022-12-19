import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "_/types";

export interface UserState {
  isLoadingUsers: boolean;
  users?: User[];
}

const initialState: UserState = {
  isLoadingUsers: false,
  users: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    usersAreLoading: (state) => {
      state.isLoadingUsers = true;
    },
    users: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    userWereLoaded: (state) => {
      state.isLoadingUsers = false;
    },
  },
});

export const { usersAreLoading, userWereLoaded, users } = userSlice.actions;
export const { reducer: usersReducer } = userSlice;
