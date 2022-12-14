import { Dispatch } from "@reduxjs/toolkit";
import { authedUser, authIsLoaded, authIsLoading, removeUser } from "_/store/slices/authSlice";
import { AppThunk, AuthCredentialType } from "_/types";

export const authenticateGithub = (credentials: AuthCredentialType): AppThunk => {
  return async (dispatch: Dispatch, _, { authService }) => {
    dispatch(authIsLoading());
    const user = await authService.authenticateGithub(credentials);
    dispatch(authedUser(user));
    dispatch(authIsLoaded());
  };
};

export const logoutAction = (): AppThunk => {
  return async (dispatch) => {
    dispatch(removeUser());
  };
};
