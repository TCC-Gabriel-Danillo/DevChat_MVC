import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "_/types";

export interface ConversationState {
  conversations?: Conversation[];
  isLoadingConversations: boolean;
  sigleConversation?: Conversation;
}

const initialState: ConversationState = {
  conversations: undefined,
  isLoadingConversations: false,
  sigleConversation: undefined,
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
    sigleConversation: (state, action: PayloadAction<Conversation | undefined>) => {
      state.sigleConversation = action.payload;
    },
    conversations: (state, action: PayloadAction<Conversation[] | undefined>) => {
      state.conversations = action.payload;
    },
  },
});

export const { loadingConversations, loadedConversations, sigleConversation, conversations } =
  conversationSlice.actions;
export const { reducer: conversationReducer } = conversationSlice;
