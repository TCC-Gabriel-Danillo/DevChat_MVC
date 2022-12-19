import { User } from "_/types";

export interface UsersServiceType {
  listUsersByTech: (tech: string) => Promise<User[]>;
  createUserIfNotExists: (user: User) => Promise<void>;
}
