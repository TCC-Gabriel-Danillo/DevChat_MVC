import { Dispatch } from "@reduxjs/toolkit";
import { alertIsClosed, alertIsOpened, setAlertMessage } from "_/store/slices";
import { AppThunk } from "_/types";

export const openAlert = (message: string): AppThunk => {
  return async (dispatch: Dispatch, _) => {
    dispatch(alertIsOpened());
    dispatch(setAlertMessage(message));
  };
};

export const closeAlert = (): AppThunk => {
  return async (dispatch: Dispatch, _) => {
    dispatch(setAlertMessage(""));
    dispatch(alertIsClosed());
  };
};
