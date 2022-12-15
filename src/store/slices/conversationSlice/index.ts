import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "_/types";

export interface ConversationState {
  conversations?: Conversation[];
  isLoadingConversations: boolean;
}

const initialState: ConversationState = {
  conversations: undefined,
  isLoadingConversations: false,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    loadingConversations: (state) => {
      state.isLoadingConversations = true;
    },
    loadedConversations: (state) => {
      state.isLoadingConversations = false;
    },
    getConversation: (state, action: PayloadAction<Conversation[] | undefined>) => {
      state.conversations = action.payload;
    },
  },
});

export const { loadingConversations, loadedConversations, getConversation } = conversationSlice.actions;
export const { reducer: conversationReducer } = conversationSlice;
