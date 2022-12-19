import { User } from "./User";

export interface Conversation {
  id: string;
  users: User[];
  lastSenderId: string;
  unreadNumber: number;
  createdAt: Date;
  updatedAt: Date;
  tech: string;
}
