import { VoidCallback } from "_/adapters/RealtimeDatabaseAdapter/types";
import { Message } from "_/types";

export interface MessageServiceType {
  sendMessage(message: Message): Promise<void>;
  updateMessage(message: Message): Promise<void>;
  listenMessages(cb: VoidCallback<Message>): void;
  unlistenMessages(): void;
}