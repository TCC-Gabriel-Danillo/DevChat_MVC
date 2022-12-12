import { User } from "_/types";

export interface UserServiceType {
  listUsersByTech: (tech: string) => Promise<User[]>;
  createUserIfNotExists: (user: User) => Promise<void>;
}
