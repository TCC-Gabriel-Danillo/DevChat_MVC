import { AuthServiceType } from "_/services/authService/types";
import { AuthCredentialType, User } from "_/types";

export const userMock = {
  id: "any_id",
  username: "any_username",
  photoUrl: "any_photo_url",
  email: "any_email",
  techs: ["tech_1", "tech_2"],
};
export class AuthServiceStub implements AuthServiceType {
  async authenticateGithub(credentials: AuthCredentialType): Promise<User | undefined> {
    return userMock;
  }
}
