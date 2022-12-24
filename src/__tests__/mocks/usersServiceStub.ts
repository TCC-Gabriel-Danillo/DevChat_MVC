import { UsersServiceType } from "_/services/usersService/types";
import { User } from "_/types";

export const mockedParticipant: User = {
  email: "any_email2",
  id: "any_id2",
  username: "any_username2",
  photoUrl: "any_url2",
  techs: ["tech_2", "tech_3"],
};

export const createUserIfNotExistsMock = jest.fn((user: User) => Promise<void>);

export class UsersServiceStub implements UsersServiceType {
  listUsersByTech(tech: string): Promise<User[]> {
    return Promise.resolve([mockedParticipant]);
  }
  createUserIfNotExists(user: User): Promise<void> {
    createUserIfNotExistsMock(user);
    return Promise.resolve();
  }
}
