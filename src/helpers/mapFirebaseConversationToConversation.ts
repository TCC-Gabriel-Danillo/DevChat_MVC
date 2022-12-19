import { FirebaseConversation } from "_/services/conversationService/types";
import { Conversation, User } from "_/types";

export const mapFirebaseConversationToConversation = (
  firebaseConversation: FirebaseConversation,
  users: User[]
): Conversation => {
  return {
    id: firebaseConversation.id,
    unreadNumber: firebaseConversation.unreadNumber,
    users,
    createdAt: firebaseConversation.createdAt.toDate(),
    updatedAt: firebaseConversation.updatedAt.toDate(),
    tech: firebaseConversation.tech,
    lastSenderId: firebaseConversation.lastSenderId,
  };
};
