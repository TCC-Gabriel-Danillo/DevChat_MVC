import { uuidv4 } from "@firebase/util";
import { Dispatch } from "@reduxjs/toolkit";
import {
  loadingConversations,
  conversations,
  singleConversation,
  loadedConversations,
} from "_/store/slices/conversationSlice";
import { AppThunk, Conversation, User } from "_/types";

export const listenConversation = (): AppThunk => {
  return async (dispatch: Dispatch, getState, { conversationService }) => {
    const { auth } = getState();
    const { user } = auth;
    if (user) {
      conversationService.listenConversationsByUserId(user.id, async (newConversation) => {
        dispatch(loadingConversations());
        dispatch(conversations(newConversation));
        dispatch(loadedConversations());
      });
    }
  };
};

export const unlistenConversations = (): AppThunk => {
  return (_1, _2, { conversationService }) => {
    conversationService.unlistenConversationsByUserId();
  };
};

export const updateConversationInfo = (newConversation: Conversation): AppThunk => {
  return async (_1, _2, { conversationService }) => {
    await conversationService.updateConversationById(newConversation);
  };
};

export const setSingleConversation = (newConversation: Conversation): AppThunk => {
  return async (dispatch: Dispatch, _1) => {
    dispatch(singleConversation(newConversation));
  };
};

export const createNewConversation = (users: User[], tech: string): AppThunk => {
  return async (dispatch, _, { conversationService }) => {
    const silgeMessage: Conversation = {
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      unreadNumber: 0,
      tech,
      users,
      lastSenderId: "",
    };

    await conversationService.createConversation(silgeMessage);
    dispatch(singleConversation(silgeMessage));
  };
};
