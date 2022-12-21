import { Conversation } from "_/types";

export interface ConversationServiceType {
  updateConversationById(conversation: Conversation): Promise<void>;
  createConversation(conversation: Conversation): Promise<void>;
  deleteConversation(conversation: Conversation): Promise<void>;
  listenConversationsByUserId(userId: string, cb: (data: Conversation[]) => Promise<void>): void;
  unlistenConversationsByUserId(): void;
}
