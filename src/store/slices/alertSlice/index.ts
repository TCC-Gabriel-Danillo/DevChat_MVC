import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface AlertState {
  isOpen: boolean;
  message: string;
}

const initialState: AlertState = {
  isOpen: false,
  message: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    alertIsOpened: (state) => {
      state.isOpen = true;
    },
    alertIsClosed: (state) => {
      state.isOpen = false;
    },
    setAlertMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { alertIsClosed, alertIsOpened, setAlertMessage } = alertSlice.actions;
export const { reducer: alertReducer } = alertSlice;
