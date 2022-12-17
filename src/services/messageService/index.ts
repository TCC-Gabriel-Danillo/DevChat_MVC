import { DatabaseAdapter, RealtimeDatabaseAdapter } from "_/adapters";
import { ORDER } from "_/adapters/DatabaseAdapter/types";
import { VoidCallback } from "_/adapters/RealtimeDatabaseAdapter/types";
import {
  FirebaseMessage,
  mapFirebaseMessageToMessage,
  mapMessageToFirebaseMessage,
} from "_/helpers/firebaseMessageHelper";
import { mapFirebaseToUser } from "_/helpers/mapFirebaseToUser";
import { FirebaseUser, Message, User } from "_/types";

import { MessageServiceType } from "./types/MessageServiceType";

export class MessageService implements MessageServiceType {
  constructor(
    private readonly messageDatabaseRepository: DatabaseAdapter,
    private readonly messageRealtimeDatabaseRepository: RealtimeDatabaseAdapter,
    private readonly userDatabaseRepository: DatabaseAdapter
  ) {}

  async sendMessage(message: Message): Promise<void> {
    const fMessage = mapMessageToFirebaseMessage(message);
    await this.messageDatabaseRepository.createOrReplace(fMessage, fMessage.id);
  }

  async updateMessage(message: Message): Promise<void> {
    const fMessage = mapMessageToFirebaseMessage(message);
    await this.messageDatabaseRepository.update(fMessage, fMessage.id);
  }

  listenMessages(cb: VoidCallback<Message>): void {
    const orderArgs = {
      field: "createdAt",
      order: ORDER.ASC,
    };

    const args = { orderArgs };
    this.messageRealtimeDatabaseRepository.watch<FirebaseMessage>(async (fMessages) => {
      const messages = await Promise.all(fMessages.map((fMessage) => this.parseMessage(fMessage)));
      cb(messages);
    }, args);
  }
  unlistenMessages(): void {
    this.messageRealtimeDatabaseRepository.unwatch();
  }

  private async parseMessage(fMessage: FirebaseMessage): Promise<Message> {
    const user = await this.getUserFromMessage(fMessage.senderId);
    return mapFirebaseMessageToMessage(fMessage, user);
  }

  private async getUserFromMessage(userId: string): Promise<User> {
    const fUser = await this.userDatabaseRepository.getOneById<FirebaseUser>(userId);
    return mapFirebaseToUser(fUser);
  }
}
