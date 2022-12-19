import { Timestamp } from "firebase/firestore";

export interface FirebaseConversation {
  id: string;
  unreadNumber: number;
  users: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  tech: string;
  lastSenderId: string;
}
