import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  isLoading: boolean;
}

const initialState: UserState = {
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userIsLoading: (state) => {
      state.isLoading = true;
    },
    userIsLoaded: (state) => {
      state.isLoading = false;
    },
  },
});

export const { userIsLoading, userIsLoaded } = userSlice.actions;
export const { reducer: userReducer } = userSlice;
