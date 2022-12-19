import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "_/types";

export interface ConversationState {
  conversations?: Conversation[];
  conversation?: Conversation;
  isLoadingConversations: boolean;
  singleConversation?: Conversation;
}

const initialState: ConversationState = {
  conversations: undefined,
  conversation: undefined,
  isLoadingConversations: false,
  singleConversation: undefined,
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
    singleConversation: (state, action: PayloadAction<Conversation | undefined>) => {
      state.conversation = action.payload;
    },
    conversations: (state, action: PayloadAction<Conversation[] | undefined>) => {
      state.conversations = action.payload;
    },
  },
});

export const { loadingConversations, loadedConversations, singleConversation, conversations } =
  conversationSlice.actions;
export const { reducer: conversationReducer } = conversationSlice;
