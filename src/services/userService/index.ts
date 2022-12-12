import { DatabaseAdapter } from "_/adapters/DatabaseAdapter";
import { OP } from "_/adapters/DatabaseAdapter/types";
import { mapFirebaseToUser } from "_/helpers/mapFirebaseToUser";
import { mapUserToFirebaseUser } from "_/helpers/mapUserToFirebaseUser";
import { FirebaseUser, User } from "_/types";

import { UserServiceType } from "./types";

export class UserService implements UserServiceType {
  constructor(private readonly userDatabaseRepository: DatabaseAdapter) {}

  async listUsersByTech(tech: string): Promise<User[]> {
    const filterArgs = {
      field: "techs",
      op: OP.CONTAINS,
      value: tech,
    };
    const fUsers = await this.userDatabaseRepository.getAll<FirebaseUser>({ filterArgs });
    return fUsers.map((fUser) => mapFirebaseToUser(fUser));
  }

  async createUserIfNotExists(user: User) {
    const firebaseUser = mapUserToFirebaseUser(user);
    await this.userDatabaseRepository.createOrReplace(firebaseUser, firebaseUser.id);
  }
}
