import { Dispatch } from "@reduxjs/toolkit";
import { authIsLoaded, authIsLoading } from "_/store/slices/authSlice";
import { AppThunk, User } from "_/types";

export const createOrUpdateUser = (user: User): AppThunk => {
  return async (dispatch: Dispatch, _, { userService }) => {
    dispatch(authIsLoading());
    userService.createUserIfNotExists(user);
    dispatch(authIsLoaded());
  };
};
