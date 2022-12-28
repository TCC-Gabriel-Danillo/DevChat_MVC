import {
  FirebaseMessage,
  mapFirebaseMessageToMessage,
  mapMessageToFirebaseMessage,
} from "_/helpers/firebaseMessageHelper";
import { mapFirebaseToUser } from "_/helpers/mapFirebaseToUser";
import { DatabaseType, ORDER } from "_/repositories/DatabaseRepository/types";
import { RealtimeDatabaseType, VoidCallback } from "_/repositories/RealtimeDatabaseRepository/types";
import { FirebaseUser, Message, User } from "_/types";

import { MessageServiceType } from "./types/MessageServiceType";

export class MessageService implements MessageServiceType {
  constructor(
    private readonly messageDatabaseRepository: DatabaseType,
    private readonly messageRealtimeDatabaseRepository: RealtimeDatabaseType,
    private readonly userDatabaseRepository: DatabaseType
  ) {}

  setCollectionMessageDB(...collections: string[]) {
    this.messageDatabaseRepository.setCollections(...collections);
  }

  setCollectionUserDB(...collections: string[]) {
    this.userDatabaseRepository.setCollections(...collections);
  }

  setCollectionMessageDBRealTime(...collections: string[]) {
    this.messageRealtimeDatabaseRepository.setCollections(...collections);
  }

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
