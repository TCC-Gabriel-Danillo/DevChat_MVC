import { Timestamp } from "@firebase/firestore";
import { Message, User } from "_/types";

export interface FirebaseMessage {
  id: string;
  message: string;
  read: boolean;
  senderId: string;
  createdAt: Timestamp;
}

export const mapFirebaseMessageToMessage = (fMessage: FirebaseMessage, user: User): Message => {
  return {
    createdAt: fMessage.createdAt.toDate(),
    id: fMessage.id,
    message: fMessage.message,
    read: fMessage.read,
    sender: user,
  };
};

export const mapMessageToFirebaseMessage = (message: Message): FirebaseMessage => {
  return {
    id: message.id,
    createdAt: Timestamp.fromDate(message.createdAt),
    message: message.message,
    read: message.read,
    senderId: message.sender.id,
  };
};
