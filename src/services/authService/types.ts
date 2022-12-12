import { AuthCredentialType, User } from "_/types";

export interface AuthServiceType {
  authenticateGithub: (credentials: AuthCredentialType) => Promise<User | undefined>;
}
