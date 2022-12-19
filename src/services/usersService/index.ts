import { mapFirebaseToUser } from "_/helpers/mapFirebaseToUser";
import { mapUserToFirebaseUser } from "_/helpers/mapUserToFirebaseUser";
import { DatabaseRepository } from "_/repositories/DatabaseRepository";
import { OP } from "_/repositories/DatabaseRepository/types";
import { FirebaseUser, User } from "_/types";

import { UsersServiceType } from "./types";

export class UsersService implements UsersServiceType {
  constructor(private readonly Database: DatabaseRepository) {}

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
