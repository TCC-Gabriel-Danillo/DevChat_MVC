import { DatabaseAdapter } from "_/adapters/DatabaseAdapter";
import { OP, ORDER } from "_/adapters/DatabaseAdapter/types";
import { RealtimeDatabaseAdapter } from "_/adapters/RealtimeDatabaseAdapter";
import { mapConversationToFirebaseConversation } from "_/helpers/mapConversationToFirebaseConversation";
import { mapFirebaseConversationToConversation } from "_/helpers/mapFirebaseConversationToConversation";
import { mapFirebaseToUser } from "_/helpers/mapFirebaseToUser";
import { Conversation, FirebaseUser, User } from "_/types";

import { FirebaseConversation } from "./types";

export class ConversationService {
  constructor(
    private readonly conversationDatabase: DatabaseAdapter,
    private readonly userDatabaseRepository: DatabaseAdapter,
    private readonly conversationRealtimeDatabase: RealtimeDatabaseAdapter
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
      console.log(
        "🚀 ~ file: index.ts:50 ~ ConversationService ~ this.conversationRealtimeDatabase.watch<FirebaseConversation> ~ conversations",
        conversations
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
