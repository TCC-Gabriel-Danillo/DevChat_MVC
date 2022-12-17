import { Dispatch } from "@reduxjs/toolkit";
import { usersAreLoading, userWereLoaded, users } from "_/store/slices/usersSlice";
import { AppThunk, User } from "_/types";

export const createOrUpdateUser = (user: User): AppThunk => {
  return async (dispatch: Dispatch, _, { usersService }) => {
    dispatch(usersAreLoading());
    usersService.createUserIfNotExists(user);
    dispatch(userWereLoaded());
  };
};

export const getUsersByTech = (tech: string): AppThunk => {
  return async (dispatch: Dispatch, getState, { usersService }) => {
    dispatch(usersAreLoading());

    const { auth } = getState();
    const { user } = auth;

    const response = await usersService.listUsersByTech(tech);
    const usersWithoutLoggedUser = response.filter((responseUser) => responseUser.id !== user?.id);

    dispatch(users(usersWithoutLoggedUser));
    dispatch(userWereLoaded());
  };
};
