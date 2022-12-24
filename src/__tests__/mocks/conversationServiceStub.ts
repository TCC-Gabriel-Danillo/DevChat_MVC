import { ConversationServiceType } from "_/services/conversationService/types";
import { UsersServiceType } from "_/services/usersService/types";
import { Conversation, User } from "_/types";

export const createConversationMock = jest.fn();
export const listenConversationsByUserIdMock = jest.fn();

export class ConversationServiceStub implements ConversationServiceType {
  updateConversationById(conversation: Conversation): Promise<void> {
    return Promise.resolve();
  }
  createConversation(conversation: Conversation): Promise<void> {
    createConversationMock(conversation);
    return Promise.resolve();
  }
  deleteConversation(conversation: Conversation): Promise<void> {
    return Promise.resolve();
  }
  listenConversationsByUserId(userId: string, cb: (data: Conversation[]) => Promise<void>): void {
    listenConversationsByUserIdMock(userId);
  }
  unlistenConversationsByUserId(): void {}
}
