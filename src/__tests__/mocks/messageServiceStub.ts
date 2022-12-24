import { VoidCallback } from "_/repositories/RealtimeDatabaseRepository/types";
import { MessageServiceType } from "_/services/messageService/types/MessageServiceType";
import { Message } from "_/types";

export class MessageServiceStub implements MessageServiceType {
  sendMessage(message: Message): Promise<void> {
    return Promise.resolve();
  }
  updateMessage(message: Message): Promise<void> {
    return Promise.resolve();
  }
  listenMessages(cb: VoidCallback<Message>): void {}
  unlistenMessages(): void {}
}
