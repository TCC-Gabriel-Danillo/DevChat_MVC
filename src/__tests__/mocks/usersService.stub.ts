import { UsersServiceType } from "_/services/usersService/types";
import { User } from "_/types";

export const mockedParticipant: User = {
  email: "any_email2",
  id: "any_id2",
  username: "any_username2",
  photoUrl: "any_url2",
  techs: ["tech_2", "tech_3"],
};

export const usersServiceStub = {
  listUsersByTech: jest.fn(async (tech: string) => [mockedParticipant]),
  createUserIfNotExists: jest.fn(async (user: User) => {}),
} as UsersServiceType;
