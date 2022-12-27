import { VoidCallback } from "_/repositories/RealtimeDatabaseRepository/types";
import { Message } from "_/types";

export interface MessageServiceType {
  sendMessage(message: Message): Promise<void>;
  updateMessage(message: Message): Promise<void>;
  listenMessages(cb: VoidCallback<Message>): void;
  setCollectionMessageDB(...collections: string[]): void;
  setCollectionUserDB(...collections: string[]): void;
  setCollectionMessageDBRealTime(...collections: string[]): void;
  unlistenMessages(): void;
}
