import { uuidv4 } from "@firebase/util";
import { DATABASE_COLLECTION } from "_/constants";
import { singleConversation } from "_/store/slices";
import { loadingMessages, loadedMessages, setMessages } from "_/store/slices/messageSlice";
import { AppDispatch } from "_/store/storeConfig";
import { AppThunk, Conversation, Message } from "_/types";

import { updateConversationInfo } from "../conversationActions";
const { CONVERSATIONS, MESSAGES } = DATABASE_COLLECTION;

export const sendMessage = (messageText: string): AppThunk => {
  return async (_, getState, { messageService }) => {
    const { auth } = getState();
    const { user } = auth;

    if (!user) return;

    const newMessage: Message = {
      createdAt: new Date(),
      message: messageText,
      read: false,
      sender: user,
      id: uuidv4(),
    };

    await messageService.sendMessage(newMessage);
  };
};

export const listenMessages = (currentConversation: Conversation): AppThunk => {
  return async (dispatch: AppDispatch, _1, { messageService }) => {
    dispatch(initNewConversation(currentConversation));
    dispatch(loadingMessages());

    messageService.listenMessages((messages: Message[]) => {
      dispatch(loadedMessages());
      dispatch(setMessages(messages));
      dispatch(updateConversation(messages, currentConversation));
    });
  };
};

const updateConversation = (newMessages: Message[], currentConversation: Conversation): AppThunk => {
  return async (dispatch: AppDispatch, _1, _2) => {
    const lastMessage = newMessages[newMessages.length - 1];
    if (!lastMessage) return;

    const newConversation: Conversation = {
      ...currentConversation,
      lastSenderId: lastMessage.sender.id,
      unreadNumber: getUnreadNumber(newMessages, lastMessage.sender.id),
    };
    dispatch(singleConversation(newConversation));
    dispatch(updateConversationInfo(newConversation));
  };
};

const initNewConversation = (conversation: Conversation): AppThunk => {
  return async (_1, _2, { messageService }) => {
    const conversationId = conversation.id;
    messageService.setCollectionMessageDB(CONVERSATIONS, conversationId, MESSAGES);
    messageService.setCollectionMessageDBRealTime(CONVERSATIONS, conversationId, MESSAGES);
  };
};

export const unlistenMessages = (): AppThunk => {
  return async (_1, _2, { messageService }) => {
    messageService.unlistenMessages();
  };
};

const getUnreadNumber = (messages: Message[], lastSenderId: string) => {
  return messages.filter((m) => m.sender.id === lastSenderId && !m.read).length;
};

export const markAsRead = (message: Message): AppThunk => {
  return async (_, getState, { messageService }) => {
    const { auth } = getState();
    const { user } = auth;

    const shouldMarkAsRead = message.sender.id !== user?.id && !message.read;
    const newMessage: Message = {
      ...message,
      read: true,
    };

    if (shouldMarkAsRead) messageService.updateMessage(newMessage);
  };
};
