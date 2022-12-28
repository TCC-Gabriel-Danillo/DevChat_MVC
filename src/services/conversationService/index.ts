import { mapConversationToFirebaseConversation } from "_/helpers/mapConversationToFirebaseConversation";
import { mapFirebaseConversationToConversation } from "_/helpers/mapFirebaseConversationToConversation";
import { mapFirebaseToUser } from "_/helpers/mapFirebaseToUser";
import { DatabaseType, OP, ORDER } from "_/repositories/DatabaseRepository/types";
import { RealtimeDatabaseType } from "_/repositories/RealtimeDatabaseRepository/types";
import { Conversation, FirebaseUser, User } from "_/types";

import { ConversationServiceType, FirebaseConversation } from "./types";

export class ConversationService implements ConversationServiceType {
  constructor(
    private readonly conversationDatabase: DatabaseType,
    private readonly userDatabaseRepository: DatabaseType,
    private readonly conversationRealtimeDatabase: RealtimeDatabaseType
  ) {}

  async updateConversationById(conversation: Conversation): Promise<void> {
    const fConversation = mapConversationToFirebaseConversation(conversation);
    await this.conversationDatabase.update(fConversation, fConversation.id);
  }

  async createConversation(conversation: Conversation): Promise<void> {
    const fConversation = mapConversationToFirebaseConversation(conversation);
    await this.conversationDatabase.createOrReplace(fConversation, fConversation.id);
  }

  async deleteConversation(conversation: Conversation): Promise<void> {
    await this.conversationDatabase.delete(conversation.id);
  }

  listenConversationsByUserId(userId: string, cb: (data: Conversation[]) => Promise<void>): void {
    const filterArgs = {
      field: "users",
      op: OP.CONTAINS,
      value: userId,
    };

    const orderArgs = {
      field: "updatedAt",
      order: ORDER.DESC,
    };

    const args = { filterArgs, orderArgs };

    this.conversationRealtimeDatabase.watch<FirebaseConversation>(async (fConversations) => {
      const conversations = await Promise.all(
        fConversations.map((fconversation) => this.parseConversation(fconversation))
      );
      cb(conversations);
    }, args);
  }

  unlistenConversationsByUserId(): void {
    this.conversationRealtimeDatabase.unwatch();
  }

  private async parseConversation(fconversation: FirebaseConversation): Promise<Conversation> {
    const users = await this.getUsersFromConversation(fconversation.users);
    return mapFirebaseConversationToConversation(fconversation, users);
  }

  private async getUsersFromConversation(userIds: string[]): Promise<User[]> {
    const filterArgs = {
      field: "id",
      op: OP.IN,
      value: userIds,
    };
    const args = { filterArgs };
    const firebaseUsers = await this.userDatabaseRepository.getAll<FirebaseUser>(args);
    return firebaseUsers.map((fUser) => mapFirebaseToUser(fUser));
  }
}
