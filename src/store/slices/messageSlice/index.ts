import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "_/types";

export interface MessageState {
  messages?: Message[];
  isLoadingMessages: boolean;
}

const initialState: MessageState = {
  messages: undefined,
  isLoadingMessages: false,
};

export const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    loadingMessages: (state) => {
      state.isLoadingMessages = true;
    },
    loadedMessages: (state) => {
      state.isLoadingMessages = false;
    },
    setMessages: (state, action: PayloadAction<Message[] | undefined>) => {
      state.messages = action.payload;
    },
  },
});

export const { loadingMessages, loadedMessages, setMessages } = MessageSlice.actions;
export const { reducer: messageReducer } = MessageSlice;
