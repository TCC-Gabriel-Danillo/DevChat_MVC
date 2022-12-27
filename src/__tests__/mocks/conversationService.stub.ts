import { ConversationServiceType } from "_/services/conversationService/types";

import { conversationMock } from "./conversation.mock";

export const conversationServiceStub = {
  updateConversationById: jest.fn(),
  createConversation: jest.fn(),
  deleteConversation: jest.fn(),
  listenConversationsByUserId: jest.fn((userId, cb) => {
    cb([conversationMock]);
  }),
  unlistenConversationsByUserId: jest.fn(),
} as ConversationServiceType;
