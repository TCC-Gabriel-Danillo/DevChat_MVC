import { UsersServiceType } from "_/services/usersService/types";
import { User } from "_/types";

export class UsersServiceStub implements UsersServiceType {
  listUsersByTech(tech: string): Promise<User[]> {
    return Promise.resolve([
      {
        id: "any_id",
        username: "any_username",
        photoUrl: "any_photo_url",
        email: "any_email",
        techs: ["tech_1", "tech_2"],
      },
    ]);
  }
  createUserIfNotExists(user: User): Promise<void> {
    return Promise.resolve();
  }
}
