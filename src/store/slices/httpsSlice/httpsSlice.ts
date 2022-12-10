import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface HttpsState {
  isLoading: boolean;
  getResponse: any;
  postResponse: any;
}

const initialState: HttpsState = {
  isLoading: false,
  getResponse: {},
  postResponse: {},
};

export const httpsSlice = createSlice({
  name: "http",
  initialState,
  reducers: {
    httpsLoading: (state) => {
      state.isLoading = true;
    },
    setGetResponse: (state, action: PayloadAction<any>) => {
      state.getResponse = action.payload;
    },
    setPostResponse: (state, action: PayloadAction<any>) => {
      state.postResponse = action.payload;
    },
    httpsLoaded: (state) => {
      state.isLoading = false;
    },
  },
});

export const { httpsLoading, httpsLoaded, setPostResponse, setGetResponse } = httpsSlice.actions;
export const { reducer: httpsReducer } = httpsSlice;
