import { FirebaseConversation } from "_/services/conversationService/types";
import { Conversation } from "_/types";
import { Timestamp } from "firebase/firestore";

export const mapConversationToFirebaseConversation = (conversation: Conversation): FirebaseConversation => {
  return {
    id: conversation.id,
    tech: conversation.tech,
    unreadNumber: conversation.unreadNumber,
    users: conversation.users.map((user) => user.id),
    createdAt: Timestamp.fromDate(conversation.createdAt),
    updatedAt: Timestamp.fromDate(conversation.updatedAt),
    lastSenderId: conversation.lastSenderId,
  };
};
