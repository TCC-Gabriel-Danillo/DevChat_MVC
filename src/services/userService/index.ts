import { DatabaseAdapter } from "_/adapters/DatabaseAdapter";
import { OP } from "_/adapters/DatabaseAdapter/types";
import { mapFirebaseToUser } from "_/helpers/mapFirebaseToUser";
import { mapUserToFirebaseUser } from "_/helpers/mapUserToFirebaseUser";
import { FirebaseUser, User } from "_/types";

import { UserServiceType } from "./types";

export class UserService implements UserServiceType {
  constructor(private readonly Database: DatabaseAdapter) {}

  async listUsersByTech(tech: string): Promise<User[]> {
    const filterArgs = {
      field: "techs",
      op: OP.CONTAINS,
      value: tech,
    };
    const fUsers = await this.Database.getAll<FirebaseUser>({ filterArgs });
    return fUsers.map((fUser) => mapFirebaseToUser(fUser));
  }

  async createUserIfNotExists(user: User) {
    const firebaseUser = mapUserToFirebaseUser(user);
    await this.Database.createOrReplace(firebaseUser, firebaseUser.id);
  }
}
